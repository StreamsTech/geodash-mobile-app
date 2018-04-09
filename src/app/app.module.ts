import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { LoginService } from '../services/LoginService';
import { HomePage } from '../pages/home/home';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { NotificationsPage } from '../pages/notifications/notifications';
import { NotificationService } from '../services/NotificationService';
import { ErrorsPage } from '../pages/errors/errors';
import { LogoutPage } from '../pages/logout/logout';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TokenAuthenticationService } from '../services/TokenAuthenticationService';
import { HttpHelperService } from '../services/HttpHelperService';
import { DetailsPage } from '../pages/details/details';
import { ErrorService } from '../services/ErrorService';
import { OneSignal } from '@ionic-native/onesignal';
import { MapsPage } from '../pages/maps/maps';
import { MapsnativePage } from '../pages/mapsnative/mapsnative';
import { MapwithgooglePage } from '../pages/mapwithgoogle/mapwithgoogle';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    NotificationsPage,
    LogoutPage,
    ErrorsPage,
    DetailsPage,
    MapsPage,
    MapsnativePage,
    MapwithgooglePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    NotificationsPage,
    LogoutPage,
    ErrorsPage,
    DetailsPage,
    MapsPage,
    MapsnativePage,
    MapwithgooglePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    LoginService,
    NotificationService,
    HttpClient,
    HttpHelperService,
    TokenAuthenticationService,
    ErrorService,
    OneSignal
  ]
})
export class AppModule { }
