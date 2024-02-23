using ConvenienceStore.Features.Products.ViewModels;

namespace ConvenienceStore.Features.Products.Contracts
{
    public interface IProductService
    {
        Task<IList<ProductVM>> ListAsync();
        Task<ProductVM> FindAsync(Guid id);
        Task<ProductVM> AddAsync(CreateProductVM vm);
        Task<ProductVM> UpdateAsync(Guid id, CreateProductVM vm);
        Task<bool> RemoveAsync(Guid id);
    }
}