import { Injectable } from '@angular/core';
import { MessageDto } from '../models/models';
import * as signalR from '@microsoft/signalr';
import { HttpClient } from '@angular/common/http';
import { Observable,Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UtilityService } from './utility.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  arr=[];

  id!:number;


  private  connection: any = new signalR.HubConnectionBuilder().withUrl("https://localhost:44325/chatsocket")   // mapping to the chathub as in startup.cs
                                        .configureLogging(signalR.LogLevel.Information)
                                        .build();
  readonly POST_URL = "https://localhost:44325/api/User/"

 private receivedMessageObject: MessageDto = new MessageDto();
 private sharedObj = new Subject<MessageDto>();
  

 constructor(private http: HttpClient,private activatedRoute: ActivatedRoute,private utilityService: UtilityService) { 
   this.connection.onclose(async () => {
     await this.start();
   });
  this.connection.on("ReceiveOne", (user: string, message: string,date:Date,product:number) => { this.mapReceivedMessage(user, message, date,product); });
  this.start();                 
 }


 // Strart the connection
 public async start() {
   try {
     await this.connection.start();
     console.log("connected");
   } catch (err) {
     console.log(err);
     setTimeout(() => this.start(), 5000);
   } 
 }

 private mapReceivedMessage(user: string, message: string, date:Date,product:number): void {
  this.activatedRoute.queryParams.subscribe((params: any) => {
    this.id = params.id;});
   this.receivedMessageObject.user = user;
   this.receivedMessageObject.msgText = message;
   this.receivedMessageObject.Date=new Date;
   this.receivedMessageObject.ProductId=this.id;
   console.log(this.receivedMessageObject.Date)
   this.sharedObj.next(this.receivedMessageObject);
}

 /* ****************************** Public Mehods **************************************** */

 // Calls the controller method
 public broadcastMessage(msgDto: any) {
   this.http.post(this.POST_URL+'send', msgDto).subscribe(data => console.log(data));
   // this.connection.invoke("SendMessage1", msgDto.user, msgDto.msgText).catch(err => console.error(err));    // This can invoke the server method named as "SendMethod1" directly.
 }

 public retrieveMappedObject(): Observable<MessageDto> {
   return this.sharedObj.asObservable();
 }
public GetChats(productId:number)
{
  return  this.http.get<Array<MessageDto>>(this.POST_URL+'GetChats?productId='+productId)
}
}
