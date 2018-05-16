import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { HighchartsChartComponent } from 'highcharts-angular';
import { 
  MatIconModule,
	MatButtonModule,
  MatStepperModule
} from '@angular/material';

import { environment } from '../environments/environment.dev';

import { ComponentsModule } from '../components/components.module';
import { PipesModule } from '../pipes/pipes.module';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { DevicesPageModule } from '../pages/devices/devices.module';
import { DevicePage } from '../pages/device/device';
import { EventsPage } from '../pages/events/events';
import { SitesPage } from '../pages/sites/sites';
import { EnergyPage } from '../pages/energy/energy';
import { BreakerPage } from '../pages/breaker/breaker';
import { EditBreakerModalPageModule } from '../pages/edit-breaker-modal/edit-breaker-modal.module';
import { EditLoadcenterModalPageModule } from '../pages/edit-loadcenter-modal/edit-loadcenter-modal.module';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { DevicesProvider } from '../providers/devices/devices';
import { AlertsProvider } from '../providers/alerts/alerts';
import { ApiProvider } from '../providers/api/api';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SignupPage,
    HomePage,
    ListPage,
    
    EventsPage,
    SitesPage,
    EnergyPage,
    DevicePage,
    BreakerPage,
    HighchartsChartComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    ComponentsModule,
    PipesModule,
    MatIconModule,
    MatButtonModule,
    MatStepperModule,
    DevicesPageModule,
    EditBreakerModalPageModule,
    EditLoadcenterModalPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    SignupPage,
    HomePage,
    ListPage,
    // DevicesPage,
    EventsPage,
    SitesPage,
    EnergyPage,
    DevicePage,
    BreakerPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DevicesProvider,
    AlertsProvider,
    ApiProvider
  ]
})
export class AppModule {}
