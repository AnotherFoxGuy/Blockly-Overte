

using Newtonsoft.Json;

class Toolbox
{
    [JsonProperty("kind")]
    public string Kind = "category";

    [JsonProperty("name")]
    public string Name = "";

    [JsonProperty("colour")]
    public string Colour = "";

    [JsonProperty("contents")]
    public List<ToolboxBlock> Contents = [];
}


class ToolboxBlock
{
    [JsonProperty("kind")]
    public string Kind = "block";

    [JsonProperty("type")]
    public string Name = "";
    // public string? Type;
}