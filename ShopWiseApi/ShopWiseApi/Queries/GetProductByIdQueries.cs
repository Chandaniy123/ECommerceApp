using MediatR;
using ShopWiseApi.Modal;

namespace ShopWiseApi.Queries
{
    public class GetProductByIdQueries : IRequest<ProductDetails>
    {
        public int Id { get; set; }
    }
}
