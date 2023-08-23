import { Component, OnInit, Renderer2 } from '@angular/core';
import { Order_Model, User, User_Order } from 'src/app/models/models';
import { NavigationService } from 'src/app/services/navigation.service';

import { UtilityService } from 'src/app/services/utility.service';
import { TheamService } from './theam.service';
import { AdminServiceService } from 'src/app/services/admin-service.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  
  currentTheme: string | undefined;
  user!:User
 
 
  constructor(
    private navigationService: NavigationService,
    public utilityService: UtilityService,private renderer: Renderer2,
    private themeService:  TheamService,
    public adminService:AdminServiceService ) {}
    user_order:User_Order[]=[]
  ngOnInit(): void {
    const id=this.utilityService.getUser().id
    this.user=this.utilityService.getUser()
   
    this.themeService.currentTheme$.subscribe((theme: string | undefined) => {
      this.currentTheme = theme;
      this.navigationService.getUserOrder(id).subscribe(res=>{
        this.user_order=res
      })
    });
   
   
  }
  changeTheme(color: string): void {
    this.themeService.setTheme(color + '-theme');
  }
  toggleTheme1(): void {
    const currentTheme = this.themeService.getCurrentTheme();
    const newTheme = currentTheme === 'light-theme' ? 'dark-theme' : 'light-theme';
    this.themeService.setTheme(newTheme);
  }
  
  toggleTheme2(): void {
    const currentTheme = this.themeService.getCurrentTheme();
    const newTheme = currentTheme === 'light-theme' ? 'dark-theme' : 'light-theme';
    this.themeService.setTheme(newTheme);
  }
 

  toggleTheme(): void {
    const newTheme = this.currentTheme === 'light-theme' ? 'dark-theme' : 'light-theme';
    this.themeService.setTheme(newTheme);
  }
}
