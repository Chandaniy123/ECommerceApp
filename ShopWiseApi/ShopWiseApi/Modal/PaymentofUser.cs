namespace ShopWiseApi.Modal
{
    public class PaymentofUser
    {
        public int PaymentId { get; set; }

        public int UserId { get; set; }

        public string TotalSum { get; set; }

        public string PaymentMethod { get; set; }


    }

}
