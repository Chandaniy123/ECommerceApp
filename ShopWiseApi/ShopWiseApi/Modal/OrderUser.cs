namespace ShopWiseApi.Modal
{
    public class OrderUser
    {
        public int OrderId { get; set; }

        public int UserId { get; set; }

        public int ProductQuantity { get; set; }

        public int TotslSum { get; set; }

        public DateTime Date { get; set; } 
    }
}
