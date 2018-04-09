import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { NotificationService } from '../../services/NotificationService';
import { Notification } from '../../core/notification';
import { ToastController } from 'ionic-angular';


@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {
  offset: number;
  limit: number;

  notifications: Notification[];
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private service: NotificationService,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController) {
    this.notifications = [];
    this.offset = 0;
    this.limit = 25;
  }

  ionViewDidLoad() {
    var loading = this.loadingCtrl.create({
      content: "Fetchiing data..."
    });
    loading.present();
    this.service.getNotifications(this.offset, this.limit).then(data => {
      this.notifications = data;
      loading.dismiss();
    }).catch(() => {
      loading.dismiss();
    })
  }

  approveNotfication(item: Notification) {
    this.setActionToFalse(item);
    this.service.approveNotification(item);
    this.removeItemFromNotifications(item);
    this.displayToast("Approved");
  }

  private removeItemFromNotifications(item: Notification) {
    var index = this.notifications.indexOf(item, 0);
    if (index > -1) {
      this.notifications.splice(index, 1);
    }
  }

  private setActionToFalse(item: Notification) {
    this.notifications.find(n => n.id == item.id).hasAction = false;
  }

  denyNotfication(item: Notification) {
    this.setActionToFalse(item);
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

  doInfinite(infiniteScroll): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.service.getNotificationCount() > (this.offset + this.limit)) {
        console.log("insert into condition");
        this.offset = this.offset + this.limit;
        this.service.getNotifications(this.offset, this.limit).then(data => {
          var arrLength = data.length;
          for (var i = 0; i < arrLength; i++) {
            this.notifications.push(data[i]);
          }
          resolve();
        })
      } else {
        infiniteScroll.enabled(false);
      }
    })
  }
}
