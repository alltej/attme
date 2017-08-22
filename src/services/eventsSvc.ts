import 'rxjs/add/operator/map';
import {Injectable} from "@angular/core";
import {FirebaseListObservable, AngularFireDatabase} from 'angularfire2/database';

@Injectable()
export class EventsService{

  private startAtFilter: string;
  constructor(private af:AngularFireDatabase) {
    var newDate = Date.now() + -60*24*3600*1000; // date n days ago in milliseconds UTC
    this.startAtFilter = new Date(newDate).toISOString();
  }

  getEvents(): FirebaseListObservable<any[]> {
    return this.af.list('/events', {
      query: {
        limitToLast: 20,
        orderByChild: 'when',
        startAt: this.startAtFilter,
      }})
  }

  getAttendanceCount(eventKey: string) : number{
    let childCount = 0;
    let attendeesUrl = `/attendees/${eventKey}`;
    const lists = this.af.object(attendeesUrl, { preserveSnapshot: true });
    lists.subscribe(snapshot => {
      childCount = snapshot.numChildren();
    });
    return childCount;
  }

  addEvent(name, description, when, where){
    let data = this.getEventJson(name, description, when, where);
    let url = `/events`;
    let eventsRef = this.af.list(url);
    eventsRef.push(data);
  }

  updateEvent($key: string, name, description, when, where) {
    //console.log('update member');
    let url = `/events/${$key}`;
    let data = this.getEventJson(name, description, when, where);
    let memberRef = this.af.object(url);
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
