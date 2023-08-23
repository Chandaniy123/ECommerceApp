import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Configuration, OpenAIApi } from 'openai';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as saveAs from 'file-saver';

@Component({
  selector: 'app-aiimagegenerator',
  templateUrl: './aiimagegenerator.component.html',
  styleUrls: ['./aiimagegenerator.component.css']
})
export class AiimagegeneratorComponent {
  obj: any;
  store:any;

  send() {
  throw new Error('Method not implemented.');
  }
    title = 'ngOpenAIDemo';
    contentData: any[] = [];
    editableFiled = new FormControl('')
    configuration = new Configuration({
      apiKey: "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",
    });
  
    openai = new OpenAIApi(this.configuration);
    response: any;
  imageUrl: any;
  
    constructor(private spinner: NgxSpinnerService,private http:HttpClient){
  
    }
  
    ngOnInit(): void {
  
    }
  
    public async openAIResponse(prompt: any) {
      this.spinner.show();
      this.response = await this.openai.createImage({
        prompt: prompt, //user entered input text will store here.
        n: 1, //number of images that are we expecting from OpenAI API.
        size: '512x512' //size of image that are we expecting from OpenAI API.
      }).then(x => {
        
        this.contentData = x.data.data;
        console.log('x: ', x.data);
        this.store=x.data
        if (this.editableFiled.value) {
          this.editableFiled.reset();
          this.spinner.hide();
          
        }
      }).catch(y => {
        console.log('y: ', y);
  
      });
      
    }
    callOpenAI() {
      if (this.contentData.length > 0) {
        this.contentData = [];
      }
      console.log(this.editableFiled.value);
  
      this.openAIResponse(this.editableFiled.value); //getting the userinput value and pass to the function
      
      console.log(this.store);
    }
    downloadImage(url: string) {
      this.http.get(url, { responseType: 'blob' }).subscribe((blob: Blob) => {
        console.log(blob);
        saveAs(blob, 'image.jpg'); // Specify the desired file name and extension
      });
    }

}


