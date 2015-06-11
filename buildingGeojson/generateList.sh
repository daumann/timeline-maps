#!/bin/bash
rm layersMil.csv

n=2015
for i in {1..13001}
do    

if (( n < 0)); then
tmp=$(($n * -1))
echo 17$tmp,$n,6,\"\",\"datalayer/people/uncDL$n.geojson\",\"f\" >> layersMil.csv

else
echo 16$n,$n,6,\"\",\"datalayer/people/uncDL$n.geojson\",\"f\" >> layersMil.csv
fi
   

#"],\"_storage\":{\"displayOnLoad\":false,\"name\":\"$n\",\"id\":21,\"remoteData\":{}}}"
   (( n -= 1 )) 


done

# echo "new content" >> DL$n.geojson

# 802014,2014,6,"","datalayer/people/pDL2014.geojson","f"
