using ConvenienceStore.Features.Kardexs.Models;
using ConvenienceStore.Features.Pixes.ValueObjects;
using ConvenienceStore.Features.Users.Models;
using ConvenienceStore.Features.OrderItems.Models;

namespace ConvenienceStore.Features.Products.Models;

public class Product(string name, decimal value, Guid userId)
{
    #region Properties

    public Guid Id { get; private set; }
    public string Name { get; private set; } = name;
    public string Description { get; private set; }
    public decimal Value { get; private set; } = value;
    public Guid UserId { get; private set; } = userId;
    public User User { get; private set; }
    public string Image { get; private set; }
    public IList<OrderItem> Items { get; private set; } = [];
    public IList<Kardex> Kardex { get; private set; } = [];
    #endregion

    #region Methods
    public void Update(string name, string description, decimal value)
    {
        Name = name;
        Description = description;
        Value = value;
    }

    public void SetImage(string? image) => Image = image;

    public override string ToString() => $"Id: {Id} | Valor Produto: {Value}";
    #endregion
}