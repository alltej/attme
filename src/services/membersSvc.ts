
import {Injectable} from "@angular/core";
import {FirebaseListObservable, AngularFire, FirebaseObjectObservable} from 'angularfire2';
import 'rxjs/add/operator/first';

@Injectable()
export class MembersService{
  //public member : FirebaseObjectObservable<any>;
  //private member : Array<any>;

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

  findMemberId(memberId: string) {
    //var team = this.af.database.object('/teams/' , { preserveSnapshot: true }).take(1);
    return this.af.database.list(`/members/`, {
      query: {
        orderByChild: 'memberId',
        equalTo: memberId,
        limitToFirst: 1
      }
    });

    //return memberRef;
    // console.log('heel');
    // console.log(this.member);
    // return this.member;
    // this.af.database.list(`/members/`, {
    //   query: {
    //     orderByChild: 'memberId',
    //     equalTo: memberId,
    //     limitToFirst: 1
    //   }
    // }).subscribe(x => {
    //   if (x.length > 0) {
    //     // console.log(x.length);
    //     console.log('match found!');
    //     console.log(x[0]);
    //     this.member = x[0];
    //   }
    //   else{
    //     //console.log('match not found')
    //   }
    // });
    // console.log('heel');
    // console.log(this.member);
    // return this.member;
  }
}
