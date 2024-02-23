using AutoMapper;
using ConvenienceStore.Features.Products.Contracts;
using ConvenienceStore.Features.Products.Models;
using ConvenienceStore.Features.Products.Repos;
using ConvenienceStore.Features.Products.Validators;
using ConvenienceStore.Features.Products.ViewModels;
using ConvenienceStore.Shared.Exceptions;
using FluentValidation;

namespace ConvenienceStore.Features.Products.Services
{
    public class ProductService(IMapper mapper, ProductValidator productValidator, ProductRepo repo) : IProductService
    {
        private async Task<Product> _FindAsync(Guid id)
        {
            var product = await repo.FindAsync(id);
            return product ?? throw new NotFoundException("Produto não encontrado.");
        }

        public async Task<IList<ProductVM>> ListAsync()
      => mapper.Map<IList<ProductVM>>(await repo.ListAsync());

        public async Task<ProductVM> FindAsync(Guid id)
        {
            var product = await _FindAsync(id);
            return mapper.Map<ProductVM>(product);
        }

        public async Task<ProductVM> AddAsync(CreateProductVM vm)
        {
            var product = new Product(vm.Name, vm.Description, vm.Value, vm.UserId);

            await productValidator.ValidateAndThrowAsync(product);

            repo.Add(product);
            await repo.Commit();

            return mapper.Map<ProductVM>(product);
        }

        public async Task<ProductVM> UpdateAsync(Guid id, CreateProductVM vm)
        {
            var product = await _FindAsync(id);

            product.Update(vm.Name, vm.Description, vm.Value, vm.UserId);
            await productValidator.ValidateAndThrowAsync(product);

            repo.Update(product);
            await repo.Commit();

            return mapper.Map<ProductVM>(product);
        }

        public async Task<bool> RemoveAsync(Guid id)
        {
            var product = await _FindAsync(id);

            var success = repo.Remove(product);

            if (success) await repo.Commit();

            return success;
        }
    }
}
