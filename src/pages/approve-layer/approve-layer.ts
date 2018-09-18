import { ConstantService } from './../../services/ConstantService';
import { LayersService } from './../../services/LayersService';
import { Component } from '@angular/core';
import { ToastController, LoadingController } from 'ionic-angular';

@Component({
  selector: 'approve-page-layer',
  templateUrl: 'approve-layer.html',
})
export class ApproveLayerPage {
  constructor(private service: LayersService,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    var loading = this.loadingCtrl.create({
      content: "Fetching data..."
    });
    loading.present();
    this.service.getLayers().then(data => {
      loading.dismiss();
    }).catch(() => {
      loading.dismiss();
    })
  }

  approveLayer(item: any) {
    this.service.approve(item);
    this.displayToast("Approved");
  }

  denyLayer(item: any) {
    this.service.deny(item)
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
