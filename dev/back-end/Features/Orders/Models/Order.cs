using ConvenienceStore.Features.OrderItems.Models;
using ConvenienceStore.Features.Users.Models;

namespace ConvenienceStore.Features.Orders.Models;

public class Order
{
    #region Properties

    public Guid Id { get; private set; }
    public DateTime Date { get; private set; }
    public long SellerId { get; private set; }
    public User? Seller { get; private set; }
    public long CustomerId { get; private set; }
    public User? Customer { get; private set; }

    public string? Observation { get; private set; }

    public IList<OrderItem> Items { get; private set; }
    public decimal TotalValue { get; private set; }
    public bool IsCanceled { get; private set; }

    #endregion

    #region Constructors

    public Order(long sellerId, long customerId, string? observation)
    {
        Date = DateTime.Now;
        Update(sellerId, customerId, observation);
    }

    #endregion

    #region Methods

    public void Update(long sellerId, long customerId, string? observation)
    {
        SellerId = sellerId;
        CustomerId = customerId;
        Observation = observation;
    }

    //public void CalculateTotal() => TotalValue = Itens.sum(x => x.ValorTotal)
    public void Cancel()
        => IsCanceled = true;

    public override string ToString()
        => $"Id: {Id} | Total Pedido: {TotalValue} | Vendedor: {Seller?.Name}";

    #endregion
}