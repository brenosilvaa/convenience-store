using ConvenienceStore.Features.Users.IoC;
using ConvenienceStore.Infra.Context;
using ConvenienceStore.Shared.Middlewares;

namespace ConvenienceStore.Infra.IoC;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services)
    {
        services.AddExceptionHandler<GlobalExceptionHandler>();
        services.AddProblemDetails();

        services.AddDbContext<DataContext>();

        services.AddAutoMapper(typeof(Program).Assembly);

        services.AddUserInfra();

        return services;
    }

    public static IApplicationBuilder UseInfrastructure(this IApplicationBuilder app)
    {
        app.UseExceptionHandler();
        
        return app;
    }
}