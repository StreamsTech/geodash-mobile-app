import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController } from 'ionic-angular';
import { TokenAuthenticationService } from '../../services/TokenAuthenticationService';
import { LoginPage } from '../login/login';
import { LoginService } from '../../services/LoginService';
import { NotificationService } from '../../services/NotificationService';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  notifications: Notification[];

  constructor(public navCtrl: NavController,
    private loginService: LoginService,
    private service: NotificationService,
    private loadingCtrl: LoadingController) {
    this.checkAuthentication();
    this.notifications=[];
  }

  offset =0;
  limit = 50;
  count: number;

  ionViewDidLoad() {
    var loading = this.loadingCtrl.create({
      content: "Fetching data..."
    });
    loading.present();
    this.service.getNotifications(this.offset, this.limit).then(data => {
      this.notifications = data;
      this.count = this.service.getNotificationCount();
      loading.dismiss();
    }).catch(() => {
      loading.dismiss();
    })
  }


  doInfinite(infiniteScroll): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.service.getNotificationCount() > (this.offset + this.limit)) {
        this.offset = this.offset + this.limit;
        this.service.getNotifications(this.offset, this.limit).then(data => {
          if (data === undefined) {
            resolve(false);
            return;
          }
          data.array.forEach(element => {
            this.notifications.push(element);
          });
          resolve();
        })
      } else {
        infiniteScroll.enabled(false);
      }
    })
  }

  private checkAuthentication() {
    this.loginService.IsAuthenticate().then((val) => {
      if (!val) {
        this.navCtrl.setRoot(LoginPage);
      }
    });
  }
}
