
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
using Web.Bll.Services;

namespace Web.Bll.Utils
{
    public class Injections
    {
        IServiceCollection services;
        private static string connectionString { get; set; }
        public Injections(IServiceCollection services)
        {
            this.services = services;
            connectionString = GetConnectionString();
        }

        public void LoadInjections()
        {
            services.AddDbContext<ApplicationContext>(options => options.UseSqlServer(connectionString));

            services.AddIdentity<ApplicationUser, IdentityRole>()
                    .AddEntityFrameworkStores<ApplicationContext>()
                    .AddDefaultTokenProviders();

            services.AddIdentityCore<ApplicationUser>()
                    .AddRoles<ApplicationRole>()
                    .AddClaimsPrincipalFactory<UserClaimsPrincipalFactory<ApplicationUser, IdentityRole>>()
                    .AddEntityFrameworkStores<ApplicationContext>()
                    .AddDefaultTokenProviders();
            
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IStoreService, StoreService>();
        }

        private static string GetConnectionString()
        {
            var builder = new ConfigurationBuilder();
            string Path = Directory.GetCurrentDirectory() + @"\appsettings.json";
            builder.SetBasePath(Directory.GetCurrentDirectory());
            builder.AddJsonFile("appsettings.json");
            var config = builder.Build();
            return config.GetConnectionString("DefaultConnection");
        }
    }
}
