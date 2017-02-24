
import {Injectable} from "@angular/core";
import {FirebaseListObservable, AngularFire} from 'angularfire2';
import {AuthService} from "./auth";
import 'rxjs/Rx';

export class vote {
  constructor(
    public on: Date) {}
}

@Injectable()
export class AttendanceService{

  constructor(
    private authService: AuthService,
    private af:AngularFire) {  }

  getAttendees(eventId: string): FirebaseListObservable<any[]> {
    return this.af.database.list(`/attendees/${eventId}`);
  }

  addAttendee(eventKey: string, memberKey:string) {
    const userId = this.authService.getActiveUser().uid;
    let url = `/attendees/${eventKey}/${memberKey}/votes/${userId}`;
    const eventMemberVoteRef = this.af.database.object(url, { preserveSnapshot: true });

    eventMemberVoteRef.subscribe(data => {
      if(data.val()==null) {
        eventMemberVoteRef.update({on : new Date()});
      } else {
        console.log('eventMemberVoteRef snapshot exists')
      }
    });
  }

  isVoted(eventKey:string, memberKey:string) {
    const userKey = this.authService.getActiveUser().uid;
    let url = `/attendees/${eventKey}/${memberKey}/votes/${userKey}`;
    let voted = false;
    const eventMemberVoteRef = this.af.database.object(url, { preserveSnapshot: true });

    eventMemberVoteRef.subscribe(data => {
      if(data.val()==null) {
        voted = false;
      } else {
        voted = true;
      }
    });
    return voted;
  }
}
