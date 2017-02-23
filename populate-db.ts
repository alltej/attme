import {database, initializeApp} from "firebase";
import {firebaseConfig} from "./src/environments/firebase.config";
import {dbData} from "./db-data";

console.log('Initizalizing Firebase database ... ');

initializeApp(firebaseConfig);


const eventsRef = database().ref('events');
const membersRef = database().ref('members');

dbData.events.forEach( event => {

  console.log('adding course', event.name);

  eventsRef.push({
    name: event.name,
    description: event.description,
    when: event.when,
    where: event.where,
    category: event.category
  });
});



dbData.members.forEach( member => {

  console.log('adding course', member.lastName);

  membersRef.push({
    lastName: member.lastName,
    firstName: member.firstName,
    memberId: member.memberId
  });
});
