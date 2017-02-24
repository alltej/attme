
import {Injectable} from "@angular/core";
import {FirebaseListObservable, AngularFire} from 'angularfire2';
import {AuthService} from "./auth";
import { Http, Response } from "@angular/http";
import 'rxjs/Rx';

export class vote {
  constructor(
    public on: Date) {}
}


@Injectable()
export class AttendanceService{
  //private events: Observable<Event[]>;

  constructor(
    private http: Http,
    private authService: AuthService,
    private af:AngularFire) {

   // af.database.list('/events')
   //    .do(console.log);

    // events$.subscribe(
    //   val => console.log(val)

  }

  getAttendees(id: string): FirebaseListObservable<any[]> {
    return this.af.database.list('/attendees');
      //do(console.log);
    //return events$;

  }

  addAttendee(eventId: string, member: any) {
    //console.log(eventId + ', ' + member.$key);
    let memberId = member.$key;
    const userId = this.authService.getActiveUser().uid;
    let token = this.authService.getActiveUser().getToken();
    let vote = {on : new Date().toLocaleDateString()};
    //let eventRef = this.af.database.object('/attendees/' + eventId);
    console.log('A1');
    const eventRef = this.af.database.object(`/events/${eventId}`, { preserveSnapshot: true });

    eventRef.subscribe(snapshot => {
      console.log('A221')
      console.log(snapshot.key);
      //console.log(snapshot.val());
      // if (snapshot.val()== null){
      //   console.log('its null');
      // }
      // if(snapshot == null) {
      //   console.log('eventRef snapshot does not exists')
      //   console.log(snapshot.$value);
      // } else {
      //   console.log('11: eventRef snapshot exists');
      //   console.log(snapshot.$value);
      // }
      // if(snapshot.$value!==null) {
      //     console.log('11: eventRef snapshot exists');
      //     console.log(snapshot.$value);
      // } else {
      //   console.log('eventRef snapshot does not exists')
      //   console.log(snapshot.$value);
      // }
    });

    const eventMemberRef = this.af.database.object(`/attendees/${eventId}/${memberId}`, { preserveSnapshot: true });
    //console.log('eventid: ' + eventId + ', memberid: ' + memberId + ', userId: ' + userId + ', ' + token);
    eventMemberRef.subscribe(snapshot => {
      if(snapshot.val()==null) {
        console.log('22: eventMemberRef snapshot does not exists');
        //console.log(snapshot.$value);
      } else {
        console.log('eventMemberRef snapshot exists');
        console.log(snapshot.val());
        console.log('using $value');
        console.log(snapshot.$value);
      }
    });

    let urlOrRef = `/attendees/${eventId}/${memberId}/votes/${userId}`;
    //let urlOrRef = `/attendees/${eventId}/${memberId}/votes/user1`;
    //let urlOrRef = `/attendees/${eventId}/${memberId}`;
    const eventMemberVoteRef = this.af.database.object(urlOrRef, { preserveSnapshot: true });
    //const eventMemberVoteRef = this.af.database.object(urlOrRef);
    //console.log('eventid: ' + eventId + ', memberid: ' + memberId + ', userId: ' + userId + ', ' + token);
    eventMemberVoteRef.subscribe(data => {
      console.log('BB3');
      console.log(data.val());
      //console.log(data.$value);
      if(data.val()==null) {
        console.log('eventMemberVoteRef snapshot is null')
        //console.log('33: eventMemberVoteRef snapshot does not exists');
        //console.log(snapshot.$value);
        console.log('psoo');
        // this.http.post(`https://attme-8d4f7.firebaseio.com${urlOrRef}/vote.json?auth=${token}`, vote)
        //   .map((response: Response) => {
        //     console.log(response.json());
        //   });
        eventMemberVoteRef.update({on : new Date()});
      } else {
        console.log('eventMemberVoteRef snapshot exists')
        //console.log(snapshot.$value);
      }
    });

    //console.log(association);
    // this.http.post('https://attme-8d4f7.firebaseio.com/attendees/' + eventId + '/' + memberId + '/' + userId + '/vote.json?auth=' + token, vote)
    //   .map((response: Response) => {
    //     console.log(response.json());
    //   });

  }
}
