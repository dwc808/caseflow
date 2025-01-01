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
    print("Received")
    print(dict)
    studentlist = dict["students"]
    teachtimes = dict["teachertimes"]

    teachertimes = {}

    #clean up teachertimes to remove 'name' key
    for entry in teachtimes:
        teachertimes[entry["name"]] = entry["times"]



    #if message wasn't empty, parse list to build dictionary with teacher rosters
    if len(studentlist) != 0:

        #process rosters
        rosters = {}

        try:
            for student in studentlist:
                if student["Teacher"] in rosters.keys():
                    rosters[student["Teacher"]].append(student["Name"])
                else:
                    rosters[student["Teacher"]] = [student["Name"]]

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
            #exception here - how to read this now
            if teacher in teachertimes:
                for time in teachertimes[teacher]:
                    if time not in blocks.keys():
                        blocks[time] = []
                    for student in rosters[teacher]:
                        blocks[time].append(student)



    except:
        socket.send(b"Unknown error occurred")

    #send dictionary of blocks with available students back to client
    response = json.dumps(blocks)
    print("Sending blocks: " + response)
    response = response.encode()
    socket.send(response)