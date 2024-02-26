using ConvenienceStore.Features.OrderItems.Contracts;
using ConvenienceStore.Features.OrderItems.Repos;
using ConvenienceStore.Features.OrderItems.Services;
using ConvenienceStore.Features.OrderItems.Validators;

namespace ConvenienceStore.Features.OrderItems.IoC;

public static class OrderItemDI
{
    public static IServiceCollection AddOrderItemInfra(this IServiceCollection services)
    {
        services.AddScoped<IOrderItemService, OrderItemService>();
        services.AddScoped<IOrderItemRepo, OrderItemRepo>();
        services.AddScoped<OrderItemValidator>();

        return services;
    }
}