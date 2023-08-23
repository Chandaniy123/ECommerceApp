using MediatR;
using ShopWiseApi.AdminDataAccess;
using ShopWiseApi.Exception;
using ShopWiseApi.Modal;
using ShopWiseApi.Queries;
using ShopWiseApi.Repository;

namespace ShopWiseApi.Handler
{
    public class GetProductByIdHandler : IRequestHandler<GetProductByIdQueries, ProductDetails>
    {
       
        private readonly IadminDataAccess _iadminDataAccess;
        private readonly IProductRepository _productRepository;
        public GetProductByIdHandler( IadminDataAccess iadminDataAccess,IProductRepository productRepository)
        {
           
            _iadminDataAccess = iadminDataAccess;
            _productRepository = productRepository;
        }
        public async Task<ProductDetails> Handle(GetProductByIdQueries request, CancellationToken cancellationToken)
        {
            ProductDetails productExistStatus = await _productRepository.GetProductById(request.Id);
            //ProductDetails productExistStatus = await _iadminDataAccess.GetProductById(request.Id);
            if (productExistStatus != null)
            {
                return productExistStatus;
            }
            else
            {
                throw new ProductNullExceptions($"ProductId {request.Id} Is Not Present Enter Valid Id");
            }

        }
    }
}
