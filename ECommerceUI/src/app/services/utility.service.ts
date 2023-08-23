import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subject, window } from 'rxjs';
import { Cart, Payment, Product, Shoping_Carts, User } from '../models/models';
import { NavigationService } from './navigation.service';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
 
  changeCart = new Subject();
  router: any;

  constructor(
    private navigationService: NavigationService,
    private jwt: JwtHelperService,
    private http:HttpClient
  ) {}

  applyDiscount(price: number, discount: number): number {
    let finalPrice: number = price - price * (discount / 100);
    return finalPrice;
  }

  // JWT Helper Service : npm install @auth0/angular-jwt

  getUser(): User {
    let token = this.jwt.decodeToken();
    let user: User = {
      id: token.id,
      firstName: token.firstName,
      lastName: token.lastName,
      address: token.address,
      mobile: token.mobile,
      email: token.email,
      password: '',
      createdAt: token.createdAt,
      modifiedAt: token.modifiedAt,
      image:token.image,
      role:token.role
    };

    localStorage.setItem('userId', user.id.toString());
    return user;
  }

  setUser(token: string) {
    localStorage.setItem('user', token);
   // location.reload();
  }

  isLoggedIn() {
    
    return localStorage.getItem('user') ? true : false;
   
  }

  logoutUser() {
    localStorage.removeItem('user');
    location.reload();
  }

  addToCart(product: Product) {
    let productid = product.productId;
    let userid = this.getUser().id;

    this.navigationService.addToCart(userid, productid).subscribe((res) => {
      if (res.toString() === 'inserted') this.changeCart.next(1);
      Swal.fire(
        'cart inserted',
        'You clicked the button!',
        'success'
      )
     
    });
  }

  calculatePayment(cart: Shoping_Carts[], payment: Payment) {
    payment.totalAmount = 0;
    payment.amountPaid = 0;
    payment.amountReduced = 0;

    for (let cartitem of cart ) {
      payment.totalAmount += cartitem.price;

      payment.amountReduced +=
        cartitem.price -
        this.applyDiscount(
          cartitem.price,
          cartitem.offerRate
        );

      payment.amountPaid += this.applyDiscount(
        cartitem.price,
        cartitem.offerRate
      );
    }

    if (payment.amountPaid > 50000) payment.shipingCharges = 2000;
    else if (payment.amountPaid > 20000) payment.shipingCharges = 1000;
    else if (payment.amountPaid > 5000) payment.shipingCharges = 500;
    else payment.shipingCharges = 200;
  }

  calculatePricePaid(cart: Cart) {
    let pricepaid = 0;
    for (let cartitem of cart.cartItems) {
      pricepaid += this.applyDiscount(
        cartitem.product.price,
        cartitem.product.offerRate
      );
    }
    return pricepaid;
  }


  GetCartCount():any{
    let user :User
    user=this.getUser()
   

  

  }


}
