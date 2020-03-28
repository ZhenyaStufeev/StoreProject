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
        public async Task<ResponceResult> Register(RegisterModel model) //Set to AuthenticationManager
        {
            ResponceResult responce = new ResponceResult();
            responce.Succeeded = true;

            if (model.Email == null || model.Email.Length <= 3)
            {
                responce.Succeeded = false;
                responce.Errors.Add("ERROR_EMAIL_REQUIRED");
            }

            if (model.Password.Length <= 6 || model.Password == null)
            {
                responce.Succeeded = false;
                responce.Errors.Add("ERROR_PASSWORD_LENGTH");
            }

            if (model.Password != model.ConfirmPassword)
            {
                responce.Succeeded = false;
                responce.Errors.Add("PWD_CPWD_NOT_MATCH");
            }

            ApplicationUser findByEmail = await UserManager.FindByEmailAsync(model.Email);
            if (findByEmail != null)
            {
                responce.Succeeded = false;
                responce.Errors.Add("EMAIL_IS_EXISTS");
            }

            if (responce.Succeeded == false)
                return responce;

            string uName = "";
            if (model.UserName.Length == 0)
            {
                foreach (char symbol in model.Email)
                {
                    if (symbol == '@')
                        break;
                    uName += symbol;
                }
            }
            else
            {
                uName = model.UserName;
            }

            ApplicationUser user = new ApplicationUser() { UserName = uName, Email = model.Email };
            IdentityResult result = await UserManager.CreateAsync(user, model.Password);

            if (!result.Succeeded)
            {
                responce.Succeeded = false;
                foreach (var error in result.Errors)
                {
                    string error_str = error.Code; //+ ":  " + error.Description;
                    responce.Errors.Add(error_str);
                }
                return responce;
            }
            return responce;
        }
        public async Task<ResponceResult> Login(LoginModel model) //Set to AuthenticationManager
        {

            ResponceResult responce = new ResponceResult();
            responce.Succeeded = true;

            var user = await UserManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                responce.Succeeded = false;
                responce.Errors.Add("LOGIN_NOT_FOUND");
                return responce;
            }

            bool passIsCorrect = await UserManager.CheckPasswordAsync(user, model.Password);
            if (!passIsCorrect)
            {
                responce.Succeeded = false;
                responce.Errors.Add("INCORRECT_PWD");
                return responce;
            }

            user.SecurityStamp = CreateToken(user);
            UserInfo user_dt = new UserInfo()
            {
                Email = user.Email,
                DisplayName = user.UserName,
                Token = user.SecurityStamp
            };
            responce.data.Add(user_dt);
            return responce;
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
