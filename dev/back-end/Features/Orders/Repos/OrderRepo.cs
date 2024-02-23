using ConvenienceStore.Features.Orders.Models;
using ConvenienceStore.Infra.Context;
using ConvenienceStore.Shared.Bases;
using Microsoft.EntityFrameworkCore;

namespace ConvenienceStore.Features.Orders.Repos;

public class OrderRepo(DataContext context) : BaseRepo<Order>(context)
{
    public override async Task<IList<Order>> ListAsync()
        => await DbSet.OrderBy(order => order.Date).ToListAsync();

    public async Task<IList<Order>> ListNotCanceledAsync() 
        => await DbSet.Where(x => !x.IsCancelled).OrderBy(order => order.Date).ToListAsync();
    public async Task<IList<Order>> ListCanceledAsync() 
        => await DbSet.Where(x => x.IsCancelled).OrderBy(order => order.Date).ToListAsync();
}