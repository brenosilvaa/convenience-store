using ConvenienceStore.Features.OrderItems.Models;
using ConvenienceStore.Features.Users.Models;
using ConvenienceStore.Shared.Contracts;

namespace ConvenienceStore.Features.Orders.Models;

public class Order : IBaseModel
{
    #region Properties

    public Guid Id { get; private set; }
    public DateTime Date { get; private set; }
    public Guid SellerId { get; private set; }
    public virtual User? Seller { get; private set; }
    public Guid CustomerId { get; private set; }
    public virtual User? Customer { get; private set; }
    public string? Observation { get; private set; }
    public decimal TotalValue { get; private set; }
    public bool IsCancelled { get; private set; }
    public virtual IList<OrderItem> Items { get; private set; }

    #endregion

    #region Constructors

    public Order(Guid sellerId, Guid customerId, string? observation)
    {
        Date = DateTime.Now;
        Items = [];
        Update(sellerId, customerId, observation);
    }

    #endregion

    #region Methods

    public void Update(Guid sellerId, Guid customerId, string? observation)
    {
        SellerId = sellerId;
        CustomerId = customerId;
        Observation = observation;
    }

    //public void CalculateTotal() => TotalValue = Itens.sum(x => x.ValorTotal)
    public void Cancel()
        => IsCancelled = true;

    public override string ToString()
        => $"Id: {Id} | Total Pedido: {TotalValue} | Vendedor: {Seller?.Name}";

    #endregion
}