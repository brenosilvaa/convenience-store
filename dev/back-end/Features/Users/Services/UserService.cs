using AutoMapper;
using ConvenienceStore.Features.Pixes.ValueObjects;
using ConvenienceStore.Features.Users.Contracts;
using ConvenienceStore.Features.Users.Models;
using ConvenienceStore.Features.Users.Security;
using ConvenienceStore.Features.Users.Validators;
using ConvenienceStore.Features.Users.ViewModels;
using ConvenienceStore.Shared.Exceptions;
using FluentValidation;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.Data;

namespace ConvenienceStore.Features.Users.Services;

public class UserService(IMapper mapper, IUserRepo repo, UserValidator userValidator, UserManager<User> userManager, SignInManager<User> signInManager) : IUserService
{
    /// <summary>
    /// Método responsável por encontrar usuário pelo ID no banco de dados e retornar seu valor ou uma exceção "NotFoundException"
    /// </summary>
    /// <param name="id">ID do Usuário</param>
    /// <returns>Usuário</returns>
    /// <exception cref="NotFoundException">Não Encontrado</exception>
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
        var user = new User(vm.Name, vm.Email);

        await userValidator.ValidateAndThrowAsync(user);

        var result = await userManager.CreateAsync(user, vm.Password);

        if (!result.Succeeded)
            throw new Exception(string.Join("; ", result.Errors.Select(x => x.Description)));

        await userManager.AddToRoleAsync(user, UserRoles.Customer);

        return mapper.Map<UserVM>(user);
    }

    public async Task<UserVM> UpdateAsync(Guid id, UpdateUserVM vm)
    {
        var user = await _FindAsync(id);

        user.Update(vm.Name, vm.Email);
        await userValidator.ValidateAndThrowAsync(user);

        var result = await userManager.UpdateAsync(user);

        if (!result.Succeeded)
            throw new Exception(string.Join("; ", result.Errors.Select(x => x.Description)));

        return mapper.Map<UserVM>(user);
    }

    public async Task<bool> RemoveAsync(Guid id)
    {
        var user = await _FindAsync(id);

        var success = repo.Remove(user);

        if (success) await repo.Commit();

        return success;
    }

    public async Task<LoggedUserVM> LoginAsync(LoginRequest request)
    {
        var user = await userManager.FindByEmailAsync(request.Email);

        if (user == null)
            throw new Exception("Usuário ou senha inválidos");

        var result = await signInManager.PasswordSignInAsync(user, request.Password, false, false);

        if (!result.Succeeded)
            throw new Exception("Usuário ou senha inválidos");

        var roles = await userManager.GetRolesAsync(user) ?? [];

        var (token, validTo) = user.GenerateToken(roles);

        var loggedUser = mapper.Map<LoggedUserVM>(user);

        loggedUser.Token = token;
        loggedUser.TokenValidity = validTo;

        return loggedUser;
    }

    public async Task<bool> TurnToSellerAsync(Guid id, Pix pix) 
    {
        var user = await _FindAsync(id);

        if (user.IsSeller)
            return true;

        user.TurnIntoSeller(pix);

        await userValidator.ValidateAndThrowAsync(user);

        var result = await userManager.UpdateAsync(user);

        if (!result.Succeeded)
            throw new Exception(string.Join("; ", result.Errors.Select(x => x.Description)));

        await userManager.AddToRoleAsync(user, UserRoles.Seller);

        return true;
    }
}