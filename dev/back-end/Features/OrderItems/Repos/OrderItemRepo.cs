using ConvenienceStore.Infra.Context;
using ConvenienceStore.Features.OrderItems.Models;
using ConvenienceStore.Shared.Bases;
using Microsoft.EntityFrameworkCore;

namespace ConvenienceStore.Features.OrderItems.Repos;

public class OrderItemRepo(DataContext context) : BaseRepo<OrderItem>(context)
{

}