import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NavigationService } from '../../../services/navigation.service';
import { UtilityService } from '../../../services/utility.service';
import { Router } from '@angular/router';
import { User } from '../../../models/models';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  [x: string]: any;
 email!: string
 password!: string
  message?: string;
  role=""

   user: User = {
    id: 0,
    firstName:'',
    lastName: '',
    email:'',
    address: '',
    mobile: '',
    password: '',
    createdAt: '',
    modifiedAt: '',
    image: '',
    role: ''
  };
 constructor(
  private fb: FormBuilder,
  private navigationService: NavigationService,
  private utilityService: UtilityService,
  public router : Router
) {}
  ngOnInit(): void {
    const signUpButton = document.getElementById('signUp') as HTMLButtonElement;
const signInButton = document.getElementById('signIn') as HTMLButtonElement;
const container = document.getElementById('container') as HTMLDivElement;
  
signUpButton.addEventListener('click', () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
  container.classList.remove("right-panel-active");
});

  }

  login(){
    this.navigationService
    .loginUser(this.email, this.password).subscribe(res=>{
     
      if(res!=="invalid"){
        console.log(res);
        Swal.fire(
          'LOGIN',
          'SUCCESSFULLY',
          'success'
        )
        this.utilityService.setUser(res.toString());
       this.role= this.utilityService.getUser().role

       if(this.role=='Admin'){
        this.router.navigate(['Admindashboard']);
       }
       else{
        this.router.navigate(['']);
       }
        
     
      }

      else{
        Swal.fire({
          icon: 'error',
          title: 'UserEmail wrong',
          text: 'Login failed',
          footer: '<a href="">Why do I have this issue?</a>'
        })

      }
     
    
      //console.log(this.utilityService.getUser());

       
    
      
    })
   
    
  
   
  }

  Register(){
 
    this.navigationService.registerUser(this.user).subscribe((res: any) => {
      this.message = res.toString();
      
      console.log(res);
      this.router.navigate(['']);
      Swal.fire(
        'Register!',
        'Successfully',
        'success'
      )
    });

  }
 

 
}



