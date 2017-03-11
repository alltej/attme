import {Component, OnInit} from '@angular/core';
import {MembersService} from "../../services/membersSvc";
import {NavController} from "ionic-angular";
import {MemberPage} from "../member/member";
import {EditMemberPage} from "../edit-member/edit-member";
import {Observable} from 'rxjs/Rx';
@Component({
  selector: 'page-members',
  templateUrl: 'members.html'
})
export class MembersPage implements OnInit{
  members: Observable<any[]>;
  constructor(
    private navCtrl: NavController,
    private membersSvc: MembersService) {
  }

  ngOnInit() {
    //this.members = this.membersSvc.getMembers();
    this.members = this.membersSvc.getMembers()
      .map( (arr) => { return arr; } );
  }

  onNewMember(){
    this.navCtrl.push(EditMemberPage, {mode: 'New'});
  }

  onLoadMember(member:any){
    //console.log(member);
    this.navCtrl.push(MemberPage, {member: member});
  }
}
