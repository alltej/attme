import {Component, OnInit} from '@angular/core';
import {AttendancePage} from "../attendance/attendance";
import {FirebaseListObservable} from "angularfire2";
import {EventsService} from "../../services/eventsSvc";
import {AlertController} from "ionic-angular";

@Component({
  selector: 'page-events',
  templateUrl: 'events.html'
})
export class EventsPage implements OnInit{
  ngOnInit(): void {
    this.events = this.eventsSvc.getEvents();
  }
  //eventsCollection: {event: Event, attendees: Attendee[], icon: string}[];
  events: FirebaseListObservable<any[]>;

  attendancePage = AttendancePage;

  constructor(private eventsSvc: EventsService,
              private alertCtrl: AlertController){

  }

  getAttendanceCount(eventKey: string): number{
    let ac = 0;
    //this.af.database.list('/client/posts').map(list=>list.length).subscribe(length=>console.log(length))
    let acl = this.eventsSvc.getAttendanceCount(eventKey);
    //console.log(acl);
    return acl;
    //  return ac;
  }

  ionViewWillEnter() {

    // this.events.subscribe(items => {
    //   // items is an array
    //   items.forEach(item => {
    //     console.log('Item:', item);
    //   });
    // });
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
