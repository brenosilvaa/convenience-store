using ConvenienceStore.Features.Users.Contracts;
using ConvenienceStore.Features.Users.ViewModels;
using ConvenienceStore.Shared.Utils;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;

namespace ConvenienceStore.Features.Users.Controllers;

/// <summary>
/// Conjunto de endpoints referente à Usuário
/// </summary>
[ApiController]
[Route("[controller]")]
[Produces("application/json")]
public class UsersController(IUserService service) : ControllerBase
{
    /// <summary>
    /// Listar todos os usuários cadastrados
    /// </summary>
    /// <returns>Lista de Usuários</returns>
    [HttpGet]
    [ProducesResponseType<IList<UserVM>>(200)]
    public async Task<IActionResult> ListAsync()
        => Ok(await service.ListAsync());

    /// <summary>
    /// Listar todos os clientes cadastrados
    /// </summary>
    /// <returns>Lista de Clientes</returns>
    [HttpGet("customers")]
    [ProducesResponseType<IList<UserVM>>(200)]
    public async Task<IActionResult> ListCustomersAsync()
        => Ok(await service.ListCustomersAsync());

    /// <summary>
    /// Listar todos os vendedores cadastrados
    /// </summary>
    /// <returns>Lista de Vendedores</returns>
    [HttpGet("sellers")]
    [ProducesResponseType<IList<UserVM>>(200)]
    public async Task<IActionResult> ListSellersAsync()
        => Ok(await service.ListSellersAsync());

    /// <summary>
    /// Encontra um usuário cadastrado
    /// </summary>
    /// <param name="id">ID do usuário</param>
    /// <returns><see cref="UserVM">Usuário</see> | <see cref="ErrorResult"/></returns>
    [HttpGet("{id:guid}")]
    [ProducesResponseType<UserVM>(200)]
    [ProducesResponseType<ErrorResult>(400)]
    [ProducesResponseType<ErrorResult>(404)]
    public async Task<IActionResult> FindAsync(Guid id)
        => Ok(await service.FindAsync(id));
    
    /// <summary>
    /// Adiciona um novo usuário ao banco de dados 
    /// </summary>
    /// <param name="vm">Dados para criação de novo usuário</param>
    /// <returns><see cref="UserVM">Usuário</see> | <see cref="ErrorResult"/></returns>
    [HttpPost]
    [ProducesResponseType<UserVM>(200)]
    [ProducesResponseType<ErrorResult>(400)]
    public async Task<IActionResult> AddAsync([FromBody] CreateUserVM vm)
        => Ok(await service.AddAsync(vm));

    /// <summary>
    /// Edita um usuário existente no banco de dados
    /// </summary>
    /// <param name="id">ID do Usuário</param>
    /// <param name="vm">Informações para atualização de um usuário</param>
    /// <returns><see cref="UserVM">Usuário</see> | <see cref="ErrorResult"/></returns>
    [HttpPut("{id:guid}")]
    [ProducesResponseType<UserVM>(200)]
    [ProducesResponseType<ErrorResult>(400)]
    [ProducesResponseType<ErrorResult>(404)]
    public async Task<IActionResult> UpdateAsync(Guid id, [FromBody] UpdateUserVM vm)
        => Ok(await service.UpdateAsync(id, vm));

    /// <summary>
    /// Remove um usuário existente do banco de dados
    /// </summary>
    /// <param name="id">ID do Usuário</param>
    /// <returns>Sucesso | <see cref="ErrorResult"/></returns>
    [HttpDelete("{id:guid}")]
    [ProducesResponseType<bool>(200)]
    [ProducesResponseType<ErrorResult>(400)]
    [ProducesResponseType<ErrorResult>(404)]
    public async Task<IActionResult> RemoveAsync(Guid id)
        => Ok(await service.RemoveAsync(id));

    [HttpPost("login")]
    public async Task<IActionResult> LoginAsync([FromBody] LoginRequest request) 
        => Ok(await service.LoginAsync(request));
}