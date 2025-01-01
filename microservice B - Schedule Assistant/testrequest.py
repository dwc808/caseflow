testdata = {"students":[
            {
              "id": 1,
              "name": "Ryan",
              "teacher": "Jennings",
              "blocks": []
            },
            {
              "id": 2,
              "name": "Brian",
              "teacher": "James",
              "blocks": []
            },
            {
              "id": 3,
              "name": "Jeff",
              "teacher": "Riley",
              "blocks": []
            },
            {
              "id": 4,
              "name": "Marley",
              "teacher": "Harris",
              "blocks": []
            },
            {
              "id": 5,
              "name": "Jeff ",
              "teacher": "Jenkins",
              "blocks": []
            },
            {
              "id": 6,
              "name": "Tom ",
              "teacher": "Jenkins",
              "blocks": []
            },
            {
              "id": 7,
              "name": "Petey ",
              "teacher": "Jenkins",
              "blocks": []
            }
          ],
            "teachertimes": {
                "Jenkins": ["10:30", "11:00"],
                "Harris": ["10:30", "12:30"],
                "Jennings": ["1:00"],
                "Riley": ["2:15"],
                "James": ["9:00", "9:30", "11:30"]
            }
        }

import zmq
import json

context = zmq.Context()
testdata = json.dumps(testdata)
print(testdata)

#  Socket to talk to server
print("Connecting to hello world server…")
socket = context.socket(zmq.REQ)
socket.connect("tcp://localhost:5556")

#  Do 10 requests, waiting each time for a response
for request in range(5):
    print("Sending request %s …" % request)
    message = testdata.encode()
    socket.send(message)

    #  Get the reply.
    message = socket.recv()
    message = message.decode()
    print("Received reply %s [ %s ]" % (request, message))