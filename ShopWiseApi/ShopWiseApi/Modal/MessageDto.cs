using System.ComponentModel.DataAnnotations;

namespace ShopWiseApi.Modal
{
    public class MessageDto
    {
        [Key]
        public int ReviewId { get; set; }
        public string User { get; set; }
        public string MsgText { get; set; }
        public DateTime Date { get; set; }
        public int ProductId { get; set; }
    }
}
