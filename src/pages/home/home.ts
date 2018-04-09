import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TokenAuthenticationService } from '../../services/TokenAuthenticationService';
import { LoginPage } from '../login/login';
import { LoginService } from '../../services/LoginService';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
    private loginService: LoginService) {
    this.checkAuthentication();

  }
  private checkAuthentication() {
    this.loginService.IsAuthenticate().then((val) => {
      if (!val) {
        this.navCtrl.setRoot(LoginPage);
      }
    });
  }
}
