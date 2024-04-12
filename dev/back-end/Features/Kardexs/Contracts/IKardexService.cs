using ConvenienceStore.Features.Kardexs.ViewModels;

namespace ConvenienceStore.Features.Kardexs.Contracts
{
    public interface IKardexService
    {
        Task<IList<KardexVM>> ListAsync();
        Task<KardexVM> FindAsync(Guid id);
        Task<KardexVM> AddAsync(CreateKardexVM vm); 
    }
}
