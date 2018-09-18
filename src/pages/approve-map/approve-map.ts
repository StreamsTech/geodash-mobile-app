import { MapService } from './../../services/MapService';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';

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
      content: "Fetching data..."
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

