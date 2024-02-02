using ConvenienceStore.Features.OrderItems.Models;

namespace ConvenienceStore.Features.Products.Models;

public class Product
{
    #region properties
    public IList<OrderItem> Items { get; private set; }

    #endregion
}