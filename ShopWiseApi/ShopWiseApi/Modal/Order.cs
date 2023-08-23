using System;

namespace ShopWiseApi.Modal
{
    public class Order
    {
        public int Id { get; set; }
        public Users User { get; set; } = new Users();
        public Cart Cart { get; set; } = new Cart();
        public Payment Payment { get; set; } = new Payment();
        public string CreatedAt { get; set; } = string.Empty;
    }
}
                                                                       