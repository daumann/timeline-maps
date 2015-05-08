#!/bin/bash
blue='\033[0;34m'
yellow='\033[1;33m'
green='\033[0;32m'
red='\033[0;31m'
NC='\033[0m' # No Color
re='^[0-9]+$'

#umap=# COPY leaflet_storage_datalayer FROM '/home/aumannd/my-app/subjects.csv' CSV;


rawurlencode() {
  local string="${1}"
  local strlen=${#string}
  local encoded=""

  for (( pos=0 ; pos<strlen ; pos++ )); do
     c=${string:$pos:1}
     case "$c" in
        [-_.~a-zA-Z0-9] ) o="${c}" ;;
        * )               printf -v o '%%%02x' "'$c"
     esac
     encoded+="${o}"
  done
  echo "${encoded}"    # You can either set a return variable (FASTER) 
  REPLY="${encoded}"   #+or echo the result (EASIER)... or both... :p
}


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

echo "*** reading line "$NAME

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




#v=`awk -v "seed=$[(RANDOM & 32767) + 32768 * (RANDOM & 32767)]" \
 #      'BEGIN { srand(seed); printf("%.5f\n", rand() * 3.0) }'`
#echo $v
#sleep $v

decodedString=`echo $NAME $SHORTDESCRIPTION $DATEOFBIRTH | tr "|" " "  | tr "?" " "`
encodedString="$(perl -MURI::Escape -e 'print uri_escape($ARGV[0]);' "$decodedString")"


wikiURL=`curl --silent "http://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srlimit=2&srwhat=text&srsearch=$encodedString" | jq . | grep -oP '\"title\": \"\K.*?(?=\"\,)' | head -n 1`


lastName=$NAME

lastName=`echo $lastName | awk '{print $1;}'  | tr -d ,`

#echo $lastName vs $wikiURL

if [[ -n $wikiURL ]]
then

if [[ $wikiURL == *$lastName* ]]
then
echo -e "${green}$wikiURL${NC}"

else

wikiURL2=`curl --silent "http://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srlimit=2&srwhat=text&srsearch=$encodedString" | jq . | grep -oP '\"title\": \"\K.*?(?=\"\,)' | tail -n 1`

#echo round2 $lastName vs $wikiURL2

if [[ $wikiURL2 == *$lastName* ]]
then

wikiURL=$wikiURL2
echo -e "${blue}$wikiURL${NC} 2nd pick"

else

echo -e "${yellow}$wikiURL${NC} as fallback"

fi

fi

else

echo -e "${red}no wikiURL found for${NC} $decodedString"

fi


tmpDecode="http://en.wikipedia.org/wiki/"$( rawurlencode "$wikiURL" )

echo $tmpDecode

#wikiURL=`wget -qO- ‐‐limit-rate=20k --user-agent='Mozilla/5.0 (X11; Linux i686; rv:5.0) Gecko/20100101 Firefox/5.0' "http://www.google.de/search?q=wikipedia%20$encodedString" | grep -m 1 -oP 'href\=\"/url\?q=http://en.wikipedia.org/wiki/\K.*?(?=&amp\;)'  | head -1`

#wikiURL=`curl --silent "http://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srlimit=2&srwhat=text&srsearch=Bavinck,%20Herman%20Dutch%20politician%2013%20December%201854" | python -mjson.tool | grep -oP '\"title\": \"\K.*?(?=\"\,)'`

#`curl -s --get --data-urlencode "q=$NAME Wikipedia" http://ajax.googleapis.com/ajax/services/search/web?v=1.0 | sed 's/"unescapedUrl":"\([^"]*\).*/\1/;s/.*GwebSearch",//'`

tmpIcon="undefined"
if [[ $SHORTDESCRIPTION == *"eneral"* ]] || [[ $SHORTDESCRIPTION == *"military"* ]] || [[ $SHORTDESCRIPTION == *"army"* ]] || [[ $SHORTDESCRIPTION == *"officer"* ]] || [[ $SHORTDESCRIPTION == *"warrior"* ]] || [[ $SHORTDESCRIPTION == *"soldier"* ]] || [[ $SHORTDESCRIPTION == *"army"* ]] || [[ $SHORTDESCRIPTION == *"arshal"* ]] || [[ $SHORTDESCRIPTION == *"Khan"* ]] || [[ $SHORTDESCRIPTION == *"conquer"* ]] || [[ $SHORTDESCRIPTION == *"ergean"* ]] || [[ $SHORTDESCRIPTION == *"dmira"* ]] || [[ $SHORTDESCRIPTION == *"ieutenan"* ]] || [[ $SHORTDESCRIPTION == *"aptai"* ]] || [[ $SHORTDESCRIPTION == *"dmira"* ]] || [[ $SHORTDESCRIPTION == *"ajor"* ]]
then
tmpIcon="Military"

