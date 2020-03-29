using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Data_Access_Layer.Entities.Store
{
    public class CartToProduct
    {
        [Key]
        public int Id { get; set; }
        public int ProductId { get; set; }
        public Product ProductOf { get; set; }

        public int CartId { get; set; }
        public Cart CartOf { get; set; }
    }
}
