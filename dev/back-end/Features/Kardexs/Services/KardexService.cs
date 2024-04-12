using AutoMapper;
using ConvenienceStore.Features.Kardexs.Contracts;
using ConvenienceStore.Features.Kardexs.Models;
using ConvenienceStore.Features.Kardexs.Validators;
using ConvenienceStore.Features.Kardexs.ViewModels;
using FluentValidation;

namespace ConvenienceStore.Features.Kardexs.Services
{
    public class KardexService(IMapper mapper, IKardexRepo repo, KardexValidator productValidator) : IKardexService
    {
        public async Task<IList<KardexVM>> ListAsync()
            => mapper.Map<IList<KardexVM>>(await repo.ListAsync());

        public async Task<KardexVM> FindAsync(Guid id)
        {
            var product = await FindAsync(id);
            return mapper.Map<KardexVM>(product);
        }

        public async Task<KardexVM> AddAsync(CreateKardexVM vm)
        {
            var product = new Kardex(vm.ProductId, vm.IsEntry,
               vm.AbsoluteQuantity, vm.AbsoluteUnitValue, vm.History);

            await productValidator.ValidateAndThrowAsync(product);

            repo.Add(product);
            await repo.Commit();

            return mapper.Map<KardexVM>(product);
        }

    }
}
