using ConvenienceStore.Features.Orders.ViewModels;

namespace ConvenienceStore.Features.Orders.Contracts;

public interface IOrderService
{
    Task<IList<OrderVM>> ListAsync();
    Task<OrderVM?> FindAsync(Guid orderId);
    Task<OrderVM> CreateAsync(CreateOrderVM vm);
    Task<OrderVM> UpdateAsync(Guid id, CreateOrderVM vm);
    Task<bool> RemoveAsync(Guid id);
}
