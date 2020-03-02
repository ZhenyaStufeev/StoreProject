using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web.Entities
{
    public class ProductsRequest
    {
        public string categoryid { get; set; }
        public int page { get; set; }
        public string[] filtersId { get; set; }
    }
}
