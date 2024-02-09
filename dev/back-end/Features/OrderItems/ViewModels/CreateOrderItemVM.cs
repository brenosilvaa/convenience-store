namespace ConvenienceStore.Features.OrderItems.ViewModels
{
    public class CreateOrderItemVM
    {
        public long OrderId { get; set; }
        public long ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal TotalValue { get; set; }
        public decimal UnitaryValue { get; set; }

        public CreateOrderItemVM()
        {
        }

        public CreateOrderItemVM(long orderId, long productId, int quantity, decimal totalValue, decimal unitaryValue)
        {
            OrderId = orderId;
            ProductId = productId;
            Quantity = quantity;
            TotalValue = totalValue;
            UnitaryValue = unitaryValue;
        }
    }
}
