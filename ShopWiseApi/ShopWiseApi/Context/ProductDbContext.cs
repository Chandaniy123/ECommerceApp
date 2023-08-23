using Microsoft.EntityFrameworkCore;
using ShopWiseApi.Modal;
using System.Collections.Generic;

namespace ShopWiseApi.Context
{
    public class ProductDbContext:DbContext
    {
        public ProductDbContext(DbContextOptions<ProductDbContext> option) : base(option)
        {
        }
        public DbSet<ProductDetails> Products { get; set; }
        public DbSet<MessageDto> Reviews { get; set; }

    }
}
