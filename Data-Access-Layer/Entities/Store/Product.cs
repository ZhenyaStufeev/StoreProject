using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Data_Access_Layer.Entities.Store
{
    [Table("tblProducts")]
    public class Product
    {
        public Product()
        {
            Filters = new List<Filter>();
            DateCreate = DateTime.Now;
        }
        [Key]
        public int Id { get; set; }
        [ForeignKey("Category")]
        public int CategoryId { get; set; }
        [Required, StringLength(maximumLength: 250)]
        public string Name { get; set; }
        public float Price { get; set; }
        public int Quantity { get; set; }

        [Column(TypeName = "DATETIME2")]
        public DateTime DateCreate { get; set; }

        public virtual Category Category { get; set; }
        public virtual ICollection<Filter> Filters { get; set; }
        public string Description { get; set; }
        public string ImagePath { get; set; }
        
    }
}
