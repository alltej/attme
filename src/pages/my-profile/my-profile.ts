import {Component, OnInit} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AuthService} from "../../services/auth";
import {NgForm} from "@angular/forms";
import {MembersService} from "../../services/membersSvc";

@Component({
  selector: 'page-my-profile',
  templateUrl: 'my-profile.html'
})
export class MyProfilePage implements OnInit{

  private member : any;
  private isVerified: boolean = false;
  private isMemberExists: boolean = false;
  private memberKey: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private authService: AuthService,
              private memberSvc: MembersService) {}
///ionViewDidLoad, ngOnInit

  ngOnInit(): void {
    console.log('init');
    this.member = null;
    console.log(this.member);
    this.memberSvc.getMemberKeyByUserKey()
      .subscribe((data) => {
        if(data.length>0) {
          this.memberKey = data[0].key;
          console.log('ty: ' + this.memberKey);
          this.isVerified=true;
          this.isMemberExists = true;
        }else{
          this.isVerified=false;
          this.isMemberExists=false;
        }
      });
    this.loadMember(this.memberKey);
  }

  onSearchMemberId(form: NgForm) {
    this.loadMember(form.value.memberId);
    form.reset();

  }

  onConfirmMember(member: any){
    this.memberSvc.confirmMember(member.$key);
    this.isVerified=true;
  }

  private loadMember(memberId:string) {
    console.log('load: ' + memberId);
    this.memberSvc.findMemberId(memberId)
      .subscribe(list=>{
        if (list.length > 0) {
          this.member = list[0];
          //console.log('gh: ' + this.member.$key)
          console.log('ln: ' + this.member.lastName)
          this.isMemberExists=true;
        }else{
          this.isMemberExists=false;
          this.member = null;
        }
      });
  }
}
