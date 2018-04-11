import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LayerPage } from "../layer/layer";
import { DocumentPage } from "../document/document";
import { MapPage } from "../map/map";

/**
 * Generated class for the ApprovePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-approve',
  templateUrl: 'approve.html',
})
export class ApprovePage {

  layerPage: any;
  documentPage: any;
  mapPage: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.layerPage = LayerPage;
    this.documentPage = DocumentPage;
    this.mapPage = MapPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ApprovePage');
  }

}
