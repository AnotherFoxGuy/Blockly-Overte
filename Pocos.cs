

class Toolbox
{
    public string Name = "";
    public string Colour = "";
    public List<ToolboxCategory> Contents = [];

    public bool Interface;
    public bool ClientEntity;
    public bool Avatar;
}

class ToolboxCategory
{
    public string Name = "";
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