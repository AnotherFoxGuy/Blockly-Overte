using System.Text.RegularExpressions;
using Newtonsoft.Json;
using Overte;

var json = File.ReadAllText("hifiJSDoc.json");
var data = JsonConvert.DeserializeObject<List<HifiJsDoc>>(json);


// var test = data.Where(d => d.Memberof == "Agent" || d.Name == "Agent");

var outp = "";

var toolboxcont = new Dictionary<string, List<string>>();

foreach (var t in data.Where(d => d.Memberof == "MyAvatar")) // 
{
    switch (t.Kind)
    {
        case Kind.Class:
            // outp += generateClassBlock(t);
            Console.WriteLine($"Class {t.Longname}");
            break;
        case Kind.Function:
            // outp += generateFunctionBlock(t);
            // var cat = t.Memberof ?? "Global";
            // toolboxcont.TryAdd(cat, []);
            // toolboxcont[cat].Add($"{{\"kind\": \"block\",\"type\": \"{getBlockName(t)}\"}}");
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
            toolboxcont[cat2].Add($"{{\"kind\": \"block\",\"type\": \"{getBlockName(t)}\"}}");
            break;
        case Kind.Typedef:
            Console.WriteLine($"Typedef {t.Longname}");
            break;
        default:
            break;
    }


    // Console.WriteLine($"Gen {t.Longname}");
}

var default_toolbox = File.ReadAllText("./default_toolbox.js");

var toolbox = "";
foreach (var item in toolboxcont)
{
    toolbox += $"{{ \"kind\": \"category\", \"name\": \"{item.Key}\", \"contents\": [{string.Join(",", item.Value)}]}},";
}

var tooboxdef = default_toolbox.Replace("//@DEF@", "," + toolbox.TrimEnd(','));//$"var toolbox = [{}]";
File.WriteAllText("./deploy/overte.js", outp + tooboxdef);


string generateClassBlock(HifiJsDoc data)
{
    var block_output = "";

    var code_fields = new List<string>();
    var code_code = "";

    foreach (var prop in data.Properties)
    {
        if (prop.Type == null)
            continue;
        block_output += $"this.setOutput(true, '{typeToJs(prop.Type)}');";
    }

    var block_name = getBlockName(data);

    var desc = data.Description?.Replace("'", "\\'") ?? "";
    desc = Regex.Replace(desc, @"\t|\n|\r", "");

    var returns = $"[`{data.Longname}({string.Join(",", code_fields)})`, javascript.javascriptGenerator.ORDER_NONE]";

    return $$$"""
    Blockly.Blocks['{{{block_name}}}'] = {
        init: function() {
            this.appendDummyInput()
                .appendField('{{{data.Longname}}}')
            {{{block_output}}}
            this.setColour(160);
            this.setTooltip('{{{desc}}}');
            this.setHelpUrl('https://apidocs.overte.org/{{{data.Longname.Replace(".", ".html#.")}}}');
        }
    };
    javascript.javascriptGenerator.forBlock['{{{block_name}}}'] = (block, generator) => {
        {{{code_code}}}
        
        return {{{returns}}};
    };
    
    """;
}

string generateSignalBlock(HifiJsDoc data)
{
    var block_name = getBlockName(data);

    var block_input = "";

    var code_fields = new List<string>();
    var code_code = "";

    if (data.Params != null)
    {
        foreach (var param in data.Params)
        {
            if (param.Type == null)
                continue;

            var parm_name = param.Name ?? "parameter";
            parm_name = parm_name.Replace("-", "");
            block_input += $$$"""
            this.setOutput(true);
            """;

            code_code += $$$"""
            const _{{{parm_name}}} = generator.valueToCode(block, '{{{parm_name}}}', javascript.javascriptGenerator.ORDER_ATOMIC);            
            """;
            code_fields.Add($"${{_{parm_name}}}");
        }

    }

    var desc = data.Description?.Replace("'", "\\'") ?? "";
    desc = Regex.Replace(desc, @"\t|\n|\r", "");

    var returns = data.Params == null ?
    $$$"""
    `{{{data.Longname}}}.connect(() => {
            ${innerCode}
    });`
    """:
    $$$"""
    [`{{{data.Longname}}}.connect(() => {
            ${innerCode}
    });`, javascript.javascriptGenerator.ORDER_NONE]
    """;

    return $$$"""
    Blockly.Blocks['{{{block_name}}}'] = {
        init: function() {
            this.appendStatementInput('VALUE_INPUT')
                .appendField('{{{data.Longname}}}');
            {{{block_input}}}
            this.setColour(160);
            this.setTooltip('{{{desc}}}');
            this.setHelpUrl('https://apidocs.overte.org/{{{data.Longname.Replace(".", ".html#.")}}}');
        }
    };
    javascript.javascriptGenerator.forBlock['{{{block_name}}}'] = (block, generator) => {

        const innerCode = generator.statementToCode(block, 'VALUE_INPUT');
        
        return {{{returns}}};
    };
    
    """;
}


string generateFunctionBlock(HifiJsDoc data)
{
    var block_input = "";
    var block_output = "";

    var code_fields = new List<string>();
    var code_code = "";

    if (data.Params != null)
    {
        foreach (var param in data.Params)
        {
            if (param.Type == null)
                continue;

            var parm_name = param.Name ?? "parameter";
            parm_name = parm_name.Replace("-", "");
            block_input += $$$"""
            this.appendValueInput('{{{parm_name}}}')
                .setCheck('{{{typeToJs(param.Type)}}}')
                .appendField('{{{parm_name}}}');

            """;

            code_code += $$$"""
            const _{{{parm_name}}} = generator.valueToCode(block, '{{{parm_name}}}', javascript.javascriptGenerator.ORDER_ATOMIC);            
            """;
            code_fields.Add($"${{_{parm_name}}}");
        }

    }

    if (data.Returns != null)
    {
        foreach (var o in data.Returns)
        {
            if (o.Type == null)
                continue;
            block_output += $"this.setOutput(true, '{typeToJs(o.Type)}');";
        }
    }
    else
    {
        block_output = "this.setNextStatement(true);\nthis.setPreviousStatement(true)";
    }

    var block_name = getBlockName(data);

    var desc = data.Description?.Replace("'", "\\'") ?? "";
    desc = Regex.Replace(desc, @"\t|\n|\r", "");


    var returns = data.Returns == null ?
    $"`{data.Longname}({string.Join(",", code_fields)})`" :
    $"[`{data.Longname}({string.Join(",", code_fields)})`, javascript.javascriptGenerator.ORDER_NONE]";

    return $$$"""
    Blockly.Blocks['{{{block_name}}}'] = {
        init: function() {
            this.appendDummyInput()
                .appendField('{{{data.Longname}}}')
            {{{block_input}}}
            {{{block_output}}}
            this.setColour(160);
            this.setTooltip('{{{desc}}}');
            this.setHelpUrl('https://apidocs.overte.org/{{{data.Longname.Replace(".", ".html#.")}}}');
        }
    };
    javascript.javascriptGenerator.forBlock['{{{block_name}}}'] = (block, generator) => {
        {{{code_code}}}
        
        return {{{returns}}};
    };
    

    """;
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