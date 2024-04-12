using ConvenienceStore.Features.OrderItems.Models;

namespace ConvenienceStore.Features.Orders.ViewModels;

public class CreateOrderVM
{
    public Guid SellerId { get; set; }
    public Guid CustomerId { get; set; }
    public string? Observation { get; set; }
    public virtual IList<OrderItem> Items { get; set; } = [];
}
