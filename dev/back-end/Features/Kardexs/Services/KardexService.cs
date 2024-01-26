using ConvenienceStore.Features.Kardexs.Models;
using ConvenienceStore.Features.Kardexs.Validators;
using FluentValidation;

namespace ConvenienceStore.Features.Kardexs.Services
{
    public class KardexService(KardexValidator validator)
    {
        public async Task<Kardex> CreateAsync(Kardex kardex)
        {
            try
            {
                await validator.ValidateAndThrowAsync(kardex);
                return kardex;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.ToString());
                throw;
            }
        }
    }
}
