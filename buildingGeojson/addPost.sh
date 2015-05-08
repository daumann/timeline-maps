#!/bin/bash

n=2014
for i in {1..13000}
do    

   echo "],\"_storage\":{\"displayOnLoad\":false,\"name\":\"$n\",\"id\":$n,\"remoteData\":{}}}" >> datalayers2/DL$n.geojson
   (( n -= 1 )) 


done

# echo "new content" >> DL$n.geojson

# 
