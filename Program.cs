using System.Text.RegularExpressions;
using Newtonsoft.Json;
using Overte;
using Scriban;
using System.Security.Cryptography;
using System.Text;

var json = File.ReadAllText("hifiJSDoc.json");
json = json.Replace("(0)", "");
var data = JsonConvert.DeserializeObject<List<HifiJsDoc>>(json);


// Templates
var toolbox_template = Template.Parse(File.ReadAllText("./default_toolbox.js.sbn"), "./default_toolbox.js.sbn");
var class_template = Template.Parse(File.ReadAllText("./classTemplate.js.sbn"), "./classTemplate.js.sbn");
var function_template = Template.Parse(File.ReadAllText("./functionTemplate.js.sbn"), "./functionTemplate.js.sbn");
var signal_template = Template.Parse(File.ReadAllText("./signalTemplate.js.sbn"), "./signalTemplate.js.sbn");
var typedef_template = Template.Parse(File.ReadAllText("./typedefTemplate.js.sbn"), "./typedefTemplate.js.sbn");
var namespace_template = Template.Parse(File.ReadAllText("./namespaceTemplate.js.sbn"), "./namespaceTemplate.js.sbn");

testTemplate(toolbox_template);
testTemplate(class_template);
testTemplate(function_template);
testTemplate(signal_template);
testTemplate(typedef_template);
testTemplate(namespace_template);

// var test = data.Where(d => d.Memberof == "Agent" || d.Name == "Agent");

var outp = """
function dfv(value, default_val){
    if(!value || value.length === 0){
        return  default_val.length === 0 ? "\"\"" : default_val;
    }  
    else {
        return value;
    }    
}

""";

var toolboxcont = new List<Toolbox>();
var color_cache = new Dictionary<string, string>();
var block_cache = new List<string>();

foreach (var t in data.Where(d => d.Deprecated == null)) // .Where(d => d.Memberof == "MyAvatar")
{
    switch (t.Kind)
    {
        case Kind.Namespace:
            Console.WriteLine($"Namespace {t.Longname}");
            outp += generateNamespaceBlock(t);
            break;
        case Kind.Function:
            Console.WriteLine($"Function {t.Longname}");
            outp += generateFunctionBlock(t);
            break;
        case Kind.Signal:
            Console.WriteLine($"Signal {t.Longname}");
            outp += generateSignalBlock(t);
            break;
        case Kind.Typedef:
            Console.WriteLine($"Typedef {t.Longname}");
            outp += generateTypedefBlock(t);
            break;
        case Kind.Class:
            Console.WriteLine($"Class {t.Longname}");
            outp += generateClassBlock(t);
            break;
            // default:
            //     break;
    }

}

// toolboxcont = toolboxcont.OrderBy(obj => obj.Key).ToDictionary(obj => obj.Key, obj => obj.Value);
toolboxcont.Sort((x, y) => string.Compare(x.Name, y.Name));
var rend = toolbox_template.Render(new { Toolbox = toolboxcont });

File.WriteAllText("./deploy/overte.js", outp);
File.WriteAllText("./deploy/overte_toobox.js", rend);

string generateNamespaceBlock(HifiJsDoc data)
{
    if (block_cache.Contains($"Namespace{data.Memberof}{data.Name}"))
        return "";
    block_cache.Add($"Namespace{data.Memberof}{data.Name}");

    var block_name = getBlockName(data);
    var outp = "";

    if (data.Properties == null)
        return outp;

    foreach (var prop in data.Properties)
    {
        if (prop.Type == null || prop.Name == null)
            continue;

        var desc = prop.Description?.Replace("'", "\\'") ?? "";
        desc = Regex.Replace(desc, @"\t|\n|\r", "");

        var name = $"{data.Name}.{prop.Name}";

        var color = catColor(data.Memberof ?? data.Name);

        var template_data = new
        {
            Jsfunction = name,
            Blockname = $"{data.Name}_{prop.Name}",
            Description = desc,
            Url = $"https://apidocs.overte.org/{name.Replace(".", ".html#.")}",
            Color = color
        };
        addToToolbox(data, color, name: $"{data.Name}_{prop.Name}");
        outp += namespace_template.Render(template_data);
    }

    return outp;
}


