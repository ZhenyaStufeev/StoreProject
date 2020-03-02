using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Web.Bll.Entities.StoreEntities;

namespace Web.Bll.Interfaces
{
    public interface IStoreService : IDisposable
    {
        Task<IEnumerable<CategoryViewModel>> GetCategories();
        Task<object> GetProduct(string categoryId, int page, string[] filtersId);
        Task<IEnumerable<FNameViewModel>> GetFiltersByCategoryId(string id);
    }
}
