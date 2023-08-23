
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShopWiseApi.AdminDataAccess;
using ShopWiseApi.Command;
using ShopWiseApi.Exception;
using ShopWiseApi.Modal;
using ShopWiseApi.Queries;

namespace ShopWiseApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IadminDataAccess _iadminDataAccess;
        private readonly IMediator _mediator;
        public AdminController( IMediator mediator, IadminDataAccess iadminDataAccess)
        {
            _mediator = mediator;
            _iadminDataAccess = iadminDataAccess;
        }
        [HttpGet]
        [Route("GetproductById/{id:int}")]
        public async Task<ActionResult> GetProductByIdAsync(int id)
        {
            try
            {
                var product = await _mediator.Send(new GetProductByIdQueries() { Id = id });
                return Ok(product);
            }
            catch (ProductNullExceptions pne)
            {
                return StatusCode(500, pne.Message);
            }

        }
        [HttpPut]
        [Route("Update/{id}")]
        public async Task<ActionResult> UpdateStudentAsync(int id, ProductDetails product)
        {
            product.ProductId = id;
            try
            {
                bool isStudentDetailUpdated = await _mediator.Send(new UpdateProductCommand(
               product.ProductId,
               product.ProductName,
               product.Description,
               product.Category,
               product.OfferRate,
               product.Price,
               product.Image));
                return Ok(isStudentDetailUpdated);
            }
            catch (ProductNullExceptions pne)
            {
                return StatusCode(500, pne.Message);
            }

        }
        [Route("AddProduct")]
        [HttpPost]

        public ActionResult AddProduct(ProductDetails product)
        {

            bool addproducttatus = _iadminDataAccess.AddProduct(product);
            return Ok(addproducttatus);
        }

        [Route("DeleteProduct/{productId}")]
        [HttpDelete]
        public ActionResult DeleteProduct(int productId)
        {
            bool deleteProductStatus = _iadminDataAccess.DeleteProduct(productId);
            return Ok(deleteProductStatus);
        }


        [Route("DisplaysAllProducts")]
        [HttpGet]

        public ActionResult DisplaysAllProducts()
        {
            List<ProductDetails> allproduct = _iadminDataAccess.GetAllProducts();
           return  Ok(allproduct);
        }


        [Route("TotalSum")]
        [HttpGet]
        public async Task<IActionResult> TotalSum()
        {

            double res = await _iadminDataAccess.TotalSum();
            return Ok(res);
        }



        [Route("CountOfActiveUser")]
        [HttpGet]
        public async Task<IActionResult> CountOfActiveUser()
        {

            int res = await _iadminDataAccess.CountOfActiveUser();
            return Ok(res);
        }



        [Route("OrderCount")]
        [HttpGet]
        public async Task<IActionResult> OrderCount()
        {

            int res = await _iadminDataAccess.OrderCount();
            return Ok(res);
        }

    }
}
