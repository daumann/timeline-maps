#!/bin/bash

while read line           
do   

 
NAME=`echo "$line"  | awk  -F'\t' '{ print $1; }'`
ALTERNATIVENAMES=`echo "$line"  | awk  -F'\t' '{ print $2; }'`
SHORTDESCRIPTION=`echo "$line"  | awk  -F'\t' '{ print $3; }'`
DATEOFBIRTH=`echo "$line"  | awk  -F'\t' '{ print $4; }'`
PLACEOFBIRTH=`echo "$line"  | awk  -F'\t' '{ print $5; }'`
DATEOFDEATH=`echo "$line"  | awk  -F'\t' '{ print $6; }'`
PLACEOFDEATH=`echo "$line"  | awk  -F'\t' '{ print $7; }'`
LATITUDE=`echo "$line"  | awk  -F'\t' '{ print $8; }'`
LONGITUDE=`echo "$line"  | awk  -F'\t' '{ print $9; }'`

if [[ -n $LATITUDE ]] && [[ -n $LONGITUDE ]]  && ([[ -n $DATEOFBIRTH ]] || [[ -n $DATEOFBIRTH ]])
then

	tmpBirthYear=`echo $DATEOFBIRTH | sed -n 's/.*\([0-9][0-9][0-9][0-9][0-9]*\).*/\1/p'`
	if [[ -z $tmpBirthYear ]]
	then
	  	tmpBirthYear=`echo $DATEOFBIRTH | sed -n 's/.*\([0-9][0-9][0-9][0-9]*\).*/\1/p'`
		if [[ -z $tmpBirthYear ]]
		then
		    	tmpBirthYear=`echo $DATEOFBIRTH | sed -n 's/.*\([0-9][0-9][0-9]*\).*/\1/p'`
			if [[ -z $tmpBirthYear ]]
			then
			  tmpBirthYear=`echo $DATEOFBIRTH | sed -n 's/.*\([0-9][0-9]*\).*/\1/p'`

			fi				
		fi

	fi

	if [[ $DATEOFBIRTH == *"BC"* ]] || [[ $DATEOFBIRTH == *"BCE"* ]] || [[ $DATEOFBIRTH == *"B.C"* ]]
		then
		tmpBirthYear=-$tmpBirthYear

	fi



	tmpDeathYear=`echo $DATEOFDEATH | sed -n 's/.*\([0-9][0-9][0-9][0-9][0-9]*\).*/\1/p'`
	if [[ -z $tmpDeathYear ]]
	then
	  	tmpDeathYear=`echo $DATEOFDEATH | sed -n 's/.*\([0-9][0-9][0-9][0-9]*\).*/\1/p'`
		if [[ -z $tmpDeathYear ]]
		then
		    	tmpDeathYear=`echo $DATEOFDEATH | sed -n 's/.*\([0-9][0-9][0-9]*\).*/\1/p'`
			if [[ -z $tmpDeathYear ]]
			then
			  tmpDeathYear=`echo $DATEOFDEATH | sed -n 's/.*\([0-9][0-9]*\).*/\1/p'`

			fi				
		fi

	fi

	if [[ $DATEOFDEATH == *"BC"* ]] || [[ $DATEOFDEATH == *"BCE"* ]] || [[ $DATEOFDEATH == *"B.C"* ]]
		then
		tmpDeathYear=-$tmpDeathYear

	fi

   
#wikiURL=`curl -s --get --data-urlencode "q=$NAME Wikipedia" http://ajax.googleapis.com/ajax/services/search/web?v=1.0 | sed 's/"unescapedUrl":"\([^"]*\).*/\1/;s/.*GwebSearch",//'`

if [ 1700 -gt "$tmpBirthYear" ]
then
echo -e $NAME'\t'$ALTERNATIVENAMES'\t'$SHORTDESCRIPTION'\t'$DATEOFBIRTH'\t'$PLACEOFBIRTH'\t'$DATEOFDEATH'\t'$PLACEOFDEATH'\t'$LATITUDE'\t'$LONGITUDE >> tt.csv
fi
#echo '{ "type":"Feature", "geometry":{ "type":"Point", "coordinates":[ '$LONGITUDE', '$LATITUDE' ] }, "properties":{ "_storage_options":{ "iconUrl":"/uploads/pictogram/dagger-512.png", "color":"rgba(0,0,0,0.3)", "iconClass":"Drop" }, "description":"'$SHORTDESCRIPTION'", "wikiUrl":"'$wikiURL'", "name":"'$NAME'", "alternativeNames":"'$ALTERNATIVENAMES'", "yearOfBirth":"'$tmpBirthYear'", "placeOfBirth":"'$PLACEOFBIRTH'", "yearOfDeath":"'$tmpDeathYear'", "placeOfDeath":"'$PLACEOFDEATH'" } },'

fi
      
done <personDataInit.csv 
