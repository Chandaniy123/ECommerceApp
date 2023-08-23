import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './UserComponent/UserDashBoard/cart/cart.component';
import { HomeComponent } from './FrontPage/home/home.component';
import { OrderComponent } from './UserComponent/UserDashBoard/order/order.component';

import { ProductDetailsComponent } from './UserComponent/UserDashBoard/product-details/product-details.component';
import { ProductsComponent } from './UserComponent/UserDashBoard/products/products.component';
import { Home2Component } from './FrontPage/Main/home2.component';
import { AdmindashboardComponent } from './Admin/admindashboard/admindashboard.component';

import { GooglemapComponent } from './FrontPage/googlemap/googlemap.component';
import { EditprofileComponent } from './UserComponent/UserDashBoard/editprofile/editprofile.component';
import { AiimagegeneratorComponent } from './UserComponent/UserDashBoard/aiimagegenerator/aiimagegenerator.component';
import { DisplaysAllProductsComponent } from './Admin/displays-all-products/displays-all-products.component';
import { EditProductsComponent } from './Admin/edit-products/edit-products.component';
import { AddProductsComponent } from './Admin/add-products/add-products.component';
import { UsersComponent } from './UserComponent/UserDashBoard/users/users.component';
import { BillComponent } from './UserComponent/UserDashBoard/bill/bill.component';
import { UserCartsComponent } from './UserComponent/UserDashBoard/user-carts/user-carts.component';

import { SignupComponent } from './UserComponent/UserDashBoard/signup/signup.component';
import { ChatComponent } from './Components/chat/chat.component';
import { EditAdminProfileComponent } from './Admin/edit-admin-profile/edit-admin-profile.component';
import { PaymentGateWayComponent } from './Payment/payment-gate-way/payment-gate-way.component';
import { ProductCategoriesComponent } from './UserComponent/UserDashBoard/product-categories/product-categories.component';



const routes: Routes = [
  { path: '', component: Home2Component },
 {path: 'Admindashboard', component:AdmindashboardComponent},
 {path :'Users', component:UsersComponent},
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'product-details', component: ProductDetailsComponent },
  { path: 'carts', component: UserCartsComponent },
  { path: 'orders', component: OrderComponent },
  { path: 'Dispalys_products',component:DisplaysAllProductsComponent},
  {path: 'user-carts', component: UserCartsComponent},
{path:'edit/:id',component:EditProductsComponent},
{path:'AddProducts',component:AddProductsComponent},
{path:'Bill',component:BillComponent},
  {path: 'editprofile/Aiimagegenerator', component: AiimagegeneratorComponent},
 {path:'Signup',component:SignupComponent},
  { path: 'editprofile', component: EditprofileComponent },
  {path:'edit-admin-profile', component:EditAdminProfileComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
 {path:'productCategory', component:ProductCategoriesComponent},
  {path: "googlemaps",component:GooglemapComponent},
  { path:"product-details/Review",component:ChatComponent},
  {path: "Payment",component:PaymentGateWayComponent}
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
