using ConvenienceStore.Features.OrderItems.Models;
using ConvenienceStore.Features.OrderItems.Repos;
using ConvenienceStore.Features.OrderItems.Validators;
using ConvenienceStore.Features.OrderItems.Models;
using ConvenienceStore.Features.OrderItems.Validators;
using ConvenienceStore.Features.OrderItems.ViewModels;
using ConvenienceStore.Shared.Exceptions;
using FluentValidation;

namespace ConvenienceStore.Features.OrderItems.Services;

public class OrderItemService(IMapper mapper, OrderItemValidator orderItemValidator, OrderItemRepo repo)
{
    private async Task<OrderItem> _FindAsync(Guid id)
    {
        var orderItem = await repo.FindAsync(id);
        return orderItem ?? throw new NotFoundException("Order item não encontrado.");
    }

    public async Task<IList<OrderItemVM>> ListAsync()
    => mapper.Map<IList<OrderItemVM>>(await repo.ListAsync());

    public async Task<OrderItemVM> FindAsync(Guid id)
    {
        var orderItem = await _FindAsync(id);
        return mapper.Map<OrderItemVM>(orderItem);
    }

    public async Task<OrderItemVM> AddAsync(CreateOrderItemVM vm)
    {
        var orderItem = new OrderItem(vm.OrderId, vm.ProductId, vm.Quantity, vm.UnitaryValue);

        await orderItemValidator.ValidateAndThrowAsync(orderItem);

        repo.Add(orderItem);
        await repo.Commit();

        return mapper.Map<OrderItemVM>(orderItem);
    }

    public async Task<OrderItemVM> UpdateAsync(Guid id, CreeateOrderItemVM vm)
    {
        var orderItem = await _FindAsync(id);

        orderItem.Update(vm.OrderId, vm.ProductId, vm.Quantity, vm.UnitaryValue);
        await orderItemValidator.ValidateAndThrowAsync(orderItem);

        repo.Update(orderItem);
        await repo.Commit();

        return mapper.Map<OrderItemVM>(orderItem);
    }

    public async Task<bool> RemoveAsync(Guid id)
    {
        var orderItem = await _FindAsync(id);

        var success = repo.Remove(orderItem);

        if (success) await repo.Commit();

        return success;
    }
}