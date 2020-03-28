using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Web.Bll.Entities.StoreEntities;
using Web.Bll.Interfaces;

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
        public async Task<IActionResult> GetProducts([FromBody]ProductRequest data)
        {
            var res = await store.GetProduct(data);
            return Ok(res);
        }

        [HttpGet("getfiltersbycategoryid/{categoryid}")]
        [HttpGet("getfiltersbycategoryid")]
        public async Task<IActionResult> GetFiltersByCategoryId(string categoryId)
        {
            var res = await store.GetFiltersByCategoryId(categoryId);
            return Ok(res);
        }

        [HttpGet("getproduct/{productId}")]
        public async Task<IActionResult> GetProduct(string productId)
        {
            var res = await store.GetProductById(productId);
            return Ok(res);
        }

        [HttpPost("getproductstocart")]
        public async Task<IActionResult> GetProductsToCart([FromBody]string[] productsId)
        {
            var res = await store.GetProductByIds(productsId);
            return Ok(res);
        }

        [HttpPost("test")]
        [Authorize]
        public async Task<IActionResult> test()
        {
            var res = "test";
            return Ok(res);
        }
    }
}
