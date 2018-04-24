import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { DevicesPage } from '../pages/devices/devices';
import { EventsPage } from '../pages/events/events';
import { SitesPage } from '../pages/sites/sites';
import { EnergyPage } from '../pages/energy/energy';

import { DevicesProvider } from '../providers/devices/devices';
import { AlertsProvider } from '../providers/alerts/alerts';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: Array<{
    title: string, 
    icon: string, 
    component: any
  }>;

  user: any;
  numActiveFaultBreakers: number = 0;
  numAlerts: number = 0;
  alerts: Array<any> = [];

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public menu: MenuController,
    public afAuth: AngularFireAuth,
    public devicesProvider: DevicesProvider,
    public alertsProvider: AlertsProvider
  ) {
    this.initializeApp();

    // Pages that are shown in the side menu
    this.pages = [
      { title: 'Home', icon: 'home', component: HomePage },
      { title: 'Devices', icon: 'apps', component: DevicesPage },
      { title: 'Events', icon: 'pulse', component: EventsPage },
      { title: 'Energy', icon: 'stats', component: EnergyPage },
      { title: 'Sites', icon: 'pin', component: SitesPage }
    ];

    // Monitor whether user is logged in or not
    const authObserver = afAuth.authState.subscribe( user => {
      if(user){
        // user is logged in
        console.log("Firebase user is logged in:",user);
        this.user = user;
        this.rootPage = HomePage;

        this.alertsProvider.activeFaultBreakerAlertCount.subscribe( count => {
          this.numActiveFaultBreakers = count;
        })

        this.alertsProvider.alertCount.subscribe( alertCount => {
          this.numAlerts = alertCount;
        })
        // authObserver.unsubscribe();
      } else {
        // user is logged out
        console.log("Firebase user is logged out.");
        this.rootPage = LoginPage;
        // authObserver.unsubscribe();
      }
    });

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  isActive(page) {
    if(!this.nav.getActive()) return false;
    return (this.nav.getActive().component === page.component);
  }

  logout() {
    this.afAuth.auth.signOut().then(function(error){
      if(error){
        console.log("Error signing out:",error);
      } else {
        this.nav.setRoot(LoginPage);
      }
    }.bind(this));
  }
}
