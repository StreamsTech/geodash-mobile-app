import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { ErrorService } from '../../services/ErrorService';
import { DetailsPage } from '../details/details';


@Component({
  selector: 'page-errors',
  templateUrl: 'errors.html',
})
export class ErrorsPage {

  errors: Error[];
  offset = 0;
  offsetLimit = 50;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private service: ErrorService,
    private laodingCtrl: LoadingController) {
    this.errors = [];
  }

  ionViewDidLoad() {
    var loading = this.laodingCtrl.create({
      content: 'Fetching data...'
    })
    loading.present();
    this.service.getErrors(this.offset).then(data => {
      this.errors = data;
      loading.dismiss();
    }).catch(() => {
      loading.dismiss();
    })

  }

  gotoItemDetailsPage(item: Error) {
    this.navCtrl.push(DetailsPage, {
      item: item
    });
  }

  doInfinite(infiniteScroll) {
    this.offset = this.offset + this.offsetLimit;
    return new Promise((resolve) => {
      setTimeout(() => {
        this.service.getErrors(this.offset).then(data => {
          data.array.forEach(element => {
            this.errors.push(element);
          });
          resolve();
        })
      }, 500);
    })

  }

}
