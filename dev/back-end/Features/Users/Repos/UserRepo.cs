using ConvenienceStore.Features.Users.Models;
using ConvenienceStore.Infra.Context;
using ConvenienceStore.Shared.Bases;
using Microsoft.EntityFrameworkCore;

namespace ConvenienceStore.Features.Users.Repos;

public class UserRepo(DataContext context) : BaseRepo<User>(context)
{
    public override async Task<IList<User>> ListAsync()
        => await DbSet.OrderBy(user => user.Name).ToListAsync();

    public async Task<IList<User>> ListSellers()
        => await DbSet.Where(user => user.IsSeller).OrderBy(user => user.Name).ToListAsync();

    public async Task<IList<User>> ListCustomers()
        => await DbSet.Where(user => !user.IsSeller).OrderBy(user => user.Name).ToListAsync();
}