using ConvenienceStore.Features.OrderItems.Contracts;
using ConvenienceStore.Features.OrderItems.ViewModels;
using ConvenienceStore.Shared.Utils;
using Microsoft.AspNetCore.Mvc;

namespace ConvenienceStore.Features.OrderItems.Controllers;

[ApiController]
[Route("[controller]")]
[Produces("application/json")]
public class OrderItemsController(IOrderItemService service) : ControllerBase
{
    [HttpGet]
    [ProducesResponseType<IList<OrderItemVM>>(200)]
    public async Task<IActionResult> ListAsync()
        => Ok(await service.ListAsync());

    [HttpGet("{id:guid}")]
    [ProducesResponseType<OrderItemVM>(200)]
    [ProducesResponseType<ErrorResult>(400)]
    [ProducesResponseType<ErrorResult>(404)]
    public async Task<IActionResult> FindAsync(Guid id)
        => Ok(await service.FindAsync(id));

    [HttpPost]
    [ProducesResponseType<OrderItemVM>(200)]
    [ProducesResponseType<ErrorResult>(400)]
    public async Task<IActionResult> AddAsync([FromBody] CreateOrderItemVM vm)
        => Ok(await service.AddAsync(vm));

    [HttpPut("{id:guid}")]
    [ProducesResponseType<OrderItemVM>(200)]
    [ProducesResponseType<ErrorResult>(400)]
    [ProducesResponseType<ErrorResult>(404)]
    public async Task<IActionResult> UpdateAsync(Guid id, [FromBody] CreateOrderItemVM vm)
        => Ok(await service.UpdateAsync(id, vm));

    [HttpDelete("{id:guid}")]
    [ProducesResponseType<bool>(200)]
    [ProducesResponseType<ErrorResult>(400)]
    [ProducesResponseType<ErrorResult>(404)]
    public async Task<IActionResult> RemoveAsync(Guid id)
        => Ok(await service.RemoveAsync(id));
}