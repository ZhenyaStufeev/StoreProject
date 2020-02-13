using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Web.Bll.Entities;

namespace Web.Bll.Interfaces
{
    public interface IUserService
    {
        Task<bool> Register(RegisterModel reg_data);
        Task<object> Login(LoginModel log_data);
    }
}
