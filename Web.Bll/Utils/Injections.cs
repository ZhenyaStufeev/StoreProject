
using Business_Layer_Logic.Service;
using Data_Access_Layer.Context;
using Data_Access_Layer.Entities;
using Data_Access_Layer.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.IO;
using Web.Bll.Interfaces;
using Web.Bll.Modules.Interfaces;
using Web.Bll.Modules.Modules;
using Web.Bll.Services;

namespace Web.Bll.Utils
{
    public class Injections
    {
        IServiceCollection services;
        ApplicationContext db { get; set; }
        Services.ServiceProvider provider { get; set; }
        UserManager<ApplicationUser> userManager { get; set; }
        RoleManager<ApplicationRole> roleManager { get; set; }

        ICategoryModule categoryModule;
        IProductModule productModule;
        IFilterModule filterModule;
        public Injections(IServiceCollection services)
        {
            this.services = services;
        }

        public void LoadInjections()
        {
            services.AddScoped<IStoreService, StoreService>();
            provider = new Services.ServiceProvider();
            db = new ApplicationContext(Config());
            userManager = CreateInstanceUserManager();
            roleManager = CreateInstanceRoleManager();
            categoryModule = new CategoryModule(db);
            productModule = new ProductModule(db);
            filterModule = new FilterModule(db);

            services.AddSingleton<IServiceProvider>(provider);
            services.AddSingleton<ApplicationContext>(db);
            services.AddSingleton<UserManager<ApplicationUser>>(userManager);
            services.AddSingleton<RoleManager<ApplicationRole>>(roleManager);
            services.AddSingleton<IUserService>(new UserService(userManager, roleManager));

            services.AddSingleton<ICategoryModule>(categoryModule);
            services.AddSingleton<IProductModule>(productModule);
            services.AddSingleton<IFilterModule>(filterModule);

            services.AddSingleton<IStoreService>(new StoreService(categoryModule, productModule, filterModule));
        }

        private DbContextOptions<ApplicationContext> Config()
        {
            var builder = new ConfigurationBuilder();
            string Path = Directory.GetCurrentDirectory() + @"\Configuration.json";
            builder.SetBasePath(Directory.GetCurrentDirectory());
            builder.AddJsonFile("Configuration.json");
            var config = builder.Build();
            string connectionString = config.GetConnectionString("DefaultConnection");
            var optionsBuilder = new DbContextOptionsBuilder<ApplicationContext>();
            return optionsBuilder
                .UseSqlServer(connectionString)
                        .Options;
        }

        private ApplicationUserManager CreateInstanceUserManager()
        {
            IUserStore<ApplicationUser> store = new UserStore<ApplicationUser>(db);
            PasswordHasher<ApplicationUser> hasher = new PasswordHasher<ApplicationUser>();
            IOptions<IdentityOptions> opAcc = Options.Create(new IdentityOptions());
            return new ApplicationUserManager(
                store,
                opAcc,
                hasher,
                new List<UserValidator<ApplicationUser>>() { new UserValidator<ApplicationUser>() },
                new List<PasswordValidator<ApplicationUser>>() { new PasswordValidator<ApplicationUser>() },
                new UpperInvariantLookupNormalizer(),
                new IdentityErrorDescriber(),
                provider,
                new Logger<UserManager<ApplicationUser>>(new LoggerFactory())
                );
        }

        private ApplicationRolesManager CreateInstanceRoleManager()
        {
            IRoleStore<ApplicationRole> store = new RoleStore<ApplicationRole>(db);
            return new ApplicationRolesManager(
            store,
            new List<IRoleValidator<ApplicationRole>>() { new RoleValidator<ApplicationRole>() },
            new UpperInvariantLookupNormalizer(),
            new IdentityErrorDescriber(),
            new Logger<RoleManager<ApplicationRole>>(new LoggerFactory())
            );
        }
    }
}
