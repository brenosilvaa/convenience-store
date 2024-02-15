using AutoMapper;
using ConvenienceStore.Features.Users.Contracts;
using ConvenienceStore.Features.Users.Models;
using ConvenienceStore.Features.Users.Validators;
using ConvenienceStore.Features.Users.ViewModels;
using ConvenienceStore.Shared.Exceptions;
using FluentValidation;

namespace ConvenienceStore.Features.Users.Services;

public class UserService(IMapper mapper, IUserRepo repo, UserValidator userValidator) : IUserService
{
    private async Task<User> _FindAsync(Guid id)
    {
        var user = await repo.FindAsync(id);
        return user ?? throw new NotFoundException("Usuário não encontrado.");
    }

    public async Task<IList<UserVM>> ListAsync()
        => mapper.Map<IList<UserVM>>(await repo.ListAsync());

    public async Task<IList<UserVM>> ListCustomersAsync()
        => mapper.Map<IList<UserVM>>(await repo.ListCustomers());

    public async Task<IList<UserVM>> ListSellersAsync()
        => mapper.Map<IList<UserVM>>(await repo.ListSellers());

    public async Task<UserVM> FindAsync(Guid id)
    {
        var user = await _FindAsync(id);
        return mapper.Map<UserVM>(user);
    }

    public async Task<UserVM> AddAsync(CreateUserVM vm)
    {
        var user = new User(vm.Name, vm.Email, vm.Password);

        await userValidator.ValidateAndThrowAsync(user);

        repo.Add(user);
        await repo.Commit();

        return mapper.Map<UserVM>(user);
    }

    public async Task<UserVM> UpdateAsync(Guid id, UpdateUserVM vm)
    {
        var user = await _FindAsync(id);

        user.Update(vm.Name, vm.Email);
        await userValidator.ValidateAndThrowAsync(user);

        repo.Update(user);
        await repo.Commit();

        return mapper.Map<UserVM>(user);
    }

    public async Task<bool> RemoveAsync(Guid id)
    {
        var user = await _FindAsync(id);

        var success = repo.Remove(user);

        if (success) await repo.Commit();

        return success;
    }
}