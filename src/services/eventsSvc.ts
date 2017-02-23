
import {Injectable} from "@angular/core";
import {FirebaseListObservable, AngularFire} from 'angularfire2';

@Injectable()
export class EventsService{
  //private events: Observable<Event[]>;

  constructor(private af:AngularFire) {
   // af.database.list('/events')
   //    .do(console.log);

    // events$.subscribe(
    //   val => console.log(val)

  }

  getEvents(): FirebaseListObservable<any[]> {
    return this.af.database.list('/events', {
      query: {
        limitToLast: 10,
        orderByKey: true
      }});
      //do(console.log);
    //return events$;

  }
}
