using ConvenienceStore.Features.Products.Models;
using ConvenienceStore.Infra.Context;
using ConvenienceStore.Shared.Bases;
using Microsoft.EntityFrameworkCore;

namespace ConvenienceStore.Features.Products.Repos
{
    public class ProductRepo(DataContext context) : BaseRepo<Product>(context)
    {
        public override async Task<IList<Product>> ListAsync()
            => await DbSet.OrderBy(x => x.Name).ToListAsync();
    }
}