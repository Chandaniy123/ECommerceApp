using System;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Mail;
using System.Net;
using System.Reflection.Metadata.Ecma335;
using System.Security.Claims;
using System.Text;
using Dapper;
using Microsoft.IdentityModel.Tokens;
using Microsoft.VisualBasic;
using ShopWiseApi.Modal;
using static System.Net.Mime.MediaTypeNames;
using System.Collections.Specialized;
using Microsoft.AspNetCore.SignalR;
using ShopWiseApi.Review_Hub;

namespace ShopWiseApi.UserDataModel
{
    
    public class UserDataAccess : IuserDataAccess
    {
        private readonly IConfiguration configuration;
        private readonly string dbconnection;
        private readonly string dateformat;

        public UserDataAccess(IConfiguration configuration)
        {
            this.configuration = configuration;
            dbconnection = this.configuration["ConnectionStrings:DB"];
            dateformat = this.configuration["Constants:DateFormat"];
        }
        //All Using  Dapper

        // By - Akshat Saxena
        public  async Task<List<ProductCategory>> GetProductCategories()
        {
            using (IDbConnection dbConnections = new SqlConnection(dbconnection))
            {
                string sQuery = "select * from ProductCategories";
                dbConnections.Open();
                List<ProductCategory> products = (await dbConnections.QueryAsync<ProductCategory>(sQuery)).ToList();

                return products;
            }
        }

        public async Task<ProductCategory> GetProductCategoryById(int id)
        {


            using (IDbConnection dbConnection = new SqlConnection(dbconnection))
            {
                string sQuery = "select * from ProductCategories where CategoryId =@Id";
                dbConnection.Open();
                ProductCategory idProducts =await dbConnection.QueryFirstAsync<ProductCategory>(sQuery, new { Id = id });
                return idProducts;
            }

        }

        // By - Akshat Saxena
        public async Task<Offer> GetOffer(int id)
        {
            var offer = new Offer();
            using (IDbConnection dbConnection = new SqlConnection(dbconnection))
            {
                string sQuery = "select * from Offers where OfferId =@Id";
                dbConnection.Open();
                Offer searchOffer = await dbConnection.QueryFirstAsync<Offer>(sQuery, new { Id = id });
                return searchOffer;
            }
        }

        // By - Akshat Saxena
        public async  Task<List<ProductDetails>> GetProductsByCatagory(string category,int count)
        {
          
            var products = new List<ProductDetails>();
            using (IDbConnection connection = new SqlConnection(dbconnection))
            {
                string query = "SELECT TOP (@count) * FROM Products WHERE Category = @category ORDER BY newid();";

                products =(await connection.QueryAsync<ProductDetails>(query, new { count, category })).AsList();
            }

            return products;
        }

