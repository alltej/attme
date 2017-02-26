import {Component, OnInit} from '@angular/core';
import {AlertController, NavParams} from 'ionic-angular';
import {MembersService} from "../../services/membersSvc";
import {FirebaseListObservable} from "angularfire2";
import {Member} from "../../models/members";
import {Attendee} from "../../models/attendee.interface";
import {Event} from "../../models/event.interface";
import {AttendanceService} from "../../services/attendanceSvc";
@Component({
  selector: 'page-attendance',
  templateUrl: 'attendance.html'
})
export class AttendancePage implements OnInit{
  members: FirebaseListObservable<any[]>;
  eventGroup: {event: Event, attendees: Attendee[], icon: string};

  constructor(private navParams: NavParams,
              private membersSvc: MembersService,
              private attendanceSvc: AttendanceService,
              private alertCtrl: AlertController){

  }

  ngOnInit(): void {
    this.eventGroup = { event: this.navParams.data, attendees : [], icon : "brush"};
    this.eventGroup.event.id = this.navParams.data.$key;
  }

  ionViewWillEnter() {
    this.members = this.membersSvc.getMembers();
  }

  onUpVote(selectedMember: any){
    this.attendanceSvc.addAttendee(this.eventGroup.event.id, selectedMember.$key);
  }

  onDownVote(selectedMember: any){
    this.attendanceSvc.removeAttendee(this.eventGroup.event.id, selectedMember.$key);
  }

  isVoted(selectedMember: any){
    return this.attendanceSvc.isVoted(this.eventGroup.event.id, selectedMember.$key);
  }

  getVoteCount(selectedMember: any){
    let c = this.attendanceSvc.getLikeCount(this.eventGroup.event.id, selectedMember.$key);
    //console.log(c);
    return c;
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
