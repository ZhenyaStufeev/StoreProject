using System;
using System.Collections.Generic;
using System.Text;

namespace Web.Bll.Entities
{
    public class LoginModel
    { 
        public string Email { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
    }
}
