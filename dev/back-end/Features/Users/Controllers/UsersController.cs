using ConvenienceStore.Features.Users.Contracts;
using ConvenienceStore.Features.Users.ViewModels;
using ConvenienceStore.Shared.Utils;
using Microsoft.AspNetCore.Mvc;

namespace ConvenienceStore.Features.Users.Controllers;

[ApiController]
[Route("[controller]")]
[Produces("application/json")]
public class UsersController(IUserService service) : ControllerBase
{
    [HttpGet]
    [ProducesResponseType<IList<UserVM>>(200)]
    public async Task<IActionResult> ListAsync()
        => Ok(await service.ListAsync());

    [HttpGet("customers")]
    [ProducesResponseType<IList<UserVM>>(200)]
    public async Task<IActionResult> ListCustomersAsync()
        => Ok(await service.ListCustomersAsync());

    [HttpGet("sellers")]
    [ProducesResponseType<IList<UserVM>>(200)]
    public async Task<IActionResult> ListSellersAsync()
        => Ok(await service.ListSellersAsync());

    [HttpGet("{id:guid}")]
    [ProducesResponseType<UserVM>(200)]
    [ProducesResponseType<ErrorResult>(400)]
    [ProducesResponseType<ErrorResult>(404)]
    public async Task<IActionResult> FindAsync(Guid id)
        => Ok(await service.FindAsync(id));

    [HttpPost]
    [ProducesResponseType<UserVM>(200)]
    [ProducesResponseType<ErrorResult>(400)]
    public async Task<IActionResult> AddAsync([FromBody] CreateUserVM vm)
        => Ok(await service.AddAsync(vm));

    [HttpPut("{id:guid}")]
    [ProducesResponseType<UserVM>(200)]
    [ProducesResponseType<ErrorResult>(400)]
    [ProducesResponseType<ErrorResult>(404)]
    public async Task<IActionResult> UpdateAsync(Guid id, [FromBody] UpdateUserVM vm)
        => Ok(await service.UpdateAsync(id, vm));

    [HttpDelete("{id:guid}")]
    [ProducesResponseType<bool>(200)]
    [ProducesResponseType<ErrorResult>(400)]
    [ProducesResponseType<ErrorResult>(404)]
    public async Task<IActionResult> RemoveAsync(Guid id)
        => Ok(await service.RemoveAsync(id));
}