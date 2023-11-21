Description
This Node.js microservice monitors changes in an input.txt file, looks up items based on provided IDs, and outputs the results to output.json. It's designed to handle both numerical and string IDs.

Communication Contract
How to Request Data
To request data from the microservice, modify the input.txt file by adding the ID of the item you're looking up. This ID can be either a numerical ID or a string ID, each on a new line.

Example Request
To look up an item with a numerical ID of 2 and a string ID of "Wood Sword", edit the input.txt file to have each item on a line. 
Example:
2
Wood Sword

How to Receive Data
The microservice processes the input.txt file and writes the lookup results to output.json. The output includes detailed information about each requested item. If an item is not found, a failure message is recorded for that specific entry.

![UML Sequence Diagram](/UML.png)