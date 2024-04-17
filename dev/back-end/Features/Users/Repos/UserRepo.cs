using ConvenienceStore.Features.Users.Contracts;
using ConvenienceStore.Features.Users.Models;
using ConvenienceStore.Infra.Context;
using ConvenienceStore.Shared.Bases;
using Microsoft.EntityFrameworkCore;

namespace ConvenienceStore.Features.Users.Repos;

public class UserRepo(DataContext context) : BaseRepo<User>(context), IUserRepo
{
    public override async Task<IList<User>> ListAsync()
        => await DbSet.OrderBy(user => user.UserName).ToListAsync();

    public async Task<IList<User>> ListSellers()
        => await DbSet.Where(user => user.IsSeller).OrderBy(user => user.UserName).ToListAsync();

    public async Task<IList<User>> ListCustomers()
        => await DbSet.Where(user => !user.IsSeller).OrderBy(user => user.UserName).ToListAsync();
}