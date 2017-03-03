
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
    console.log('update member');
  }

  addMember(firstName, lastName, memberId) {
    console.log('add member');

  }
}
