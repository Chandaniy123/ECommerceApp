using System;
using ShopWiseApi.Modal;

namespace ShopWiseApi.UserDataModel
{
    public interface IuserDataAccess
    {
       Task<List<ProductCategory> >GetProductCategories();


        Task<ProductCategory> GetProductCategoryById(int id);

        Task< Offer> GetOffer(int id);
        Task<List<ProductDetails>> GetProductsByCatagory(string category, int count);
       Task< ProductDetails> GetProduct(int id);

        Task<bool> InsertUser(Users user);

        Task<string> IsUserPresent(string email, string password);

       void  EmialFunctionality(string userEmail);

        Task<bool> InsertCartItem(int userId, int productId);

        Task<List<Cart>> GetAllPreviousCartsOfUser(int userId);

        Task<Cart> GetActiveCartOfUser(int userId);

        Task<Users> GetUser(int id);

        Task<List<PaymentMethod>> GetPaymentMethods();

        Task<int> InsertOrder(OrderUser order);

        Task<int> InsertPayment(PaymentofUser payment);
        Task<User_Cart> GetThisCartId(int userId, int productId);
        Task IncreaseQuantity(int cartId);
        Task<bool> AddToCart(int userId, int productId, int quant);
        List<Shoping_Carts> GetuserCarts(int userId);
        Task<PaymentofUser> LastPayment(int userId);
        Task<int> DeleteUserCart(int userId);
        Task<int> InsertOrderOfUser(OrderUser order);
        Task<List<OrderUser>> ViewOrder(int userId);
        Task<bool> DeleteCarts(int orderId);
        Task<List<DisplayModel>> GetAllOrder();
    }
}
