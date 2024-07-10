#!/bin/bash

# Directory to list files from
DIR_PATH="specs/"

# Check if the directory exists
if [ -d "$DIR_PATH" ]; then
  # List all files in the directory and store them in an array
  FILE_LIST=($(ls -p "$DIR_PATH" | grep -v /))
  
  # Construct the JSON array
  ARRAY="["
  for FILE in "${FILE_LIST[@]}"; do
    ARRAY+="\"$FILE\","
  done
  # Remove the trailing comma and close the JSON array
  ARRAY="${ARRAY%,}]"
  
  # Print the JSON array
  echo "$ARRAY"
else
  echo "Directory does not exist."
fi