using ConvenienceStore.Features.Orders.Models;
using ConvenienceStore.Features.Orders.Repos;
using ConvenienceStore.Features.Orders.Validators;
using FluentValidation;

namespace ConvenienceStore.Features.Orders.Services;

public class OrderService(OrderValidator orderValidator, OrderRepo orderRepo)
{

    public async Task<IList<Order>> ListAsync()
        => await orderRepo.ListAsync();

    public async Task<Order?> FindAsync(Guid orderId)
        => await orderRepo.FindAsync(orderId);

    public async Task<Order> CreateAsync(Order order)
    {
        try
        {
            await orderValidator.ValidateAndThrowAsync(order);

            orderRepo.Add(order);

            await orderRepo.Commit();

            return order;
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
            throw;
        }
    }

    public async Task<Order> UpdateAsync(Order order)
    {
        try
        {
            var orderUpdate = await orderRepo.FindAsync(order.Id);

            if (orderUpdate is null)
                throw new Exception("Pedido inexistente.");

            orderUpdate.Update(order.SellerId,
                               order.CustomerId,
                               order.Observation);

            await orderValidator.ValidateAndThrowAsync(orderUpdate);

            orderRepo.Update(orderUpdate);

            await orderRepo.Commit();

            return orderUpdate;
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
            throw;
        }
    }

    public async Task RemoveAsync(Order order)
    {
        try
        {
            orderRepo.Remove(order);

            await orderRepo.Commit();
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
            throw;
        }
    }
}