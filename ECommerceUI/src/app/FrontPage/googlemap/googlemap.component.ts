import { Component } from '@angular/core';

@Component({
  selector: 'app-googlemap',
  templateUrl: './googlemap.component.html',
  styleUrls: ['./googlemap.component.css']
})
export class GooglemapComponent {
  display:any;




  constructor() {}

  ngOnInit(): void {}

  center: google.maps.LatLngLiteral = {

      lat: 23.1877,

      lng: 77.4326

  };
  zoom = 12;





  markerPositions: google.maps.LatLngLiteral[] = [ // Static marker positions

  { lat: 23.235636, lng: 77.400623 }, // Marker 1

  { lat: 23.232049, lng: 77.428669 }, // Marker 2

  { lat: 23.1877, lng: 77.4326 }  // Marker 3

];

markerOptions: google.maps.MarkerOptions = {};

  addMarker(event: google.maps.MapMouseEvent) {

    if (event.latLng != null) this.markerPositions.push(event.latLng.toJSON());




  }
}
