import zmq                          # https://zeromq.org/get-started/?language=python&library=pyzmq#
import json
import matplotlib.pyplot as plt     # https://www.geeksforgeeks.org/matplotlib-pyplot-title-in-python/
import io
import base64

# Title: Get started
# Source: https://zeromq.org/get-started/?language=python&library=pyzmq#
# Set-up ZeroMQ
context = zmq.Context()
socket = context.socket(zmq.REP)
socket.bind("tcp://*:5557")

# Respond to client requests.
while True:

    #  Wait for request from client, which zmq turns into a dictionary.
    data = socket.recv_json()
    print("Received JSON string from server")
    print(data)

    # Assigns a JSON string to a variable.
    json_data = json.loads(data)

    # Assigns a JSON file to a variable.
    # json = json.loads(data)

    # Extract titles from JSON object.
    main_title = json_data["labels"]["title"]
    x_axis_label = json_data["labels"]["x-axis"]
    y_axis_label = json_data["labels"]["y-axis"]

    # Extract data from JSON object.
    x_axis_data = json_data["x-axis-data"]
    y_axis_data = json_data["y-axis-data"]

    # https://www.geeksforgeeks.org/matplotlib-pyplot-title-in-python/
    # Assign data to matplotlib graph.
    plt.plot(x_axis_data, y_axis_data)

    # Update matplotlib graph labels.
    plt.title(main_title)
    plt.xlabel(x_axis_label)
    plt.ylabel(y_axis_label)

    # Show graph.
    # plt.show()

    # Title: BytesIO For Managing Data As File Object in Python
    # Source: https://www.geeksforgeeks.org/stringio-and-bytesio-for-managing-data-as-file-object/
    # Create ByteIO buffer object.
    graph_image_buffer = io.BytesIO()

    # Save image to ByteIO buffer in .png format.
    plt.savefig(graph_image_buffer, format='png')

    # Move buffer pointer back to beginning of the file for reading.
    graph_image_buffer.seek(0)

    # Title: ZeroMQ pyzmq send jpeg image over tcp
    # Source: https://stackoverflow.com/questions/24791633/zeromq-pyzmq-send-jpeg-image-over-tcp
    # Encode image to bytes, then encode using b64.
    graph_image_bytes = bytearray(graph_image_buffer.read())
    graph_image_bytes_b64_string = base64.b64encode(graph_image_bytes)

    #  Send reply back to client via base64 string
    socket.send(graph_image_bytes_b64_string)
    print("Sending reply.")