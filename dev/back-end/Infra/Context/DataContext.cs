using ConvenienceStore.Features.Users.Models;
using Microsoft.EntityFrameworkCore;
using ConvenienceStore.Features.OrderItems.Models;
using ConvenienceStore.Features.Orders.Models;
using ConvenienceStore.Features.Kardexs.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace ConvenienceStore.Infra.Context;

public class DataContext(DbContextOptions options) : IdentityDbContext<User, IdentityRole<Guid>, Guid>(options)
{
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(DataContext).Assembly);
        base.OnModelCreating(modelBuilder);
    }

    #region DbSets

    public DbSet<OrderItem> OrderItems { get; private set; }
    public DbSet<Order> Orders { get; private set; }
    public DbSet<Kardex> Kardexs { get; private set; }

    #endregion
}