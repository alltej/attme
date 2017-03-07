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
    this.member = null;
    this.memberSvc.getMemberKeyByUserKey()
      .subscribe((data) => {
        if(data.val()!=null) {
          let memberKey = Object.keys(data.val())[0];//data.val().key;
          this.isVerified=true;
          this.isMemberExists = true;
          this.loadMember(memberKey);
        }
        // else{
        //   this.isVerified=false;
        //   this.isMemberExists=false;
        // }
      });
  }

  ionViewWillEnter(): void {
    //console.log('will enter: ' + this.memberKey);
  }

  ionViewDidEnter() { // THERE IT IS!!!
    //console.log('did enter: ' + this.memberKey);
  }

  onSearchMemberId(form: NgForm) {
    this.memberSvc.findMemberId(form.value.memberId)
      .subscribe((data) => {
        if (data.length>0) {
          this.memberKey = data[0].key;
          this.isMemberExists = true;
          this.loadMember(this.memberKey);
      }
      });
    form.reset();

  }

  onConfirmMember(){
    this.memberSvc.confirmMember(this.memberKey);
    this.isVerified=true;
  }

  private loadMember(memberId:string) {
    if (memberId != null){
      this.memberSvc.getMember(memberId)
        .subscribe((data)=>{
          if (data.val()!=null) {
            this.member = data.val();
            this.isMemberExists = true;
          }

        });
    }

  }
}
