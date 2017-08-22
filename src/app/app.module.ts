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
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import {EventsService} from "../services/eventsSvc";
import {MembersService} from "../services/membersSvc";
import {AttendanceService} from "../services/attendanceSvc";
import {MembersPage} from "../pages/members/members";
import {MemberPage} from "../pages/member/member";
import {EditMemberPage} from "../pages/edit-member/edit-member";
import {EditEventPage} from "../pages/edit-event/edit-event";
import {MyProfilePage} from "../pages/my-profile/my-profile";
import {UserService} from "../services/userSvc";
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '4d0e6800'
  }
};

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
    MembersPage,
    MemberPage,
    EditMemberPage,
    EditEventPage,
    MyProfilePage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
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
    MembersPage,
    MemberPage,
    EditMemberPage,
    EditEventPage,
    MyProfilePage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    EventsService,
    MembersService,
    AttendanceService,
    UserService
  ]
})

export class AppModule {}
