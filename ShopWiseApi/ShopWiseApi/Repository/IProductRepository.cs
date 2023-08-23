using ShopWiseApi.Modal;

namespace ShopWiseApi.Repository
{
    public interface IProductRepository
    {
        Task<ProductDetails> GetProductById(int productId);
        Task<bool> UpdateProductAsync(ProductDetails productDetails);
    }
}
