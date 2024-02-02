using ConvenienceStore.Features.OrderItems.Models;
using ConvenienceStore.Features.OrderItems.Validators;
using ConvenienceStore.Features.Users.Models;
using ConvenienceStore.Features.Users.Validators;
using FluentValidation;

namespace ConvenienceStore.Features.OrderItems.Services;

public class OrderItemService(OrderItemValidator orderItemValidator)
{
    public async Task<OrderItem> AddAsync(OrderItem orderItem)
    {
        try
        {
            await orderItemValidator.ValidateAndThrowAsync(orderItem);

            repo.Add(orderItem);
            await repo.Commit();

            return orderItem;
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
}