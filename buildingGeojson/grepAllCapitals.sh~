#!/bin/bash
blue='\033[0;34m'
yellow='\033[1;33m'
green='\033[0;32m'
red='\033[0;31m'
NC='\033[0m' # No Color

alphabetical='^[0-9]+$'

lastEntry="t"

while read line           
do   

firstWord=`echo $line  | grep -Eo '^[^ ]+' | grep -oP '.*?(?=\.|$)' | head -n 1`



if [[ $firstWord =~ $alphabetical ]] ; then
currentYear=$firstWord
#echo year: $currentYear   

elif [[ $line == newEntry*-* ]] ; then

currentProvinceId=`echo $line  | grep -oP '.*?(?= - )' | sed  's/[^0-9]//g'`
currentProvinceIdtrue=$currentProvinceId
currentProvinceId=`head -$currentProvinceId definition.csv | tail -1  | awk  -F';' '{ print $5; }'`

#	echo newSection: $currentProvinceId	


#setdefault
curCulture="undefined"
curReligion="undefined"
curCapital="undefined"
curOwner="undefined"
curController="undefined"
curCitysize=1000
currentYear=-500

fi


if [[ $line == *culture* ]] ; then

curCulture=`echo $line  | grep -oP '(?<=culture \= ).*(?=$)' |  grep -oP '^\S*'`
#curCulture=$line

elif  [[ $line == *religion* ]] ; then

curReligion=`echo $line  | grep -oP '(?<=religion \= ).*(?=$)' |  grep -oP '^\S*'`

elif  [[ $line == *capital* ]] ; then

curCapital=`echo $line  | grep -oP '(?<=capital \= ").*(?=")'`

elif  [[ $line == *owner* ]] ; then

curOwner=`echo $line  | grep -oP '(?<=owner \= ).*(?=$)' |  grep -oP '^\S*'`

elif  [[ $line == *controller* ]] ; then

curController=`echo $line  | grep -oP '(?<=controller \= ).*(?=$)' |  grep -oP '^\S*'`

elif  [[ $line == *citysize* ]] ; then

curCitysize=`echo $line  | grep -oP '(?<=citysize \= ).*(?=$)' |  grep -oP '^\S*'`

fi

newLine=`echo $currentProvinceId"\t"$currentYear"\t"$curCulture"\t"$curReligion"\t"$curCapital"\t"$curOwner"\t"$curController"\t"$curCitysize"\t"$currentProvinceIdtrue`
newLineMinusYear=`echo $currentProvinceId $curCulture $curReligion $curCapital $curOwner $curController $curCitysize $currentProvinceIdtrue`


if [ "$lastEntry" != "$newLineMinusYear" ] ; then

if [[ $currentYear -gt $blockingYear ]] ; then

echo -e $waitingToWrite >> provinceHistory.csv

fi

waitingToWrite=$newLine
blockingYear=$currentYear
lastEntry=$newLineMinusYear


fi

#updateattributes
#if no keyword found, echo line

#         while [ $tmpCurrYear -ne $tmpDeathYear ]; do
#             echo '{ "type":"Feature", "geometry":{ "type":"Point", "coordinates":[ '$LONGITUDE', '$LATITUDE' ] }, "properties":{ "_storage_options":{ "iconUrl":"/uploads/pictogram/'$tmpIcon'1.png", "color":"rgba(0,0,0,0.3)", "iconClass":"Drop" }, "description":"'$SHORTDESCRIPTION'", "wikiUrl":"'$tmpDecode'", "name":"'$NAME'", "alternativeNames":"'$ALTERNATIVENAMES'", "yearOfBirth":"'$tmpBirthYear'", "placeOfBirth":"'$PLACEOFBIRTH'", "yearOfDeath":"'$tmpDeathYear'", "placeOfDeath":"'$PLACEOFDEATH'" } },' >> /home/aumannd/Code/github/uMap/buildingGeojson/datalayers2/DL$tmpCurrYear.geojson

#             let tmpCurrYear=tmpCurrYear+1 
	#loop here
#	done

#writeToTable
#id,year,attr..

done </home/aumannd/Code/github/uMap/buildingGeojson/extendedtimeline/history/provinces/compilation.txt


