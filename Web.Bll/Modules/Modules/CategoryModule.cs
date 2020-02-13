using AutoMapper;
using Data_Access_Layer.Context;
using Data_Access_Layer.Entities.Store;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Web.Bll.Entities.StoreEntities;
using Web.Bll.Modules.Interfaces;
using Web.Bll.Utils;

namespace Web.Bll.Modules.Modules
{
    public class CategoryModule: ICategoryModule
    {
        private ApplicationContext db;
        public CategoryModule(ApplicationContext context)
        {
            db = context;
        }

        public async Task<IEnumerable<CategoryViewModel>> Get()
        {
            return await Task.Run(async () =>
            {
                IEnumerable<CategoryViewModel> result = MapService.mapper.Map<IEnumerable<Category>, IEnumerable<CategoryViewModel>>
                    (await db.Categories.ToArrayAsync());
                result = result.Where(x=>x.ParentId == null); //елементи, які є головними

                return result;
            });
        }

    }
}
