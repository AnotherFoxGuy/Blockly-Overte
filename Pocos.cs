

class Toolbox
{
    public string Name = "";
    public string Colour = "";
    public List<ToolboxBlock> Contents = [];
}


class ToolboxBlock
{
    public string Name = "";
    // public string? Type;
    public List<BlockParameter>? Inputs;
}

class BlockParameter
{
    public string Name = "";
    public string Description = "";
    public string Type = "";
    public string Shadowtype = "";
    public object? Defaultvalue;
}