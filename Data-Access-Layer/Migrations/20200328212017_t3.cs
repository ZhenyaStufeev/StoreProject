using Microsoft.EntityFrameworkCore.Migrations;

namespace Data_Access_Layer.Migrations
{
    public partial class t3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_CartsToProducts_CartId",
                table: "AspNetUsers");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_CartId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "CartId",
                table: "AspNetUsers");

            migrationBuilder.AddColumn<string>(
                name: "ApplicationUserId",
                table: "CartsToProducts",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_CartsToProducts_ApplicationUserId",
                table: "CartsToProducts",
                column: "ApplicationUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_CartsToProducts_AspNetUsers_ApplicationUserId",
                table: "CartsToProducts",
                column: "ApplicationUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CartsToProducts_AspNetUsers_ApplicationUserId",
                table: "CartsToProducts");

            migrationBuilder.DropIndex(
                name: "IX_CartsToProducts_ApplicationUserId",
                table: "CartsToProducts");

            migrationBuilder.DropColumn(
                name: "ApplicationUserId",
                table: "CartsToProducts");

            migrationBuilder.AddColumn<int>(
                name: "CartId",
                table: "AspNetUsers",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_CartId",
                table: "AspNetUsers",
                column: "CartId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_CartsToProducts_CartId",
                table: "AspNetUsers",
                column: "CartId",
                principalTable: "CartsToProducts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
