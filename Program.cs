﻿using System.Text.RegularExpressions;
using Newtonsoft.Json;
using Overte;
using Scriban;
using System.Security.Cryptography;
using System.Text;

var json = File.ReadAllText("hifiJSDoc.json");
json = json.Replace("(0)", "");
var data = JsonConvert.DeserializeObject<List<HifiJsDoc>>(json) ?? [];


// Templates
var toolbox_template = Template.Parse(File.ReadAllText("./templates/default_toolbox.js.sbn"), "./templates/default_toolbox.js.sbn");
var class_template = Template.Parse(File.ReadAllText("./templates/classTemplate.js.sbn"), "./templates/classTemplate.js.sbn");
var function_template = Template.Parse(File.ReadAllText("./templates/functionTemplate.js.sbn"), "./templates/functionTemplate.js.sbn");
var signal_template = Template.Parse(File.ReadAllText("./templates/signalTemplate.js.sbn"), "./templates/signalTemplate.js.sbn");
var typedef_template = Template.Parse(File.ReadAllText("./templates/typedefTemplate.js.sbn"), "./templates/typedefTemplate.js.sbn");
var namespace_template = Template.Parse(File.ReadAllText("./templates/namespaceTemplate.js.sbn"), "./templates/namespaceTemplate.js.sbn");

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

File.WriteAllText("./deploy/overte.js", outp);
File.WriteAllText("./deploy/overte_toolbox_interface.js", toolbox_template.Render(new { Toolbox = toolboxcont.Where(x => x.Interface) }));
File.WriteAllText("./deploy/overte_toolbox_cliententity.js", toolbox_template.Render(new { Toolbox = toolboxcont.Where(x => x.ClientEntity) }));
File.WriteAllText("./deploy/overte_toolbox_avatar.js", toolbox_template.Render(new { Toolbox = toolboxcont.Where(x => x.Avatar) }));

string generateNamespaceBlock(HifiJsDoc data)
{
    if (block_cache.Contains($"Namespace{data.Memberof}{data.Name}"))
        return "";
    block_cache.Add($"Namespace{data.Memberof}{data.Name}");

    var block_name = getBlockName(data);
    var color = catColor(data.Memberof ?? data.Name);
    var outp = "";

    if (data.Properties == null)
    {
        var box = toolboxcont.SingleOrDefault(x => x.Name == data.Name);
        if (box == null)
        {
            box = new Toolbox
            {
                Name = data.Name,
                Colour = color
            };
            toolboxcont.Add(box);
        }
        box.Interface = data.HifiInterface ?? false;
        box.ClientEntity = data.HifiClientEntity ?? false;
        box.Avatar = data.HifiAvatar ?? false;

        return outp;
    }

    foreach (var prop in data.Properties)
    {
        if (prop.Type == null || prop.Name == null)
            continue;

        var desc = prop.Description?.Replace("'", "\\'") ?? "";
        desc = Regex.Replace(desc, @"\t|\n|\r", "");

        var name = $"{data.Name}.{prop.Name}";

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
        Name = data.Name,
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
        // "date" => "field_date",
        "string" => "text",
        "vec3" => "Vec3_ZERO",
        "quat" => "Quat_IDENTITY",
        "uuid" => "Uuid_NULL",
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

void addToToolbox(HifiJsDoc data, string color, List<BlockParameter>? parameters = null, string? name = null)
{
    var group_name = data.Memberof ?? data.Name;
    var category_name = data.Kind switch
    {
        Kind.Class => "Classes",
        Kind.Function => "Functions",
        Kind.Namespace => "Variables",
        Kind.Package => "Packages",
        Kind.Signal => "Signals",
        Kind.Typedef => "Classes",
        _ => "",
    };

    var box = toolboxcont.SingleOrDefault(x => x.Name == group_name);
    if (box == null)
    {
        box = new Toolbox
        {
            Name = group_name,
            Colour = color
        };
        toolboxcont.Add(box);
    }

    if (data.Kind == Kind.Class || data.Kind == Kind.Namespace)
    {
        box.Interface = data.HifiInterface ?? false;
        box.ClientEntity = data.HifiClientEntity ?? false;
        box.Avatar = data.HifiAvatar ?? false;
    }

    var box_block = new ToolboxBlock
    {
        Name = name ?? getBlockName(data)
    };

    if (parameters != null)
        box_block.Inputs = parameters.Where(cleanList).ToList();

    var category = box.Contents.SingleOrDefault(x => x.Name == category_name);
    if (category == null)
    {
        category = new ToolboxCategory
        {
            Name = category_name
        };
        box.Contents.Add(category);
    }

    category.Contents.Add(box_block);
}

bool cleanList(BlockParameter parameter)
{
    var l = new string[] {
        "object",
        "function",
        "any",
        "callback",
        "value",
        "deleteoptions",
        "date",
        "condition"
    };
    foreach (var i in l)
        if (parameter.Shadowtype.Contains(i, StringComparison.CurrentCultureIgnoreCase))
            return false;
    return true;
}
