using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Web.Bll.Entities.StoreEntities;

namespace Web.Bll.Interfaces
{
    public interface IStoreService : IDisposable
    {
        Task<IEnumerable<CategoryViewModel>> GetCategories();
        Task<object> GetProduct(ProductRequest model);
        Task<IEnumerable<FNameViewModel>> GetFiltersByCategoryId(string id);
        Task<SelectedProduct> GetProductById(string Id);
        Task<IEnumerable<ProductViewModel>> GetProductsByIds(string[] ids);
        Task<object> AddProductsToCart(CartRequest model);
        Task<object> DeleteProductsFromCart(CartRequest model);
        Task<IEnumerable<ProductViewModel>> GetProductsCartByEmail(string Email);
    }
}
