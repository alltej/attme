import { Component } from '@angular/core';
import {CirclesPage} from "../circles/circles";
import {EventsPage} from "../events/events";



@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  circlesPage = CirclesPage;
  eventsPage = EventsPage;
}
