import {Component, OnInit} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {FormGroup, Validators, FormControl} from "@angular/forms";
import {MembersService} from "../../services/membersSvc";

@Component({
  selector: 'page-edit-member',
  templateUrl: 'edit-member.html'
})
export class EditMemberPage implements OnInit {
  mode = 'New';
  memberForm: FormGroup;
  member: any;
  memberId: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private memberSvc: MembersService) {}

  ngOnInit() {
    this.mode = this.navParams.get('mode');
    if (this.mode == 'Edit') {
      this.member = this.navParams.get('member');
    }
    this.initializeForm();
  }

  onSubmit() {
    const value = this.memberForm.value;

    if (this.mode == 'Edit') {
      this.memberSvc.updateMember(this.member.$key, value.firstName, value.lastName, value.memberId);
    } else {
      this.memberSvc.addMember(value.firstName, value.lastName, value.memberId);
    }
    this.memberForm.reset();
    this.navCtrl.popToRoot();
  }

  private initializeForm() {
    let memberId = null;
    let firstName = null;
    let lastName = null;

    if (this.mode == 'Edit') {
      firstName = this.member.firstName;
      lastName = this.member.lastName;
      memberId = this.member.memberId;
    }

    this.memberForm = new FormGroup({
      'firstName': new FormControl(firstName, Validators.required),
      'lastName': new FormControl(lastName, Validators.required),
      'memberId': new FormControl(memberId, Validators.required),
    });
  }
}
