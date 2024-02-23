using ConvenienceStore.Features.Products.Models;
using ConvenienceStore.Features.Users.Models;
using ConvenienceStore.Shared.Contracts;

namespace ConvenienceStore.Features.Products.Contracts
{
    public interface IProductRepo : IBaseRepo<Product>
    {
        Task<IList<Product>> ListAsync();
    }
}