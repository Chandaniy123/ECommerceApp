using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
using ShopWiseApi.Context;
using ShopWiseApi.Modal;
using ShopWiseApi.Review_Hub;
using ShopWiseApi.UserDataModel;

namespace ShopWiseApi.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class UserController : ControllerBase
    {
        readonly IuserDataAccess _iuserDataAccess;
        private readonly string DateFormat;
        private readonly IHubContext<ChatHub> _hubContext;
        private readonly ProductDbContext _context;
        public UserController(IuserDataAccess iuserDataAccess, IConfiguration configuration, IHubContext<ChatHub> hubContext, ProductDbContext context)
        {
            _iuserDataAccess = iuserDataAccess;
            DateFormat = configuration["Constants:DateFormat"];
            _hubContext = hubContext;
            _context = context;
        }
        [HttpGet("GetCategoryList")]
        public async Task <IActionResult> GetCategoryList()
        {
            var result = await _iuserDataAccess.GetProductCategories();
            return Ok(result);
        }


        [HttpGet("GetProductsByCatagory")]
        public async Task< IActionResult> GetProductsByCatagory(string category, int count)
        {
            var result = await _iuserDataAccess.GetProductsByCatagory(category, count);
            return Ok(result);
        }


        [HttpGet("GetProductID/{id}")]
        public async Task<IActionResult> GetProductById(int id)
        {
            var result = await _iuserDataAccess.GetProduct(id);
            return Ok(result);
        }
        [AllowAnonymous]
        [HttpPost("RegisterUser")]
        public async Task<IActionResult> RegisterUser([FromBody] Users user)
        {
         
            user.CreatedAt = DateTime.Now.ToString(DateFormat);
            user.ModifiedAt = DateTime.Now.ToString(DateFormat);

            var result = await _iuserDataAccess.InsertUser(user);

            string? message;
            if (result) {
                message = "inserted";
                _iuserDataAccess.EmialFunctionality(user.Email);
            }

            else message = "email not available";
            return Ok(message);
        }
        [AllowAnonymous]
        [HttpPost("LoginUser")]
        public async Task<IActionResult> LoginUser(string Email,String Password)
        {
            var token = await _iuserDataAccess.IsUserPresent(Email, Password);
            if (token == "") token = "invalid";
            return Ok(token);
        }
        [AllowAnonymous]
        [HttpGet("Email")]


        public  IActionResult Email(string UserEmail)
        {
            _iuserDataAccess.EmialFunctionality(UserEmail);
            return Ok(true);

            
        }

        [HttpPost("InsertCartItem/{userid}/{productid}")]
        public async Task<IActionResult> InsertCartItem(int userid, int productid)
        {
            var result = await _iuserDataAccess.InsertCartItem(userid, productid);
            return Ok(result ? "inserted" : "not inserted");
        }

        [HttpGet("GetActiveCartOfUser/{id}")]
        public async Task<IActionResult> GetActiveCartOfUser(int id)
        {
            var result = await _iuserDataAccess.GetActiveCartOfUser(id);
            return Ok(result);
        }

        [HttpGet("GetAllPreviousCartsOfUser/{id}")]
        public async Task< IActionResult> GetAllPreviousCartsOfUser(int id)
        {
            var result = await _iuserDataAccess.GetAllPreviousCartsOfUser(id);
            return Ok(result);
        }


        [HttpGet("GetPaymentMethods")]
        public async Task<IActionResult> GetPaymentMethods()
        {
            var result = await _iuserDataAccess.GetPaymentMethods();
            return Ok(result);
        }

        [HttpPost("InsertPayment")]
        public async Task< IActionResult> InsertPayment(PaymentofUser payments)
        {

            int res =await _iuserDataAccess.InsertPayment(payments);
            if (res > 0)
            {
                return Ok(true);
            }
            return Ok(false);
        }

        [HttpGet("GetLastPayment")]
        public async Task<PaymentofUser> GetLastPayment(int userId)
        {

            PaymentofUser res = await _iuserDataAccess.LastPayment(userId);
            if (res!=null)
            {
                return res;
            }
            return null;
        }

        [HttpPost("InsertOrder")]
        public async Task< IActionResult> InsertOrder(OrderUser order)
        {
          
            var id = await _iuserDataAccess.InsertOrder(order);
            return Ok(id.ToString());
        }



        [HttpPost("InsertInCart")]
        public async Task<IActionResult> InsertInCart(int userId,int productId)
        {
            int quant = 1;
            User_Cart ifPresent = await _iuserDataAccess.GetThisCartId(userId, productId);

            if (ifPresent != null)
            {
               await _iuserDataAccess.IncreaseQuantity(ifPresent.CartId);
             return    Ok(true);

            }

            else
            {
                 bool result = await _iuserDataAccess.AddToCart(userId, productId, quant);
                return Ok(result);

            }
        }


        [HttpGet("GetUserCart")]

        public async Task<List<Shoping_Carts>> ShowsCarts(int userId)
        {

            return  _iuserDataAccess.GetuserCarts(userId);
           
        }
        [Route("send")]                                           //path looks like this: https://localhost:44379/api/chat/send
        [HttpPost]
        public IActionResult SendRequest(MessageDto msg)
        {
            var message = new MessageDto {User = msg.User, MsgText = msg.MsgText, Date = DateTime.UtcNow, ProductId = msg.ProductId };
            _context.Reviews.Add(message);
            _context.SaveChanges();
            _hubContext.Clients.All.SendAsync("ReceiveOne", msg.User, msg.MsgText, msg.Date, msg.ProductId);
            return Ok(true);
        }
        [Route("GetChats")]
        [HttpGet]
        public IActionResult GetChats(int productId)
        {
            List<MessageDto> chats = _context.Reviews.Where(x => x.ProductId == productId).ToList();
            return Ok(chats);
        }

        [Route("DeleteUserCart")]
        [HttpDelete]
        public async Task<IActionResult> DeleteUserCart(int userId)
        {
            // List<MessageDto> chats = _context.Reviews.Where(x => x.ProductId == productId).ToList();
            int res = await _iuserDataAccess.DeleteUserCart(userId);

            return Ok(true);
        }

        [Route("InsertOrderOfUser")]
        [HttpPost]
        public async Task<IActionResult> InsertOrderOfUser(OrderUser order)
        {
           
            int res = await _iuserDataAccess.InsertOrderOfUser(order);

            return Ok(true);
        }
        [Route("ViewOrder")]
        [HttpGet]
        public async Task<IActionResult> ViewOrder(int userId)
        {

            List<OrderUser> Userorder = await _iuserDataAccess.ViewOrder(userId);

            return Ok(Userorder);
        }

        [Route("DeleteCart")]
        [HttpDelete]
        public async Task<IActionResult> DeleteCart(int orderId)
        {

           bool res = await _iuserDataAccess.DeleteCarts(orderId);

            return Ok(res);
        }


        [Route("GetAllOrder")]
        [HttpGet]
        public async Task<IActionResult> GetAllOrder()
        {

            List<DisplayModel> orders= await _iuserDataAccess.GetAllOrder();

            return Ok(orders);
        }


    }
}
