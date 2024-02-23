using ConvenienceStore.Features.Orders.Models;
using ConvenienceStore.Features.Orders.Services;

using Microsoft.AspNetCore.Mvc;

namespace ConvenienceStore.Features.Orders.Controllers;

[ApiController]
[Route("[controller]")]
[Produces("application/json")]
public class OrdersController(OrderService service) : ControllerBase
{
    [HttpGet]
    [ProducesResponseType<IList<Order>>(200)]
    public async Task<IActionResult> ListAsync()
        => Ok(await service.ListAsync());

    [HttpGet("{id:guid}")]
    [ProducesResponseType<Order>(200)]
    [ProducesResponseType<ErrorResult>(400)]
    [ProducesResponseType<ErrorResult>(404)]
    public async Task<IActionResult> FindAsync(Guid id)
    {
        try
        {
            return Ok(await service.FindAsync(id));
        }
        catch (NotFoundException ex)
        {
            return NotFound(new ErrorResult(ex.Message));
        }
        catch (Exception ex)
        {
            return BadRequest(new ErrorResult(ex.Message));
        }
    }

    [HttpPost]
    [ProducesResponseType<Order>(200)]
    [ProducesResponseType<ErrorResult>(400)]
    public async Task<IActionResult> AddAsync([FromBody] CreateOrderVM vm)
    {
        try
        {
            return Ok(await service.AddAsync(vm));
        }
        catch (Exception ex)
        {
            return BadRequest(new ErrorResult(ex.Message));
        }
    }

    [HttpPut("{id:guid}")]
    [ProducesResponseType<Order>(200)]
    [ProducesResponseType<ErrorResult>(400)]
    [ProducesResponseType<ErrorResult>(404)]
    public async Task<IActionResult> UpdateAsync(Guid id, [FromBody] CreateOrderVM vm)
    {
        try
        {
            return Ok(await service.UpdateAsync(id, vm));
        }
        catch (NotFoundException ex)
        {
            return NotFound(new ErrorResult(ex.Message));
        }
        catch (Exception ex)
        {
            return BadRequest(new ErrorResult(ex.Message));
        }
    }

    [HttpDelete("{id:guid}")]
    [ProducesResponseType<bool>(200)]
    [ProducesResponseType<ErrorResult>(400)]
    [ProducesResponseType<ErrorResult>(404)]
    public async Task<IActionResult> RemoveAsync(Guid id)
    {
        try
        {
            return Ok(await service.RemoveAsync(id));
        }
        catch (NotFoundException ex)
        {
            return NotFound(new ErrorResult(ex.Message));
        }
        catch (Exception ex)
        {

            return BadRequest(new ErrorResult(ex.Message));
        }
    }
}