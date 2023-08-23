import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './UserComponent/UserDashBoard/product/product.component';

import { HomeComponent } from './FrontPage/home/home.component';
import { ProductsComponent } from './UserComponent/UserDashBoard/products/products.component';
import { ProductDetailsComponent } from './UserComponent/UserDashBoard/product-details/product-details.component';
import { CartComponent } from './UserComponent/UserDashBoard/cart/cart.component';
import { OrderComponent } from './UserComponent/UserDashBoard/order/order.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './FrontPage/header/header.component';
import { FooterComponent } from './FrontPage/footer/footer.component';

import { OpenProductsDirective } from './directives/open-products.directive';
import { OpenProductDetailsDirective } from './directives/open-product-details.directive';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { AboutusComponent } from './FrontPage/aboutus/aboutus.component';

import { Home2Component } from './FrontPage/Main/home2.component';
import { AdmindashboardComponent } from './Admin/admindashboard/admindashboard.component';
import { GooglemapComponent } from './FrontPage/googlemap/googlemap.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { EditprofileComponent } from './UserComponent/UserDashBoard/editprofile/editprofile.component';
import { AiimagegeneratorComponent } from './UserComponent/UserDashBoard/aiimagegenerator/aiimagegenerator.component'
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SpinnerInterceptor } from './spinner.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { DisplaysAllProductsComponent } from './Admin/displays-all-products/displays-all-products.component';
import { EditProductsComponent } from './Admin/edit-products/edit-products.component';
import { AddProductsComponent } from './Admin/add-products/add-products.component';

import { UserCartsComponent } from './UserComponent/UserDashBoard/user-carts/user-carts.component';
import { SignupComponent } from './UserComponent/UserDashBoard/signup/signup.component';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatToolbarModule } from "@angular/material/toolbar";

import { ChatComponent } from './Components/chat/chat.component';


import { EditAdminProfileComponent } from './Admin/edit-admin-profile/edit-admin-profile.component';
import { BillComponent } from './UserComponent/UserDashBoard/bill/bill.component';
import { SuggestedProductsComponent } from './UserComponent/UserDashBoard/suggested-products/suggested-products.component';
import { UsersComponent } from './UserComponent/UserDashBoard/users/users.component';
import { TypesComponent } from './FrontPage/types/types.component';
import { ProductpromosionComponent } from './FrontPage/productpromosion/productpromosion.component';
import { ContactusComponent } from './FrontPage/contactus/contactus.component';
import { PaymentGateWayComponent } from './Payment/payment-gate-way/payment-gate-way.component';
import { DeleteConfirmationComponent } from './UserComponent/UserDashBoard/delete-confirmation/delete-confirmation.component';
import { VideoPromosionComponent } from './FrontPage/video-promosion/video-promosion.component';
import { ProductCategoriesComponent } from './UserComponent/UserDashBoard/product-categories/product-categories.component';





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    OpenProductsDirective,
    OpenProductDetailsDirective,
    AboutusComponent,
    ProductComponent,
    OrderComponent,
    ProductDetailsComponent,
    ProductsComponent,
    EditAdminProfileComponent,
    AiimagegeneratorComponent,
    BillComponent,
    CartComponent,
    EditprofileComponent,
    OrderComponent,
    SignupComponent,
    EditProductsComponent,
    UserCartsComponent,
    UsersComponent,
    Home2Component,
    AdmindashboardComponent,
    GooglemapComponent,
    EditprofileComponent,
    AiimagegeneratorComponent,
    DisplaysAllProductsComponent,
    EditProductsComponent,
    AddProductsComponent,
    TypesComponent,
    ProductpromosionComponent,
    HeaderComponent,
    UserCartsComponent,
    SignupComponent,
    ChatComponent,
    EditAdminProfileComponent,
    ChatComponent,
    ContactusComponent,
    PaymentGateWayComponent,
    DeleteConfirmationComponent,
    VideoPromosionComponent,
    ProductCategoriesComponent,


  
  
    
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    GoogleMapsModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('user');
        },
        allowedDomains: ['localhost:7149'],
      },
    }),
    NgxSpinnerModule,
    BrowserAnimationsModule
    
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
