
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

  // getMembersByEventKey(eventKey:string): FirebaseListObservable<any[]> {
  //   return this.af.database.list('/members');
  // }
  //
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
