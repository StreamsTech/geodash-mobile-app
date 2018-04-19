import { DocumentService } from './../services/DocumentService';
import { LayersService } from './../services/LayersService';
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
import { ApprovePage } from "../pages/approve/approve";
import { LayerPage } from "../pages/layer/layer";
import { MapPage } from "../pages/map/map";
import { DocumentPage } from "../pages/document/document";
import { ConstantService } from '../services/ConstantService';
import { MapService } from '../services/MapService';
import { ApproveDenyService } from '../services/ApproveDenyService';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    LogoutPage,
    ErrorsPage,
    DetailsPage,
    MapsPage,
    MapsnativePage,
    MapwithgooglePage,
    ApprovePage,
    MapPage,
    LayerPage,
    DocumentPage
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
    LogoutPage,
    ErrorsPage,
    DetailsPage,
    MapsPage,
    MapsnativePage,
    MapwithgooglePage,
    ApprovePage,
    MapPage,
    LayerPage,
    DocumentPage
    
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
    OneSignal,
    ConstantService,
    LayersService,
    DocumentService,
    Storage,
    MapService,
    ApproveDenyService
  ]
})
export class AppModule { }
