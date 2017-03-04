import { Component } from '@angular/core';
import {MembersService} from "../../services/membersSvc";
import {FirebaseListObservable, FirebaseObjectObservable} from "angularfire2";
import {NavController} from "ionic-angular";
import {MemberPage} from "../member/member";
import {EditMemberPage} from "../edit-member/edit-member";

@Component({
  selector: 'page-members',
  templateUrl: 'members.html'
})
export class MembersPage {
  private members: FirebaseListObservable<any[]>;

  constructor(
    private navCtrl: NavController,
    private membersSvc: MembersService) {
  }

  ionViewWillEnter() {
    this.members = this.membersSvc.getMembers();
    //console.log(this.members);
  }

  onNewMember(){
    this.navCtrl.push(EditMemberPage, {mode: 'New'});
  }

  onLoadMember(member:FirebaseObjectObservable<any>){
    //console.log(member);
    this.navCtrl.push(MemberPage, {member: member});
  }
}
