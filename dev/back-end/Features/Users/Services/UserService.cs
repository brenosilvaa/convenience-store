using ConvenienceStore.Features.Users.Models;
using ConvenienceStore.Features.Users.Validators;
using FluentValidation;

namespace ConvenienceStore.Features.Users.Services;

public class UserService(UserValidator userValidator)
{
    public async Task<User> CreateAsync(User user)
    {
        try
        {
            await userValidator.ValidateAndThrowAsync(user);
            return user;
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
}