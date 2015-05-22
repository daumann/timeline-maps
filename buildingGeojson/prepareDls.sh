n=2014
for i in {1..13000}
do    

   echo "}" >> provinceLayers/DL$n.geojson
   (( n -= 1 )) 


done

# remove last , of each file:
# sed -i '$s/,$//' provinceLayers/*
# sed -i 's/""Azov"" # Peter the Great managed to take the fortress, ""Azov campaigns""/"Azov","Azov campaigns"/g' area*
#  iconv -f ISO-8859-1 -t UTF-8 DL50.geojson >DL50b.geojson
