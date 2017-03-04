import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AuthService} from "../../services/auth";
import {NgForm} from "@angular/forms";
import {MembersService} from "../../services/membersSvc";
import {FirebaseObjectObservable, FirebaseListObservable} from "angularfire2";
import {Observable} from "rxjs";

@Component({
  selector: 'page-my-profile',
  templateUrl: 'my-profile.html'
})
export class MyProfilePage {
  private member : any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private authService: AuthService,
              private memberSvc: MembersService) {}

  onSearchMemberId(form: NgForm) {
    this.loadMember(form.value.memberId);
    // this.slService.addItem(form.value.ingredientName, form.value.amount);
    form.reset();

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
