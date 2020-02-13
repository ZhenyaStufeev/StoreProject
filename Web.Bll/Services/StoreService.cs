using Microsoft.Win32.SafeHandles;
using System;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using System.Text;
using Web.Bll.Interfaces;
using Web.Bll.Modules.Interfaces;

namespace Web.Bll.Services
{
    public class StoreService : IStoreService
    {
        public ICategoryModule categoryModule { get; private set; }
        public IProductModule productModule { get; private set; }
        public IFilterModule filterModule { get; private set; }
        public StoreService(ICategoryModule categoryModule, IProductModule productModule, IFilterModule filterModule)
        {
            this.categoryModule = categoryModule;
            this.productModule = productModule;
            this.filterModule = filterModule;
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
