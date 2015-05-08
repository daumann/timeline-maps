#!/bin/bash
blue='\033[0;34m'
yellow='\033[1;33m'
green='\033[0;32m'
red='\033[0;31m'
NC='\033[0m' # No Color

#umap=# COPY leaflet_storage_datalayer FROM '/home/aumannd/my-app/subjects.csv' CSV;

N=0
R=0
Rgo=-1


apiKey="13cbdf1dc907a3dc255ae7ef00e3f895"
#2    13cbdf1dc907a3dc255ae7ef00e3f895
#1    7d02f243a3950e3e069714affed3d4ae
#0    6e6040e87509a69fd70cddbbd588d44e              571

while read line           
do   

echo API calls $N of $R

if [ $R -gt $Rgo ]
then

if [ 2490 -lt "$N" ]
then
exit 0
fi



NAME=`echo "$line"  | awk  -F'\t' '{ print $1; }'`
ALTERNATIVENAMES=`echo "$line"  | awk  -F'\t' '{ print $2; }'`
SHORTDESCRIPTION=`echo "$line"  | awk  -F'\t' '{ print $3; }'`
DATEOFBIRTH=`echo "$line"  | awk  -F'\t' '{ print $4; }'`
PLACEOFBIRTH=`echo "$line"  | awk  -F'\t' '{ print $5; }'`
DATEOFDEATH=`echo "$line"  | awk  -F'\t' '{ print $6; }'`
PLACEOFDEATH=`echo "$line"  | awk  -F'\t' '{ print $7; }'`
LATITUDE=`echo "$line"  | awk  -F'\t' '{ print $8; }'`
LONGITUDE=`echo "$line"  | awk  -F'\t' '{ print $9; }'`


echo "${PLACEOFBIRTH}${PLACEOFDEATH}" | grep -q '[0-9]'
if [ $? != 0 ]; then

if [[ -n $LATITUDE ]] && [[ -n $LONGITUDE ]]  && [[ -n $DATEOFBIRTH ]] &&  [[ -n $DATEOFDEATH ]]
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




	lat1=42.3
	lat2=42.7

	long1=1.3
	long2=1.8

	latAus1=67.3
	longAus1=-27.3
	latAus2=27.1
	longAus2=146.42

	if ([ 1 -eq "$(echo "${LATITUDE} > ${lat1}" | bc)" ] && [ 1 -eq "$(echo "${LATITUDE} < ${lat2}" | bc)" ] && [ 1 -eq "$(echo "${LONGITUDE} > ${long1}" | bc)" ] && [ 1 -eq "$(echo "${LONGITUDE} < ${long2}" | bc)" ]) || ([ "$tmpBirthYear" -lt 1700 ] && [ 1 -eq "$(echo "${LATITUDE} > ${latAus1}" | bc)" ] && [ 1 -eq "$(echo "${LATITUDE} < ${latAus2}" | bc)" ] && [ 1 -eq "$(echo "${LONGITUDE} < ${longAus1}" | bc)" ] && [ 1 -eq "$(echo "${LONGITUDE} > ${longAus2}" | bc)" ])
	then

		if [[ -n $PLACEOFBIRTH ]] && [ "$PLACEOFBIRTH" != " " ]
		then
		echo first try
		encodedString="$(perl -MURI::Escape -e 'print uri_escape($ARGV[0]);' "$PLACEOFBIRTH")"

		wikiURL=`curl --silent "http://api.opencagedata.com/geocode/v1/json?q=$encodedString&key=$apiKey&limit=1&no_annotations=1" | jq -r '.results | .[0] | .geometry'`

		LONGITUDEtmp=`echo $wikiURL | grep -oP '\"lng\": \K.*?(?=\,)'`
		LATITUDEtmp=`echo $wikiURL | grep -oP '\"lat\": \K.*?(?= )'`

		   (( N += 1 )) 

		if [[ -n $PLACEOFDEATH ]] && [ "$PLACEOFDEATH" != " " ] && [[ -z $LONGITUDEtmp ]]
		then
		echo second try
		encodedString="$(perl -MURI::Escape -e 'print uri_escape($ARGV[0]);' "$PLACEOFDEATH")"

		wikiURL=`curl --silent "http://api.opencagedata.com/geocode/v1/json?q=$encodedString&key=$apiKey&limit=1&no_annotations=1" | jq -r '.results | .[0] | .geometry'`

		LONGITUDEtmp=`echo $wikiURL | grep -oP '\"lng\": \K.*?(?=\,)'`
		LATITUDEtmp=`echo $wikiURL | grep -oP '\"lat\": \K.*?(?= )'`

		   (( N += 1 )) 

		fi

		elif [[ -n $PLACEOFDEATH ]] && [ "$PLACEOFDEATH" != " " ]
		then
		echo death try
		encodedString="$(perl -MURI::Escape -e 'print uri_escape($ARGV[0]);' "$PLACEOFDEATH")"

		wikiURL=`curl --silent "http://api.opencagedata.com/geocode/v1/json?q=$encodedString&key=$apiKey&limit=1&no_annotations=1" | jq -r '.results | .[0] | .geometry'`

		LONGITUDEtmp=`echo $wikiURL | grep -oP '\"lng\": \K.*?(?=\,)'`
		LATITUDEtmp=`echo $wikiURL | grep -oP '\"lat\": \K.*?(?= )'`

		   (( N += 1 )) 
		fi

		if [[ -n $LATITUDEtmp ]] && [[ -n $LONGITUDEtmp ]]
		then

		echo "replacing "$LATITUDE" "$LONGITUDE" with "$LATITUDEtmp" "$LONGITUDEtmp"    "$PLACEOFBIRTH $PLACEOFDEATH 
		LATITUDE=$LATITUDEtmp
		LONGITUDE=$LONGITUDEtmp

		fi
		#echo \!\!\!\! $PLACEOFBIRTH annd $PLACEOFDEATH

	fi

