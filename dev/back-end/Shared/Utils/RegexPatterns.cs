namespace ConvenienceStore.Shared.Utils;

public static class RegexPatterns
{
    public const string Cpf = @"^\d{11}$";
    public const string Cnpj = @"^\d{14}$";
    public const string Phone = @"^\d{10,11}$";
    public const string Email = @"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$";
}