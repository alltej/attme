import 'rxjs/add/operator/map';
import {Injectable} from "@angular/core";
import {FirebaseListObservable, AngularFire} from 'angularfire2';

@Injectable()
export class EventsService{

  private startAtFilter: string;
  constructor(private af:AngularFire) {
    var newDate = Date.now() + -60*24*3600*1000; // date n days ago in milliseconds UTC
    this.startAtFilter = new Date(newDate).toISOString();
  }

  getEvents(): FirebaseListObservable<any[]> {
    return this.af.database.list('/events', {
      query: {
        limitToLast: 20,
        orderByChild: 'when',
        startAt: this.startAtFilter,
      }})
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

  addEvent(name, description, when, where){
    let data = this.getEventJson(name, description, when, where);
    let url = `/events`;
    let eventsRef = this.af.database.list(url);
    eventsRef.push(data);
  }

  updateEvent($key: string, name, description, when, where) {
    //console.log('update member');
    let url = `/events/${$key}`;
    let data = this.getEventJson(name, description, when, where);
    let memberRef = this.af.database.object(url);
    memberRef.update(data)
      //.then(_ => console.log('update!'))
    ;
  }

  private getEventJson(name, description, when, where) {
    return {
      name: name,
      description: description,
      when: when,
      where: where
    };
  }
}