elif [[ $SHORTDESCRIPTION == *"king"* ]] || [[ $SHORTDESCRIPTION == *"queen"* ]] || [[ $SHORTDESCRIPTION == *"King"* ]] || [[ $SHORTDESCRIPTION == *"Queen"* ]] || [[ $SHORTDESCRIPTION == *"onarch"* ]] || [[ $SHORTDESCRIPTION == *"mperor"* ]] || [[ $SHORTDESCRIPTION == *"politi"* ]] || [[ $SHORTDESCRIPTION == *"leader"* ]] || [[ $SHORTDESCRIPTION == *"party"* ]] || [[ $SHORTDESCRIPTION == *"Lord"* ]] || [[ $SHORTDESCRIPTION == *"lord"* ]] || [[ $SHORTDESCRIPTION == *"rinc"* ]] || [[ $SHORTDESCRIPTION == *"leader"* ]] || [[ $SHORTDESCRIPTION == *"party"* ]] || [[ $SHORTDESCRIPTION == *"onsul"* ]] || [[ $SHORTDESCRIPTION == *"state"* ]] || [[ $SHORTDESCRIPTION == *"Lord"* ]] || [[ $SHORTDESCRIPTION == *"lord"* ]] || [[ $SHORTDESCRIPTION == *"rinc"* ]] || [[ $SHORTDESCRIPTION == *"leader"* ]] || [[ $SHORTDESCRIPTION == *"party"* ]] || [[ $SHORTDESCRIPTION == *"ultan"* ]] || [[ $SHORTDESCRIPTION == *"overn"* ]] || [[ $SHORTDESCRIPTION == *"ayor"* ]]
then
tmpIcon="Politician"


elif [[ $SHORTDESCRIPTION == *"ath"* ]] || [[ $SHORTDESCRIPTION == *"scien"* ]] || [[ $SHORTDESCRIPTION == *"physi"* ]] || [[ $SHORTDESCRIPTION == *"philo"* ]] || [[ $SHORTDESCRIPTION == *"psyc"* ]] || [[ $SHORTDESCRIPTION == *"geogra"* ]] || [[ $SHORTDESCRIPTION == *"historian"* ]] || [[ $SHORTDESCRIPTION == *"astro"* ]] || [[ $SHORTDESCRIPTION == *"carto"* ]] || [[ $SHORTDESCRIPTION == *"enginee"* ]] || [[ $SHORTDESCRIPTION == *"geo"* ]] || [[ $SHORTDESCRIPTION == *"bota"* ]] || [[ $SHORTDESCRIPTION == *"invent"* ]] || [[ $SHORTDESCRIPTION == *"ournalist"* ]] || [[ $SHORTDESCRIPTION == *"polymath"* ]] || [[ $SHORTDESCRIPTION == *"biol"* ]] || [[ $SHORTDESCRIPTION == *"logist"* ]] || [[ $SHORTDESCRIPTION == *"chola"* ]]  
then
tmpIcon="Scientist"

elif [[ $SHORTDESCRIPTION == *"usic"* ]] || [[ $SHORTDESCRIPTION == *"sculpt"* ]] || [[ $SHORTDESCRIPTION == *"paint"* ]] || [[ $SHORTDESCRIPTION == *"sing"* ]] || [[ $SHORTDESCRIPTION == *"poet"* ]] || [[ $SHORTDESCRIPTION == *"act"* ]] || [[ $SHORTDESCRIPTION == *"Act"* ]] || [[ $SHORTDESCRIPTION == *"play"* ]] || [[ $SHORTDESCRIPTION == *"author"* ]] || [[ $SHORTDESCRIPTION == *"comed"* ]] || [[ $SHORTDESCRIPTION == *"writer"* ]] || [[ $SHORTDESCRIPTION == *"omposer"* ]] 
then
tmpIcon="Artist"

elif [[ $SHORTDESCRIPTION == *"merchant"* ]] || [[ $SHORTDESCRIPTION == *"busines"* ]] || [[ $SHORTDESCRIPTION == *"trade"* ]]
then
tmpIcon="Businessman"

