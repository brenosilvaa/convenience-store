namespace ConvenienceStore.Features.Users.Security;

public class UserTokenOptions
{
    public const string SaltKey = "12345678";
    public const string ValidIssuer = "br.com.lojadeconveniencia";
    public const string ValidAudience = "lojadeconveniencia.com.br";
    public const string IssuerSigningKey = "12345678123456781234567812345678";
}