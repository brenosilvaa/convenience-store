using ConvenienceStore.Features.OrderItems.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ConvenienceStore.Features.OrderItems.Configs;

public class OrderItemConfig : IEntityTypeConfiguration<OrderItem>
{
    public void Configure(EntityTypeBuilder<OrderItem> builder)
    {
        builder.HasKey(orderItem => orderItem.Id);

        builder.HasOne(x => x.Order)
                 .WithMany(x => x.Items)
                 .HasForeignKey(x => x.OrderId);

        builder.HasOne(x => x.Product)
               .WithMany(x => x.Items)
               .HasForeignKey(x => x.ProductId);
    }
}