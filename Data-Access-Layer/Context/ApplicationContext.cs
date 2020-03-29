using Data_Access_Layer.Entities;
using Data_Access_Layer.Entities.Store;
using Data_Access_Layer.Migrations.Seeds;
using Data_Access_Layer.Migrations.Views.Filters;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.IO;

namespace Data_Access_Layer.Context
{
    public class ApplicationContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {
            //this.Database.Migrate();
            DataSeed.Initialize(this);
        }
        public ApplicationContext() : base(DefaultConnection())
        {
            //this.Database.Migrate();
            DataSeed.Initialize(this);
        }
        private static DbContextOptions<ApplicationContext> DefaultConnection()
        {
            var builder = new ConfigurationBuilder();
            // установка пути к текущему каталогу
            string Path = Directory.GetCurrentDirectory() + @"\appsettings.json";
            builder.SetBasePath(Directory.GetCurrentDirectory());
            // получаем конфигурацию из файла
            builder.AddJsonFile("appsettings.json");
            // создаем конфигурацию
            var config = builder.Build();
            // получаем строку подключения
            string connectionString = config.GetConnectionString("DefaultConnection");

            var optionsBuilder = new DbContextOptionsBuilder<ApplicationContext>();

            return optionsBuilder
                .UseSqlServer(connectionString)
                        .Options;
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Category>()
                .HasMany<Category>(m_ct => m_ct.Childrens)
                .WithOne()
                .HasForeignKey(key => key.ParentId);

            builder.Entity<Category>()
                .HasMany(e => e.Products);

            builder.Entity<Filter>().Property(p => p.FilterNameId).HasAnnotation("ForeignKey", "FilterNameOf");
            builder.Entity<Filter>().Property(p => p.FilterValueId).HasAnnotation("ForeignKey", "FilterValueOf");
            builder.Entity<Filter>().Property(p => p.ProductId).HasAnnotation("ForeignKey", "ProductOf");

            builder.Entity<FilterNameGroup>().Property(p => p.FilterNameId).HasAnnotation("ForeignKey", "FilterNameOf");
            builder.Entity<FilterNameGroup>().Property(p => p.FilterValueId).HasAnnotation("ForeignKey", "FilterValueOf");

            //        builder.Entity<OrderToProduct>()
            //            .HasKey(x => new { x.OrderId, x.ProductId });
            //        builder.Entity<CartToProduct>()
            //.HasKey(x => new { x.CartId, x.ProductId });

            builder.Entity<OrderToProduct>()
                .HasOne(x => x.ProductOf)
                .WithMany(x => x.Orders)
                .HasForeignKey(x => x.ProductId);

            builder.Entity<OrderToProduct>()
                .HasOne(x => x.OrderOf)
                .WithMany(x => x.Products)
                .HasForeignKey(x => x.OrderId);

            builder.Entity<CartToProduct>()
                .HasOne(x => x.ProductOf)
                .WithMany(x => x.Carts)
                .HasForeignKey(x => x.ProductId);

            builder.Entity<CartToProduct>()
                .HasOne(x => x.CartOf)
                .WithMany(x => x.Products)
                .HasForeignKey(x => x.CartId);

            base.OnModelCreating(builder);
        }
        public DbSet<Category> Categories { get; set; }
        public DbSet<FilterName> FilterNames { get; set; }
        public DbSet<FilterValue> FilterValues { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Filter> Filters { get; set; }
        public DbSet<FilterNameGroup> FilterNameGroups { get; set; }
        public DbSet<VFilterNameGroup> VFilterNameGroups { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Cart> Carts { get; set; }
        public DbSet<OrderToProduct> OrdersToProducts { get; set; }
        public DbSet<CartToProduct> CartsToProducts { get; set; }
    }
}
