import {Component, OnInit} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {FormGroup, Validators, FormControl} from "@angular/forms";
import {EventsService} from "../../services/eventsSvc";

@Component({
  selector: 'page-edit-event',
  templateUrl: 'edit-event.html'
})
export class EditEventPage implements OnInit{
  mode = 'New';
  eventForm: FormGroup;

  private event: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private eventsSvc: EventsService) {}

  ngOnInit() {
    this.mode = this.navParams.get('mode');
    if (this.mode == 'Edit') {
      this.event = this.navParams.get('event');
    }
    this.initializeForm();
  }

  private initializeForm() {
    let name = null;
    let description = null;
    let when = null;
    let where = null;

    if (this.mode == 'Edit') {
      name = this.event.Name;
      description = this.event.Description;
      when = this.event.When;
      where = this.event.Where;
    }

    this.eventForm = new FormGroup({
      'name': new FormControl(name, Validators.required),
      'description': new FormControl(description, Validators.required),
      'when': new FormControl(when, Validators.required),
      'where': new FormControl(where, Validators.required),
    });
  }

  onSubmit() {
    const value = this.eventForm.value;

    if (this.mode == 'Edit') {
      this.eventsSvc.updateEvent(this.event.$key, value.name, value.description, value.when, value.where);
    } else {
      this.eventsSvc.addEvent(value.name, value.description, value.when, value.where);
    }
    this.eventForm.reset();
    // let options = {
    //   reload: 'hello'
    // };

    this.navParams.get("parentPage").reloadEvents();

    //console.log('popToRoot');
    this.navCtrl.popToRoot();
  }
}
