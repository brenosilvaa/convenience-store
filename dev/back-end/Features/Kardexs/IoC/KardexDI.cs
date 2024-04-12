using ConvenienceStore.Features.Kardexs.Contracts;
using ConvenienceStore.Features.Kardexs.Repos;
using ConvenienceStore.Features.Kardexs.Services;
using ConvenienceStore.Features.Kardexs.Validators;

namespace ConvenienceStore.Features.Kardexs.IoC;

public static class KardexDI
{
    public static IServiceCollection AddKardexInfra(this IServiceCollection services)
    {
        services.AddScoped<IKardexService, KardexService>();
        services.AddScoped<IKardexRepo, KardexRepo>();
        services.AddScoped<KardexValidator>();

        return services;
    }
}
