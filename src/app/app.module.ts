import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {CirclesPage} from "../pages/circles/circles";
import {EventsPage} from "../pages/events/events";
import {SigninPage} from "../pages/signin/signin";
import {SignupPage} from "../pages/signup/signup";
import {TabsPage} from "../pages/tabs/tabs";
import {AuthService} from "../services/auth";
import {AttendancePage} from "../pages/attendance/attendance";
import {firebaseConfig} from "../environments/firebase.config";
import {AngularFireModule} from "angularfire2";
import {EventsService} from "../services/eventsSvc";

// export const firebaseConfig = {
//   apiKey: "AIzaSyBrsOXUmXDkcJycH0m3ujhhzZfk6WviUH0",
//   authDomain: "attme-8d4f7.firebaseapp.com",
//   databaseURL: "https://attme-8d4f7.firebaseio.com",
//   storageBucket: "attme-8d4f7.appspot.com",
//   messagingSenderId: "122392523636"
// };

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CirclesPage,
    EventsPage,
    SigninPage,
    SignupPage,
    TabsPage,
    AttendancePage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CirclesPage,
    EventsPage,
    SigninPage,
    SignupPage,
    TabsPage,
    AttendancePage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    EventsService
  ]
})

export class AppModule {}
