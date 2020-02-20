
using Data_Access_Layer.Context;
using Data_Access_Layer.Entities.Store;
using Microsoft.EntityFrameworkCore;
using Microsoft.Win32.SafeHandles;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;
using Web.Bll.Entities.StoreEntities;
using Web.Bll.Interfaces;
using Web.Bll.Utils;

namespace Web.Bll.Services
{
    public class StoreService : IStoreService
    {
        ApplicationContext db;
        object key = new object();
        public StoreService(ApplicationContext db)
        {
            this.db = db;
        }

        public async Task<IEnumerable<CategoryViewModel>> GetCategories()
        {
            return await Task.Run(async () =>
            {
                IEnumerable<CategoryViewModel> result = MapService.mapper.Map<IEnumerable<Category>, IEnumerable<CategoryViewModel>>
                    (await db.Categories.ToArrayAsync());
                result = result.Where(x => x.ParentId == null); //елементи, які є головними

                return result;
            });
        }
        public async Task<object> GetProduct(int categoryId, int page, int[] filtersId)
        {
            //Доробити, щоб ці продукти ссилались на фільтри
            IQueryable<Product> query = db.Products.Where(p => p.CategoryId == categoryId);

            IEnumerable<FNameViewModel> FilterList = null;

            //Не виконуэться
            if (filtersId != null && filtersId.Length > 0) //Якщо є вхідні фільтри
            {
                FilterList = await GetFilters(); //Отримати всі фільтри (Query);
                foreach (FNameViewModel fName in FilterList)
                {
                    int Count_FilterGroup = 0; //Кількість співпадніть у групі фільтрів
                    var Predicate = PredicateBuilder.False<Product>();
                    foreach (var fVale in fName.Childrens)
                    {
                        foreach (var FilterId in filtersId)
                        {
                            var ValueId = fVale.Id;
                            if (FilterId == ValueId)
                            {
                                Predicate = Predicate
                                    .Or(p => p.Filters
                                    .Any(filter => filter.FilterValueId == ValueId));

                                Count_FilterGroup++;
                            }
                        }
                    }

                    if (Count_FilterGroup != 0)
                    {
                        query = query.Where(Predicate);
                    }
                }
            }
            //____________________________________

            var FilteredProducts = query
               .Select(fProducts => new ProductViewModel
               {
                   Id = fProducts.Id,
                   Name = fProducts.Name,
                   Price = fProducts.Price,
                   Description = fProducts.Description,
                   DateCreate = fProducts.DateCreate,
                   Quantity = fProducts.Quantity,
                   ImagePath = fProducts.ImagePath
               });

            var info = Selector.CreateSelector(page, await FilteredProducts.CountAsync());

            FilteredProducts.Skip(info.beginCount)
                               .Take(info.count);

            return new { dto = FilteredProducts, totalPages = info.totalPages };
        }
        private async Task<IEnumerable<FNameViewModel>> GetFilters()
        {
            var query = db.VFilterNameGroups
            .AsQueryable()
            .Where(filter => filter.FilterValueId != null)
            .Select(filter => new
            {
                FNameId = filter.FilterNameId,
                FName = filter.FilterName,
                FValueId = filter.FilterValueId,
                FValue = filter.FilterValue
            });

            var groupNames = query.GroupBy(filter => (new { Id = filter.FNameId, Name = filter.FName }))
                                .OrderBy(x => x.Key.Name);

            var res = await Task.Run(() =>
            {
                List<FNameViewModel> FilterList = new List<FNameViewModel>();

                foreach (var filterName in groupNames)
                {
                    FNameViewModel node = new FNameViewModel
                    {
                        Id = filterName.Key.Id,
                        Name = filterName.Key.Name
                    };

                    node.Childrens = filterName
                        .GroupBy(f => new FValueViewItem { Id = f.FValueId, Name = f.FValue })
                        .Select(f => f.Key)
                        .ToList();

                    FilterList.Add(node);
                }

                return FilterList;
            });


            return res;
        }
        #region Dispose
        bool disposed = false;
        // Public implementation of Dispose pattern callable by consumers.
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        // Protected implementation of Dispose pattern.
        protected virtual void Dispose(bool disposing)
        {
            if (disposed)
                return;

            if (disposing)
            {
                // Free any other managed objects here.
            }

            // Free any unmanaged objects here.
            disposed = true;
        }
        ~StoreService()
        {
            Dispose(false);
        }
        #endregion
    }
}
