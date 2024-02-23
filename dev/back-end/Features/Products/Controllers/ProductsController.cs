using ConvenienceStore.Features.Products.Contracts;
using ConvenienceStore.Features.Products.ViewModels;
using ConvenienceStore.Shared.Utils;
using Microsoft.AspNetCore.Mvc;

namespace ConvenienceStore.Features.Products.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Produces("application/json")]
    public class ProductsController(IProductService service) : ControllerBase
    {
        [HttpGet]
        [ProducesResponseType<IList<ProductVM>>(200)]
        public async Task<IActionResult> ListAsync()
         => Ok(await service.ListAsync());

        [HttpGet("{id:guid}")]
        [ProducesResponseType<ProductVM>(200)]
        [ProducesResponseType<ErrorResult>(400)]
        [ProducesResponseType<ErrorResult>(404)]
        public async Task<IActionResult> FindAsync(Guid id)
            => Ok(await service.FindAsync(id));

        [HttpPost]
        [ProducesResponseType<ProductVM>(200)]
        [ProducesResponseType<ErrorResult>(400)]
        public async Task<IActionResult> AddAsync([FromBody] CreateProductVM vm)
            => Ok(await service.AddAsync(vm));

        [HttpPut("{id:guid}")]
        [ProducesResponseType<ProductVM>(200)]
        [ProducesResponseType<ErrorResult>(400)]
        [ProducesResponseType<ErrorResult>(404)]
        public async Task<IActionResult> UpdateAsync(Guid id, [FromBody] CreateProductVM vm)
            => Ok(await service.UpdateAsync(id, vm));

        [HttpDelete("{id:guid}")]
        [ProducesResponseType<bool>(200)]
        [ProducesResponseType<ErrorResult>(400)]
        [ProducesResponseType<ErrorResult>(404)]
        public async Task<IActionResult> RemoveAsync(Guid id)
            => Ok(await service.RemoveAsync(id));
    }
}