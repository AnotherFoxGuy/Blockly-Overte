using System.Text.RegularExpressions;
using Newtonsoft.Json;
using Overte;
using Scriban;
using System.Security.Cryptography;
using System.Text;

var json = File.ReadAllText("hifiJSDoc.json");
var data = JsonConvert.DeserializeObject<List<HifiJsDoc>>(json);


// Templates
var toolbox_template = Template.Parse(File.ReadAllText("./default_toolbox.js.sbn"), "./default_toolbox.js.sbn");
var class_template = Template.Parse(File.ReadAllText("./classTemplate.js.sbn"), "./classTemplate.js.sbn");
var function_template = Template.Parse(File.ReadAllText("./functionTemplate.js.sbn"), "./functionTemplate.js.sbn");
var signal_template = Template.Parse(File.ReadAllText("./signalTemplate.js.sbn"), "./signalTemplate.js.sbn");

testTemplate(toolbox_template);
testTemplate(class_template);
testTemplate(function_template);
testTemplate(signal_template);

// var test = data.Where(d => d.Memberof == "Agent" || d.Name == "Agent");

var outp = "";

var toolboxcont = new Dictionary<string, List<string>>();
var color_cache = new Dictionary<string, string>();

foreach (var t in data) // .Where(d => d.Memberof == "MyAvatar")
{
    switch (t.Kind)
    {
        case Kind.Class:
            // outp += generateClassBlock(t);
            Console.WriteLine($"Class {t.Longname}");
            break;
        case Kind.Function:
            outp += generateFunctionBlock(t);
            var cat = t.Memberof ?? "Global";
            toolboxcont.TryAdd(cat, []);
            toolboxcont[cat].Add(getBlockName(t));
            break;
        case Kind.Namespace:
            Console.WriteLine($"Namespace {t.Longname}");
            break;
        case Kind.Package:
            Console.WriteLine($"Package {t.Longname}");
            break;
        case Kind.Signal:
            Console.WriteLine($"Signal {t.Longname}");
            outp += generateSignalBlock(t);
            var cat2 = t.Memberof ?? "Global";
            toolboxcont.TryAdd(cat2, []);
            toolboxcont[cat2].Add(getBlockName(t));
            break;
        case Kind.Typedef:
            Console.WriteLine($"Typedef {t.Longname}");
            break;
        default:
            break;
    }


    // Console.WriteLine($"Gen {t.Longname}");
}


// var toolbox = "";
// foreach (var item in toolboxcont)
// {
//     toolbox += $"{{ \"kind\": \"category\", \"name\": \"{item.Key}\", \"contents\": [{string.Join(",", item.Value)}]}},";
// }

// var tooboxdef = default_toolbox.Replace("//@DEF@", "," + toolbox.TrimEnd(','));//$"var toolbox = [{}]";


var rend = toolbox_template.Render(new { Toolbox = toolboxcont });
File.WriteAllText("./deploy/overte.js", outp + rend);


string generateClassBlock(HifiJsDoc data)
{
    var desc = data.Description?.Replace("'", "\\'") ?? "";
    desc = Regex.Replace(desc, @"\t|\n|\r", "");

    var template_data = new
    {
        JsFunction = data.Longname,
        Blockname = getBlockName(data),
        Description = desc,
        // Codefields = string.Join(",", code_fields),
        Properties = data.Properties
    };

    return class_template.Render(template_data);
}

string generateSignalBlock(HifiJsDoc data)
{
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

    var template_data = new
    {
        Jsfunction = data.Longname,
        Blockname = getBlockName(data),
        Description = desc,
        Parameters = parameters,
        Url = $"https://apidocs.overte.org/{data.Longname.Replace(".", ".html#.")}",
        Color = catColor(data.Memberof)
    };

    return signal_template.Render(template_data);
}


string generateFunctionBlock(HifiJsDoc data)
{

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

    var block_name = getBlockName(data);

    var desc = data.Description?.Replace("'", "\\'") ?? "";
    desc = Regex.Replace(desc, @"\t|\n|\r", "");

    var template_data = new
    {
        Jsfunction = data.Longname,
        Blockname = getBlockName(data),
        Description = desc,
        Parameters = parameters,
        Returns = returns,
        Url = $"https://apidocs.overte.org/{data.Longname.Replace(".", ".html#.")}",
        Color = catColor(data.Memberof)
    };

    return function_template.Render(template_data);
}

string getBlockName(HifiJsDoc data) => data.Longname.Replace('.', '_'); //.ToLower();

string typeToJs(TypeClass type)
{
    return type.Names.First() switch
    {
        "number" => "Number",
        "boolean" => "Boolean",
        "string" => "String",
        _ => type.Names.First(),
    };
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