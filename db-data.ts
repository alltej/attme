//deprecate
export const dbData = {
  "events" : [
    {
      "id": "E1",
      "name": "Monthly Assembly",
      "description": "feb monthly assembly",
      "when": "2017-02-15",
      "where": "St Benedict Church, Johns Creek, GA",
      "tags": [{
        "assembly": true
      }],
      "category": "assembly"
    },
    {
      "id": "E2",
      "name": "Ancop Walk",
      "description": "",
      "when": "2017-03-15",
      "where": "TBD",
      "tags": [{
        "ancop": true
      }],
      "category": "ancop"
    },
    {
      "id": "E2",
      "name": "Week 12 HH Meeting",
      "description": "",
      "when": "2017-03-06",
      "where": "HH Host",
      "tags": [{
        "hh": true
      }],
      "category": "hh-meeting"
    }
  ],
  "members": [
    {
      "id": "M1",
      "lastName": "Alex",
      "firstName": "B",
      "memberId": "111"
    },
    {
      "id": "M2",
      "lastName": "Arnel",
      "firstName": "B",
      "memberId": "112"
    },
    {
      "id": "M3",
      "lastName": "Ron",
      "firstName": "P",
      "memberId": "113"
    },,
    {
      "id": "M3",
      "lastName": "Anna",
      "firstName": "P",
      "memberId": "1131"
    },
    {
      "id": "M4",
      "lastName": "Roy",
      "firstName": "R",
      "memberId": "114"
    },
    {
      "id": "M4",
      "lastName": "Mike",
      "firstName": "L",
      "memberId": "115"
    },
    {
      "id": "M4",
      "lastName": "Alma",
      "firstName": "L",
      "memberId": "1151"
    },
    {
      "id": "M4",
      "lastName": "Julio",
      "firstName": "E",
      "memberId": "116"
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
