
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
    let data = {
      firstName: firstName,
      lastName: lastName,
      memberId: memberId
    }
    var memberRef = this.af.database.object(url);
    memberRef.update(data).then(_ => console.log('update!'));
  }

  addMember(firstName, lastName, memberId) {
    console.log('add member');

  }
}
