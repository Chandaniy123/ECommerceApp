import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-video-promosion',
  templateUrl: './video-promosion.component.html',
  styleUrls: ['./video-promosion.component.css']
})
export class VideoPromosionComponent {
  @ViewChild('videoPlayer') videoPlayer!: ElementRef;

  pauseVideo() {
    this.videoPlayer.nativeElement.pause();
  }
  
  playVideo() {
    this.videoPlayer.nativeElement.play();
  }
  
}