elif [[ -z $LATITUDE ]] && [[ -z $LONGITUDE ]] && [[ -n $DATEOFBIRTH ]] &&  [[ -n $DATEOFDEATH ]]
then

		if [[ -n $PLACEOFBIRTH ]] && [ "$PLACEOFBIRTH" != " " ]
		then
		echo first try

		encodedString="$(perl -MURI::Escape -e 'print uri_escape($ARGV[0]);' "$PLACEOFBIRTH")"

		wikiURL=`curl --silent "http://api.opencagedata.com/geocode/v1/json?q=$encodedString&key=$apiKey&limit=1&no_annotations=1" | jq -r '.results | .[0] | .geometry'`

		LONGITUDE=`echo $wikiURL | grep -oP '\"lng\": \K.*?(?=\,)'`
		LATITUDE=`echo $wikiURL | grep -oP '\"lat\": \K.*?(?= )'`

		   (( N += 1 )) 
		if [[ -n $PLACEOFDEATH ]] && [ "$PLACEOFDEATH" != " " ] && [[ -z $LONGITUDE ]]
		then
		echo second try
		encodedString="$(perl -MURI::Escape -e 'print uri_escape($ARGV[0]);' "$PLACEOFDEATH")"

		wikiURL=`curl --silent "http://api.opencagedata.com/geocode/v1/json?q=$encodedString&key=$apiKey&limit=1&no_annotations=1" | jq -r '.results | .[0] | .geometry'`

		LONGITUDE=`echo $wikiURL | grep -oP '\"lng\": \K.*?(?=\,)'`
		LATITUDE=`echo $wikiURL | grep -oP '\"lat\": \K.*?(?= )'`

		   (( N += 1 )) 

		fi

		elif [[ -n $PLACEOFDEATH ]] && [ "$PLACEOFDEATH" != " " ]
		then
		echo death try
		encodedString="$(perl -MURI::Escape -e 'print uri_escape($ARGV[0]);' "$PLACEOFDEATH")"

		wikiURL=`curl --silent "http://api.opencagedata.com/geocode/v1/json?q=$encodedString&key=$apiKey&limit=1&no_annotations=1" | jq -r '.results | .[0] | .geometry'`

		LONGITUDE=`echo $wikiURL | grep -oP '\"lng\": \K.*?(?=\,)'`
		LATITUDE=`echo $wikiURL | grep -oP '\"lat\": \K.*?(?= )'`

		   (( N += 1 )) 
		fi

		if [[ -n $LATITUDE ]] && [[ -n $LONGITUDE ]]
		then
		echo "from 0 to "$LATITUDE" "$LONGITUDE"     "$PLACEOFBIRTH $PLACEOFDEATH 
		fi

fi



echo "${LATITUDE}${LONGITUDE}" | grep -q '[a-Z]'
if [ $? != 0 ]; then

if [[ -n $LATITUDE ]] && [[ -n $LONGITUDE ]]  && [[ -n $DATEOFBIRTH ]] &&  [[ -n $DATEOFDEATH ]]
then

echo -e $NAME"\t"$ALTERNATIVENAMES"\t"$SHORTDESCRIPTION"\t"$DATEOFBIRTH"\t"$PLACEOFBIRTH"\t"$DATEOFDEATH"\t"$PLACEOFDEATH"\t"$LATITUDE"\t"$LONGITUDE >> newFile.csv

fi
fi

fi
fi
 		   (( R += 1 )) 
done </home/aumannd/Code/github/uMap/buildingGeojson/personDataInit.csv