string generateTypedefBlock(HifiJsDoc data)
{
    if (block_cache.Contains($"Typedef{data.Memberof}{data.Name}"))
        return "";
    block_cache.Add($"Typedef{data.Memberof}{data.Name}");

    var i = 0;
    var block_name = getBlockName(data);
    var properties = new List<BlockParameter>();

    // if (data.Properties == null || data.Type?.Names.First() != "object")
    //     return "";

    if (data.Properties != null)
    {
        foreach (var prop in data.Properties)
        {
            if (prop.Type == null)
                continue;

            var parm_name = prop.Name ?? $"prop_{i++}";
            parm_name = Regex.Replace(parm_name, @"[^a-zA-Z0-9]", "");
            if (parm_name == "")
                parm_name = $"prop_{i++}";

            properties.Add(new BlockParameter
            {
                Name = parm_name,
                Description = prop.Description,
                Type = typeToJs(prop.Type),
                Shadowtype = shadowTypeToJs(prop.Type),
                Defaultvalue = getDefaultValue(prop),
            });
        }
    }
    // else
    // {
    //     properties.Add(new BlockParameter
    //     {
    //         Name = "value",
    //         Description = data.Description,
    //         Type = typeToJs(data.Type),
    //         Shadowtype = shadowTypeToJs(data.Type),
    //     });
    // }

    var desc = data.Description?.Replace("'", "\\'") ?? "";
    desc = Regex.Replace(desc, @"\t|\n|\r", "");

    var color = catColor(data.Memberof ?? data.Name);

    var template_data = new
    {
        Jsfunction = data.Longname,
        Blockname = block_name,
        Description = desc,
        Properties = properties,
        Url = $"https://apidocs.overte.org/{data.Longname.Replace(".", ".html#.")}",
        Color = color
    };

    addToToolbox(data, color, properties);
    return typedef_template.Render(template_data);
}


string generateClassBlock(HifiJsDoc data)
{
    if (block_cache.Contains($"Class{data.Memberof}{data.Name}"))
        return "";
    block_cache.Add($"Class{data.Memberof}{data.Name}");

    var i = 0;
    var block_name = getBlockName(data);
    var properties = new List<BlockParameter>();

    // if (data.Properties == null || data.Type?.Names.First() != "object")
    //     return "";

    if (data.Properties != null)
    {
        foreach (var prop in data.Properties)
        {
            if (prop.Type == null)
                continue;

            var parm_name = prop.Name ?? $"prop_{i++}";
            parm_name = Regex.Replace(parm_name, @"[^a-zA-Z0-9]", "");
            if (parm_name == "")
                parm_name = $"prop_{i++}";

            properties.Add(new BlockParameter
            {
                Name = parm_name,
                Description = prop.Description,
                Type = typeToJs(prop.Type),
                Shadowtype = shadowTypeToJs(prop.Type),
                Defaultvalue = getDefaultValue(prop),
            });
        }
    }
    // else
    // {
    //     properties.Add(new BlockParameter
    //     {
    //         Name = "value",
    //         Description = data.Description,
    //         Type = typeToJs(data.Type),
    //         Shadowtype = shadowTypeToJs(data.Type),
    //     });
    // }

    var desc = data.Description?.Replace("'", "\\'") ?? "";
    desc = Regex.Replace(desc, @"\t|\n|\r", "");

    var color = catColor(data.Memberof ?? data.Name);

    var template_data = new
    {
        Jsfunction = data.Longname,
        Blockname = block_name,
        Description = desc,
        Properties = properties,
        Url = $"https://apidocs.overte.org/{data.Longname.Replace(".", ".html#.")}",
        Color = color
    };

    addToToolbox(data, color, properties);
    return class_template.Render(template_data);
}

string generateSignalBlock(HifiJsDoc data)
{
    if (block_cache.Contains($"Signal{data.Memberof}{data.Name}"))
        return "";
    block_cache.Add($"Signal{data.Memberof}{data.Name}");

    var block_name = getBlockName(data);
    var parameters = new List<object>();

    if (data.Params != null)
    {
        foreach (var param in data.Params)
        {
            if (param.Type == null)
                continue;

            var parm_name = param.Name ?? "parameter";
            parm_name = parm_name.Replace("-", "");

            parameters.Add(new
            {
                Name = parm_name,
                Type = typeToJs(param.Type)
            });
        }
    }

    var desc = data.Description?.Replace("'", "\\'") ?? "";
    desc = Regex.Replace(desc, @"\t|\n|\r", "");

    var color = catColor(data.Memberof);

    var template_data = new
    {
        Jsfunction = data.Longname,
        Blockname = getBlockName(data),
        Description = desc,
        Parameters = parameters,
        Url = $"https://apidocs.overte.org/{data.Longname.Replace(".", ".html#.")}",
        Color = color
    };

    addToToolbox(data, color);
    return signal_template.Render(template_data);
}


