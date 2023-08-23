import { Component, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Payment, PaymentMethod, Shoping_Carts, User_Payment } from 'src/app/models/models';
import { NavigationService } from 'src/app/services/navigation.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-payment-gate-way',
  templateUrl: './payment-gate-way.component.html',
  styleUrls: ['./payment-gate-way.component.css']
})
export class PaymentGateWayComponent implements OnInit {
  paymentMethods: PaymentMethod[] = [];

  selectedPaymentMethodName = '';

  selectedPaymentMethod = new FormControl('0');

  usersPaymentInfo: Payment = {
    paymentMethodId: 0,
    user: this.utilityService.getUser(),
    paymentMethod: {
      id: 0,
      type: '',
      provider: '',
      available: false,
      reason: '',
    },
    totalAmount: 0,
    shipingCharges: 0,
    amountReduced: 0,
    amountPaid: 0,
    createdAt: '',
  };
  shopingCart:Shoping_Carts[]=[]

  selectedOption?:string|null
  selectedOption1?:string|null
  constructor(public navigationService:NavigationService,private utilityService:UtilityService){}
  
  ngOnInit(): void {
    this.navigationService.getPaymentMethods().subscribe((res) => {
      this.paymentMethods = res;
    });

    this.navigationService
    .getActiveCartOfUser(this.utilityService.getUser().id)
    .subscribe((res: any) => {
      this.shopingCart = res;
      this.utilityService.calculatePayment(res, this.usersPaymentInfo);
    });
  
    
  }


 
  upiId: string = '';
  cardNumber: string = '';

  CVV:string='';
  password:string='';
  @Output() dataPassed = new EventEmitter<string>();

  processPayment() {
    // Add code to handle payment processing based on the selected option
   let userPayment:User_Payment;
    let pmid = 0;
    let provider:any;
   this.selectedOption=this.selectedPaymentMethod.value
   const value: string | null =  this.selectedOption// Replace `getValue()` with the actual source of the string value

   if (value) {
     const [provider1, id] = value.split(',');
   
     pmid = parseInt(id);
     provider=provider1;
     this.selectedOption1=provider1;

      userPayment={
        paymentId:0,
        userId:this.utilityService.getUser().id,
        totalSum:this.usersPaymentInfo.totalAmount.toString(),
        paymentMethod:provider1
      }
     
     this.navigationService.insertPayment(userPayment!).subscribe(res=>{
      console.log(res)
    })
   }

  else{
     console.log("Value is Null"); 
   }
   
  }


  getPaymentMethod(id: string) {
    let x = this.paymentMethods.find((v) => v.id === parseInt(id));
    return x?.type + ' - ' + x?.provider;
    
  }




}
