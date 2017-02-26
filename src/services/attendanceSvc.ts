
import {Injectable} from "@angular/core";
import {FirebaseListObservable, AngularFire} from 'angularfire2';
import {AuthService} from "./auth";
import 'rxjs/Rx';
import {Http} from "@angular/http";

export class vote {
  constructor(
    public on: Date) {}
}

@Injectable()
export class AttendanceService{

  constructor(
    private authService: AuthService,
    private af:AngularFire,
    private http: Http) {  }

  getAttendees(eventId: string): FirebaseListObservable<any[]> {
    return this.af.database.list(`/attendees/${eventId}`);
  }

  addAttendee(eventKey: string, memberKey:string) {
    const userId = this.authService.getActiveUser().uid;
    let url = `/attendees/${eventKey}/${memberKey}/votes/${userId}`;
    // const eventMemberVoteRef = this.af.database.object(url, { preserveSnapshot: true });
    // //const eventMemberVoteRef = this.af.database.object(url);
    // //const eventMemberVoteRef = this.af.database.object(url, { preserveSnapshot: true });
    // eventMemberVoteRef.subscribe(data => {
    //   var onVal = (new Date()).toUTCString();
    //   //eventMemberVoteRef.update({on : onVal});
    //   if(data.$value==null) {
    //     //eventMemberVoteRef.update({on : new Date()});
    //     eventMemberVoteRef.update({on : new Date().toISOString()});
    //   } else {
    //     console.log('eventMemberVoteRef snapshot exists')
    //   }
    // });

    this.af.database.object(url).$ref.transaction(currentValue => {
      if (currentValue === null) {
        return{on : new Date().toISOString()};
        //return {email: 'johndoe@example.com', password: '!@#$1234'};
      } else {
        console.log('This username is taken. Try another one');
        //return Promise.reject(Error('username is taken'))
      }
    })
      .then( result => {
        // Good to go, user does not exist
        if (result.committed) {
          // TODO: Take additional action
        }
      })
      .catch( error => {
        // handle error
      });
  }

  // addAttendee(eventKey: string, memberKey:string) {
  //   const userId = this.authService.getActiveUser().uid;
  //   let url = `/attendees/${eventKey}/${memberKey}/votes/${userId}`;
  //   const eventMemberVoteRef = this.af.database.object(url, { preserveSnapshot: true });
  //   //const eventMemberVoteRef = this.af.database.object(url);
  //   //const eventMemberVoteRef = this.af.database.object(url, { preserveSnapshot: true });
  //   eventMemberVoteRef.subscribe(data => {
  //     var onVal = (new Date()).toUTCString();
  //     //eventMemberVoteRef.update({on : onVal});
  //     if(data.$value==null) {
  //       //eventMemberVoteRef.update({on : new Date()});
  //       eventMemberVoteRef.update({on : new Date().toISOString()});
  //     } else {
  //       console.log('eventMemberVoteRef snapshot exists')
  //     }
  //   });
  // }

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
    let url = `/attendees/${eventKey}/${memberKey}/votes/${userId}`;
    const itemObservable = this.af.database.object(url);
    itemObservable.remove();

    //const eventMemberVoteRef = this.af.database.object(url, { preserveSnapshot: false });
    //const eventMemberVoteRef = this.af.database.object(url);
    // this.af.database.object(url).$ref.transaction(currentValue => {
    //   if (currentValue === null) {
    //     return Promise.reject(Error('already removed'))
    //   } else {
    //     console.log('This username is taken. Try another one');
    //     return currentValue.remove;
    //   }
    // })
    //   .then( result => {
    //     // Good to go, user does not exist
    //     if (result.committed) {
    //       // TODO: Take additional action
    //     }
    //   })
    //   .catch( error => {
    //     // handle error
    //   });
  }

  removeAttendeeOrig(eventKey: string, memberKey: string) {
    const userId = this.authService.getActiveUser().uid;
    let url = `/attendees/${eventKey}/${memberKey}/votes/${userId}`;
    const eventMemberVoteRef = this.af.database.object(url, { preserveSnapshot: false });
    //const eventMemberVoteRef = this.af.database.object(url);
    eventMemberVoteRef.subscribe(data => {
      // if(data.val()==null) {
      //   eventMemberVoteRef.remove();
      // } else {
      //   console.log('eventMemberVoteRef snapshot is null')
      // }
      if(data.$value==null) {
        eventMemberVoteRef.remove();
      } else {
        console.log('eventMemberVoteRef snapshot is null')
      }
    });
  }

  getLikeCount(eventKey: string, memberKey: string) {
    return 10;
    // //console.log(`e: ${eventKey}, m: ${memberKey}`)
    // let root = `https://attme-8d4f7.firebaseio.com`;
    // let url = `${root}/attendees/${eventKey}/${memberKey}/votes.json?shallow=true`;
    // //return this.af.database.list(url);
    // //return this.af.database.list(url);
    // //console.log(url);
    //
    // // return this.http.get(url)
    // //   .map(response => response.json());
    //
    // let c = 5;
    // this.http.get(url)
    //   .map(response => response.json())
    //   .subscribe(items => {
    //     //console.log(items);
    //       if (items!=null){
    //         c = Object.keys(items).length};
    //       }
    //
    //     );
    //
    // //console.log(`ss:${c}`);
    // return c;
    // this.http.get('https://your-app-name.firebaseio.com/stages/stageOne.json?shallow=true')
    //   .map(response => response.json())
    //   .subscribe(items => Object.keys(items).length)

    //const eventMemberVoteRef = this.af.database.object(url);
    // eventMemberVoteRef.subscribe(data => {
    //   // if(data.val()==null) {
    //   //   eventMemberVoteRef.remove();
    //   // } else {
    //   //   console.log('eventMemberVoteRef snapshot is null')
    //   // }
    //   if(data.val()==null) {
    //     console.log('zz')
    //     let c = eventMemberVoteRef.count;
    //     console.log(c);
    //   } else {
    //     console.log('eventMemberVoteRef snapshot is null')
    //   }
    // });
  }
}
