
import {Injectable} from "@angular/core";
import {FirebaseListObservable, AngularFire} from 'angularfire2';
import {Member} from "../models/members";
import {Observable} from "rxjs";
import {Http} from "@angular/http";

@Injectable()
export class MembersService{

  constructor(private af:AngularFire, private http: Http) {
  }

  getMembers(): FirebaseListObservable<any[]> {
    return this.af.database.list('/members');
  }

  getMembersByEventKey(eventKey:string): FirebaseListObservable<any[]> {
    return this.af.database.list('/members');
  }

  getItem(id): Observable<any> {
    return this.af.database.object('/item/' + id)
      .map((item) => {
        item.subitems = this.af.database.list('/subitems/' + id)
          .map((subitems) => {
            return subitems.map((subitem) => {
              subitem.details = this.af.database.list('/subitems/' + id + '/' + subitem.$key + '/detail');
              return subitem;
            });
          });
        return item;
      });
  }
  // getMembers(): FirebaseListObservable<any[]> {
  //   let membersRef = this.af.database.list('/members');
  //   let eventId = "my-event";
  //   let eventRef = membersRef.childByAppendingPath(eventId);
  // }

  // let postsRef = Firebase(url: "<my-firebase-app>/posts")
  // let categoryId = "my-category"
  // let categoryRef = postsRef.childByAppendingPath(categoryId)
  // let query = categoryRef.queryOrderedByChild("date")
  // query.observeEventType(.ChildAdded) { (snap: FDataSnapshot!) {
  // print(snap.value)

  // getAttendanceByEvent(): FirebaseListObservable<any[]> {
  //   return this.af.database.list('/members').
  //     map(item =>
  //       item.
  //   );
  // }

  // getItem(id): Observable<any> {
  //   return this.af.database.object('/item/' + id)
  //     .map((item) => {
  //       item.subitems = this.af.database.list('/subitems/' + id)
  //         .map((subitems) => {
  //           return subitems.map((subitem) => {
  //             subitem.details = this.af.database.list('/subitems/' + id + '/' + subitem.$key + '/detail');
  //             return subitem;
  //           });
  //         });
  //       return item;
  //     });
  // }
}
