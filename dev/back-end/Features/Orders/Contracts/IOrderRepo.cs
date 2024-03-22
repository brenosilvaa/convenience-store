using ConvenienceStore.Features.Orders.Models;
using ConvenienceStore.Features.Users.Models;
using ConvenienceStore.Shared.Contracts;

namespace ConvenienceStore.Features.Orders.Contracts;

public interface IOrderRepo : IBaseRepo<Order>
{
    Task<IList<Order>> ListAsync();
    Task<IList<Order>> ListNotCanceledAsync();
    Task<IList<Order>> ListCanceledAsync();
}
