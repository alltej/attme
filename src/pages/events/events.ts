import {Component, OnInit} from '@angular/core';
import { Event } from "../../data/event.interface";
import { Attendee } from "../../data/attendee.interface";
import {AttendancePage} from "../attendance/attendance";
import events from '../../data/attme-data-simple';

@Component({
  selector: 'page-events',
  templateUrl: 'events.html'
})
export class EventsPage implements OnInit {
  eventsCollection: {event: Event, attendees: Attendee[], icon: string}[];
  attendancePage = AttendancePage;

  ngOnInit() {
    this.eventsCollection = events;
  }
}
