using AutoMapper;
using ConvenienceStore.Features.Products.Models;
using ConvenienceStore.Features.Products.ViewModels;

namespace ConvenienceStore.Features.Products.MapProfiles;

public class ProductMapProfile : Profile
{
    public ProductMapProfile() => CreateMap<Product, ProductVM>();
}