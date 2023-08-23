import { Injectable } from '@angular/core';
import axios from 'axios';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {


  // constructor() { }

  // async generateImage(): Promise<any> {
  //   const prompt = 'Generate an image for the user'; // Customize the prompt according to your needs

  //   const response = await axios.post(
  //     'https://api.openai.com/v1/images/generations',
  //     {
  //       prompt,
  //       max_tokens: 100, 
  //       temperature: 0.7, 
  //       n: 1 // Generate a single completion
  //     },
  //     {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${this.openaiApiKey}`
  //       }
  //     }
  //   );

  //   return response.data.choices[0].text;
  // }
  private apiUrl = 'https://api.openai.com/v1/images/generations';

  constructor(private http: HttpClient) {}

  generateImage(prompt: string, model: string) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + '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');
    const body = {
      'model': model,
      'prompt': prompt,
      'num_images': 1,
      'size': '512x512',
      'response_format': 'url'
    };
    return this.http.post(this.apiUrl, body, { headers: headers });
  }

  
}
