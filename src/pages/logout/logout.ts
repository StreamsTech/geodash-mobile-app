import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';
import { TokenAuthenticationService } from '../../services/TokenAuthenticationService';

@Component({
  selector: 'page-logout',
  template: ''
})
export class LogoutPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private tokenService: TokenAuthenticationService) {
    this.tokenService.clearToken();
    navCtrl.setRoot(LoginPage)
  }


}
