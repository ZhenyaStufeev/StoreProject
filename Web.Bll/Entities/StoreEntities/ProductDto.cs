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

    public class ProductRequest
    {
        public int page { get; set; }
        public string[] filtersId { get; set; }
        public int minPrice { get; set; }
        public int maxPrice { get; set; }
        public string categoryId { get; set; }
        public string orderType { get; set; } //default, lowtohight, highttolow
    }

    public class SelectedProduct
    {
        public SelectedProduct()
        {
            Props = new List<PropsView>();
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public float Price { get; set; }
        public ICollection<PropsView> Props { get; set; }
        public string Description { get; set; }
        public string ImagePath { get; set; }
    }
}
