using ConvenienceStore.Features.Kardexs.Contracts;
using ConvenienceStore.Features.Kardexs.Models;
using ConvenienceStore.Infra.Context;
using ConvenienceStore.Shared.Bases;

namespace ConvenienceStore.Features.Kardexs.Repos
{
    public class KardexRepo(DataContext context) : BaseRepo<Kardex>(context), IKardexRepo
    {
    }
}
