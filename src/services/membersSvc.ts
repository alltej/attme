
import {Injectable} from "@angular/core";
import {FirebaseListObservable, AngularFire} from 'angularfire2';
import {AuthService} from "./auth";

@Injectable()
export class MembersService{

  constructor(private af:AngularFire,
              private authService: AuthService,) {
  }

  getMembers(): FirebaseListObservable<any[]> {
    return this.af.database.list('/members',{
      query: {
        orderByChild: 'firstName'
      }
    });
  }

  updateMember($key: string, firstName, lastName, memberId) {
    //console.log('update member');
    let url = `/members/${$key}`;
    let data = this.getMemberJson(firstName, lastName, memberId);
    let memberRef = this.af.database.object(url);
    memberRef.update(data)
      //.then(_ => console.log('update!'))
    ;
  }

  addMember(firstName, lastName, memberId) {
    let data = this.getMemberJson(firstName, lastName, memberId);

    let url = `/members`;
    let membersRef = this.af.database.list(url);
    membersRef.push(data);
  }

  private getMemberJson(firstName, lastName, memberId) {
    return {
      firstName: firstName,
      lastName: lastName,
      memberId: memberId
    };
  }

  findMemberId(memberId: string) {
    console.log('find: '+ memberId);
    return this.af.database.list(`/members/`, {
      query: {
        orderByChild: 'memberId',
        equalTo: memberId,
        limitToFirst: 1
      }
    });

  }

  confirmMember(memberKey: string) {
    console.log('confirm:' + memberKey);
    //TODO: need to add validation that this memberKey is not taken by userKey
    // query the userMember node if a memberKey exists
    const userKey = this.authService.getActiveUser().uid;
    let url = `/userMember/${userKey}/${memberKey}`;
    this.af.database.object(url).$ref.transaction(currentValue => {
      if (currentValue === null) {
        return true;
      } else {
        //console.log('This username is taken. Try another one');
        //return Promise.reject(Error('username is taken'))
      }
    })
      .then( result => {
        // Good to go, user does not exist
        if (result.committed) {
          //console.log('user member assoc created');
          // let voteUrl = `/attendees/${eventKey}/${memberKey}/voteCount`;
          // let tagObs = this.af.database.object(voteUrl);
          // tagObs.$ref.transaction(tagValue => {
          //   return tagValue ? tagValue + 1 : 1;
          // });
        }
      })
      .catch( error => {
        // handle error
      });
  }

  isVerified() {

    const userKey = this.authService.getActiveUser().uid;
    let url = `/userMember/${userKey}`;
    let exists:boolean=false;
    const userMemberRef = this.af.database.object(url, { preserveSnapshot: true });

    userMemberRef.subscribe(data => {
      if(data.val()==null) {
        exists = false;
      } else {
        exists = true;
      }
    });
    return exists;
  }

  public getMemberKeyByUserKey() {
    const userKey = this.authService.getActiveUser().uid;
    let url = `/userMember/${userKey}`;
    return this.af.database.list(url, { preserveSnapshot: true });
  }
}
