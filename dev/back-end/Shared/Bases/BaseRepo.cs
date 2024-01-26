using ConvenienceStore.Infra.Context;
using Microsoft.EntityFrameworkCore;

namespace ConvenienceStore.Shared.Bases;

public class BaseRepo<T>(DataContext context) where T : class
{
    protected readonly DbSet<T> DbSet = context.Set<T>();

    public virtual async Task<IList<T>> ListAsync()
        => await DbSet.ToListAsync();

    public virtual async Task<T?> FindAsync(Guid id)
        => await DbSet.FindAsync(id);

    public virtual T Add(T entity)
    {
        DbSet.Add(entity);
        return entity;
    }

    public virtual T Update(T entity)
    {
        DbSet.Update(entity);
        return entity;
    }

    public virtual bool Remove(T entity)
    {
        DbSet.Remove(entity);
        return true;
    }

    public async Task Commit() => await context.SaveChangesAsync();
}