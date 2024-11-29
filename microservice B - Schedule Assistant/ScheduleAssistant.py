import zmq
import json

#setup ZeroMQ to listen for requests
context = zmq.Context()
socket = context.socket(zmq.REP)
socket.bind("tcp://*:5556")

#wait for request
while True:
    message = socket.recv()
    message = message.decode()

    #break data into separate structures
    dict = json.loads(message)
    studentlist = dict["students"]
    teachertimes = dict["teachertimes"]

    #if message wasn't empty, parse list to build dictionary with teacher rosters
    if len(studentlist) != 0:

        #process rosters
        rosters = {}

        try:
            for student in studentlist:
                if student["teacher"] in rosters.keys():
                    rosters[student["teacher"]].append(student["name"])
                else:
                    rosters[student["teacher"]] = [student["name"]]

        #create dictionary of time with students


        #Generic error if unexpected data
        except:
            socket.send(b"Error - invalid data.")

    else:
        socket.send(b"Error - no data received.")

    blocks = {}

    try:
    #match students to available blocks based on their teacher
        for teacher in rosters.keys():
            for time in teachertimes[teacher]:
                if time not in blocks.keys():
                    blocks[time] = []
                for student in rosters[teacher]:
                    blocks[time].append(student)

        print(blocks)

    except:
        socket.send(b"Unknown error occurred")

    #send dictionary of blocks with available students back to client
    response = json.dumps(blocks)
    response = response.encode()
    socket.send(response)