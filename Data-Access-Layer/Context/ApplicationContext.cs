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
            this.Database.Migrate();
            DataSeed.Initialize(this);
        }
        private static DbContextOptions<ApplicationContext> DefaultConnection()
        {
            var builder = new ConfigurationBuilder();
            // установка пути к текущему каталогу
            string Path = Directory.GetCurrentDirectory() + @"\Configuration.json";
            builder.SetBasePath(Directory.GetCurrentDirectory());
            // получаем конфигурацию из файла
            builder.AddJsonFile("Configuration.json");
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

            base.OnModelCreating(builder);
        }
        public DbSet<Category> Categories { get; set; }
        public DbSet<FilterName> FilterNames { get; set; }
        public DbSet<FilterValue> FilterValues { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Filter> Filters { get; set; }
        public DbSet<FilterNameGroup> FilterNameGroups { get; set; }
        public DbSet<VFilterNameGroup> VFilterNameGroups { get; set; }
    }
}
