using AutoMapper;
using ConvenienceStore.Features.Kardexs.Models;
using ConvenienceStore.Features.Kardexs.ViewModels;

namespace ConvenienceStore.Features.Kardexs.MapProfiles;

public class KardexMapProfile : Profile
{
    public KardexMapProfile() => CreateMap<Kardex, KardexVM>();
}
