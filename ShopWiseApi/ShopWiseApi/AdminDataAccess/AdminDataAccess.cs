using Dapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
using ShopWiseApi.Context;
using ShopWiseApi.Modal;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;

namespace ShopWiseApi.AdminDataAccess
{
    public class AdminDataAccess:IadminDataAccess
    {
        private readonly IConfiguration configuration;
        private readonly string dbconnection;
        private readonly string dateformat;
       
        public AdminDataAccess(IConfiguration configuration)
        {
            this.configuration = configuration;
            dbconnection = this.configuration["ConnectionStrings:DB"];
            dateformat = this.configuration["Constants:DateFormat"];
            //_productDbContext = productDbContext;
        }

        public bool AddProduct(ProductDetails product)
        {
            using (SqlConnection connection = new SqlConnection(dbconnection))
            {
                connection.Open();

                string query = @"
            INSERT INTO Products
            VALUES (@ProductName, @Description, @Category, @OfferRate, @Price, @Image);";

                SqlCommand command = new SqlCommand(query, connection);
                command.Parameters.AddWithValue("@ProductName", product.ProductName);
                command.Parameters.AddWithValue("@Description", product.Description);
                command.Parameters.AddWithValue("@Category", product.Category);
                command.Parameters.AddWithValue("@OfferRate", product.OfferRate);
                command.Parameters.AddWithValue("@Price", product.Price);
                command.Parameters.AddWithValue("@Image", product.Image);

                int rowsAffected = command.ExecuteNonQuery();

                return rowsAffected > 0;
            }
        }

       

        public bool DeleteProduct(int productId)
        {
            using (SqlConnection connection = new SqlConnection(dbconnection))
            {
                connection.Open();

                string query = "DELETE FROM Products WHERE ProductId = @ProductId;";

                SqlCommand command = new SqlCommand(query, connection);
                command.Parameters.AddWithValue("@ProductId", productId);

                int rowsAffected = command.ExecuteNonQuery();

                return rowsAffected > 0;
            }
        }
        //public async Task<ProductDetails> GetProductById(int id)
        //{
        //    return await _productDbContext.Products.Where(product => product.ProductId == id).FirstOrDefaultAsync();
        //}

        //public async Task<bool> UpdateProductAsync(ProductDetails productDetails)
        //{
        //    _productDbContext.Products.Update(productDetails);
        //    return await _productDbContext.SaveChangesAsync() == 1 ? true : false;
        //}

        public List<ProductDetails> GetAllProducts()
        {
            using (IDbConnection dbConnection = new SqlConnection(dbconnection))
            {
                string sQuery = "select * from Products ORDER BY newid();";
                dbConnection.Open();
                List<ProductDetails> allProducts = dbConnection.Query<ProductDetails>(sQuery).ToList();
                return allProducts;
            }
        }

        public bool InsertCartItem(int userId, int productId)
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

        public async Task<int> OrderCount()
        {
            using (IDbConnection connection = new SqlConnection(dbconnection))
            {
                string qUery = "select COUNT(DISTINCT(u1.UserId)) from Users u1 join Order_tbl o1 on u1.UserId=o1.UserId";
                int res = (int)await connection.ExecuteScalarAsync(qUery);
                return res;
            }
        }

        public async Task<int> TotalSum()
        {
           using(IDbConnection connection =new SqlConnection(dbconnection))
            {
                string qUery = "select sum(TotslSum) from Order_tbl";
                int res= (int)await connection.ExecuteScalarAsync(qUery);
                return res;
            }
        }


        public async Task<int> CountOfActiveUser()
        {
            using (IDbConnection connection = new SqlConnection(dbconnection))
            {
                string qUery = "select Count(*) from Users";
                int count = (int)await connection.ExecuteScalarAsync(qUery);

                return count;
            }
        }
    }
}
