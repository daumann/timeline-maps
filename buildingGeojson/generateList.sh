#!/bin/bash

n=2014
for i in {1..13000}
do    

   echo $n,$n,6,\"\",\"datalayer/6/6/DL$n.geojson\",\"f\" >> layers.csv

#"],\"_storage\":{\"displayOnLoad\":false,\"name\":\"$n\",\"id\":21,\"remoteData\":{}}}"
   (( n -= 1 )) 


done

# echo "new content" >> DL$n.geojson

# 
