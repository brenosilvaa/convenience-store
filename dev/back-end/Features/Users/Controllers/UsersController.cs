    using ConvenienceStore.Features.Users.Services;
    using ConvenienceStore.Features.Users.ViewModels;
    using ConvenienceStore.Shared.Exceptions;
    using ConvenienceStore.Shared.Utils;
    using Microsoft.AspNetCore.Mvc;

    namespace ConvenienceStore.Features.Users.Controllers;

    [ApiController]
    [Route("[controller]")]
    [Produces("application/json")]
    public class UsersController(UserService service) : ControllerBase
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
        [ProducesResponseType<UserVM>(200)]
        [ProducesResponseType<ErrorResult>(400)]
        public async Task<IActionResult> AddAsync([FromBody] CreateUserVM vm)
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
        [ProducesResponseType<UserVM>(200)]
        [ProducesResponseType<ErrorResult>(400)]
        [ProducesResponseType<ErrorResult>(404)]
        public async Task<IActionResult> UpdateAsync(Guid id, [FromBody] UpdateUserVM vm)
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