using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ConvenienceStore.Infra.Migrations
{
    /// <inheritdoc />
    public partial class Addrolesseed : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { new Guid("9eb956a8-7ca6-4fae-8a89-ee9d649d6393"), null, "Seller", "SELLER" },
                    { new Guid("c4b64501-d4ac-4e68-a02e-91ad6c17b691"), null, "Customer", "CUSTOMER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: new Guid("9eb956a8-7ca6-4fae-8a89-ee9d649d6393"));

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: new Guid("c4b64501-d4ac-4e68-a02e-91ad6c17b691"));
        }
    }
}
