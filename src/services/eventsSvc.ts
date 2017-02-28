
import {Injectable} from "@angular/core";
import {FirebaseListObservable, AngularFire, FirebaseObjectObservable} from 'angularfire2';
import {Http} from "@angular/http";
import {Observable} from "rxjs";

@Injectable()
export class EventsService{
  //private events: Observable<Event[]>;

  constructor(private af:AngularFire,
    private http:Http) {
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

  getAttendanceCount(eventKey: string) : number{
    //this.af.database.list('/client/posts')
    // //.map(list=>list.length).subscribe(length=>console.log(length))
    let ac = 0;
    let url = `/attendees/${eventKey}`;
    //return this.af.database.object(url);
    // this.af.database.list(url)
    //   .map(list=>list.length).subscribe(length=>console.log(length));
    // return 3;

    const lists = this.af.database.object(url, { preserveSnapshot: true });
    lists.subscribe(snapshot => {
      ac = snapshot.numChildren(); // gets length
    });
    return ac;
  }
}
