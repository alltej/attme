import {Component, OnInit} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AuthService} from "../../services/auth";
import {NgForm, FormGroup} from "@angular/forms";
import {MembersService} from "../../services/membersSvc";

@Component({
  selector: 'page-my-profile',
  templateUrl: 'my-profile.html'
})
export class MyProfilePage implements OnInit{

  private member : any;
  private isVerified: boolean = false;
  private memberKey: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private authService: AuthService,
              private memberSvc: MembersService) {}

  ngOnInit(): void {
    this.memberKey = this.memberSvc.getMemberKeyByUserKey();
    console.log(`memberKey:${this.memberKey}`);
    if (this.memberKey!=null) {
      this.isVerified=true;
      this.loadMember(this.memberKey);
    }
  }

  onSearchMemberId(form: NgForm) {
    this.loadMember(form.value.memberId);
    form.reset();

  }

  onConfirmMember(member: any){
    // console.log('onConfirmMember');
    // console.log(member);
    this.memberSvc.confirmMember(member.$key);
  }

  private loadMember(memberId:string) {
    this.memberSvc.findMemberId(memberId)
      .subscribe(list=>{
        if (list.length > 0) {
          this.member = list[0];
        }
      });
  }
}
