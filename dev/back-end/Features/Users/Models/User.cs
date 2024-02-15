using ConvenienceStore.Features.Orders.Models;
using ConvenienceStore.Features.Pixes.ValueObjects;
using ConvenienceStore.Features.Products.Models;
using ConvenienceStore.Shared.Contracts;

namespace ConvenienceStore.Features.Users.Models;

public class User(string name, string email, string password) : IBaseModel
{
    #region Properties

    public Guid Id { get; private set; }
    public string Name { get; private set; } = name;
    public string Email { get; private set; } = email;
    public string Password { get; private set; } = password;
    public string? Image { get; private set; }
    public int? RecoveryCode { get; private set; }
    public Pix? Pix { get; private set; }
    public bool IsSeller { get; private set; }
    public IList<Product> Products { get; private set; } = [];
    public IList<Order> SaleOrders { get; private set; } = [];
    public IList<Order> ShoppingOrders { get; private set; } = [];

    #endregion

    #region Methods

    public void Update(string name, string email)
    {
        Name = name;
        Email = email;
    }
    
    public void SetImage(string? image) => Image = image;

    public void GenerateRecoveryCode() => RecoveryCode = new Random().Next(100_000, 999_999);

    public bool RecoveryPassword(int recoveryCode, string newPassword)
    {
        if (RecoveryCode != recoveryCode) return false;
        
        Password = newPassword;
        RecoveryCode = null;
        return true;
    }

    public bool ChangePassword(string currentPassword, string newPassword)
    {
        if (Password != currentPassword) return false;

        Password = newPassword;
        return true;
    }

    public void TurnIntoSeller(Pix pix)
    {
        IsSeller = true;
        Pix = pix;
    }
    
    public override string ToString() => $"Id: {Id} | Email: {Email}";

    #endregion
}