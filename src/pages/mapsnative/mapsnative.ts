import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';

declare var google;
@Component({
  selector: 'page-mapsnative',
  templateUrl: 'mapsnative.html',
})
export class MapsnativePage {

  @ViewChild('maps') mapElement: ElementRef;
  map: any;
  start = 'chicago, il';
  end = 'chicago, il';
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;

  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad() {
    this.initMap();
  }

  initMap() {
    console.log(this.mapElement);
    if (this.mapElement) {
      this.map = new google.maps.Map(this.mapElement.nativeElement, {
        zoom: 7,
        center: { lat: 41.85, lng: -87.65 }
      });
      this.directionsDisplay.setMap(this.map);

    }


  }

  calculateAndDisplayRoute() {
    this.directionsService.route({
      origin: this.start,
      destination: this.end,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

}
