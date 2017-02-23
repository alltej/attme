
import {Injectable} from "@angular/core";
import {FirebaseListObservable, AngularFire} from 'angularfire2';

@Injectable()
export class MembersService{

  constructor(private af:AngularFire) {
  }

  getMembers(): FirebaseListObservable<any[]> {
    return this.af.database.list('/members');
  }
}