        // By - Akshat Saxena
        public async Task<bool> InsertUser(Users user)
        {

            using (IDbConnection connection = new SqlConnection(dbconnection))
            {
                connection.Open();

                string checkQuery = "SELECT COUNT(*) FROM Users WHERE Email = @Email;";
                int count =await connection.ExecuteScalarAsync<int>(checkQuery, new { Email = user.Email });
                if (count > 0)
                {
                    return false;
                }

                string insertQuery = "INSERT INTO Users (FirstName, LastName, Address, Mobile, Email, Password, CreatedAt, ModifiedAt, Role) " +
                                     "VALUES (@FirstName, @LastName, @Address, @Mobile, @Email, @Password, @CreatedAt, @ModifiedAt, @Role);";

                int rowsAffected = await connection.ExecuteAsync(insertQuery, new { FirstName =user.FirstName, LastName =user.LastName, Address=user.Address,Mobile=user.Mobile,
                    Email=user.Email,Password=user.Password,CreatedAt=user.CreatedAt,ModifiedAt=user.ModifiedAt,Role="user" }); // By - Chandani yadav
                if (rowsAffected > 0)
                {
                    EmialFunctionality(user.Email);
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }
       
        // By - Akshat Saxena
        public async Task<string> IsUserPresent(string email, string password)
        {
            Users user = new();

            using (IDbConnection connection = new SqlConnection(dbconnection))
            {
                connection.Open();

                string checkQuery = "SELECT COUNT(*) FROM Users WHERE Email = @Email AND Password = @Password;";
                int count =await connection.ExecuteScalarAsync<int>(checkQuery, new { Email = email, Password = password });
                if (count == 0)
                {
                    return "";
                }

                string selectQuery = "SELECT * FROM Users WHERE Email = @Email AND Password = @Password;";
                user =await connection.QueryFirstOrDefaultAsync<Users>(selectQuery, new { Email = email, Password = password });
              // int res= user.;
                if (user != null)
                {
                    string key = "MNU66iBl3T5rh6H52i69yjtjtyutiutuityi";
                    string duration = "60";
                    var symmetrickey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
                    var credentials = new SigningCredentials(symmetrickey, SecurityAlgorithms.HmacSha256);

                    var claims = new[]
                    {
                         new Claim("id", user.UserId.ToString()),
                         new Claim("firstName", user.FirstName),
                         new Claim("lastName", user.LastName),
                         new Claim("address", user.Address),
                         new Claim("mobile", user.Mobile),
                         new Claim("email", user.Email),
                         new Claim("createdAt", user.CreatedAt),
                         new Claim("modifiedAt", user.ModifiedAt),
                         new Claim("image",user.Image),
                         new Claim("role", user.Role)
                    };

                    var jwtToken = new JwtSecurityToken(
                        issuer: "localhost",
                        audience: "localhost",
                        claims: claims,
                        expires: DateTime.Now.AddMinutes(int.Parse(duration)),
                        signingCredentials: credentials);

                    return new JwtSecurityTokenHandler().WriteToken(jwtToken);
                }
                else
                {
                    return "";
                }
            }
        }

        // By Sachin Email
        public void EmialFunctionality(string UserEmail)
        {
            try
            {
                #region password
                string pass = "gcwfvqxzpsrxscff";
                #endregion
                MailMessage message = new MailMessage();
                SmtpClient smtp = new SmtpClient();
                message.From = new MailAddress("shopwise935@gmail.com");
                message.To.Add(new MailAddress(UserEmail));
                message.Subject = "Registration Successfully";
                message.IsBodyHtml = true; //to make message body as html
                message.Body = "Thank You For Register in our App!!!";
                smtp.Port = 587;
                smtp.Host = "smtp.gmail.com"; //for gmail host
                smtp.EnableSsl = true;
                smtp.UseDefaultCredentials = false;
                smtp.Credentials = new NetworkCredential("shopwise935@gmail.com", pass);
                smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                smtp.Send(message);
                Console.WriteLine("Sended");
            }
            catch
            {
                Console.WriteLine("Not Sended");

            }
        }

        // By - Akshat Saxena
        public async Task<ProductDetails> GetProduct(int id)
        {
            var product = new ProductDetails();
            using (IDbConnection connection = new SqlConnection(dbconnection))
            {
                connection.Open();

                string query = "SELECT * FROM Products WHERE ProductId = @ProductId;";
                product =await connection.QueryFirstOrDefaultAsync<ProductDetails>(query, new { ProductId = id });

                return product;
            }
        }








        //All Using Ado Concepts
        public async Task<Cart> GetCart(int cartid)
        {
            var cart = new Cart();
            using (SqlConnection connection = new(dbconnection))
            {
                SqlCommand command = new()
                {
                    Connection = connection
                };
                connection.Open();

                string query = "SELECT * FROM CartItems WHERE CartId=" + cartid + ";";
                command.CommandText = query;

                SqlDataReader reader = command.ExecuteReader();
                while (reader.Read())
                {
                    CartItem item = new()
                    {
                        Id = (int)reader["CartItemId"],
                        Product = await GetProduct((int)reader["ProductId"])
                    };
                    cart.CartItems.Add(item);
                }
                reader.Close();

                query = "SELECT * FROM Carts WHERE CartId=" + cartid + ";";
                command.CommandText = query;
                reader = command.ExecuteReader();
                while (reader.Read())
                {
                    cart.Id = cartid;
                    cart.User = await GetUser((int)reader["UserId"]);
                    cart.Ordered = bool.Parse((string)reader["Ordered"]);
                    cart.OrderedOn = (string)reader["OrderedOn"];
                }
                reader.Close();
            }
            return cart;
        }

        public async Task<bool> InsertCartItem(int userId, int productId)
        {
            using (SqlConnection connection = new(dbconnection))
            {
                SqlCommand command = new()
                {
                    Connection = connection
                };

                connection.Open();
                string query = "SELECT COUNT(*) FROM Carts WHERE UserId=" + userId + " AND Ordered='false';";
                command.CommandText = query;
                int count = (int)command.ExecuteScalar();
                if (count == 0)
                {
                    query = "INSERT INTO Carts (UserId, Ordered, OrderedOn) VALUES (" + userId + ", 'false', '');";
                    command.CommandText = query;
                    command.ExecuteNonQuery();
                }

                query = "SELECT CartId FROM Carts WHERE UserId=" + userId + " AND Ordered='false';";
                command.CommandText = query;
                int cartId = (int)command.ExecuteScalar();


                query = "INSERT INTO CartItems (CartId, ProductId) VALUES (" + cartId + ", " + productId + ");";
                command.CommandText = query;
                command.ExecuteNonQuery();
                return true;
            }
        }

        public async Task<Users> GetUser(int id)
        {
            var user = new Users();
            using (SqlConnection connection = new(dbconnection))
            {
                SqlCommand command = new()
                {
                    Connection = connection
                };

                string query = "SELECT * FROM Users WHERE UserId=" + id + ";";
                command.CommandText = query;

                connection.Open();
                SqlDataReader reader = command.ExecuteReader();
                while (reader.Read())
                {
                    user.UserId = (int)reader["UserId"];
                    user.FirstName = (string)reader["FirstName"];
                    user.LastName = (string)reader["LastName"];
                    user.Email = (string)reader["Email"];
                    user.Address = (string)reader["Address"];
                    user.Mobile = (string)reader["Mobile"];
                    user.Password = (string)reader["Password"];
                    user.CreatedAt = (string)reader["CreatedAt"];
                    user.ModifiedAt = (string)reader["ModifiedAt"];
                }
            }
            return user;
        }


        public async Task<Cart> GetActiveCartOfUser(int userid)
        {
            var cart = new Cart();
            using (SqlConnection connection = new(dbconnection))
            {
                SqlCommand command = new()
                {
                    Connection = connection
                };
                connection.Open();

                string query = "SELECT COUNT(*) From Carts WHERE UserId=" + userid + " AND Ordered='false';";
                command.CommandText = query;

                int count = (int)command.ExecuteScalar();
                if (count == 0)
                {
                    return cart;
                }

                query = "SELECT CartId From Carts WHERE UserId=" + userid + " AND Ordered='false';";
                command.CommandText = query;

                int cartid = (int)command.ExecuteScalar();

                query = "select * from CartItems where CartId=" + cartid + ";";
                command.CommandText = query;

                SqlDataReader reader = command.ExecuteReader();
                while (reader.Read())
                {
                    CartItem item = new()
                    {
                        Id = (int)reader["CartItemId"],
                        Product = await GetProduct((int)reader["ProductId"])
                    };
                    cart.CartItems.Add(item);
                }

                cart.Id = cartid;
                cart.User =await GetUser(userid);
                cart.Ordered = false;
                cart.OrderedOn = "";
            }
            return cart;
        }


        public async Task<List<Cart>> GetAllPreviousCartsOfUser(int userid)
        {
            var carts = new List<Cart>();
            using (SqlConnection connection = new(dbconnection))
            {
                SqlCommand command = new()
                {
                    Connection = connection
                };
                string query = "SELECT CartId FROM Carts WHERE UserId=" + userid + " AND Ordered='true';";
                command.CommandText = query;
                connection.Open();
                SqlDataReader reader = command.ExecuteReader();
                while (reader.Read())
                {
                    var cartid = (int)reader["CartId"];
                    carts.Add(await GetCart(cartid));
                }
            }
            return carts;
        }


        public async Task<List<PaymentMethod>> GetPaymentMethods()
        {
            var result = new List<PaymentMethod>();
            using (SqlConnection connection = new(dbconnection))
            {
                SqlCommand command = new()
                {
                    Connection = connection
                };

                string query = "SELECT * FROM PaymentMethods;";
                command.CommandText = query;

                connection.Open();

                SqlDataReader reader = command.ExecuteReader();
                while (reader.Read())
                {
                    PaymentMethod paymentMethod = new()
                    {
                        Id = (int)reader["PaymentMethodId"],
                        Type = (string)reader["Type"],
                        Provider = (string)reader["Provider"],
                        Available = bool.Parse((string)reader["Available"]),
                        Reason = (string)reader["Reason"]
                    };
                    result.Add(paymentMethod);
                }


            }
            return result;
        }

        public async Task<int> InsertOrder(OrderUser order)
        {
           // int value = 0;

          //  using (SqlConnection connection = new(dbconnection))
            //{
            //    SqlCommand command = new()
            //    {
            //        Connection = connection
            //    };

            //    string query = "INSERT INTO Orders (UserId, CartId, PaymentId, CreatedAt) values (@uid, @cid, @pid, @cat);";

            //    command.CommandText = query;
            //    command.Parameters.Add("@uid", System.Data.SqlDbType.Int).Value = order.User.UserId;
            //    command.Parameters.Add("@cid", System.Data.SqlDbType.Int).Value = order.Cart.Id;
            //    command.Parameters.Add("@cat", System.Data.SqlDbType.NVarChar).Value = order.CreatedAt;
            //    command.Parameters.Add("@pid", System.Data.SqlDbType.Int).Value = order.Payment.Id;

            //    connection.Open();
            //    value = command.ExecuteNonQuery();

            //    if (value > 0)
            //    {
            //        query = "UPDATE Carts SET Ordered='true', OrderedOn='" + DateTime.Now.ToString(dateformat) + "' WHERE CartId=" + order.Cart.Id + ";";
            //        command.CommandText = query;
            //        command.ExecuteNonQuery();

            //        query = "SELECT TOP 1 Id FROM Orders ORDER BY Id DESC;";
            //        command.CommandText = query;
            //        value = (int)command.ExecuteScalar();
            //    }
            //    else
            //    {
            //        value = 0;
            //    }
         //   }

            using (IDbConnection connection = new SqlConnection(dbconnection))
            {
                order.Date = DateTime.Now;
                connection.Open();
                string query = "INSERT INTO Order_tbl(UserId,ProductQuantity,TotslSum,Date)values( @UserId, @ProductQuantity, @TotslSum,@Date)";
                int res = await connection.ExecuteAsync(query, order);
                return res;

            }

            
        }


        public async Task<int> InsertPayment(PaymentofUser payment)
        {
            // int value = 0;
            //using (IDbConnection connection = new(dbconnection))
            //{
            //SqlCommand command = new()
            //{
            //    Connection = connection
            //};


            //command.CommandText = query;
            //command.Parameters.Add("@pmid", System.Data.SqlDbType.Int).Value = payment.PaymentMethod.Id;
            //command.Parameters.Add("@uid", System.Data.SqlDbType.Int).Value = payment.User.UserId;
            //command.Parameters.Add("@ta", System.Data.SqlDbType.NVarChar).Value = payment.TotalAmount;
            //command.Parameters.Add("@sc", System.Data.SqlDbType.NVarChar).Value = payment.ShipingCharges;
            //command.Parameters.Add("@ar", System.Data.SqlDbType.NVarChar).Value = payment.AmountReduced;
            //command.Parameters.Add("@ap", System.Data.SqlDbType.NVarChar).Value = payment.AmountPaid;
            //command.Parameters.Add("@cat", System.Data.SqlDbType.NVarChar).Value = payment.CreatedAt;

            //connection.Open();
            //value = command.ExecuteNonQuery();

            //if (value > 0)
            //{
            //    query = "SELECT TOP 1 Id FROM Payments ORDER BY Id DESC;";
            //    command.CommandText = query;
            //    value = (int)command.ExecuteScalar();
            //}
            //else
            //{
            //    value = 0;
            //}
            //  string query = "INSERT INTO Payment_tbl(PaymentId,UserId,TotalSum,PaymentMethod)values(@PaymentId, @UserId, @TotalSum, @PaymentMethod)";

            //   int res = await connection.ExecuteAsync(query, payment);

            //  return res;
          
            using (IDbConnection connection = new SqlConnection(dbconnection))
            {

                connection.Open();
                string query = "INSERT INTO Payment_tbl(UserId,TotalSum,PaymentMethod)values( @UserId, @TotalSum, @PaymentMethod)";
                int res = await connection.ExecuteAsync(query, payment);
                return res;

            }
        }

        public async Task<User_Cart> GetThisCartId(int userId, int productId)
        {
           User_Cart current_cart;
            User_Cart current_cart4;
            using (IDbConnection connection = new SqlConnection(dbconnection))
            {

                connection.Open();
              
                string Queries = "select COUNT(*) from User_cart where UserId=" + userId + " and ProductId ="+ productId;
                int count = await connection.ExecuteScalarAsync<int>(Queries);
                if (count == 1)
                {
                    string Queries1 = "select * from User_cart where UserId=" + userId + "and ProductId =" + productId;
                    current_cart = await connection.QuerySingleOrDefaultAsync<User_Cart>(Queries1);
                    return current_cart;
                }
                return null;

            }
        }

        public async Task IncreaseQuantity(int cartId)
        {
            using(IDbConnection connection = new SqlConnection(dbconnection))
            {
                connection.Open();
                User_Cart current_cart;
                string Queries = "select * from User_cart where CartId= " + cartId;
                current_cart = await connection.QuerySingleOrDefaultAsync<User_Cart>(Queries);

                int count = current_cart.Quantity + 1;

                string Querry = "update User_cart set Quantity=" + count + " Where CartId=" + cartId;

                int noOfRow = await connection.ExecuteScalarAsync<int>(Querry);


            }
        }

        public async  Task<bool> AddToCart(int userId, int productId, int quant)
        {
            using(IDbConnection connection =new SqlConnection(dbconnection))
            {
                User_Cart current_cart = new();
                current_cart.UserId = userId;
                current_cart.ProductId = productId;
                current_cart.Quantity = quant;
                string Queries = "insert into User_cart values(@UserId,@ProductId,@Quantity)";

                int noOfRow = await connection.ExecuteAsync(Queries, current_cart);

                if(noOfRow > 0)
                {
                    return true;
                }
                return false;

            }

        }

        public List<Shoping_Carts> GetuserCarts(int userId)
        {
            using(IDbConnection connection =new SqlConnection(dbconnection))
            {
                List<Shoping_Carts> current_Cart;
                string Query = "select  p1.* , u1.Quantity,u1.CartId from Products p1 join User_cart u1 on p1.ProductId=u1.ProductId where u1.UserId="+userId;
                current_Cart= connection.Query<Shoping_Carts>(Query).ToList();
                return current_Cart;

            }
        }

        public async Task<PaymentofUser> LastPayment(int userId)
        {
            using(IDbConnection connection =new SqlConnection(dbconnection))
            {
                PaymentofUser current_payment = new();

                string query = "SELECT TOP 1 * FROM Payment_tbl WHERE Userid =" + userId+"ORDER BY PaymentId DESC";

                current_payment = await connection.QuerySingleOrDefaultAsync<PaymentofUser>(query);

                return current_payment;
            }

        }

        public async Task<int> DeleteUserCart(int userId)
        {
            
            using(IDbConnection connection =new SqlConnection(dbconnection))
            {
                string Query = "delete from User_cart where UserId="+userId;
                int res = await connection.ExecuteAsync(Query);
                return res;
            }
            return 0;
        }

        public async Task<int> InsertOrderOfUser(OrderUser order)
        {
            
            using (IDbConnection connection = new SqlConnection(dbconnection))
            {
             
                string Query = "INSERT INTO Order_tbl(UserId,ProductQuantity,TotslSum) values( @UserId, @ProductQuantity, @TotslSum)";

                int res = await connection.ExecuteAsync(Query,order);
                return res;
            }
            
        }

        public async Task<List<OrderUser>> ViewOrder(int userId)
        {
           using(IDbConnection connection=new SqlConnection(dbconnection))
            {
                string query = "select * from Order_tbl where userId="+userId;
                List<OrderUser> users= new List<OrderUser>();
                users= (List<OrderUser>)await connection.QueryAsync<OrderUser>(query);
                return users;
            }
        }

        public async Task<bool> DeleteCarts(int cartId)
        {
            using(IDbConnection connection=new SqlConnection(dbconnection))
            {
                string query = "Delete from User_cart where CartId=" + cartId;
                int res = await connection.ExecuteAsync(query);
                if (res > 0)
                {
                    return true;
                }
                return false;
            }
        }

        public async Task<List<DisplayModel>> GetAllOrder()
        {
          using(IDbConnection connection =new SqlConnection(dbconnection))
            {
                string qUrey = "select DISTINCT(u1.UserId),u1.FirstName,u1.LastName,o1.Date from Users u1 join Order_tbl o1 on u1.UserId=o1.UserId";
                List<DisplayModel> res = (await connection.QueryAsync<DisplayModel>(qUrey)).ToList();
                return res;

            }
        }
    }
}
