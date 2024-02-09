using AutoMapper;
using ConvenienceStore.Features.Products.Repos;
using ConvenienceStore.Features.Products.Validators;

namespace ConvenienceStore.Features.Products.Services
{
    public class ProductService(IMapper mapper, ProductValidator productValidator, ProductRepo repo)
    {
    }
}
