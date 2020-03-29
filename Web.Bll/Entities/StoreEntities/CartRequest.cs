using System;
using System.Collections.Generic;
using System.Text;

namespace Web.Bll.Entities.StoreEntities
{
    public class CartRequest
    {
        public string[] productsIds { get; set; }
        public string Email { get; set; }
    }
}
