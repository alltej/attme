import { Component } from '@angular/core';
import {AlertController, NavParams} from 'ionic-angular';
import {MembersService} from "../../services/membersSvc";
import {FirebaseListObservable} from "angularfire2";
import {Member} from "../../models/members";
import {Attendee} from "../../models/attendee.interface";
import {Event} from "../../models/event.interface";
@Component({
  selector: 'page-attendance',
  templateUrl: 'attendance.html'
})
export class AttendancePage {
  members: FirebaseListObservable<any[]>;
  eventGroup: {event: Event, attendees: Attendee[], icon: string};

  constructor(private navParams: NavParams,
              private membersSvc: MembersService,
              private alertCtrl: AlertController){

  }

  ionViewWillEnter() {
    //console.log(this.navParams.data);
    this.eventGroup = { event: this.navParams.data, attendees : [], icon : "brush"};
    this.eventGroup.event.id = this.navParams.data.$key;
    console.log(this.eventGroup.event);
    this.members = this.membersSvc.getMembers();
    // this.events.subscribe(items => {
    //   // items is an array
    //   items.forEach(item => {
    //     console.log('Item:', item);
    //   });
    // });
  }
  onUpVote(selectedMember: Member){
    console.log('Vote' + selectedMember.firstName);
  }

  onDownVote(selectedMember: Member){
    console.log('UnVote' + selectedMember.firstName);
  }

  isVoted(member: Member){
    //return this.attendanceService.isDone(member);
  }

  private handleError(errorMessage: string) {
    const alert = this.alertCtrl.create({
      title: 'An error occurred!',
      message: errorMessage,
      buttons: ['Ok']
    });
    alert.present();
  }

}
