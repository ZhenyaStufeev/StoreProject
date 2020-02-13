using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Web.Bll.Entities;
using Web.Bll.Interfaces;

namespace Web.Store.Controllers
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
        public async Task<IActionResult> Login([FromBody] AccessModel login)
        {
            dynamic res = await userService.Login(login);
            if (!res.succedeed)
            {
                return StatusCode(401, res.Errors);
            }
            return Ok(res.Data);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] AccessModel reg)
        {
            var res = await userService.Register(reg);
            if (!res)
            {
                return StatusCode(401);
            }
            return Ok();
        }

        [HttpPost("hello")]
        [Authorize]
        public async Task<IActionResult> hello()
        {
            return await Task.Run(() =>
            {
                return Ok("HelloWorld");
            });

        }
    }
}