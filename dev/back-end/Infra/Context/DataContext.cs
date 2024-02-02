using ConvenienceStore.Features.Users.Models;
using Microsoft.EntityFrameworkCore;
using ConvenienceStore.Features.OrderItems.Models;

namespace ConvenienceStore.Infra.Context;

public class DataContext : DbContext
{
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(DataContext).Assembly);
        base.OnModelCreating(modelBuilder);
    }

    #region DbSets

    public DbSet<User> Users { get; private set; }
    public DbSet<OrderItem> OrderItems { get; private set; }

    #endregion
}