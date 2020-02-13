using Data_Access_Layer.Context;
using System;
using System.Collections.Generic;
using System.Text;
using Web.Bll.Modules.Interfaces;

namespace Web.Bll.Modules.Modules
{
    public class FilterModule : IFilterModule
    {
        private ApplicationContext db;
        public FilterModule(ApplicationContext context)
        {
            db = context;
        }
    }
}
