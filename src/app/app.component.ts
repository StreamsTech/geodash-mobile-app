import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { NotificationsPage } from '../pages/notifications/notifications';
import { ErrorsPage } from '../pages/errors/errors';
import { LogoutPage } from '../pages/logout/logout';
import { MapsPage } from '../pages/maps/maps';
import { LoginPage } from "../pages/login/login";
import { ApprovePage } from "../pages/approve/approve";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // rootPage: any = LoginPage;
  rootPage: any = HomePage;
  // rootPage: any = ErrorsPage;
  // rootPage: any = NotificationsPage;
  // rootPage: any = ApprovePages;
  

  // rootPage:any = MapsPage;

  pages: Array<{ title: string, component: any, icon: any, isActive: boolean }>;

  constructor(public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen, ) {
    this.initializeApp();
    this.menuInitialization();
  }

  private menuInitialization() {
    this.pages = [
      { title: 'Home', component: HomePage, icon: "home", isActive: true},
      { title: 'Notifications', component: NotificationsPage, icon: "notifications", isActive: false },
      { title: 'Errors', component: ErrorsPage, icon: "alert", isActive: false },
      { title: 'Maps', component: MapsPage, icon: "map", isActive: false },
      { title: 'Approve', component: ApprovePage, icon: "checkmark-circle", isActive: false },
      { title: 'Logout', component: LogoutPage, icon: "log-out", isActive: false },
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

    });
  }

  openPage(page) {
    this.pages.forEach(p=>p.isActive=false);
    page.isActive=true;
    this.nav.setRoot(page.component);
  }
}
