/**
 * Created by Allan Tejano on 2/16/2017.
 */
import 'rxjs/add/operator/map';
import {Injectable} from "@angular/core";
import {AngularFire} from 'angularfire2';
import {AuthService} from "./auth";

@Injectable()
export class UserService {

  userId:string;
  constructor(private af:AngularFire,
    private authService:AuthService) {
     this.userId = this.authService.getActiveUser().uid;
  }

  // getUserCircles(): FirebaseListObservable<any[]> {
  //   return this.af.database.list('/events', {
  //     query: {
  //       limitToLast: 20,
  //       orderByChild: 'when',
  //       startAt: this.startAtFilter,
  //     }})
  // }

  addToMyCircle(memberKey:string){
    //const userId = this.authService.getActiveUser().uid;
    //console.log(`addUserCircle+${memberKey}`);
    let url = `/userCircles/${this.userId}/${memberKey}`;
    let afRef = this.af.database.object(url);
    afRef.set(true);
  }

  getMyCircles(){
    let circleKeys = [];
    const userKey = this.authService.getActiveUser().uid;
    let url = `/userCircles/${userKey}`;
    this.af.database.list(url, { preserveSnapshot: true})
      .subscribe(itemKeys=>{
        itemKeys.forEach(itemKey => {
          //console.log(itemKey.key);
          circleKeys.push(itemKey.key);
        });
      })
    return circleKeys;
  }

  isInMyCircle(memberKey: string) {
    //const userId = this.authService.getActiveUser().uid;
    let url = `/userCircles/${this.userId}/${memberKey}`;
    let circleRef = this.af.database.object(url, { preserveSnapshot: true });
    return circleRef;
  }

  removeToMyCircle(memberKey: string) {
    let url = `/userCircles/${this.userId}/${memberKey}`;
    //let afRef = this.af.database.object(url);
    this.af.database.object(url).remove();
  }
}
