import { DocumentService } from './../../services/DocumentService';
import { Component } from '@angular/core';
import { ToastController, LoadingController } from 'ionic-angular';
import { ConstantService } from '../../services/ConstantService';

@Component({
  selector: 'page-approve-document',
  templateUrl: 'approve-document.html',
})
export class ApproveDocumentPage {
  
  constructor(private service: DocumentService,
    private toastCtrl: ToastController,
    private constantService: ConstantService,
    private loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    var loading = this.loadingCtrl.create({
      content: "Fetching data..."
    });
    loading.present();
    this.service.getDocuments().then(data => {
      loading.dismiss();
    }).catch(() => {
      loading.dismiss();
    })
  }

  approve(item: any) {
    this.service.approve(item);
    this.constantService.displayToast("Approved");
  }

  deny(item: any) {
    this.service.deny(item);
    this.constantService.displayToast("Denied");
  }

}
