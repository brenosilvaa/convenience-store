using ConvenienceStore.Features.Orders.ViewModels;

namespace ConvenienceStore.Features.Orders.Contracts;

public interface IOrderService
{
    Task<IList<OrderVm>> ListAsync();
    Task<OrderVm?> FindAsync(Guid orderId);
    Task<OrderVm> CreateAsync(CreateOrderVm vm);
    Task<OrderVm> UpdateAsync(Guid id, CreateOrderVm vm);
    Task<bool> RemoveAsync(Guid id);
}
