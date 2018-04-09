import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { NotificationsPage } from '../pages/notifications/notifications';
import { ErrorsPage } from '../pages/errors/errors';
import { LogoutPage } from '../pages/logout/logout';
import { MapsPage } from '../pages/maps/maps';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  // rootPage:any = MapsPage;

  pages: Array<{ title: string, component: any, icon: any }>;

  constructor(public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen, ) {
    this.initializeApp();
    this.menuInitialization();
  }

  private menuInitialization() {
    this.pages = [
      { title: 'Home', component: HomePage, icon: "assets/icon/favicon.ico"},
      { title: 'Notifications', component: NotificationsPage, icon: "assets/icon/favicon.ico" },
      { title: 'Errors', component: ErrorsPage, icon: "assets/icon/favicon.ico" },
      { title: 'Maps', component: MapsPage, icon: "assets/icon/favicon.ico" },
      { title: 'Logout', component: LogoutPage, icon: "assets/icon/favicon.ico" },
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

    });
  }

  openPage(page) {

    this.nav.setRoot(page.component);
  }
}
