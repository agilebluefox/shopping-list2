#!/usr/local/bin/bash

# Get the current list
printf "\nThis should give you the contents of the list....\n"
printf "curl -X GET http://localhost:8080/items\n"
curl -X GET http://localhost:8080/items

# Add an item to the list
printf "\n\nAdd a new item....returns the item....\n"
printf "curl -X POST -H \"Content-Type: application/json\" -d '{\"name\": \"Oatmeal\"}' http://localhost:8080/items\n"
curl -X POST -H "Content-Type: application/json" -d '{"name": "Oatmeal"}' http://localhost:8080/items

# Get the current list
printf "\n\nNow the contents of the list are....\n"
printf "curl -X GET http://localhost:8080/items\n"
curl -X GET http://localhost:8080/items

# Try to add an item without the data object
printf "\n\nAdd a new item without a name property....\n"
printf "curl -X POST -H \"Content-Type: application/json\" http://localhost:8080/items\n"
curl -X POST -H "Content-Type: application/json" http://localhost:8080/items

# Get the current list
printf "\n\nNow the contents of the list are....\n"
printf "curl -X GET http://localhost:8080/items\n"
curl -X GET http://localhost:8080/items

# Update an item in the list
printf "\n\nUpdate an item.....returns the item....\n"
printf "curl -X PUT -H \"Content-Type: application/json\" -d '{\"name\": \"Milk\", \"id\": 1}' http://localhost:8080/items/1\n"
curl -X PUT -H "Content-Type: application/json" -d '{"name": "Milk", "id": "1"}' http://localhost:8080/items/1

# Get the current list
printf "\n\nNow the contents of the list are....\n"
printf "curl -X GET http://localhost:8080/items\n"
curl -X GET http://localhost:8080/items

# Try to update an item that does not exist
printf "\n\nUpdate an item that doesn't exist....\n"
printf "curl -X PUT -H \"Content-Type: application/json\" -d '{\"name\": \"Milk\", \"id\": 23}' http://localhost:8080/items/23\n"
curl -X PUT -H "Content-Type: application/json" -d '{"name": "Milk", "id": "23"}' http://localhost:8080/items/23

# Get the current list
printf "\n\nNow the contents of the list are....\n"
printf "curl -X GET http://localhost:8080/items\n"
curl -X GET http://localhost:8080/items

# Try to update an item that is missing some info
printf "\n\nUpdate an item with missing info in the body....\n"
printf "curl -X PUT -H \"Content-Type: application/json\" -d '{\"name\": \"Milk\"}' http://localhost:8080/items/2\n"
curl -X PUT -H "Content-Type: application/json" -d '{"name": "Milk"}' http://localhost:8080/items/2

# Get the current list
printf "\n\nNow the contents of the list are....\n"
printf "curl -X GET http://localhost:8080/items\n"
curl -X GET http://localhost:8080/items

# Delete an item
printf "\n\nDelete an item...returns the item...\n"
printf "curl -X DELETE http://localhost:8080/items/0\n"
curl -X DELETE http://localhost:8080/items/1

# Get the current list
printf "\n\nNow the contents of the list are....\n"
printf "curl -X GET http://localhost:8080/items\n"
curl -X GET http://localhost:8080/items

# Try to delete an item that does not exist
printf "\n\nDelete an item that does not exist....\n"
printf "curl -X DELETE http://localhost:8080/items/23\n"
curl -X DELETE http://localhost:8080/items/23

# Get the current list
printf "\n\nNow the contents of the list are....\n"
printf "curl -X GET http://localhost:8080/items\n"
curl -X GET http://localhost:8080/items

# Try to delete an item without providing the id
printf "\n\nDelete an item without providing an id....\n"
printf "curl -X DELETE http://localhost:8080/items/\n"
curl -X DELETE http://localhost:8080/items/

# Get the current list
printf "\n\nNow the contents of the list are....\n"
printf "curl -X GET http://localhost:8080/items\n"
curl -X GET http://localhost:8080/items

# Get the default user object...named joe
printf "\n\nRetrieve the default user object with username 'joe'\n"
printf "curl -X GET http://localhost:8080/users/joe\n"
curl -X GET http://localhost:8080/users/joe

# Change the username to david
printf "\n\nChange the username of the user object to david...\n"
printf 'curl -X PUT -H "Content-Type: application/json" http://localhost:8080/users/david\n'
curl -X PUT -H "Content-Type: application/json" http://localhost:8080/users/david