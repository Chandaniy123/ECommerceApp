using System;

namespace ShopWiseApi.Modal
{
    public class Cart
    {
        public int Id { get; set; }
        public Users User { get; set; } = new Users();
        public List<CartItem> CartItems { get; set; } = new();
        public bool Ordered { get; set; }
        public string OrderedOn { get; set; } = string.Empty;
    }
}
