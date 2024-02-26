using ConvenienceStore.Features.OrderItems.Contracts;
using ConvenienceStore.Features.OrderItems.Models;
using ConvenienceStore.Features.Users.Contracts;
using ConvenienceStore.Infra.Context;
using ConvenienceStore.Shared.Bases;

namespace ConvenienceStore.Features.OrderItems.Repos;

public class OrderItemRepo(DataContext context) : BaseRepo<OrderItem>(context), IOrderItemRepo
{

}