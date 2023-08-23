import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs';
import {
  Cart,
  Category,
  Order,
  Order_Model,
  Payment,
  PaymentMethod,
  Product,
  Shoping_Carts,
  User,
  User_Order,
  User_Payment,
} from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  
  

 
  
  
  baseurl = 'https://localhost:7149/api/Shopping/';

  constructor(private http: HttpClient) {}

 

  GetAllProducts() {
    return this.http.get<Product[]>("https://localhost:44325/api/Admin/DisplaysAllProducts");
  }
  getProducts(category: string, count: number) {
    return this.http.get<Product[]>("https://localhost:44325/api/User/GetProductsByCatagory?category="+category+"&count="+count);
     
  }

  getProduct(id: string) {
    let url = "https://localhost:44325/api/User/GetProductID/" + id;
    return this.http.get(url);
  }

  registerUser(user: User) {
    let url = "https://localhost:44325/api/User/RegisterUser";
    return this.http.post(url, user, { responseType: 'text' });
  }

  loginUser(email: string, password: string) {
    let url = "https://localhost:44325/api/User/LoginUser?Email="+email+"&Password="+password;
    return this.http.post(
      url,
      { Email: email, Password: password },
      { responseType: 'text' }
    );
  }

  submitReview(userid: number, productid: number, review: string) {
    let obj: any = {
      User: {
        Id: userid,
      },
      Product: {
        Id: productid,
      },
      Value: review,
    };

    let url = this.baseurl + 'InsertReview';
    return this.http.post(url, obj, { responseType: 'text' });
  }

  getAllReviewsOfProduct(productId: number) {
    let url = this.baseurl + 'GetProductReviews/' + productId;
    return this.http.get(url);
  }

  addToCart(userid: number, productid: number) {
    console.log(userid, productid);
    
    let url = "https://localhost:44325/api/User/InsertInCart?userId="+userid+"&productId="+productid;
    return this.http.post(url, null, { responseType: 'text' });
  }

  getActiveCartOfUser(userid: number) {
    let url = 'https://localhost:44325/api/User/GetUserCart?userId='+userid;
    return this.http.get<Shoping_Carts[]>(url);
  }

  getAllPreviousCarts(userid: number) {
    let url = "https://localhost:44325/api/User/" + 'GetAllPreviousCartsOfUser/' + userid;
    return this.http.get(url);
  }

  getPaymentMethods() {
    let url = 'https://localhost:44325/api/User/GetPaymentMethods';
    return this.http.get<PaymentMethod[]>(url);
  }

  insertPayment(payment: User_Payment) {
    return this.http.post<boolean>('https://localhost:44325/api/User/InsertPayment', payment)
  }

  insertOrder(order: User_Order) {
    return this.http.post('https://localhost:44325/api/User/InsertOrder', order);
  }

  GetCartCounts(id: any) {
    return this.http.get<Shoping_Carts[]>('https://localhost:44325/api/User/GetUserCart?userId='+id);
  }

  UserOder(order_user: User_Order) {
    return this.http.post<boolean>('https://localhost:44325/api/User/InsertOrder',
    {
      "orderId": 0,
      "userId": order_user.userId,
      "productQuantity": order_user.productQuantity,
      "totslSum": order_user.totslSum
    })
  }

  getUserOrder(id: number) {
   return this.http.get<User_Order[]>('https://localhost:44325/api/User/ViewOrder?userId='+id)
  }

  DeleteCartOfUser(orderId: number) {
  return this.http.delete<boolean>('https://localhost:44325/api/User/DeleteCart?orderId='+orderId);
  }

  DisplaysOrder() {
    return this.http.get<Order_Model[]>('https://localhost:44325/api/User/GetAllOrder')
   }
}
