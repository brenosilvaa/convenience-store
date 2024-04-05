using AutoMapper;
using ConvenienceStore.Features.OrderItems.Models;
using ConvenienceStore.Features.OrderItems.ViewModels;
using ConvenienceStore.Features.Orders.Models;
using ConvenienceStore.Features.Orders.ViewModels;

namespace ConvenienceStore.Features.Orders.MapProfiles;

public class OrderMapProfile : Profile
{
    public OrderMapProfile() => CreateMap<Order, OrderVM>();
}