import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Members page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-members',
  templateUrl: 'members.html'
})
export class MembersPage {

  constructor() {
    console.log('members page');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MembersPage');
  }

}
