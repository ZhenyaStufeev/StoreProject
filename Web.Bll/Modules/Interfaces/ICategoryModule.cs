using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Web.Bll.Entities.StoreEntities;

namespace Web.Bll.Modules.Interfaces
{
    public interface ICategoryModule
    {
        Task<IEnumerable<CategoryViewModel>> Get();
    }
}