elif [[ $SHORTDESCRIPTION == *"pope"* ]] || [[ $SHORTDESCRIPTION == *"Pope"* ]] || [[ $SHORTDESCRIPTION == *"atholic"* ]] || [[ $SHORTDESCRIPTION == *"ardinal"* ]] || [[ $SHORTDESCRIPTION == *"ishop"* ]] || [[ $SHORTDESCRIPTION == *"monk"* ]] || [[ $SHORTDESCRIPTION == *"priest"* ]] || [[ $SHORTDESCRIPTION == *"issionary"* ]] || [[ $SHORTDESCRIPTION == *"hristian"* ]] || [[ $SHORTDESCRIPTION == *"evang"* ]]  
then
tmpIcon="Rel-Chris"

elif [[ $SHORTDESCRIPTION == *"aliph"* ]] || [[ $SHORTDESCRIPTION == *"imam"* ]] || [[ $SHORTDESCRIPTION == *"ultan"* ]] || [[ $SHORTDESCRIPTION == *"slam"* ]]
then
tmpIcon="Rel-Islam"

elif [[ $SHORTDESCRIPTION == *"guru"* ]] || [[ $SHORTDESCRIPTION == *"hindu"* ]]
then
tmpIcon="Rel-Hindu"

elif [[ $SHORTDESCRIPTION == *"uddh"* ]]
then
tmpIcon="Rel-Buddh"

elif [[ $SHORTDESCRIPTION == *"jew"* ]] || [[ $SHORTDESCRIPTION == *"Jew"* ]] || [[ $SHORTDESCRIPTION == *"rabbi"* ]]
then
tmpIcon="Rel-Jewis"


elif [[ $SHORTDESCRIPTION == *"ricket"* ]] || [[ $SHORTDESCRIPTION == *"ball"* ]] || [[ $SHORTDESCRIPTION == *"player"* ]] || [[ $SHORTDESCRIPTION == *"thlet"* ]] || [[ $SHORTDESCRIPTION == *"sport"* ]] || [[ $SHORTDESCRIPTION == *"driver"* ]] || [[ $SHORTDESCRIPTION == *"wrestler"* ]]
then
tmpIcon="Athlet"
fi


#echo \!\!\! $tmpIcon -vs- $SHORTDESCRIPTION

#echo '{ "type":"Feature", "geometry":{ "type":"Point", "coordinates":[ '$LONGITUDE', '$LATITUDE' ] }, "properties":{ "_storage_options":{ "iconUrl":"/uploads/pictogram/'$tmpIcon'0.png", "color":"rgba(0,0,0,0.3)", "iconClass":"Drop" }, "description":"'$SHORTDESCRIPTION'", "wikiUrl":"'$tmpDecode'", "name":"'$NAME'", "alternativeNames":"'$ALTERNATIVENAMES'", "yearOfBirth":"'$tmpBirthYear'", "placeOfBirth":"'$PLACEOFBIRTH'", "yearOfDeath":"'$tmpDeathYear'", "placeOfDeath":"'$PLACEOFDEATH'" } },'


if [[ -n $tmpBirthYear ]] && [[ -n $tmpDeathYear ]]
then
age=`echo "$[$tmpDeathYear-$tmpBirthYear]"`
	if [[ "$[$age-120]" -lt 0 ]] && [[ $age -gt 0 ]]
	then

	echo '{ "type":"Feature", "geometry":{ "type":"Point", "coordinates":[ '$LONGITUDE', '$LATITUDE' ] }, "properties":{ "_storage_options":{ "iconUrl":"/uploads/pictogram/'$tmpIcon'0.png", "color":"rgba(0,0,0,0.3)", "iconClass":"Drop" }, "description":"'$SHORTDESCRIPTION'", "wikiUrl":"'$tmpDecode'", "name":"'$NAME'", "alternativeNames":"'$ALTERNATIVENAMES'", "yearOfBirth":"'$tmpBirthYear'", "placeOfBirth":"'$PLACEOFBIRTH'", "yearOfDeath":"'$tmpDeathYear'", "placeOfDeath":"'$PLACEOFDEATH'" } },' >> /home/aumannd/Code/github/uMap/buildingGeojson/datalayers2/DL$tmpBirthYear.geojson


	tmpCurrYear=$tmpBirthYear

         while [ $tmpCurrYear -ne $tmpDeathYear ]; do
             echo '{ "type":"Feature", "geometry":{ "type":"Point", "coordinates":[ '$LONGITUDE', '$LATITUDE' ] }, "properties":{ "_storage_options":{ "iconUrl":"/uploads/pictogram/'$tmpIcon'1.png", "color":"rgba(0,0,0,0.3)", "iconClass":"Drop" }, "description":"'$SHORTDESCRIPTION'", "wikiUrl":"'$tmpDecode'", "name":"'$NAME'", "alternativeNames":"'$ALTERNATIVENAMES'", "yearOfBirth":"'$tmpBirthYear'", "placeOfBirth":"'$PLACEOFBIRTH'", "yearOfDeath":"'$tmpDeathYear'", "placeOfDeath":"'$PLACEOFDEATH'" } },' >> /home/aumannd/Code/github/uMap/buildingGeojson/datalayers2/DL$tmpCurrYear.geojson

             let tmpCurrYear=tmpCurrYear+1 
	#loop here
	done

	echo '{ "type":"Feature", "geometry":{ "type":"Point", "coordinates":[ '$LONGITUDE', '$LATITUDE' ] }, "properties":{ "_storage_options":{ "iconUrl":"/uploads/pictogram/'$tmpIcon'2.png", "color":"rgba(0,0,0,0.3)", "iconClass":"Drop" }, "description":"'$SHORTDESCRIPTION'", "wikiUrl":"'$tmpDecode'", "name":"'$NAME'", "alternativeNames":"'$ALTERNATIVENAMES'", "yearOfBirth":"'$tmpBirthYear'", "placeOfBirth":"'$PLACEOFBIRTH'", "yearOfDeath":"'$tmpDeathYear'", "placeOfDeath":"'$PLACEOFDEATH'" } },' >> /home/aumannd/Code/github/uMap/buildingGeojson/datalayers2/DL$tmpDeathYear.geojson
	fi
