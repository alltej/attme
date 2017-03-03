import { Component } from '@angular/core';
import {MembersService} from "../../services/membersSvc";
import {FirebaseListObservable} from "angularfire2";

@Component({
  selector: 'page-members',
  templateUrl: 'members.html'
})
export class MembersPage {
  private members: FirebaseListObservable<any[]>;

  constructor(private membersSvc: MembersService,) {
  }

  ionViewWillEnter() {
    this.members = this.membersSvc.getMembers();
    console.log(this.members);
  }

}
