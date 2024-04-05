using ConvenienceStore.Features.Orders.Contracts;
using ConvenienceStore.Features.Orders.MapProfiles;
using ConvenienceStore.Features.Orders.Repos;
using ConvenienceStore.Features.Orders.Services;
using ConvenienceStore.Features.Orders.Validators;

namespace ConvenienceStore.Features.Orders.IoC;

public static class OrderDI
{
    public static IServiceCollection AddOrderInfra(this IServiceCollection services)
    {
        services.AddScoped<IOrderService, OrderService>();
        services.AddScoped<IOrderRepo, OrderRepo>();
        services.AddScoped<OrderValidator>();

        services.AddAutoMapper(config => config.AddProfile<OrderMapProfile>());

        return services;
    }
}