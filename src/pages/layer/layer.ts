import { ConstantService } from './../../services/ConstantService';
import { LayersService } from './../../services/LayersService';
import { Component } from '@angular/core';
import { ToastController, LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-layer',
  templateUrl: 'layer.html',
})
export class LayerPage {
  layers: any[];
  constructor(private service: LayersService,
    private toastCtrl: ToastController,
    private constantService: ConstantService,
    private loadingCtrl: LoadingController) {
    this.layers = [];
  }

  ionViewDidLoad() {
    var loading = this.loadingCtrl.create({
      content: "Fetchiing data..."
    });
    loading.present();
    this.service.getLayers().then(data => {
      this.layers = data;
      loading.dismiss();
    }).catch(() => {
      loading.dismiss();
    })
  }

  approveLayer(item: any) {
    this.service.approve(item);
    this.layers = this.constantService.removeItemFromList(this.layers, item);
    this.displayToast("Approved");
  }

  denyLayer(item: any) {
    this.service.deny(item)
    this.layers = this.constantService.removeItemFromList(this.layers, item);
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
