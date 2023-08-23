import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/models';
import { NavigationService } from 'src/app/services/navigation.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-edit-admin-profile',
  templateUrl: './edit-admin-profile.component.html',
  styleUrls: ['./edit-admin-profile.component.css']
})
export class EditAdminProfileComponent implements OnInit {
  image: any
user?:User

constructor(
  private navigationService: NavigationService,
  public utilityService: UtilityService) {}
  
  ngOnInit(): void {
    this.user= this.utilityService.getUser()
    
   
  }

}
