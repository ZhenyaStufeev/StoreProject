using System;
using System.Collections.Generic;
using System.Text;
using Web.Bll.Modules.Interfaces;

namespace Web.Bll.Interfaces
{
    public interface IStoreService : IDisposable
    {
        ICategoryModule categoryModule { get; }
        IProductModule productModule { get; }
    }
}
