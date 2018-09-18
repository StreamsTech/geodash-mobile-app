import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Header, LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Login } from '../../core/login';
import { LoginService } from '../../services/LoginService';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Rx"

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginDetails: Login;
  failedLoginClass: string;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private loginService: LoginService) {
    this.loginDetails = {
      username: '',
      password: ''
    }
    this.failedLoginClass = "";
  }

  login() {
    var loading = this.loadingCtrl.create({
      content: 'Loading...'
    });
    loading.present();
    this.loginService.Login(this.loginDetails).then((data) => {
      loading.dismiss();
      if (data) {
        this.navCtrl.setRoot(HomePage);
        return;
      } else {
        this.loginFailed();
      }
    });

  }

  loginFailed() {
    let alert = this.alertCtrl.create({
      title: 'Login failed',
      message: 'Please checkout user cerdential',
      buttons: ['Ok']
    });
    this.failedLoginClass = "error";
    alert.present();
  }
}
