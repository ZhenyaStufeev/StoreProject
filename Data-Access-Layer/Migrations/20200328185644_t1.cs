using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Data_Access_Layer.Migrations
{
    public partial class t1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.CreateTable(
            //    name: "AspNetRoles",
            //    columns: table => new
            //    {
            //        Id = table.Column<string>(nullable: false),
            //        Name = table.Column<string>(maxLength: 256, nullable: true),
            //        NormalizedName = table.Column<string>(maxLength: 256, nullable: true),
            //        ConcurrencyStamp = table.Column<string>(nullable: true)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_AspNetRoles", x => x.Id);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "AspNetUsers",
            //    columns: table => new
            //    {
            //        Id = table.Column<string>(nullable: false),
            //        UserName = table.Column<string>(maxLength: 256, nullable: true),
            //        NormalizedUserName = table.Column<string>(maxLength: 256, nullable: true),
            //        Email = table.Column<string>(maxLength: 256, nullable: true),
            //        NormalizedEmail = table.Column<string>(maxLength: 256, nullable: true),
            //        EmailConfirmed = table.Column<bool>(nullable: false),
            //        PasswordHash = table.Column<string>(nullable: true),
            //        SecurityStamp = table.Column<string>(nullable: true),
            //        ConcurrencyStamp = table.Column<string>(nullable: true),
            //        PhoneNumber = table.Column<string>(nullable: true),
            //        PhoneNumberConfirmed = table.Column<bool>(nullable: false),
            //        TwoFactorEnabled = table.Column<bool>(nullable: false),
            //        LockoutEnd = table.Column<DateTimeOffset>(nullable: true),
            //        LockoutEnabled = table.Column<bool>(nullable: false),
            //        AccessFailedCount = table.Column<int>(nullable: false),
            //        Name = table.Column<string>(nullable: true),
            //        LastName = table.Column<string>(nullable: true),
            //        MiddleName = table.Column<string>(nullable: true)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_AspNetUsers", x => x.Id);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "tblCategories",
            //    columns: table => new
            //    {
            //        Id = table.Column<int>(nullable: false)
            //            .Annotation("SqlServer:Identity", "1, 1"),
            //        ParentId = table.Column<int>(nullable: true),
            //        Name = table.Column<string>(maxLength: 255, nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_tblCategories", x => x.Id);
            //        table.ForeignKey(
            //            name: "FK_tblCategories_tblCategories_ParentId",
            //            column: x => x.ParentId,
            //            principalTable: "tblCategories",
            //            principalColumn: "Id",
            //            onDelete: ReferentialAction.Restrict);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "tblFilterNames",
            //    columns: table => new
            //    {
            //        Id = table.Column<int>(nullable: false)
            //            .Annotation("SqlServer:Identity", "1, 1"),
            //        Name = table.Column<string>(maxLength: 250, nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_tblFilterNames", x => x.Id);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "tblFilterValues",
            //    columns: table => new
            //    {
            //        Id = table.Column<int>(nullable: false)
            //            .Annotation("SqlServer:Identity", "1, 1"),
            //        Name = table.Column<string>(maxLength: 250, nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_tblFilterValues", x => x.Id);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "vFilterNameGroups",
            //    columns: table => new
            //    {
            //        Id = table.Column<Guid>(nullable: false),
            //        FilterNameId = table.Column<int>(nullable: false),
            //        FilterName = table.Column<string>(maxLength: 250, nullable: false),
            //        FilterValueId = table.Column<int>(nullable: true),
            //        FilterValue = table.Column<string>(maxLength: 250, nullable: true)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_vFilterNameGroups", x => x.Id);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "AspNetRoleClaims",
            //    columns: table => new
            //    {
            //        Id = table.Column<int>(nullable: false)
            //            .Annotation("SqlServer:Identity", "1, 1"),
            //        RoleId = table.Column<string>(nullable: false),
            //        ClaimType = table.Column<string>(nullable: true),
            //        ClaimValue = table.Column<string>(nullable: true)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
            //        table.ForeignKey(
            //            name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
            //            column: x => x.RoleId,
            //            principalTable: "AspNetRoles",
            //            principalColumn: "Id",
            //            onDelete: ReferentialAction.Cascade);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "AspNetUserClaims",
            //    columns: table => new
            //    {
            //        Id = table.Column<int>(nullable: false)
            //            .Annotation("SqlServer:Identity", "1, 1"),
            //        UserId = table.Column<string>(nullable: false),
            //        ClaimType = table.Column<string>(nullable: true),
            //        ClaimValue = table.Column<string>(nullable: true)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
            //        table.ForeignKey(
            //            name: "FK_AspNetUserClaims_AspNetUsers_UserId",
            //            column: x => x.UserId,
            //            principalTable: "AspNetUsers",
            //            principalColumn: "Id",
            //            onDelete: ReferentialAction.Cascade);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "AspNetUserLogins",
            //    columns: table => new
            //    {
            //        LoginProvider = table.Column<string>(nullable: false),
            //        ProviderKey = table.Column<string>(nullable: false),
            //        ProviderDisplayName = table.Column<string>(nullable: true),
            //        UserId = table.Column<string>(nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
            //        table.ForeignKey(
            //            name: "FK_AspNetUserLogins_AspNetUsers_UserId",
            //            column: x => x.UserId,
            //            principalTable: "AspNetUsers",
            //            principalColumn: "Id",
            //            onDelete: ReferentialAction.Cascade);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "AspNetUserRoles",
            //    columns: table => new
            //    {
            //        UserId = table.Column<string>(nullable: false),
            //        RoleId = table.Column<string>(nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
            //        table.ForeignKey(
            //            name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
            //            column: x => x.RoleId,
            //            principalTable: "AspNetRoles",
            //            principalColumn: "Id",
            //            onDelete: ReferentialAction.Cascade);
            //        table.ForeignKey(
            //            name: "FK_AspNetUserRoles_AspNetUsers_UserId",
            //            column: x => x.UserId,
            //            principalTable: "AspNetUsers",
            //            principalColumn: "Id",
            //            onDelete: ReferentialAction.Cascade);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "AspNetUserTokens",
            //    columns: table => new
            //    {
            //        UserId = table.Column<string>(nullable: false),
            //        LoginProvider = table.Column<string>(nullable: false),
            //        Name = table.Column<string>(nullable: false),
            //        Value = table.Column<string>(nullable: true)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
            //        table.ForeignKey(
            //            name: "FK_AspNetUserTokens_AspNetUsers_UserId",
            //            column: x => x.UserId,
            //            principalTable: "AspNetUsers",
            //            principalColumn: "Id",
            //            onDelete: ReferentialAction.Cascade);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "tblProducts",
            //    columns: table => new
            //    {
            //        Id = table.Column<int>(nullable: false)
            //            .Annotation("SqlServer:Identity", "1, 1"),
            //        CategoryId = table.Column<int>(nullable: false),
            //        Name = table.Column<string>(maxLength: 250, nullable: false),
            //        Price = table.Column<float>(nullable: false),
            //        Quantity = table.Column<int>(nullable: false),
            //        DateCreate = table.Column<DateTime>(type: "DATETIME2", nullable: false),
            //        Description = table.Column<string>(nullable: true),
            //        ImagePath = table.Column<string>(nullable: true)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_tblProducts", x => x.Id);
            //        table.ForeignKey(
            //            name: "FK_tblProducts_tblCategories_CategoryId",
            //            column: x => x.CategoryId,
            //            principalTable: "tblCategories",
            //            principalColumn: "Id",
            //            onDelete: ReferentialAction.Cascade);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "tblFilterNameGroups",
            //    columns: table => new
            //    {
            //        Id = table.Column<int>(nullable: false)
            //            .Annotation("SqlServer:Identity", "1, 1"),
            //        FilterNameId = table.Column<int>(nullable: false),
            //        FilterValueId = table.Column<int>(nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_tblFilterNameGroups", x => x.Id);
            //        table.ForeignKey(
            //            name: "FK_tblFilterNameGroups_tblFilterNames_FilterNameId",
            //            column: x => x.FilterNameId,
            //            principalTable: "tblFilterNames",
            //            principalColumn: "Id",
            //            onDelete: ReferentialAction.Cascade);
            //        table.ForeignKey(
            //            name: "FK_tblFilterNameGroups_tblFilterValues_FilterValueId",
            //            column: x => x.FilterValueId,
            //            principalTable: "tblFilterValues",
            //            principalColumn: "Id",
            //            onDelete: ReferentialAction.Cascade);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "tblFilters",
            //    columns: table => new
            //    {
            //        Id = table.Column<int>(nullable: false)
            //            .Annotation("SqlServer:Identity", "1, 1"),
            //        FilterNameId = table.Column<int>(nullable: false),
            //        FilterValueId = table.Column<int>(nullable: false),
            //        ProductId = table.Column<int>(nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_tblFilters", x => x.Id);
            //        table.ForeignKey(
            //            name: "FK_tblFilters_tblFilterNames_FilterNameId",
            //            column: x => x.FilterNameId,
            //            principalTable: "tblFilterNames",
            //            principalColumn: "Id",
            //            onDelete: ReferentialAction.Cascade);
            //        table.ForeignKey(
            //            name: "FK_tblFilters_tblFilterValues_FilterValueId",
            //            column: x => x.FilterValueId,
            //            principalTable: "tblFilterValues",
            //            principalColumn: "Id",
            //            onDelete: ReferentialAction.Cascade);
            //        table.ForeignKey(
            //            name: "FK_tblFilters_tblProducts_ProductId",
            //            column: x => x.ProductId,
            //            principalTable: "tblProducts",
            //            principalColumn: "Id",
            //            onDelete: ReferentialAction.Cascade);
            //    });

            //migrationBuilder.CreateIndex(
            //    name: "IX_AspNetRoleClaims_RoleId",
            //    table: "AspNetRoleClaims",
            //    column: "RoleId");

            //migrationBuilder.CreateIndex(
            //    name: "RoleNameIndex",
            //    table: "AspNetRoles",
            //    column: "NormalizedName",
            //    unique: true,
            //    filter: "[NormalizedName] IS NOT NULL");

            //migrationBuilder.CreateIndex(
            //    name: "IX_AspNetUserClaims_UserId",
            //    table: "AspNetUserClaims",
            //    column: "UserId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_AspNetUserLogins_UserId",
            //    table: "AspNetUserLogins",
            //    column: "UserId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_AspNetUserRoles_RoleId",
            //    table: "AspNetUserRoles",
            //    column: "RoleId");

            //migrationBuilder.CreateIndex(
            //    name: "EmailIndex",
            //    table: "AspNetUsers",
            //    column: "NormalizedEmail");

            //migrationBuilder.CreateIndex(
            //    name: "UserNameIndex",
            //    table: "AspNetUsers",
            //    column: "NormalizedUserName",
            //    unique: true,
            //    filter: "[NormalizedUserName] IS NOT NULL");

            //migrationBuilder.CreateIndex(
            //    name: "IX_tblCategories_ParentId",
            //    table: "tblCategories",
            //    column: "ParentId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_tblFilterNameGroups_FilterNameId",
            //    table: "tblFilterNameGroups",
            //    column: "FilterNameId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_tblFilterNameGroups_FilterValueId",
            //    table: "tblFilterNameGroups",
            //    column: "FilterValueId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_tblFilters_FilterNameId",
            //    table: "tblFilters",
            //    column: "FilterNameId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_tblFilters_FilterValueId",
            //    table: "tblFilters",
            //    column: "FilterValueId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_tblFilters_ProductId",
            //    table: "tblFilters",
            //    column: "ProductId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_tblProducts_CategoryId",
            //    table: "tblProducts",
            //    column: "CategoryId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "tblFilterNameGroups");

            migrationBuilder.DropTable(
                name: "tblFilters");

            migrationBuilder.DropTable(
                name: "vFilterNameGroups");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "AspNetUsers");

            migrationBuilder.DropTable(
                name: "tblFilterNames");

            migrationBuilder.DropTable(
                name: "tblFilterValues");

            migrationBuilder.DropTable(
                name: "tblProducts");

            migrationBuilder.DropTable(
                name: "tblCategories");
        }
    }
}
