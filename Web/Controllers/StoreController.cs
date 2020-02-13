using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Web.Bll.Entities.StoreEntities;
using Web.Bll.Interfaces;

namespace Web.Controllers
{
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
            var result = await store.categoryModule.Get();
            return Ok(result);
        }

        [HttpGet("getproducts/{categoryid}/{page}")]
        public async Task<IActionResult> GetProducts(int categoryid, int page)
        {
            var res = await store.productModule.GetProductByCategoryId(categoryid, page);
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
