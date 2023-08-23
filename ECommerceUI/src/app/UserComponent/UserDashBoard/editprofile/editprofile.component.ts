import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NavigationService } from '../../../services/navigation.service';
import { User } from '../../../models/models';
import { UtilityService } from '../../../services/utility.service';
import { ProfileService } from './profile.service';
import { HttpClient } from '@angular/common/http';

import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})

export class EditprofileComponent implements  OnInit{
	@Input() signature: any

	@ViewChild('signPadCanvas', { static: false }) signaturePadElement: any;
	signPad: any;
	id: any;
	signatureImage: any
	isPadShow: boolean = true
  user? : User;
 
 

  constructor( private navigationService: NavigationService,
    public utilityService: UtilityService,private profileService: ProfileService,private http: HttpClient,private spinner: NgxSpinnerService) {

    }
  ngOnInit(): void {

    this.user=this.utilityService.getUser()
    
  }
  
	
	url!: any; 
	msg = "";
	

	selectFile(event: any) {
		if(!event.target.files[0] || event.target.files[0].length == 0) {
			this.msg = 'You must select an image';
			return;
		}
		
		var mimeType = event.target.files[0].type;
		
		if (mimeType.match(/image\/*/) == null) {
			this.msg = "Only images are supported";
			return;
		}
		
		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
		
		reader.onload = (_event) => {
			this.msg = "";
			this.url = reader.result; 
		}
	}
	

}

