import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { 
  MatIconModule,
  MatMenuModule,
	MatButtonModule,
  MatListModule,
  MatStepperModule
} from '@angular/material';

import { environment } from '../environments/environment.dev';

import { ComponentsModule } from '../components/components.module';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { DevicesPage } from '../pages/devices/devices';
import { EventsPage } from '../pages/events/events';
import { SitesPage } from '../pages/sites/sites';
import { EnergyPage } from '../pages/energy/energy';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SignupPage,
    HomePage,
    ListPage,
    DevicesPage,
    EventsPage,
    SitesPage,
    EnergyPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    ComponentsModule,
    MatIconModule,
    MatButtonModule,
    MatStepperModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    SignupPage,
    HomePage,
    ListPage,
    DevicesPage,
    EventsPage,
    SitesPage,
    EnergyPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
