
import {Injectable} from "@angular/core";
import {FirebaseListObservable, AngularFire} from 'angularfire2';

@Injectable()
export class EventsService{

  constructor(private af:AngularFire) {}

  getEvents(): FirebaseListObservable<any[]> {
    return this.af.database.list('/events', {
      query: {
        limitToLast: 10,
        orderByKey: true
      }});

  }

  getAttendanceCount(eventKey: string) : number{
    let childCount = 0;
    let attendeesUrl = `/attendees/${eventKey}`;
    const lists = this.af.database.object(attendeesUrl, { preserveSnapshot: true });
    lists.subscribe(snapshot => {
      childCount = snapshot.numChildren();
    });
    return childCount;
  }
}
