import {Component, OnInit} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {UserService} from "../../services/userSvc";
import {MembersService} from "../../services/membersSvc";
import {FormControl} from "@angular/forms";
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {MemberPage} from "../member/member";

@Component({
  selector: 'page-circles',
  templateUrl: 'circles.html'
})
export class CirclesPage implements OnInit {
  userCircles: any[];
  private searchControl: FormControl;
  private searching: boolean;
  searchTerm: string = '';
  members: Observable<any[]>;

  constructor(private userSvc: UserService,
              private membersSvc: MembersService,
              private navCtrl: NavController){
    this.searchControl = new FormControl();
  }

  ngOnInit(): void {
    this.userCircles = this.userSvc.getMyCircles();
  }

  ionViewDidLoad() {
    this.setFilteredItems();

    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
      this.searching = false;
      this.setFilteredItems();
    });
  }

  ionViewWillEnter() {
    //this.members = this.membersSvc.getMembers();
  }

  onSearchInput(){
    this.searching = true;
  }

  setFilteredItems(){
    this.searching = false;
    this.members = this.membersSvc.getMembers()
      .map((members) =>
        members.filter(member => this.userCircles.indexOf(member.$key) !== -1)
      );

    if (this.searchTerm == null || this.searchTerm == ''){
      //console.log('setFilteredItems: aa');
      // this.members = this.membersSvc.getMembers()
      //   .map((members) => {return members});
    }else{
      //return items.filter(item => item.name.toLowerCase().indexOf(args[0].toLowerCase()) !== -1);
      this.members = this.members
        .map((members) =>
          members.filter(member => member.lastName.toLowerCase().indexOf(this.searchTerm.toLowerCase()) !== -1 || member.firstName.toLowerCase().indexOf(this.searchTerm.toLowerCase()) !== -1));
    }
  }

  onLoadMember(member:any){
    //console.log(member);
    this.navCtrl.push(MemberPage, {member: member});
  }
}
