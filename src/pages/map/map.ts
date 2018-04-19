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
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  maps: any[];
  constructor(private service: MapService,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController) {
    this.maps = [];
  }

  ionViewDidLoad() {
    var loading = this.loadingCtrl.create({
      content: "Fetchiing data..."
    });
    loading.present();
    this.service.getMaps().then(data => {
      this.maps = data;
      loading.dismiss();
    }).catch(() => {
      loading.dismiss();
    })
  }

  approveNotfication(item: any) {
    // this.setActionToFalFse(item);
    this.service.approveMap(item);
    this.removeItemFromNotifications(item);
    this.displayToast("Approved");
  }

  private removeItemFromNotifications(item: any) {
    var index = this.maps.indexOf(item, 0);
    if (index > -1) {
      this.maps.splice(index, 1);
    }
  }

  // private setActionToFalse(item: Notification) {
  //   this.layers.find(n => n.id == item.id).hasAction = false;
  // }

  denyNotfication(item: any) {
    // this.setActionToFalse(item);
    this.service.denyNotification(item);
    this.displayToast("Denied");
    this.removeItemFromNotifications(item);
  }

  private displayToast(message, duration: number = 3000) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: duration
    })
    toast.present();
  }
}

