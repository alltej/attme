import {Attendee} from "./attendee.interface";
/**
 * Created by Allan Tejano on 2/16/2017.
 */
export class Event {
  id: string;
  description: string;
  name: string;
  when: string;
  where:string;
  tags: string[];
  attendees: Attendee[];
}
