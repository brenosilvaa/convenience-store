namespace ConvenienceStore.Features.OrderItems.ViewModels
{
    public class OrderItemVM
    {
        public Guid Id { get; set; }
        public long OrderId { get; set; }
        public long ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal TotalValue { get; set; }
        public decimal UnitaryValue { get; set; }

        public OrderItemVM()
        {
        }

        public OrderItemVM(Guid id, long orderId, long productId, int quantity, decimal totalValue, decimal unitaryValue)
        {
            Id = id;
            OrderId = orderId;
            ProductId = productId;
            Quantity = quantity;
            TotalValue = totalValue;
            UnitaryValue = unitaryValue;
        }
    }
}
