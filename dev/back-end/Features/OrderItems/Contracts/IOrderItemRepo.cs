using ConvenienceStore.Features.OrderItems.Models;
using ConvenienceStore.Shared.Contracts;

namespace ConvenienceStore.Features.OrderItems.Contracts;

public interface IOrderItemRepo : IBaseRepo<OrderItem>
{
}