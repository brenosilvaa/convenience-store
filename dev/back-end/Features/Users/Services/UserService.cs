using ConvenienceStore.Features.Users.Models;
using ConvenienceStore.Features.Users.Repos;
using ConvenienceStore.Features.Users.Validators;
using FluentValidation;

namespace ConvenienceStore.Features.Users.Services;

public class UserService(UserValidator userValidator, UserRepo repo)
{
    public async Task<User> AddAsync(User user)
    {
        try
        {
            await userValidator.ValidateAndThrowAsync(user);
            
            repo.Add(user);
            await repo.Commit();
            
            return user;
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
}