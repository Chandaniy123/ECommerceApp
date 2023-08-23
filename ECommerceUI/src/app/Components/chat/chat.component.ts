import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as signalR from '@microsoft/signalr';
import { Subject } from '@microsoft/signalr';
import { MessageDto } from 'src/app/models/models';
import { ChatService } from 'src/app/services/chat.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  @ViewChildren('chatListHeader') chatListHeaders!: QueryList<ElementRef>;
  @ViewChildren('themeColor') themeColors!: QueryList<ElementRef>;
  constructor(private chatService: ChatService,private activatedRoute:ActivatedRoute,   public utilityService: UtilityService) {
  
  }
id!:number
userFirstname=""
userLastname=""
username!: string;

image: any
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: any) => {
     this.id = params.id;
     this.image= this.utilityService.getUser().image
     this.userFirstname= this.utilityService.getUser().firstName
     this.userLastname= this.utilityService.getUser().lastName
     this.username=this.userFirstname+" "+this.userLastname
    });
    
    this.chatService.retrieveMappedObject().subscribe( (receivedObj: MessageDto) => { this.addToInbox(receivedObj) ;console.log(receivedObj)});  // calls the service method to get the new messages sent
    this.chatService.GetChats(this.id).subscribe(res=>{
      this.msgArr=res
      console.log(this.msgArr)
    })  
    
   
    
  }

  msgDto: MessageDto = new MessageDto();
  msgInboxArray: MessageDto[] = [];
  msgArr:MessageDto[]=[]
  
  send(): void {
    this.msgDto.ProductId=this.id;
    this.msgDto.user=this.username
    // if(this.msgDto) {
    //   if(this.msgDto.user.length == 0 || this.msgDto.user.length == 0){
    //     window.alert("Both fields are required.");
    //     return;
    //   } else {
    //     this.chatService.broadcastMessage(this.msgDto);  
               
    //   }
      this.chatService.broadcastMessage(this.msgDto); 
      
    
  }

  addToInbox(obj: MessageDto) {
    let newObj = new MessageDto();
    newObj.user = obj.user;
    newObj.msgText = obj.msgText;
    newObj.Date=obj.Date;
    console.log(obj.Date)
    this.msgInboxArray.push(newObj);

  }
  

}
