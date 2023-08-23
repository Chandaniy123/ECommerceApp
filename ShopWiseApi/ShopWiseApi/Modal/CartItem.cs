namespace ShopWiseApi.Modal
{
    public class CartItem
    {
        public int Id { get; set; }
        public ProductDetails Product { get; set; } = new ProductDetails();
    }
}
