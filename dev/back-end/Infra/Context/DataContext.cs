using ConvenienceStore.Features.Users.Models;
using Microsoft.EntityFrameworkCore;

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

    #endregion
}