#!/bin/bash

n=2014
for i in {1..13000}
do    

   cp DL2015.geojson DL$n.geojson
   (( n -= 1 )) 

done

# echo "new content" >> DL$n.geojson

# 
