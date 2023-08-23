using Microsoft.EntityFrameworkCore;
using ShopWiseApi.Context;
using ShopWiseApi.Modal;

namespace ShopWiseApi.Repository
{
    public class ProductRepository : IProductRepository
    {
        private readonly ProductDbContext _productDbContext;
        public ProductRepository(ProductDbContext productDbContext)
        {
            _productDbContext = productDbContext;
        }

        public async Task<ProductDetails> GetProductById(int productId)
        {
            return await _productDbContext.Products.Where(product => product.ProductId == productId).FirstOrDefaultAsync();
        }

        public async Task<bool> UpdateProductAsync(ProductDetails productDetails)
        {
            _productDbContext.Products.Update(productDetails);
             return await _productDbContext.SaveChangesAsync() == 1 ? true : false;

        }
    }
}
