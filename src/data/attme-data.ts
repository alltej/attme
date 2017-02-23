// deprecate

export default [
  {
    "orgs" : [
      {
        "id": "O1",
        "name": "Atl Xmarin Grp"
      },
      {
        "id": "O2",
        "name": "Atl Ang2 Grp"
      }
    ],
    "events" : [
      {
        "id": "E1",
        "orgId" : "O1",
        "name": "Jan Meetup",
        "when": "2017-01-15",
        "where":"Atl Downtown"
      },
      {
        "id": "E2",
        "orgId" : "O2",
        "name": "Mar Disqus",
        "when": "2017-03-15",
        "where": "SFHS"
      }
    ],
    "eventAttendance": [
      {
        "eventId": "E1",
        "userId": "U1001",
        "logBy" : [
          {
            "userId": "U10003",
            "created" : "2017-01-30"
          },
          {
            "userId": "U10005",
            "created" : "2017-01-30"
          }
        ]
      }
    ],
    "userOrgs" : [
      {
        "userId": "U1001",
        "orgs": [
          "O1", "O2"
        ]
      }
    ],
    "userCircles" : [
      {
        "userId" : "U1001",
        "circles" : [
          "U1003", "U10005"
        ]
      }
    ]
  }


]
