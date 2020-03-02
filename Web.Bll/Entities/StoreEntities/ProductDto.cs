using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Web.Bll.Entities.StoreEntities
{
    public class ProductViewModel
    {
        public ProductViewModel()
        {
            DateCreate = DateTime.Now;
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public string Description { get; set; }
        public int Quantity { get; set; }
        public DateTime DateCreate { get; set; }
        public string ImagePath { get; set; }

    }
}
