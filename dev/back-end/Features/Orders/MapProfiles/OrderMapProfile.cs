using AutoMapper;
using ConvenienceStore.Features.Orders.Models;
using ConvenienceStore.Features.Orders.ViewModels;

namespace ConvenienceStore.Features.Orders.MapProfiles;

public class OrderMapProfile : Profile
{
    public OrderMapProfile() => CreateMap<Order, OrderVM>();
}