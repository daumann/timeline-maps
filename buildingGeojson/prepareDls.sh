n=2014
for i in {1..13000}
do    

   echo "}" >> provinceLayers/DL$n.geojson
   (( n -= 1 )) 


done

# remove last , of each file:
# sed -i '$s/,$//' provinceLayers/*
