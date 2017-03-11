import {Component, OnInit} from '@angular/core';
import {AlertController, NavParams} from 'ionic-angular';
import {MembersService} from "../../services/membersSvc";
//import {FirebaseListObservable} from "angularfire2";
import {Attendee} from "../../models/attendee.interface";
import {Event} from "../../models/event.interface";
import {AttendanceService} from "../../services/attendanceSvc";
import {FormControl} from "@angular/forms";
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {AuthService} from "../../services/auth";
import {UserService} from "../../services/userSvc";

@Component({
  selector: 'page-attendance',
  templateUrl: 'attendance.html'
})
export class AttendancePage implements OnInit{
  //members: FirebaseListObservable<any[]>;
  members: Observable<any[]>;
  eventGroup: {event: Event, attendees: Attendee[], icon: string};
  relationship: any;
  userCircles: any[];

  searchControl: FormControl;
  searchTerm: string = '';
  searching: any = false;

  constructor(private navParams: NavParams,
              private membersSvc: MembersService,
              private attendanceSvc: AttendanceService,
              private alertCtrl: AlertController,
              private authService: AuthService,
              private userSvc: UserService){
    this.searchControl = new FormControl();
  }

  ngOnInit(): void {
    this.eventGroup = { event: this.navParams.data, attendees : [], icon : "brush"};
    this.eventGroup.event.id = this.navParams.data.$key;
//.map( (arr) => { return arr.reverse(); } );

    // this.members =this.membersSvc.getMembers()
    //   .map((members) => {return members});
    // console.log('ngOnInit');

    this.userCircles = this.userSvc.getMyCircles();
  }

  ionViewDidLoad() {
    this.setFilteredItems();

    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
      this.searching = false;
      this.setFilteredItems();
    });
  }

  ionViewWillEnter() {
    //this.members = this.membersSvc.getMembers();
  }

  onSearchInput(){
    this.searching = true;
  }

  setFilteredItems(){
    if (this.searchTerm == null || this.searchTerm == ''){
      //console.log('setFilteredItems: aa');
      this.members = this.membersSvc.getMembers()
        .map((members) => {return members});
    }else{
      //return items.filter(item => item.name.toLowerCase().indexOf(args[0].toLowerCase()) !== -1);
      this.members = this.membersSvc.getMembers()
        .map((members) =>
          members.filter(member => member.lastName.toLowerCase().indexOf(this.searchTerm.toLowerCase()) !== -1 || member.firstName.toLowerCase().indexOf(this.searchTerm.toLowerCase()) !== -1));
    }
  }

  setFilteredItems1(){
    if (this.searchTerm == null || this.searchTerm == ''){
      //console.log('setFilteredItems: aa');
      this.members = this.membersSvc.getMembers()
        .map((members) => {return members});
    }else{
      //return items.filter(item => item.name.toLowerCase().indexOf(args[0].toLowerCase()) !== -1);
      this.members = this.membersSvc.getMembers()
        .map((members) =>
          members.filter(member => member.lastName.toLowerCase().indexOf(this.searchTerm.toLowerCase()) !== -1 || member.firstName.toLowerCase().indexOf(this.searchTerm.toLowerCase()) !== -1)
        );
    }
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

  selectedAll(){
    this.members = this.membersSvc.getMembers()
      .map((members) => {return members});
  }

  selectedCircles(){
    //console.log('selectedCircles');
    //TODO: refactor
    //let favs = ["-Ke2CyV2BJ5S3_7qcQj5", "-Ke2CyV2BJ5S3_7qcQj6", "-Ke2CyV39UwBuq36wSM6", "-KeKL1A7J2pcCKAPMvIr"];
    //let userCircles = this.userSvc.getMyCircles();
    //console.log(favs);
    this.searching = false;
    this.members = this.membersSvc.getMembers()
      .map((members) =>
        members.filter(member => this.userCircles.indexOf(member.$key) !== -1)
      );

    if (this.searchTerm == null || this.searchTerm == ''){
      //console.log('setFilteredItems: aa');
      // this.members = this.membersSvc.getMembers()
      //   .map((members) => {return members});
    }else{
      //return items.filter(item => item.name.toLowerCase().indexOf(args[0].toLowerCase()) !== -1);
      this.members = this.members
        .map((members) =>
          members.filter(member => member.lastName.toLowerCase().indexOf(this.searchTerm.toLowerCase()) !== -1 || member.firstName.toLowerCase().indexOf(this.searchTerm.toLowerCase()) !== -1));
    }
  }

  getVoteCount(selectedMember: any){
    let c = this.attendanceSvc.getUpVotes(this.eventGroup.event.id, selectedMember.$key);
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
