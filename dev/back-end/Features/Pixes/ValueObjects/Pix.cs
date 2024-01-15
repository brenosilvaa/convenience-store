using ConvenienceStore.Features.Pixes.Enums;

namespace ConvenienceStore.Features.Pixes.ValueObjects;

public class Pix(PixKeyType type, string key)
{
    public PixKeyType Type { get; private set; } = type;
    public string Key { get; private set; } = key;

    
    public override string ToString() 
        => $"Tipo: {Type} | Chave: {Key}";
}