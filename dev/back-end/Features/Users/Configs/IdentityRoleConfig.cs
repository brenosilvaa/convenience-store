using ConvenienceStore.Features.Users.Security;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.Data;

namespace ConvenienceStore.Features.Users.Configs
{
    public class IdentityRoleConfig : IEntityTypeConfiguration<IdentityRole<Guid>>
    {
        public void Configure(EntityTypeBuilder<IdentityRole<Guid>> builder)
        {
            builder.HasData(new IdentityRole<Guid>
            {
                Id = Guid.NewGuid(),
                Name = UserRoles.Customer,
                NormalizedName = UserRoles.Customer.ToUpper(),
            });

            builder.HasData(new IdentityRole<Guid>
            {
                Id = Guid.NewGuid(),
                Name = UserRoles.Seller,
                NormalizedName = UserRoles.Seller.ToUpper(),
            });
        }
    }
}
