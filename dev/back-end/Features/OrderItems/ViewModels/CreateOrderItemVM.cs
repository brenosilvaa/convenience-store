namespace ConvenienceStore.Features.OrderItems.ViewModels
{
    public class CreateOrderItemVM
    {
        public Guid OrderId { get; set; }
        public Guid ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal TotalValue { get; set; }
        public decimal UnitaryValue { get; set; }

        public CreateOrderItemVM()
        {
        }

        public CreateOrderItemVM(Guid orderId, Guid productId, int quantity, decimal totalValue, decimal unitaryValue)
        {
            OrderId = orderId;
            ProductId = productId;
            Quantity = quantity;
            TotalValue = totalValue;
            UnitaryValue = unitaryValue;
        }
    }
}
