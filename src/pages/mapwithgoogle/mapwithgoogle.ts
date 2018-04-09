import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
declare var google;
@Component({
  selector: 'page-mapwithgoogle',
  templateUrl: 'mapwithgoogle.html',
})
export class MapwithgooglePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    let origin;
    let destination;
    let sourceLocationSet = false;
    let destinationLocationSet = false;
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    let isRouteDisplayed = false;
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: { lat: 23.777176, lng: 90.399452 }
    });
    directionsDisplay.setMap(map);
    var markers = [];
    map.addListener("click", (event) => {
      clickeOnMap(event);
    });
    function clickeOnMap(event) {
      var marker = new google.maps.Marker({
        position: event.latLng,
        map: map,
        title: 'Click to zoom'
      });
      markers.push(marker);
      if (sourceLocationSet) {
        destinationLocationSetAction(event);
      } else {
        sourceLocationSetAction(event);
      }
      if (isRouteDisplayed) {
        setMapOnAll(null);
      }
    }
    function sourceLocationSetAction(event) {
      origin = JSON.stringify(event.latLng);
      sourceLocationSet = true;
      destinationLocationSet = false;
      isRouteDisplayed = false;
    }
    function destinationLocationSetAction(event) {
      isRouteDisplayed = true;
      sourceLocationSet = false;
      destinationLocationSet = true;
      destination = JSON.stringify(event.latLng);
      calculateAndDisplayRoute(directionsService, directionsDisplay);
    }
    function setMapOnAll(map) {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
      }
    }
    function calculateAndDisplayRoute(directionsService, directionsDisplay) {
      console.log(JSON.parse(origin).lat + ":" + JSON.parse(origin).lng);
      console.log(JSON.parse(destination).lat + JSON.parse(destination).lng);
      let originLatLng = new google.maps.LatLng(parseFloat(JSON.parse(origin).lat), parseFloat(JSON.parse(origin).lng));
      let destinationLatLng = new google.maps.LatLng(parseFloat(JSON.parse(destination).lat), parseFloat(JSON.parse(destination).lng));
      console.log(originLatLng);
      console.log(destinationLatLng);

      directionsService.route({
        origin: originLatLng,
        destination: destinationLatLng,
        travelMode: 'DRIVING'
      }, function (response, status) {
        if (status === 'OK') {
          directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
    }
  }

}