else
if [[ -n $tmpBirthYear ]]
then

echo '{ "type":"Feature", "geometry":{ "type":"Point", "coordinates":[ '$LONGITUDE', '$LATITUDE' ] }, "properties":{ "_storage_options":{ "iconUrl":"/uploads/pictogram/'$tmpIcon'0.png", "color":"rgba(0,0,0,0.3)", "iconClass":"Drop" }, "description":"'$SHORTDESCRIPTION'", "wikiUrl":"'$tmpDecode'", "name":"'$NAME'", "alternativeNames":"'$ALTERNATIVENAMES'", "yearOfBirth":"'$tmpBirthYear'", "placeOfBirth":"'$PLACEOFBIRTH'", "yearOfDeath":"'$tmpDeathYear'", "placeOfDeath":"'$PLACEOFDEATH'" } },' >> /home/aumannd/Code/github/uMap/buildingGeojson/datalayers2/DL$tmpBirthYear.geojson

fi
if [[ -n $tmpDeathYear ]]
then

echo '{ "type":"Feature", "geometry":{ "type":"Point", "coordinates":[ '$LONGITUDE', '$LATITUDE' ] }, "properties":{ "_storage_options":{ "iconUrl":"/uploads/pictogram/'$tmpIcon'2.png", "color":"rgba(0,0,0,0.3)", "iconClass":"Drop" }, "description":"'$SHORTDESCRIPTION'", "wikiUrl":"'$tmpDecode'", "name":"'$NAME'", "alternativeNames":"'$ALTERNATIVENAMES'", "yearOfBirth":"'$tmpBirthYear'", "placeOfBirth":"'$PLACEOFBIRTH'", "yearOfDeath":"'$tmpDeathYear'", "placeOfDeath":"'$PLACEOFDEATH'" } },' >> /home/aumannd/Code/github/uMap/buildingGeojson/datalayers2/DL$tmpDeathYear.geojson

fi
#>> DL$yearOfBirth.geojson


fi

#echo '{ "type":"Feature", "geometry":{ "type":"Point", "coordinates":[ '$LONGITUDE', '$LATITUDE' ] }, "properties":{ "_storage_options":{ "iconUrl":"/uploads/pictogram/'$tmpIcon'1.png", "color":"rgba(0,0,0,0.3)", "iconClass":"Drop" }, "description":"'$SHORTDESCRIPTION'", "wikiUrl":"'$wikitmpDecodeURL'", "name":"'$NAME'", "alternativeNames":"'$ALTERNATIVENAMES'", "yearOfBirth":"'$tmpBirthYear'", "placeOfBirth":"'$PLACEOFBIRTH'", "yearOfDeath":"'$tmpDeathYear'", "placeOfDeath":"'$PLACEOFDEATH'" } },'

#echo DL$yearOfDeath.geojson
#>> DL$yearOfDeath.geojson
fi
      
done </home/aumannd/Code/github/uMap/buildingGeojson/personDataInit.csv
