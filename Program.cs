using System.Text.RegularExpressions;
using Newtonsoft.Json;
using Overte;

Console.WriteLine("Hello, World!");


var json = File.ReadAllText("hifiJSDoc.json");
var data = JsonConvert.DeserializeObject<List<HifiJsDoc>>(json);


var test = data.Where(d => d.Memberof == "Avatar" || d.Name == "Avatar");

var outp = "";
var toolbox = "";

foreach (var t in test)
{

    switch (t.Kind)
    {
        case Kind.Class:
            outp += generateClassBlock(t);
            break;
        case Kind.Function:
            outp += generateFunctionBlock(t);
            toolbox += $"{{\"kind\": \"block\",\"type\": \"{getBlockName(t)}\"}},";
            break;
        case Kind.Namespace:
            break;
        case Kind.Package:
            break;
        case Kind.Signal:
            break;
        case Kind.Typedef:
            break;
        default:
            break;
    }

    
    Console.WriteLine($"Gen {t.Longname}");
}


var tooboxdef = $$$"""
 var toolbox = {
    "kind": "categoryToolbox",
    "contents": [
    {
        "kind": "category",
        "name": "Avatar",
        "contents": [
            {{{toolbox}}}
        ]
    }
    ]
}
""";
File.WriteAllText("./deploy/overte.js", outp + tooboxdef);


string generateClassBlock(HifiJsDoc data)
{
    return "TODO";
}


string generateFunctionBlock(HifiJsDoc data)
{
    var block_input = "";
    var block_output = "";

    var code_fields = "";

    if (data.Params != null)
    {
        foreach (var param in data.Params)
        {
            var type = param.Type.Names.First();
            block_input += $$$"""
            this.appendValueInput('{{{param.Name}}}')
                .setCheck('{{{type}}}')
                .appendField('{{{param.Name}}}');

            """;
        }

    }

    if (data.Returns != null)
    {
        foreach (var o in data.Returns)
        {
            block_output += $"this.setOutput(true, '{o.Type.Names.First()}');";
        }

    }

    var block_name = getBlockName(data);

    var desc = data.Description?.Replace("'", "\\'") ?? "";
    desc = Regex.Replace(desc, @"\t|\n|\r", "");

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
        // Return code.
        return '{{{data.Longname}}}()';
    };
    

    """;
}


string getBlockName(HifiJsDoc data) => data.Longname.ToLower().Replace('.', '_');