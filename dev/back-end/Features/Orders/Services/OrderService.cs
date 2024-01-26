using ConvenienceStore.Features.Orders.Models;
using ConvenienceStore.Features.Orders.Validators;
using FluentValidation;

namespace ConvenienceStore.Features.Orders.Services;

public class OrderService(OrderValidator userValidator)
{
    public async Task<Order> CreateAsync(Order user)
    {
        try
        {
            await userValidator.ValidateAndThrowAsync(user);
            return user;
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
}