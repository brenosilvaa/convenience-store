using ConvenienceStore.Features.Users.Models;
using Microsoft.EntityFrameworkCore;
using ConvenienceStore.Features.OrderItems.Models;
using ConvenienceStore.Features.Orders.Models;
using ConvenienceStore.Features.Kardexs.Models;

namespace ConvenienceStore.Infra.Context;

public class DataContext(DbContextOptions options) : DbContext(options)
{
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(DataContext).Assembly);
        base.OnModelCreating(modelBuilder);
    }

    #region DbSets

    public DbSet<User> Users { get; private set; }
    public DbSet<OrderItem> OrderItems { get; private set; }
    public DbSet<Order> Orders { get; private set; }
    public DbSet<Kardex> Kardexs { get; private set; }

    #endregion
}