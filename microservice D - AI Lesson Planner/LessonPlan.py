import google.generativeai as genai
import os
import zmq

#make this environment variable later
api_key = "AIzaSyC2UWrY0dqCWQJ7WwqTL83WKMcv2NpRXZc"

genai.configure(api_key=api_key)
model = genai.GenerativeModel("gemini-1.5-flash")

#setup ZeroMQ to listen for requests
context = zmq.Context()
socket = context.socket(zmq.REP)
socket.bind("tcp://*:5555")

#wait for request
while True:
    message = socket.recv()
    print("Message received.")
    message = message.decode()
    print(message)

    #if message wasn't empty, send to Gemini
    if len(message) != 0:
        response = model.generate_content(message)

    response = response.text
    print("Sending response: " + response)
    response = response.encode()

    #send lesson plan back to client
    socket.send(response)
