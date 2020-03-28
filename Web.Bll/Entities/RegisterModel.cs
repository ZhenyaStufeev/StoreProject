using System;
using System.Collections.Generic;
using System.Text;

namespace Web.Bll.Entities
{
    public class RegisterModel
    {
        public RegisterModel()
        {
            Email = "";
            Password = "";
            ConfirmPassword = "";
            Captcha = "";
            UserName = "";
        }
        public string Email { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
        public string Captcha { get; set; }
        public string UserName { get; set; }
    }
}
