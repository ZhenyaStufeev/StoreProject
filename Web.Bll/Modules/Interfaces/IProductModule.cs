using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Web.Bll.Entities.StoreEntities;
using Web.Bll.Utils;

namespace Web.Bll.Modules.Interfaces
{
    public interface IProductModule
    {
        Task<IEnumerable<ProductViewModel>> GetProductByCategoryId(int categoryId, int page);
    }
}
