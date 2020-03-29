using Data_Access_Layer.Entities.Store;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Data_Access_Layer.Entities
{
    public class ApplicationUser: IdentityUser
    {
        public ApplicationUser()
        {
            OrderItems = new List<OrderToProduct>();
            CartItems = new List<CartToProduct>();
        }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string MiddleName { get; set; }
        public virtual Cart Cart { get; set; }
        public virtual ICollection<OrderToProduct> OrderItems { get; set; }
        public virtual ICollection<CartToProduct> CartItems { get; set; }
    }
}
