import {Component, OnInit} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {EditMemberPage} from "../edit-member/edit-member";
import {UserService} from "../../services/userSvc";

@Component({
  selector: 'page-member',
  templateUrl: 'member.html'
})
export class MemberPage implements OnInit {
  //private member: FirebaseObjectObservable<any>;
  private member: any;
  private isInMyCircle: boolean;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public userSvc: UserService) {}

  ngOnInit() {
    this.member = this.navParams.get('member');

    this.userSvc.isInMyCircle(this.member.$key).subscribe(data => {
      if(data.val()==null) {
        this.isInMyCircle =  false;
      } else {
        this.isInMyCircle =  true;
      }
    });
  }


  onEditMember() {
    this.navCtrl.push(EditMemberPage, {mode: 'Edit', member: this.member});
  }

  onAddToMyCircle(){
    //console.log('onAddToMyCircle');
    //console.log(memberKey);
    this.userSvc.addToMyCircle(this.member.$key);
  }

  onRemoveToMyCircle(){
    //console.log('onAddToMyCircle');
    //console.log(memberKey);
    this.userSvc.removeToMyCircle(this.member.$key);
  }

  // isInMyCircle(memberKey:string){
  //   //console.log('isInMyCircle');
  //   return this.userSvc.isInMyCircle(memberKey);
  // }
}
