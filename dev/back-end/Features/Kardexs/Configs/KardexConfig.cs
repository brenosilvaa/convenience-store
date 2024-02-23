using ConvenienceStore.Features.Kardexs.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ConvenienceStore.Features.Kardexs.Configs;

public class KardexConfig : IEntityTypeConfiguration<Kardex>
{
    public void Configure(EntityTypeBuilder<Kardex> builder)
    {
        builder.HasKey(x => x.Id);

        builder.HasOne(x => x.Product)
            .WithMany(x => x.Kardexes)
            .HasForeignKey(x => x.ProductId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}