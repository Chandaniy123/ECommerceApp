import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import SignaturePad from 'signature_pad';
import { Shoping_Carts, User, User_Order, User_Payment } from 'src/app/models/models';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { UtilityService } from 'src/app/services/utility.service';



@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {
  inputValue?: any;
 @Input() signature: any
 signImage: any;

  @ViewChild('signPadCanvas', { static: false }) signaturePadElement: any;
  signPad: any;
  id: any;
  signatureImage: any
  isPadShow: boolean = true

  

 
  paymentMethod: User_Payment = {
    userId: 0,
    paymentId: 0,
    totalSum: '',
    paymentMethod: ''
  }



 

 

  user?: User
  user_payment: User_Payment = {
    paymentId: 0,
    userId: 0,
    paymentMethod: '',
    totalSum: ''
  }

  count: any

  order_user: User_Order
    // orderId: 0,
    // userId: 0,
    // productQuantity: 0,
    // totslSum: 0

  shoping: Shoping_Carts[] = [];
  sum = 0
  futureDate: Date;
  guid: string;
  // Output: a randomly generated GUID

  constructor(private utilityService: UtilityService, private adminService: AdminServiceService, 
    private navigationservice: NavigationService,private activatedRoute: ActivatedRoute, private router: Router) {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 5); // Add 5 days to the current date
    this.futureDate = currentDate;
    this.guid = this.generateGUID();
    this.order_user=new User_Order()
  }
  openUploadSignaturePad() {
     this.isPadShow = !this.isPadShow
    }
  


  ngOnInit(): void {


    this.user = this.utilityService.getUser();
    const id=this.user.id
    this.adminService.GetUser_Carts(this.user.id).subscribe(res => {
      //console.log(res);
      this.count = res.length
      console.log(this.count);
      
      this.shoping = res
      for (var val of this.shoping) {
        this.sum += val.price
        

      }

      this.order_user.userId = id
     this.order_user.productQuantity = this.count
     this.order_user.totslSum = this.sum
   
     this.order_user.date=new Date();

    this.navigationservice.insertOrder(this.order_user).subscribe(res => {
      console.log(res);

      if (res) {
        this.adminService.DeleteCart(this.user!.id).subscribe(res => {
          console.log(res)
        })
      }
    })

    })


    this.adminService.getlastPayment(this.user.id).subscribe(res => {
      this.user_payment = res
    })



  }

  generateGUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }




  ngAfterViewInit() {

    this.signPad = new SignaturePad(this.signaturePadElement.nativeElement);

  }

  /*It's work in devices*/

  startSignPadDrawing(event: Event) {

    console.log(event);

  }

  /*It's work in devices*/

  movedFinger(event: Event) {

  }

  /*Undo last step from the signature*/

  undoSign() {

    const data = this.signPad.toData();

    if (data) {

      data.pop(); // remove the last step

      this.signPad.fromData(data);

    }

  }

  /*Clean whole the signature*/

  clearSignPad() {

    this.signPad.clear();

  }
 Download() {
      const base64ImageData = this.signPad.toDataURL();
      this.signatureImage = base64ImageData;
      console.log(this.signatureImage);
      const downloadLink = document.createElement('a');
      downloadLink.href = base64ImageData;
      downloadLink.download = 'signature.png';
      downloadLink.click();
    }
 

    saveSignPad() {

    const base64ImageData = this.signPad.toDataURL();

    this.signImage = base64ImageData;


  }
  GetLastSums() {
    var subtotal1 = 0
    var a11 = 0
    for (var val of this.shoping) {
      a11 = val.price * (val.offerRate / 100)
      var t1 = a11 * val.quantity
      var t2 = t1 * 0.15 + 10
      subtotal1 += t1 + t2
    }

    return subtotal1.toString().split('.')[0]

  }

  GetSubTotal() {
    var subtotal = 0
    var a1 = 0
    for (var val of this.shoping) {
      a1 = val.price * (val.offerRate / 100)
      var t1 = a1 * val.quantity
      subtotal += t1
    }

    return subtotal.toString().split('.')[0]
  }

  handleOutput(item: any) {
    this.inputValue = item
  }
}




