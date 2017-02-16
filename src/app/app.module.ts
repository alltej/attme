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
    IonicModule.forRoot(MyApp)
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
    AuthService
  ]
})
export class AppModule {}
