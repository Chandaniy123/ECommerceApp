using System.ComponentModel.DataAnnotations;

namespace ShopWiseApi.Modal
{
    public class Shoping_Carts
    {
        [Key]
        public int CartId { get; set; }
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public int OfferRate { get; set; }
        public int Price { get; set; }
        public string Image { get; set; }
        public int Quantity { get; set; }
    }
}
