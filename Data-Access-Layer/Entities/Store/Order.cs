using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Data_Access_Layer.Entities.Store
{
    public class Order
    {
        public Order()
        {
            Products = new List<OrderToProduct>();
        }

        [Key]
        public int Id { get; set; }
        [Required, StringLength(maximumLength: 250)]
        public string Adress { get; set; }
        [Required, StringLength(maximumLength: 100)]
        public string FullNameReceiver { get; set; }
        public string Description { get; set; }
        public string Status { get; set; }
        public List<OrderToProduct> Products { get; set; }
    }
}
