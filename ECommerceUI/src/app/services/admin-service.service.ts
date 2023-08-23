import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  Cart,
  Category,
  Order,
  Payment,
  PaymentMethod,
  Product,
  Shoping_Carts,
  User,
  User_Payment,
} from '../models/models';
@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {



  
  
 

  
 
  

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<Product[]>('https://localhost:44325/api/Admin/DisplaysAllProducts');
  }

  addProducts(product: Product) {
    return this.http.post<boolean>('https://localhost:44325/api/Admin/AddProduct', product);
  }

  getproductbyId(id: string) {
    return this.http.get<Product>('https://localhost:44325/api/Admin/GetproductById/'+ id);
  }

  editproduct(productId: number, product: Product) {
    return this.http.put<boolean>('https://localhost:44325/api/Admin/Update/'+ productId, product);
  }

  deleteproduct(productId: number) {
   return this.http.delete<boolean>('https://localhost:44325/api/Admin/DeleteProduct/'+ productId);
  }

  GetUser_Carts(id:any) {
    return this.http.get<Shoping_Carts[]>('https://localhost:44325/api/User/GetUserCart?userId='+id);
  }

  getlastPayment(id: number) {
    return this.http.get<User_Payment>('https://localhost:44325/api/User/GetLastPayment?userId='+id);
  }

  DeleteCart(id: number) {
   return this.http.delete<boolean>('https://localhost:44325/api/User/DeleteUserCart?userId='+id);
  }

  totalUser() {
    return this.http.get<number>('https://localhost:44325/api/Admin/CountOfActiveUser')
  }
 
  activeCount() {
    return this.http.get<number>('https://localhost:44325/api/Admin/OrderCount')
  }

  GetAllTotalSum() {
    return this.http.get<number>(' https://localhost:44325/api/Admin/TotalSum')
  }

}
