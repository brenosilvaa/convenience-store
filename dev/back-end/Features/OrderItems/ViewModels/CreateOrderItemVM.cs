namespace ConvenienceStore.Features.OrderItems.ViewModels
{
    public class CreateOrderItemVm
    {
        public long OrderId { get; set; }
        public long ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal TotalValue { get; set; }
        public decimal UnitaryValue { get; set; }

        public CreateOrderItemVm()
        {
        }

        public CreateOrderItemVm(long orderId, long productId, int quantity, decimal totalValue, decimal unitaryValue)
        {
            OrderId = orderId;
            ProductId = productId;
            Quantity = quantity;
            TotalValue = totalValue;
            UnitaryValue = unitaryValue;
        }
    }
}
