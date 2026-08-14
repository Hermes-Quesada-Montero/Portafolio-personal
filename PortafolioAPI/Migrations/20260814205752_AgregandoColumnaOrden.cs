using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PortafolioAPI.Migrations
{
    /// <inheritdoc />
    public partial class AgregandoColumnaOrden : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "OrderIndex",
                table: "ContactItems",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OrderIndex",
                table: "ContactItems");
        }
    }
}
