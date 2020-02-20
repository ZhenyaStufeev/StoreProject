using Data_Access_Layer.Entities;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using System.Net;
using Web.Bll.Interfaces;
using Web.Bll.Entities;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using Web.Bll.App;
using Data_Access_Layer.Entities.Identity;

namespace Business_Layer_Logic.Service
{
    public class UserService : IUserService
    {
        public UserManager<ApplicationUser> UserManager { get; set; }
        public RoleManager<ApplicationRole> RoleManager { get; set; }
        public AuthenticationManager Authentication { get; set; }
        public UserService(UserManager<ApplicationUser> _mn, RoleManager<ApplicationRole> _rm)
        {
            UserManager = _mn;
            RoleManager = _rm;
        }
        public async Task<bool> Register(RegisterModel model) //Set to AuthenticationManager
        {
            if (model.Password != model.ConfirmPassword)
                return false;

            string uName = "";
            if (model.UserName == null && model.UserName.Length <= 0)
            {
                foreach (char symbol in model.Email)
                {
                    if (symbol == '@')
                        break;
                    uName += symbol;
                }
            }

            ApplicationUser user = new ApplicationUser() { UserName = uName, Email = model.Email };
            IdentityResult result = await UserManager.CreateAsync(user, model.Password);

            if (!result.Succeeded)
            {
                List<string> errors = new List<string>();
                foreach (var error in result.Errors)
                {
                    string error_str = "";
                    error_str += "Error Code "
                        + error.Code
                        + ":  "
                        + error.Description;
                    errors.Add(error_str);
                }
                return false;
            }
            return true;
        }
        public async Task<object> Login(LoginModel model) //Set to AuthenticationManager
        {
            var user = await UserManager.FindByEmailAsync(model.Email);
            if (user == null)
                return new { succeeded = false, errors = new object[] { "LOGIN_NOT_FOUND" } };

            bool passIsCorrect = await UserManager.CheckPasswordAsync(user, model.Password);
            if (!passIsCorrect)
                return new { succeeded = false, errors = new object[] { "INCORRECT_PASSWORD" } };

            user.SecurityStamp = CreateToken(user);
            UserInfo user_dt = new UserInfo()
            {
                Email = user.Email,
                DisplayName = user.UserName,
                Token = user.SecurityStamp
            };

            return new { succeeded = true, user_dt };
        }
        private string CreateToken(ApplicationUser user)
        {
            // authentication successful so generate jwt token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(AppSettings.Key);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                new Claim(ClaimTypes.Name, user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(AppSettings.SymmetricKey(), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);

            var securityStamp = tokenHandler.WriteToken(token);
            // remove password before returning
            user.PasswordHash = null;
            return securityStamp;
        }
    }
}
