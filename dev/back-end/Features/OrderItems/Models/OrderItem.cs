using ConvenienceStore.Features.Products.Models;
using ConvenienceStore.Features.Orders.Models;
using ConvenienceStore.Features.Users.Models;
using ConvenienceStore.Shared.Contracts;

namespace ConvenienceStore.Features.OrderItems.Models;

public class OrderItem : IBaseModel
{
    #region Properties

    public Guid Id { get; private set; }
    public long OrderId { get; private set; }
    public Order? Order { get; private set; }
    public long ProductId { get; private set; }
    public Product? Product { get; private set; }
    public int Quantity { get; private set; }
    public decimal TotalValue { get; private set; }
    public decimal UnitaryValue { get; private set; }

    #endregion

    #region Constructors

    public OrderItem(long orderId, long productId, int quantity, decimal unitaryValue)
    {
        Update(orderId, productId, quantity, unitaryValue);
    }

    #endregion

    #region Methods

    public void Update(long orderId, long productId, int quantity, decimal unitaryValue)
    {
        OrderId = orderId;
        ProductId = productId;
        Quantity = quantity;
        UnitaryValue = unitaryValue;

        CalculateTotal();
    }

    private void CalculateTotal() => TotalValue = Quantity * UnitaryValue;

    public override string ToString()
        =>
            $"Id: {Id} | Total Pedido: {TotalValue} | Quantidade: {Quantity} | Produto: {ProductId} | Valor Unitário: {UnitaryValue}";

    #endregion
}