using ConvenienceStore.Features.OrderItems.Models;
using ConvenienceStore.Features.OrderItems.ViewModels;
using ConvenienceStore.Features.Users.Models;
using ConvenienceStore.Features.Users.ViewModels;

namespace ConvenienceStore.Features.Orders.ViewModels;

public class OrderVM
{
    public Guid Id { get; set; }
    public DateTime Date { get; set; }
    public Guid SellerId { get; set; }
    public virtual UserVM? Seller { get; set; }
    public Guid CustomerId { get; set; }
    public virtual UserVM? Customer { get; set; }
    public string? Observation { get; set; }
    public decimal TotalValue { get; set; }
    public bool IsCancelled { get; set; }
    public virtual IList<OrderItemVM> Items { get; set; }
}
