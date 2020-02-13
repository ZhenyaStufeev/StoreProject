using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Data_Access_Layer.Entities.Store
{
    [Table("tblCategories")]
    public class Category
    {
        public Category()
        {
            Childrens = new List<Category>();
            Products = new List<Product>();
        }

        [Key, Column(Order = 0)]
        public int Id { get; set; }
        [Column(Order = 1)]
        public int? ParentId { get; set; }

        [Required, StringLength(maximumLength: 255)]
        public string Name { get; set; }

        public virtual List<Category> Childrens { get; set; }

        public virtual List<Product> Products { get; set; }
    }
}
