import zmq
import json

testdata = {"Get":"2024"}
context = zmq.Context()

#  Socket to talk to server
print("Connecting to hello world server…")
socket = context.socket(zmq.REQ)
socket.connect("tcp://localhost:5558")

#  Do 10 requests, waiting each time for a response
for request in range(1):
    print("Sending request %s …" % request)
    message = json.dumps(testdata)
    message = message.encode()
    socket.send(message)

    #  Get the reply.
    message = socket.recv()
    message = message.decode()
    print("Received reply %s [ %s ]" % (request, message))