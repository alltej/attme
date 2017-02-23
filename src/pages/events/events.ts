import {Component} from '@angular/core';
import {AttendancePage} from "../attendance/attendance";
import {FirebaseListObservable} from "angularfire2";
import {EventsService} from "../../services/eventsSvc";
import {AlertController} from "ionic-angular";

@Component({
  selector: 'page-events',
  templateUrl: 'events.html'
})
export class EventsPage {
  //eventsCollection: {event: Event, attendees: Attendee[], icon: string}[];
  events: FirebaseListObservable<any[]>;

  attendancePage = AttendancePage;

  constructor(private eventsSvc: EventsService,
              private alertCtrl: AlertController){

  }


  ionViewWillEnter() {
    this.events = this.eventsSvc.getEvents();
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
