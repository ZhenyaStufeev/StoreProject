using System;
using System.Collections.Generic;
using System.Text;

namespace Web.Bll.Entities
{
    public class ResponceResult
    {
        public ResponceResult()
        {
            Errors = new List<string>();
            data = new List<object>();
        }
        public bool Succeeded { get; set; }
        public List<string> Errors { get; set; }
        public List<object> data { get; set; } 
    }
}
