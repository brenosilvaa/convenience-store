using ConvenienceStore.Features.Users.ViewModels;
using Microsoft.AspNetCore.Identity.Data;

namespace ConvenienceStore.Features.Users.Contracts;

public interface IUserService
{
    Task<IList<UserVM>> ListAsync();
    Task<IList<UserVM>> ListCustomersAsync();
    Task<IList<UserVM>> ListSellersAsync();
    Task<UserVM> FindAsync(Guid id);
    Task<UserVM> AddAsync(CreateUserVM vm);
    Task<UserVM> UpdateAsync(Guid id, UpdateUserVM vm);
    Task<bool> RemoveAsync(Guid id);
    Task<UserVM> LoginAsync(LoginRequest request);
}