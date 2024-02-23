namespace ConvenienceStore.Shared.Contracts;

public interface IBaseRepo<T> where T : class, IBaseModel
{
    Task<IList<T>> ListAsync();
    Task<T?> FindAsync(Guid id);
    T Add(T entity);
    T Update(T entity);
    bool Remove(T entity);
    Task Commit();
}