using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Data_Access_Layer.Entities.Store
{
    public class OrderToProduct
    {
        [Key]
        public int Id { get; set; }
        public int ProductId { get; set; }
        public Product ProductOf { get; set; }

        public int OrderId { get; set; }
        public Order OrderOf { get; set; }
    }
}
