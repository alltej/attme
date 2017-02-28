
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
    this.af.database.object(url).$ref.transaction(currentValue => {
      if (currentValue === null) {
        return{on : new Date().toISOString()};
      } else {
        //console.log('This username is taken. Try another one');
        //return Promise.reject(Error('username is taken'))
      }
    })
      .then( result => {
        // Good to go, user does not exist
        if (result.committed) {
          let voteUrl = `/attendees/${eventKey}/${memberKey}/voteCount`;
          let tagObs = this.af.database.object(voteUrl);
          tagObs.$ref.transaction(tagValue => {
            return tagValue ? tagValue + 1 : 1;
          });
        }
      })
      .catch( error => {
        // handle error
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

  removeAttendee(eventKey: string, memberKey: string) {
    const userId = this.authService.getActiveUser().uid;
    let voteKeyUserUrl = `/attendees/${eventKey}/${memberKey}/votes/${userId}`;
    const voteUserKeyRef = this.af.database.object(voteKeyUserUrl);
    voteUserKeyRef.remove();

    let voteCountUrl = `/attendees/${eventKey}/${memberKey}/voteCount`;
    let voteCountRef = this.af.database.object(voteCountUrl);
    let voteCount = 0;
    voteCountRef.$ref.transaction(tagValue => {
      voteCount = tagValue ? tagValue - 1 : 0;
      return voteCount;
    }).then(result => {
        if (result.committed) {
          if (voteCount == 0){
            let eventMemberKeyUrl = `/attendees/${eventKey}/${memberKey}`;
            this.af.database.object(eventMemberKeyUrl).remove();
          }
        }
    });
  }

  getUpVotes(eventKey: string, memberKey: string) {
    let voteCount = 0;
    let voteCountUrl = `/attendees/${eventKey}/${memberKey}/voteCount`;
    var voteCountRef = this.af.database.object(voteCountUrl,{ preserveSnapshot: true})

    voteCountRef.subscribe(snapshot => {
      voteCount = snapshot.val();
    });
    return voteCount;
  }
}
