import { Component } from '@angular/core';
import alanBtn from '@alan-ai/alan-sdk-web';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ECommerceUI';
  sideNavStatus = false;

    
  alanBtnInstance;
  
  constructor(){
    this.alanBtnInstance = alanBtn({
      key: '2ec66117105d0fad98c06689225b3d112e956eca572e1d8b807a3e2338fdd0dc/stage',
      onCommand: (commandData: any) => {
        if (commandData.command === 'go:back') {
          //call client code that will react to the received command
        }
      },
    });
  }
  setMode = false;

  receiveMode($event: boolean) {
    this.setMode = $event;
    console.log("MODEEEE", this.setMode);
  }



  
}
