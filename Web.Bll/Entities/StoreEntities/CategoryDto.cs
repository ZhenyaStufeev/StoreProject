using System;
using System.Collections.Generic;
using System.Text;

namespace Web.Bll.Entities.StoreEntities
{
    public class CategoryViewModel
    {
        public CategoryViewModel()
        {
            Childrens = new List<CategoryViewModel>();
        }
        public int Id { get; set; }
        public int? ParentId { get; set; }
        public string Name { get; set; }
        public virtual List<CategoryViewModel> Childrens { get; set; }
    }

    public class CategoryCreateModel
    {
        
    }
}
