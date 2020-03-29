using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Data_Access_Layer.Entities.Store
{
    public class Cart
    {
        public Cart()
        {
            Products = new List<CartToProduct>();
        }

        [Key]
        public int Id { get; set; }
        public ICollection<CartToProduct> Products { get; set; }
    }
}
