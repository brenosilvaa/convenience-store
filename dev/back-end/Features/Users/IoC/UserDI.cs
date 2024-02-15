using ConvenienceStore.Features.Users.Contracts;
using ConvenienceStore.Features.Users.Repos;
using ConvenienceStore.Features.Users.Services;
using ConvenienceStore.Features.Users.Validators;

namespace ConvenienceStore.Features.Users.IoC;

public static class UserDI
{
    public static IServiceCollection AddUserInfra(this IServiceCollection services)
    {
        services.AddScoped<IUserService, UserService>();
        services.AddScoped<IUserRepo, UserRepo>();
        services.AddScoped<UserValidator>();

        return services;
    }
}