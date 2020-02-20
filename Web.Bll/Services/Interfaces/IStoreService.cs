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
        Task<object> GetProduct(int categoryId, int page, int[] filtersId);
    }
}
