using ConvenienceStore.Features.OrderItems.Models;
using ConvenienceStore.Infra.Context;
using ConvenienceStore.Shared.Bases;

namespace ConvenienceStore.Features.OrderItems.Repos;

public class OrderItemRepo(DataContext context) : BaseRepo<OrderItem>(context)
{

}