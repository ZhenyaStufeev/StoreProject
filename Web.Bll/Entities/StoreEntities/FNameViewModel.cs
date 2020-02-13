using System;
using System.Collections.Generic;
using System.Text;

namespace Business_Layer_Logic.Entities.Shop
{
    public class FNameViewModel
    {
        public FNameViewModel()
        {
            Childrens = new List<FValueViewItem>();
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public List<FValueViewItem> Childrens { get; set; }
    }
}
