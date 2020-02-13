using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Data_Access_Layer.Entities
{
    public class ApplicationUser: IdentityUser
    {
        
        public string Name { get; set; }
        public string LastName { get; set; }
        public string MiddleName { get; set; }
    }
}
