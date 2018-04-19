import { DocumentService } from './../../services/DocumentService';
import { Component } from '@angular/core';
import { ToastController, LoadingController } from 'ionic-angular';
import { ConstantService } from '../../services/ConstantService';

@Component({
  selector: 'page-document',
  templateUrl: 'document.html',
})
export class DocumentPage {
  documents: any[];
  count: any;
  constructor(private service: DocumentService,
    private toastCtrl: ToastController,
    private constantService: ConstantService,
    private loadingCtrl: LoadingController) {
    this.documents = [];
  }

  ionViewDidLoad() {
    var loading = this.loadingCtrl.create({
      content: "Fetchiing data..."
    });
    loading.present();
    this.service.getDocuments().then(data => {
      this.documents = data;
      this.count = this.service.count;
      loading.dismiss();
    }).catch(() => {
      loading.dismiss();
    })
  }

  approve(item: any) {
    this.service.approve(item);
    this.constantService.removeItemFromList(this.documents, item);
    this.constantService.displayToast("Approved");
  }

  deny(item: any) {
    this.service.deny(item);
    this.constantService.displayToast("Denied");
    this.constantService.removeItemFromList(this.documents, item);
  }

}
