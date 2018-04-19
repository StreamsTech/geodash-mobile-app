import { MapService } from './../../services/MapService';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'approve-page-map',
  templateUrl: 'approve-map.html',
})
export class ApproveMapPage {

  constructor(private service: MapService,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    var loading = this.loadingCtrl.create({
      content: "Fetchiing data..."
    });
    loading.present();
    this.service.getMaps().then(data => {
      loading.dismiss();
    }).catch(() => {
      loading.dismiss();
    })
  }

  approve(item: any) {
    this.service.approve(item);
    this.displayToast("Approved");
  }


  deny(item: any) {
    this.service.deny(item);
    this.displayToast("Denied");
  }

  private displayToast(message, duration: number = 3000) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: duration
    })
    toast.present();
  }
}

