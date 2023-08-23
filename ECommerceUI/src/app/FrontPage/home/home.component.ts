import { Component, AfterViewInit, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { NavigationItem, SuggestedProduct, User } from '../../models/models';
import { NavigationService } from 'src/app/services/navigation.service';
import { UtilityService } from 'src/app/services/utility.service';

import 'owl.carousel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit{
  @ViewChild('modalTitle') modalTitle!: ElementRef;
  @ViewChild('container', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;
  cartItems: number = 0;
  user!:User
  id:any

  count:any

  navigationList: NavigationItem[] = [];
  constructor(
    private navigationService: NavigationService,
    public utilityService: UtilityService
  ) {}
 
 

  ngOnInit(): void {
   
    this.user= this.utilityService.getUser()
    this.id= this.utilityService.getUser().id
  
    this.navigationService.GetCartCounts(this.id).subscribe(res=>{
      this.count=res.length
      console.log(this.count)
    })
  
    // Get Category List
    

    // Cart
    if (this.utilityService.isLoggedIn()) {
  
      this.navigationService
        .getActiveCartOfUser(this.utilityService.getUser().id)
        
        .subscribe((res: any) => {
          this.cartItems = res.cartItems.length;
          
        });
    }

    this.utilityService.changeCart.subscribe((res: any) => {
      if (parseInt(res) === 0) this.cartItems = 0;
      else this.cartItems += parseInt(res);
    });
  }
  status = false;
 

}
