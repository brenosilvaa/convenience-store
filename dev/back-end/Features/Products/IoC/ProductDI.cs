using ConvenienceStore.Features.Products.Contracts;
using ConvenienceStore.Features.Products.Repos;
using ConvenienceStore.Features.Products.Services;
using ConvenienceStore.Features.Products.Validators;

namespace ConvenienceStore.Features.Products.IoC;

public static class ProductDI
{
    public static IServiceCollection AddProductInfra(this IServiceCollection services)
    {
        services.AddScoped<IProductService, ProductService>();
        services.AddScoped<IProductRepo, ProductRepo>();
        services.AddScoped<ProductValidator>();

        return services;
    }
}