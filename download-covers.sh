#!/bin/bash

# Create album covers directory if it doesn't exist
mkdir -p public/album-covers

# Download album covers
curl -o public/album-covers/m83.jpg https://i.scdn.co/image/ab67616d0000b273b5d3c4c350c144d86d4c1b6c
curl -o public/album-covers/childish-gambino.jpg https://i.scdn.co/image/ab67616d0000b273f254f6c2b566275d2d3a36c6
curl -o public/album-covers/dua-lipa.jpg https://i.scdn.co/image/ab67616d0000b2739b9b36b0e22870b9f542d937
curl -o public/album-covers/the-weeknd.jpg https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36
curl -o public/album-covers/post-malone.jpg https://i.scdn.co/image/ab67616d0000b2739478c87599550dd73bfa7e02
curl -o public/album-covers/harry-styles.jpg https://i.scdn.co/image/ab67616d0000b273b46f74097655d7f353caab14
curl -o public/album-covers/billie-eilish.jpg https://i.scdn.co/image/ab67616d0000b2732a038d3bf875d23e4aeaa84e

echo "Album covers downloaded successfully!"