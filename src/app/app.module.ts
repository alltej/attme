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
import {MembersService} from "../services/membersSvc";
import {AttendanceService} from "../services/attendanceSvc";
import {MembersPage} from "../pages/members/members";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CirclesPage,
    EventsPage,
    SigninPage,
    SignupPage,
    TabsPage,
    AttendancePage,
    MembersPage
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
    AttendancePage,
    MembersPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    EventsService,
    MembersService,
    AttendanceService
  ]
})

export class AppModule {}
