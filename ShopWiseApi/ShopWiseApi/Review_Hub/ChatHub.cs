using Microsoft.AspNetCore.SignalR;

namespace ShopWiseApi.Review_Hub
{
    public class ChatHub:Hub
    {
        public Task SendMessage1(string user, string message, DateTime date)
        {
            return Clients.All.SendAsync("ReceiveOne", user, message, date = DateTime.UtcNow);
        }
    }
}
