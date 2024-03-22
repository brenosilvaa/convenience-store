using AutoMapper;

using ConvenienceStore.Features.Orders.Contracts;
using ConvenienceStore.Features.Orders.Models;
using ConvenienceStore.Features.Orders.Repos;
using ConvenienceStore.Features.Orders.Validators;
using ConvenienceStore.Features.Orders.ViewModels;

using FluentValidation;

namespace ConvenienceStore.Features.Orders.Services;

public class OrderService(OrderValidator orderValidator, IOrderRepo orderRepo, IMapper mapper) : IOrderService
{

    public async Task<IList<OrderVm>> ListAsync()
        => mapper.Map<IList<OrderVm>>(await orderRepo.ListAsync());

    public async Task<OrderVm?> FindAsync(Guid orderId)
        => mapper.Map<OrderVm?>(await orderRepo.FindAsync(orderId));

    public async Task<OrderVm> CreateAsync(CreateOrderVm vm)
    {
        var order = new Order(vm.SellerId, vm.CustomerId, vm.Observation);

        await orderValidator.ValidateAndThrowAsync(order);

        orderRepo.Add(order);

        await orderRepo.Commit();

        return mapper.Map<OrderVm>(order);
    }

    public async Task<OrderVm> UpdateAsync(Guid orderId, CreateOrderVm vm)
    {
        var orderUpdate = await orderRepo.FindAsync(orderId) ?? throw new Exception("Pedido inexistente.");

        orderUpdate.Update(vm.SellerId,
                           vm.CustomerId,
                           vm.Observation);

        await orderValidator.ValidateAndThrowAsync(orderUpdate);

        orderRepo.Update(orderUpdate);

        await orderRepo.Commit();

        return mapper.Map<OrderVm>(orderUpdate);
    }

    public async Task<bool> RemoveAsync(Guid orderId)
    {
        var order = await orderRepo.FindAsync(orderId) ?? throw new Exception("Pedido inexistente.");

        orderRepo.Remove(order);

        await orderRepo.Commit();

        return true;
    }
}