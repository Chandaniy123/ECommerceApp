import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-productpromosion',
  templateUrl: './productpromosion.component.html',
  styleUrls: ['./productpromosion.component.css']
})
export class ProductpromosionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
   
    $('.wish-icon i').click(function() {
      $(this).toggleClass('fa-heart fa-heart-o');
    });
  }


}
