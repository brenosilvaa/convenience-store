using ConvenienceStore.Features.Products.Models;
using ConvenienceStore.Features.Orders.Models;
using ConvenienceStore.Features.Users.Models;
using ConvenienceStore.Shared.Contracts;

namespace ConvenienceStore.Features.OrderItems.Models;

public class OrderItem : IBaseModel
{
    #region Properties

    public Guid Id { get; private set; }
    public Guid OrderId { get; private set; }
    public virtual Order? Order { get; private set; }
    public Guid ProductId { get; private set; }
    public virtual Product? Product { get; private set; }
    public int Quantity { get; private set; }
    public decimal TotalValue { get; private set; }
    public decimal UnitaryValue { get; private set; }

    #endregion

    #region Constructors

    public OrderItem(Guid orderId, Guid productId, int quantity, decimal unitaryValue)
    {
        Update(orderId, productId, quantity, unitaryValue);
    }

    #endregion

    #region Methods

    public void Update(Guid orderId, Guid productId, int quantity, decimal unitaryValue)
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