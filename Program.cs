using Newtonsoft.Json;
using Overte;

Console.WriteLine("Hello, World!");


var json =  File.ReadAllText("hifiJSDoc.json");
var data = JsonConvert.DeserializeObject<List<HifiJsDoc>>(json);

var a = data[0].Description;
Console.WriteLine($"Test {a}");