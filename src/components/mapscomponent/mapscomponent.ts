import { Component } from '@angular/core';

/**
 * Generated class for the MapscomponentComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'mapscomponent',
  templateUrl: 'mapscomponent.html'
})
export class MapscomponentComponent {

  text: string;

  constructor() {
    console.log('Hello MapscomponentComponent Component');
    this.text = 'Hello World';
  }

}
