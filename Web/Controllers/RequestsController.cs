using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Web.Bll.Services.Interfaces;

namespace Web.Controllers
{
    [Produces("application/json")]
    [Route("api/Requests")]
    public class RequestsController : ControllerBase
    {
        private IApiService api { get; set; }
        public RequestsController(IApiService api)
        {
            this.api = api;
        }

        [HttpGet("GetCititesNova/{word}")]
        [HttpGet("GetCititesNova")]
        public async Task<IActionResult> GetCititesNova(string word)
        {
            var res = await api.novaFindCitites(word);
            return Ok(res);
        }

        [HttpGet("GetWarehousesNova/{cityRef}")]
        public async Task<IActionResult> GetWarehousesNova(string cityRef)
        {
            var res = await api.novaGetWarehouses(cityRef);
            return Ok(res);
        }
    }
}