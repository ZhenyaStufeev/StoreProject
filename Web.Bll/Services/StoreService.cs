
using Data_Access_Layer.Context;
using Data_Access_Layer.Entities.Store;
using Microsoft.EntityFrameworkCore;
using Microsoft.Win32.SafeHandles;
using System;
using System.Collections;
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
        public async Task<object> GetProduct(ProductRequest model)
        {
            //(model.categoryId == null || model.categoryId.Length <= 0) ? db.Products : db.Products.Where(p => p.CategoryId.ToString() == model.categoryId);
            IQueryable<Product> query = db.Products;

            if (model.categoryId != null && model.categoryId.Length > 0)
                query = query.Where(p => p.CategoryId.ToString() == model.categoryId);

            double maxPrice = await query.MaxAsync(p => p.Price);
            double minPrice = await query.MinAsync(p => p.Price);

            if (model.maxPrice != model.minPrice && model.maxPrice != 0)
                query = query.Where(p => p.Price >= model.minPrice && p.Price <= model.maxPrice);


            if (model.filtersId != null && model.filtersId.Length > 0) //Якщо є вхідні фільтри
            {
                IEnumerable<FNameViewModel> FilterList = GetFilters(); //Отримати всі фільтри (Query);
                foreach (FNameViewModel fName in FilterList)
                {
                    int Count_FilterGroup = 0; //Кількість співпадніть у групі фільтрів
                    var Predicate = PredicateBuilder.False<Product>();
                    foreach (var fVale in fName.Childrens)
                    {
                        foreach (var FilterId in model.filtersId)
                        {
                            var ValueId = fVale.Id;
                            if (FilterId == ValueId.ToString())
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
            if(model.orderType != null)
                FilteredProducts = SetPriceSort(FilteredProducts, model.orderType);

            var info = Selector.CreateSelector(model.page, await FilteredProducts.CountAsync());

            FilteredProducts = FilteredProducts.Skip(info.beginCount)
                               .Take(info.count);

            return new { dto = FilteredProducts, totalPages = info.totalPages, minPrice, maxPrice };
        }

        private IQueryable<ProductViewModel> SetPriceSort(IQueryable<ProductViewModel> FilteredProducts, string sorttype)
        {
            switch (sorttype)
            {
                case "highttolow":
                    {
                        return FilteredProducts.OrderByDescending(p => p.Price);
                    }
                case "lowtohight":
                    {
                        return FilteredProducts.OrderBy(p => p.Price);
                    }
                default:
                    {
                        return FilteredProducts;
                    }
            }
        }

        public async Task<IEnumerable<FNameViewModel>> GetFiltersByCategoryId(string id)
        {
            IQueryable<Product> query_pr = id != null && id.Length > 0 ? db.Products.Where(pr => pr.CategoryId.ToString() == id) : db.Products;
            var query = query_pr.SelectMany(pr_f => pr_f.Filters)
                                .Select(pr_f => new
                                {
                                    FNameId = pr_f.FilterNameId,
                                    FName = pr_f.FilterNameOf.Name,
                                    FValueId = pr_f.FilterValueId,
                                    FValue = pr_f.FilterValueOf.Name
                                });

            var groups = query.GroupBy(filter => (new { Id = filter.FNameId, Name = filter.FName }))
                              .OrderBy(x => x.Key.Name);

            var result = await Task.Run(() =>
            {
                List<FNameViewModel> FilterList = new List<FNameViewModel>();

                foreach (var filterName in groups)
                {
                    FNameViewModel node = new FNameViewModel
                    {
                        Id = filterName.Key.Id,
                        Name = filterName.Key.Name
                    };

                    var groupingF = filterName
                                     .GroupBy(f => new { Id = f.FValueId, Name = f.FValue })
                                     .Select(f => f.Key)
                                     .OrderBy(f => f.Name);

                    node.Childrens = groupingF.Select(f => new FValueViewItem { Id = f.Id, Name = f.Name }).ToList();
                    FilterList.Add(node);
                }
                return FilterList.ToList();
            });

            return result;
        }

        private IEnumerable<FNameViewModel> GetFilters()
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
        }

        public async Task<SelectedProduct> GetProductById(string Id)
        { 


            var productQuery = await db.Products.FirstOrDefaultAsync(p => p.Id.ToString() == Id);

            SelectedProduct prdto = new SelectedProduct()
            {
                Id = productQuery.Id,
                Name = productQuery.Name,
                ImagePath = productQuery.ImagePath,
                Price = productQuery.Price,
                Description = productQuery.Description
            };

            var filterQuery = db.Filters.Where(f => f.ProductId.ToString() == Id)
                                        .Include(f => f.FilterValueOf)
                                        .Include(f => f.FilterNameOf);

            prdto.Props = filterQuery.Select(f => new PropsView()
                                      {
                                          Name = f.FilterNameOf.Name,
                                          Value = f.FilterValueOf.Name
                                      }).ToList();


            return prdto;
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
