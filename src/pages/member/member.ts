import {Component, OnInit} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {FirebaseListObservable, FirebaseObjectObservable} from "angularfire2";
import {EditMemberPage} from "../edit-member/edit-member";

@Component({
  selector: 'page-member',
  templateUrl: 'member.html'
})
export class MemberPage implements OnInit {
  private member: FirebaseObjectObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ngOnInit() {
    this.member = this.navParams.get('member');
    //console.log('MemberPage');
    console.log(this.member);
  }

  onEditMember() {
    this.navCtrl.push(EditMemberPage, {mode: 'Edit', member: this.member});
  }

}
