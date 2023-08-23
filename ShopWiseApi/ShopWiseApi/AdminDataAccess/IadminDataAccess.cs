using ShopWiseApi.Modal;

namespace ShopWiseApi.AdminDataAccess
{
    public interface IadminDataAccess
    {
        bool AddProduct(ProductDetails product);
        Task<int> CountOfActiveUser();

        //Task<ProductDetails> GetProductById(int id);
        //Task<bool> UpdateProductAsync(ProductDetails productDetails);
        bool DeleteProduct(int productId);
        public List<ProductDetails> GetAllProducts();
        Task<int> OrderCount();
        Task<int> TotalSum();
    }
}
