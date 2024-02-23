using ConvenienceStore.Features.Users.Models;
using ConvenienceStore.Shared.Contracts;

namespace ConvenienceStore.Features.Users.Contracts;

public interface IUserRepo : IBaseRepo<User>
{
    Task<IList<User>> ListAsync();
    Task<IList<User>> ListSellers();
    Task<IList<User>> ListCustomers();
}