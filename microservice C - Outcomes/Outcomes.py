import zmq
import json
import datetime

#setup ZeroMQ to listen for requests
context = zmq.Context()
socket = context.socket(zmq.REP)
socket.bind("tcp://*:5558")

#wait for request
while True:
    #get current year to store data correctly
    currentDateTime = datetime.datetime.now()
    date = currentDateTime.date()
    year = date.strftime("%Y")

    #get message
    message = socket.recv()
    message = message.decode()
    request = json.loads(message)

    print("Received:")
    print(request)


    #open existing data
    with open('outcomes.json', 'r') as file:
        data = json.load(file)

    #check for request type
    if request.get("Get"):

        #send data to clien
        data = json.dumps(data)
        data = data.encode()
        print("Sending data: ")
        print(data)
        socket.send(data)

    else:

        #temporary fix - add year here
        request = request["outcomes"]
        request = {"2024":request}

        #add blank entry for year if first time
        if year not in data:
            data[year] = {}

        #update outcomes with incoming data
        for event in request[year].keys():
            data[year][event] = data[year].get(event, 0) + int(request[year][event])

        print(data)

        #save data
        save_data = json.dumps(data)
        with open('outcomes.json', 'w') as file:
            file.write(save_data)

        print("Updated data. Sending confirmation. New data: " + save_data)
        socket.send(b"Data successfully entered.")



