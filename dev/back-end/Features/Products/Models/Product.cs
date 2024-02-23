using ConvenienceStore.Features.Kardexs.Models;
using ConvenienceStore.Features.OrderItems.Models;
using ConvenienceStore.Features.Users.Models;
using ConvenienceStore.Shared.Contracts;

namespace ConvenienceStore.Features.Products.Models;

public class Product(string name, string? description, decimal value, Guid userId) : IBaseModel
{
    #region Properties

    public Guid Id { get; private set; }
    public string Name { get; private set; } = name;
    public string? Description { get; private set; } = description;
    public decimal Value { get; private set; } = value;
    public Guid UserId { get; private set; } = userId;
    public virtual User? User { get; private set; }
    public string? Image { get; private set; }
    public IList<OrderItem> Items { get; private set; } = [];
    public IList<Kardex> Kardexes { get; private set; } = [];
    #endregion

    #region Methods
    public void Update(string name, string? description, decimal value, Guid userId)
    {
        Name = name;
        Description = description;
        Value = value;
        UserId = userId;
    }

    public void SetImage(string? image) => Image = image;

    public override string ToString() => $"Id: {Id} | Name: {Name} | Valor Produto: {Value}";
    #endregion
}