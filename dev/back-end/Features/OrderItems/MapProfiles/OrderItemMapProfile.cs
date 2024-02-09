using AutoMapper;
using ConvenienceStore.Features.Users.Models;
using ConvenienceStore.Features.Users.ViewModels;

namespace ConvenienceStore.Features.Users.MapProfiles;

public class OrderItemMapProfile : Profile
{
    public OrderItemMapProfile() => CreateMap<OrderItem, OrderItemVM>();
}