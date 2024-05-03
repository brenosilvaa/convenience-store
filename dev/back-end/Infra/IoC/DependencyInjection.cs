using ConvenienceStore.Features.OrderItems.IoC;
using ConvenienceStore.Features.Products.IoC;
using ConvenienceStore.Features.Orders.IoC;
using ConvenienceStore.Features.Users.IoC;
using ConvenienceStore.Infra.Context;
using ConvenienceStore.Shared.Middlewares;
using Microsoft.EntityFrameworkCore;
using ConvenienceStore.Features.Kardexs.IoC;
using ConvenienceStore.Features.Users.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authentication;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using ConvenienceStore.Features.Users.Security;
using Microsoft.Extensions.Logging;
using System.Text.Json;

namespace ConvenienceStore.Infra.IoC;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration config)
    {
        #region DbContext

        var dbHost = config["DB_HOST"];
        var dbPort = config["DB_PORT"];
        var dbDatabase = config["DB_DATABASE"];
        var dbUser = config["DB_USER"];
        var dbPassword = config["DB_PWD"];

        var connectionString = $"server={dbHost};port={dbPort};userid={dbUser};pwd={dbPassword};database={dbDatabase};default command timeout=0;";

        services.AddDbContext<DataContext>(options => { options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)); });

        #endregion

        #region IdentityServer

        services.AddIdentity<User, IdentityRole<Guid>>(options =>
            {
                options.User.RequireUniqueEmail = true;
            })
            .AddEntityFrameworkStores<DataContext>()
            .AddDefaultTokenProviders();

        #endregion

        services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
        }).AddJwtBearer(options =>
        {
            options.SaveToken = true;

            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateIssuerSigningKey = true,
                ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero,

                ValidIssuer = UserTokenOptions.ValidIssuer,
                ValidAudience = UserTokenOptions.ValidAudience,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(UserTokenOptions.IssuerSigningKey)),
            };

            //options.Events = new JwtBearerEvents
            //{
            //    OnChallenge = context =>
            //    {
            //        // TODO: validar se o token é invalido e refreshar
            //        context.HandleResponse();

            //        context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            //        context.Response.ContentType = "application/json";

            //        // Ensure we always have an error and error description.
            //        if (string.IsNullOrEmpty(context.Error))
            //            context.Error = "invalid_token";
            //        if (string.IsNullOrEmpty(context.ErrorDescription))
            //            context.ErrorDescription = "This request requires a valid JWT access token to be provided";

            //        // Add some extra context for expired tokens.
            //        if (context.AuthenticateFailure != null && context.AuthenticateFailure.GetType() == typeof(SecurityTokenExpiredException))
            //        {
            //            var authenticationException = context.AuthenticateFailure as SecurityTokenExpiredException;
            //            context.ErrorDescription = $"The token expired on {authenticationException.Expires.ToString("o")}";
            //        }

            //        return context.Response.WriteAsync(JsonSerializer.Serialize(new
            //        {
            //            error = context.Error,
            //            error_description = context.ErrorDescription
            //        }));
            //    }
            //};
        });

        services.AddExceptionHandler<GlobalExceptionHandler>();
        services.AddProblemDetails();

        services.AddAutoMapper(typeof(Program).Assembly);

        services.AddUserInfra()
                .AddProductInfra()
                .AddOrderInfra()
                .AddOrderItemInfra()
                .AddKardexInfra();

        return services;
    }

    public static IApplicationBuilder UseInfrastructure(this IApplicationBuilder app)
    {
        app.UseExceptionHandler();

        return app;
    }
}