string generateFunctionBlock(HifiJsDoc data)
{
    var block_name = getBlockName(data);

    if (block_cache.Contains($"Function{block_name}") && data.Params != null)
        foreach (var param in data.Params)
            block_name += $"{param.Name}";

    block_cache.Add($"Function{block_name}");

    var parameters = new List<BlockParameter>();

    if (data.Params != null)
    {
        foreach (var param in data.Params)
        {
            if (param.Type == null)
                continue;

            var parm_name = param.Name ?? "parameter";
            parm_name = parm_name.Replace("-", "");

            parameters.Add(new BlockParameter
            {
                Name = parm_name,
                Type = typeToJs(param.Type),
                Shadowtype = shadowTypeToJs(param.Type),
                Defaultvalue = getDefaultValue(param),
            });
        }
    }

    var returns = new List<string>();

    if (data.Returns != null)
    {
        foreach (var o in data.Returns)
        {
            if (o.Type == null)
                continue;
            returns.Add(typeToJs(o.Type));
        }
    }

    var desc = data.Description?.Replace("'", "\\'") ?? "";
    desc = Regex.Replace(desc, @"\t|\n|\r", "");

    var color = catColor(data.Memberof);

    var template_data = new
    {
        Jsfunction = data.Longname,
        Blockname = block_name,
        Description = desc,
        Parameters = parameters,
        Returns = returns,
        Url = $"https://apidocs.overte.org/{data.Longname.Replace(".", ".html#.")}",
        Color = color
    };

    addToToolbox(data, color, parameters, block_name);
    return function_template.Render(template_data);
}

string getBlockName(HifiJsDoc data) => data.Longname.Replace('.', '_'); //.ToLower();

string typeToJs(TypeClass type)
{
    var t = type.Names.First();
    if (t.Contains("Array"))
        return "Array";
    return t.ToLower() switch
    {
        "number" => "Number",
        "float" => "Number",
        "int" => "Number",
        "boolean" => "Boolean",
        "string" => "String",
        "*" => "Any",
        _ => type.Names.First(),
    };
}

string shadowTypeToJs(TypeClass type)
{
    var t = type.Names.First();
    if (t.Contains("Array"))
        return "lists_create_with";
    return t.ToLower() switch
    {
        "number" => "math_number",
        "float" => "math_number",
        "int" => "math_number",
        "boolean" => "logic_boolean",
        "string" => "text",
        "vec3" => "Vec3_ZERO",
        "quat" => "Quat_IDENTITY",
        "*" => "Any",
        _ => type.Names.First().Replace('.', '_'),
    };
}


object getDefaultValue(Param parm)
{
    if (parm.Defaultvalue == null)
    {
        return parm.Type.Names.First() switch
        {
            "number" => 0,
            "boolean" => false,
            "string" => "",
            _ => "",
        };
    }
    else
    {
        if (parm.Defaultvalue.Value.Bool != null)
            return parm.Defaultvalue.Value.Bool;
        if (parm.Defaultvalue.Value.String != null)
            return parm.Defaultvalue.Value.String;
        if (parm.Defaultvalue.Value.Double != null)
            return parm.Defaultvalue.Value.Double;
        return "";
    }
}


void testTemplate(Template t)
{
    if (t.HasErrors)
    {
        foreach (var error in t.Messages)
            Console.WriteLine(error);

        throw new Exception("Invalid template!");
    }
}

string normalizeVarName(string? inp) => inp == null ? "parameter" : inp.Replace("-", "");

string catColor(string? cat)
{
    if (cat == null)
        return "#111111";

    if (color_cache.TryGetValue(cat, out string? value))
        return value;

    var hashBytes = MD5.HashData(Encoding.UTF8.GetBytes(cat));
    var color = $"#{string.Join("", BitConverter.ToString(hashBytes).Replace("-", "").Take(6))}";
    color_cache.Add(cat, color);
    return color;
}

void addToToolbox(HifiJsDoc a, string color, List<BlockParameter>? parameters = null, string? name = null)
{
    var category_name = a.Memberof ?? a.Name;
    var box = toolboxcont.SingleOrDefault(x => x.Name == category_name);
    if (box == null)
    {
        box = new Toolbox
        {
            Name = category_name,
            Colour = color
        };
        toolboxcont.Add(box);
    }

    var box_block = new ToolboxBlock
    {
        Name = name ?? getBlockName(a)
    };

    if (parameters != null)
        box_block.Inputs = parameters.Where(
            x => !x.Shadowtype.Contains("object", StringComparison.CurrentCultureIgnoreCase)
            && !x.Shadowtype.Contains("function", StringComparison.CurrentCultureIgnoreCase)
            && !x.Shadowtype.Contains("any", StringComparison.CurrentCultureIgnoreCase)
            && !x.Shadowtype.Contains("callback", StringComparison.CurrentCultureIgnoreCase)
            && !x.Shadowtype.Contains("value", StringComparison.CurrentCultureIgnoreCase)
        ).ToList();

    box.Contents.Add(box_block);
}