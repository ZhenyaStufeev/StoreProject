using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Web.Bll.Entities.StoreEntities;
using Web.Bll.Interfaces;
using Web.Entities;

namespace Web.Controllers
{
    [EnableCors("_myAllowSpecificOrigins")]
    //[ApiController]
    [Produces("application/json")]
    [Route("api/Store")]
    public class StoreController : ControllerBase
    {
        private readonly ILogger<StoreController> _logger;
        private IStoreService store;

        public StoreController(ILogger<StoreController> logger, IStoreService service)
        {
            _logger = logger;
            store = service;
        }

        [HttpGet("getcategories")]
        public async Task<IActionResult> GetCategories()
        {
            var result = await store.GetCategories();
            return Ok(result);
        }

        [HttpGet("getproducts/{categoryid}/{page}")]
        [HttpPost("getproducts")]
        public async Task<IActionResult> GetProducts([FromBody]ProductsRequest data)
        {
            var res = await store.GetProduct(data.categoryid, data.page, data.filtersId);
            return Ok(res);
        }

        [HttpGet("getfiltersbycategoryid/{categoryid}")]
        public async Task<IActionResult> GetFiltersByCategoryId(string categoryId)
        {
            var res = await store.GetFiltersByCategoryId(categoryId);
            return Ok(res);
        }

        [HttpGet("test")]
        public async Task<IActionResult> test()
        {
            var result = "Hello";
            return Ok(result);
        }

    }
}
