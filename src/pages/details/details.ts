import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {
  singelError: Error;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.singelError = navParams.get("item");

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
  }

}
