using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Web.Bll.Entities;
using Web.Bll.Interfaces;

namespace Web.Controllers
{
    [Produces("application/json")]
    [Route("api/Account")]
    public class AccountController : ControllerBase
    {
        IUserService userService { get; set; }
        public AccountController(IUserService us)
        {
            userService = us;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel login)
        {
            var res = await userService.Login(login);
            if (res.Succeeded)
                return Ok(res);
            else
                return StatusCode(401, res);
        }

        [HttpPost("register")]
        public async Task<IActionResult> register([FromBody] RegisterModel reg)
        {
            var res = await userService.Register(reg);
            if (res.Succeeded)
                return Ok(res);
            else
                return StatusCode(400, res);
        }
    }
}