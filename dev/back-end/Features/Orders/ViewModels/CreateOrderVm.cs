using ConvenienceStore.Features.OrderItems.Models;
using ConvenienceStore.Features.Users.Models;

namespace ConvenienceStore.Features.Orders.ViewModels;

public class CreateOrderVm
{
    public DateTime Date { get; set; }
    public Guid SellerId { get; set; }
    public virtual User? Seller { get; set; }
    public Guid CustomerId { get; set; }
    public virtual User? Customer { get; set; }
    public string? Observation { get; set; }
    public decimal TotalValue { get; set; }
    public bool IsCancelled { get; set; }
    public virtual IList<OrderItem> Items { get; set; }
}
