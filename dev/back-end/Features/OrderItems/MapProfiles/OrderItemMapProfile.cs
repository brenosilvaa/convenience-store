using AutoMapper;
using ConvenienceStore.Features.OrderItems.Models;
using ConvenienceStore.Features.OrderItems.ViewModels;

namespace ConvenienceStore.Features.Users.MapProfiles;

public class OrderItemMapProfile : Profile
{
    public OrderItemMapProfile() => CreateMap<OrderItem, OrderItemVM>();
}