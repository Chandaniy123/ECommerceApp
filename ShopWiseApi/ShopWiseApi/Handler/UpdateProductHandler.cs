using MediatR;
using Microsoft.AspNetCore.Authentication;
using ShopWiseApi.AdminDataAccess;
using ShopWiseApi.Command;
using ShopWiseApi.Exception;
using ShopWiseApi.Modal;
using ShopWiseApi.Repository;

namespace ShopWiseApi.Handler
{
    public class UpdateProductHandler:IRequestHandler<UpdateProductCommand,bool>
    {
        
        private readonly IadminDataAccess _iadminDataAccess;
        private readonly IProductRepository _productRepository;
        public UpdateProductHandler( IadminDataAccess iadminDataAccess, IProductRepository productRepository)
        {
            
            _iadminDataAccess = iadminDataAccess;
            _productRepository = productRepository;
        }
        public async Task<bool> Handle(UpdateProductCommand request, CancellationToken cancellationToken)
        {
            ProductDetails productDetails = await _productRepository.GetProductById(request.ProductId);
            //ProductDetails productDetails = await _iadminDataAccess.GetProductById(request.ProductId);
            if (productDetails != null)
            {
                productDetails.ProductName = request.ProductName;
                productDetails.Description = request.Description;
                productDetails.Category = request.Category;
                productDetails.OfferRate = request.OfferRate;
                productDetails.Price = request.Price;
                productDetails.Image = request.Image;
                return await  _productRepository.UpdateProductAsync(productDetails);//_iadminDataAccess.UpdateProductAsync(productDetails);
            }
            else
            {
                throw new ProductNullExceptions($"ProductId {request.ProductId} Is Not Present Enter Valid Id");
            }
        }
    }
}
