

import zmq

context = zmq.Context()

#  Socket to talk to server
print("Connecting to hello world server…")
socket = context.socket(zmq.REQ)
socket.connect("tcp://localhost:5556")

#  Do 10 requests, waiting each time for a response
for request in range(1):
    print("Sending request %s …" % request)
    socket.send(b"Write a lesson plan about using partial quotients to solve a division problem.")

    #  Get the reply.
    message = socket.recv()
    message = message.decode()
    print("Received reply %s [ %s ]" % (request, message))