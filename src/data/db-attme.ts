/**
 * Created by Allan Tejano on 2/20/2017.
 */
export const dbData = {
  "events" : [
    {
      "id": "E1",
      "name": "Jan Meetup",
      "description": "Building hybrid apps",
      "when": "2017-01-15",
      "where": "Atl Downtown",
      "tags": [{
        "xamarin": true
      }],
      "category": "meetup"
    },
    {
      "id": "E2",
      "name": "Mar Disqus",
      "description": "Angular 2 Conf",
      "when": "2017-03-15",
      "where": "SFHS",
      "tags": [{
        "angular2": true
      }],
      "category": "conference"
    }
  ],
  "members": [
    {
      "id": "M1",
      "lastName": "Hello",
      "firstName": "World",
      "memberId": "AO11"
    },
    {
      "id": "M2",
      "lastName": "Peter",
      "firstName": "Smith",
      "memberId": "AO12"
    },
    {
      "id": "M3",
      "lastName": "John",
      "firstName": "Smith",
      "memberId": "AO13"
    },
    {
      "id": "M4",
      "lastName": "Jenn",
      "firstName": "Kwan",
      "memberId": "AO14"
    }
  ],
  "attendees": [
    {
      "e1": {
        "M1": {
          "logs": [
            {
              "by": "u10002",
              "on": "2017-03-01 08:00:00"
            },
            {
              "by": "u10003",
              "on": "2017-03-01 08:05:00"
            },
            {
              "by": "u10004",
              "on": "2017-03-01 08:05:00"
            }
          ]
        },
        "M2": {
          "logs": [
            {
              "by": "u10001",
              "on": "2017-03-01 08:00:00"
            },
            {
              "by": "u10003",
              "on": "2017-03-01 08:05:00"
            }
          ]
        }
      },
      "e2": {
        "M1": {
          "logs": [
            {
              "by": "u10002",
              "on": "2017-03-01 08:00:00"
            },
            {
              "by": "u10003",
              "on": "2017-03-01 08:05:00"
            }
          ]
        }
      }
    }
  ],
  "profiles" : [
    {
      "U1001": {
        "lastName": "Alex",
        "firstName": "King"
      },
      "U1002": {
        "lastName": "Pat",
        "firstName": "Young"
      }
    }
  ]
}
