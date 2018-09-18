import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {
  errorDetail: Error;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.errorDetail = navParams.get("item");

  }

}
