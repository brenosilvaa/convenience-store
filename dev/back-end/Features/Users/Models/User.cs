using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using ConvenienceStore.Features.Orders.Models;
using ConvenienceStore.Features.Pixes.ValueObjects;
using ConvenienceStore.Features.Products.Models;
using ConvenienceStore.Features.Users.Security;
using ConvenienceStore.Shared.Contracts;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace ConvenienceStore.Features.Users.Models;

public class User : IdentityUser<Guid>, IBaseModel
{
    #region Properties
    public string? Image { get; private set; }
    public Pix? Pix { get; private set; }
    public bool IsSeller { get; private set; }
    public IList<Product> Products { get; private set; } = [];
    public IList<Order> SaleOrders { get; private set; } = [];
    public IList<Order> ShoppingOrders { get; private set; } = [];

    #endregion

    #region Constructors
    public User(string userName, string email) : base(userName)
    {
        Email = email;
    }
    #endregion

    #region Methods

    public void Update(string name, string email)
    {
        UserName = name;
        Email = email;
    }

    public void SetImage(string? image) => Image = image;

    public void TurnIntoSeller(Pix pix)
    {
        IsSeller = true;
        Pix = pix;
    }

    public (string, DateTime) GenerateToken(IList<string> roles)
    {
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(UserTokenOptions.IssuerSigningKey));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        IList<Claim> claims =
        [
            new(ClaimTypes.NameIdentifier, Id.ToString()),
            new (ClaimTypes.Email, Email)
        ];

        foreach (var role in roles)
            claims.Add(new Claim(ClaimTypes.Role, role));

        var token = new JwtSecurityToken(
            issuer: UserTokenOptions.ValidIssuer,
            audience: UserTokenOptions.ValidAudience,
            claims: claims,
            notBefore: DateTime.UtcNow,
            expires: DateTime.UtcNow.AddMinutes(60 * 8),
            signingCredentials: credentials);

        var jwtToken = new JwtSecurityTokenHandler().WriteToken(token);

        return (jwtToken, token.ValidTo);
    }

    public override string ToString() => $"Id: {Id} | Email: {Email}";

    #endregion
}