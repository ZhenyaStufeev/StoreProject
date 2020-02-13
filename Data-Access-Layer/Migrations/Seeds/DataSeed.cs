using Data_Access_Layer.Context;
using Data_Access_Layer.Entities.Store;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Reflection;

namespace Data_Access_Layer.Migrations.Seeds
{
    public static class DataSeed
    {
        public static void Initialize(ApplicationContext context)
        {
            bool AccessSeed = context.Database.EnsureCreated(); //true

            if (AccessSeed == true)
            {
                string codeBase = Assembly.GetExecutingAssembly().CodeBase;
                UriBuilder uri = new UriBuilder(codeBase);
                string path = Uri.UnescapeDataString(uri.Path);
                string baseDir = Path.GetDirectoryName(path) + "\\Migrations\\ViewFilters\\vFilterNameGroups.sql";
                context.Database.ExecuteSqlCommand(File.ReadAllText(baseDir));
                context.SaveChanges();
            }
        }
    }
}
