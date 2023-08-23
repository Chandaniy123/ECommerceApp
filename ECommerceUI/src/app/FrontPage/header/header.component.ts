import {
  Component,
  ElementRef,
  OnInit,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

import { Category, NavigationItem, User } from '../../models/models';
import { NavigationService } from '../../services/navigation.service';
import { UtilityService } from '../../services/utility.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
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
