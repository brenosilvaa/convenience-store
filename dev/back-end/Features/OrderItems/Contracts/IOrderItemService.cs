using ConvenienceStore.Features.OrderItems.ViewModels;

namespace ConvenienceStore.Features.OrderItems.Contracts;

public interface IOrderItemService
{
    Task<IList<OrderItemVM>> ListAsync();
    Task<OrderItemVM> FindAsync(Guid id);
    Task<OrderItemVM> AddAsync(CreateOrderItemVM vm);
    Task<OrderItemVM> UpdateAsync(Guid id, CreateOrderItemVM vm);
    Task<bool> RemoveAsync(Guid id);
}