using Data_Access_Layer.Context;
using Data_Access_Layer.Entities.Store;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web.Bll.Entities.StoreEntities;
using Web.Bll.Modules.Interfaces;
using Web.Bll.Utils;

namespace Web.Bll.Modules.Modules
{
    public class ProductModule : IProductModule
    {
        private ApplicationContext db;
        public ProductModule(ApplicationContext context)
        {
            db = context;
        }
        public async Task<IEnumerable<ProductViewModel>> GetProductByCategoryId(int categoryId, int page)
        {
            return await Task.Run(async () =>
            {
                var info = Selector.CreateSelector(page);
                var products = db.Products.Where(p => p.CategoryId == categoryId)
                    .Skip(info.beginCount)
                    .Take(info.count);

                var dto = MapService.mapper.Map<IEnumerable<Product>, IEnumerable<ProductViewModel>>(await products.ToArrayAsync());

                return dto;
            });
        }
    }
}
