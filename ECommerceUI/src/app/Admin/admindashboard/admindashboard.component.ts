import { Component, OnInit } from '@angular/core';
import { Order_Model } from 'src/app/models/models';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {
products: any;
image: any
user="";
constructor(
  private navigationService: NavigationService,
  public utilityService: UtilityService,
  public adminService:AdminServiceService) {}
totalSum=0
activeCount=0
totalUser=0
orderModel:Order_Model[]=[]

  ngOnInit(): void {
    this.user= this.utilityService.getUser().firstName
    this.image= this.utilityService.getUser().image
    this.adminService.GetAllTotalSum().subscribe(res=>{
      this.totalSum=res
    })
    this.adminService.activeCount().subscribe(res=>{
      this.activeCount=res
    })
    this.adminService.totalUser().subscribe(res=>{
      this.totalUser=res
    })

    this.navigationService.DisplaysOrder().subscribe(res=>{
     this.orderModel=res
    })


    
  }
  status = false;
  addToggle()
  {
    this.status = !this.status;       
  }
  

}
