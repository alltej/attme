
import {Injectable} from "@angular/core";
import {FirebaseListObservable, AngularFire} from 'angularfire2';

@Injectable()
export class MembersService{

  constructor(private af:AngularFire) {
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
}
