using AutoMapper;
using Data_Access_Layer.Entities.Store;
using System;
using System.Collections.Generic;
using System.Text;
using Web.Bll.Entities.StoreEntities;

namespace Web.Bll.Utils
{
    public static class MapService
    {
        public static Mapper mapper = null;
        private static object locker = new object();
        static MapService()
        {
            lock (locker)
            {
                if (mapper == null)
                {
                    dynamic configuration = Config();
                    //configuration.AssertConfigurationIsValid();
                    mapper = configuration.CreateMapper();
                }
            }
        }
        private static MapperConfiguration Config()
        {
            return new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<Category, CategoryViewModel>();
                cfg.CreateMap<Product, ProductViewModel>();
            });
        }
    }
}
