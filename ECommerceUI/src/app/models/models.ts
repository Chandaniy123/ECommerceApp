export interface SuggestedProduct {
  banerimage: string;
  category: Category;
}
export interface Option {
  backgroundColor: string;
  buttonColor: string;
  headingColor: string;
  label: string;
  value: string;
}


export interface NavigationItem {
  category: string;
  subcategories: string[];
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  mobile: string;
  password: string;
  createdAt: string;
  modifiedAt: string;
  image:string;
  role:string;
}
export class MessageDto {
  public user: string = '';
public msgText: string = '';
public Date?:Date;
public ProductId!:number;
}



// #region Product

export interface Offer {
  id: number;
  title: string;
  discount: number;
}

export interface Category {
  id: number;
  category: string;
  subCategory: string;
}

export interface Product {
  productId: number;
  productName: string;
  description: string;
  category: string;
  offerRate: number;
  price: number;
  image: string;
}

export interface Review {
  id: number;
  user: User;
  product: Product;
  value: string;
  createdAt: string;
}

// #endregion

// #region Cart

export interface CartItem {
  id: number;
  product: Product;
}

export interface Cart {
  id: number;
  user: User;
  cartItems: CartItem[];
  ordered: boolean;
  orderedOn: string;
}

// #endregion

// #region Payment and Orders

export interface PaymentMethod {
  id: number;
  type: string;
  provider: string;
  available: boolean;
  reason: string;
}

export interface Payment {
  paymentMethodId: number;
  user: User;
  paymentMethod: PaymentMethod;
  totalAmount: number;
  shipingCharges: number;
  amountReduced: number;
  amountPaid: number;
  createdAt: string;
}

export interface Order {
  id: number;
  user: User;
  cart: Cart;
  payment: Payment;
  createdAt: string;
}

export interface Shoping_Carts  {
  cartId:number
  productId: number;
  productName: string;
  description: string;
  category: string;
  offerRate: number;
  price: number;
  image: string;
  quantity:number;

}


export interface User_Payment{
  paymentId:number
  userId:number
  totalSum:string
  paymentMethod:string
}

export class User_Order{
orderId?:number
userId?:number
productQuantity?:number
totslSum?:number
date?:Date
}

export class Order_Model{
  userId?:number
  firstName?:string
  lastName?:string

  date?:Date
  }


// #endregion