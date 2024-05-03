using AutoMapper;
using ConvenienceStore.Features.Users.Models;
using ConvenienceStore.Features.Users.ViewModels;

namespace ConvenienceStore.Features.Users.MapProfiles;

public class UserMapProfile : Profile
{
    public UserMapProfile()
    {
        CreateMap<User, UserVM>();
        CreateMap<User, LoggedUserVM>();
    }
}