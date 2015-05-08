#!/bin/bash
blue='\033[0;34m'
yellow='\033[1;33m'
green='\033[0;32m'
red='\033[0;31m'
NC='\033[0m' # No Color

apiKey="7d02f243a3950e3e069714affed3d4ae"
#2    13cbdf1dc907a3dc255ae7ef00e3f895
#1    7d02f243a3950e3e069714affed3d4ae
#0    6e6040e87509a69fd70cddbbd588d44e

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


Item=`echo "$line"  | awk  -F'\t' '{ print $1; }'`
Description=`echo "$line"  | awk  -F'\t' '{ print $3; }'`
WikiLabel=`echo "$line"  | awk  -F'\t' '{ print $4; }'`

wikiContainer=`curl --silent "https://www.wikidata.org/w/api.php?action=wbgetentities&ids=$Item&props=claims|sitelinks&languages=en&format=json" | jq .`


		#coordsRes=`curl --silent "https://www.wikidata.org/w/api.php?action=wbgetentities&ids=$Item&props=claims|sitelinks&languages=en&format=json" | jq -r '.results | .[0] | .geometry'`

year=`echo $wikiContainer | jq -r '.entities | .'$Item' | .claims | .P571 | .[0] | .mainsnak' | grep -oP '\"time\": \"\+\K.*?(?=\"$|\",)'`

if [[ -n $year ]]
then
year=`echo $year | grep -oP '[0]*\K.*?(?=\-[0-9]*-[0-9]*)'`


else
#its BC!

year=`echo $wikiContainer | jq -r '.entities | .'$Item' | .claims | .P571 | .[0] | .mainsnak' | grep -oP '\"time\": \"\-\K.*?(?=\"$|\",)'`


year=`echo $year | grep -oP '[0]*\K.*?(?=\-[0-9]*-[0-9]*)'`
year=`echo -$year`

fi




#      echo $wikiContainer | jq -r '.entities | .Q12542 | .claims | .P576 | .[0] | .mainsnak'
tmpEndYear=`echo $wikiContainer | jq -r '.entities | .'$Item' | .claims | .P576 | .[0] | .mainsnak' `

if [[ $tmpEndYear != "null" ]]
	then

	

	endYear=`echo $tmpEndYear | grep -oP '\"time\": \"\+\K.*?(?=\"$|\",)'`

	if [[ -n $endYear ]]
	then
	endYear=`echo $endYear | grep -oP '[0]*\K.*?(?=\-[0-9]*-[0-9]*)'`


	else
	#its BC!


	endYear=`echo $tmpEndYear | grep -oP '\"time\": \"\-\K.*?(?=\"$|\",)'`
	endYear=`echo $endYear | grep -oP '[0]*\K.*?(?=\-[0-9]*-[0-9]*)'`
	endYear=`echo -$endYear`

	fi

else

	if [[ $year -lt 1500 ]]
	then
	endYear=$(($year + 100))
	fi


	if [[ $year -gt 1499 ]]
	then
	endYear=$(($year + 50))
	fi
	if [[ $year -gt 1700 ]]
	then
	endYear=$(($year + 10))
	fi
	if [[ $year -gt 1800 ]]
	then
	endYear=$(($year + 1))
	fi

fi





#Q151047
# echo $wikiContainer | jq -r '.entities | .Q197598 | .claims | .P189 | .[0] | .mainsnak'
foundLoc=`echo $wikiContainer | jq -r '.entities | .'$Item' | .claims | .P189 | .[0] | .mainsnak | .datavalue | .value | .["numeric-id"]' `

if [[ $foundLoc != "null" ]]
then

foundLoc=`curl --silent "https://www.wikidata.org/w/api.php?action=wbgetentities&ids=Q$foundLoc&languages=en&format=json" | jq . | jq -r '.entities | .Q'$foundLoc' | .labels | .en | .value'`

fi

if [[ $foundLoc == "null" ]]
then


	foundLoc=`echo $wikiContainer | jq -r '.entities | .'$Item' | .claims | .P495 | .[0] | .mainsnak | .datavalue | .value | .["numeric-id"]' `

	if [[ $foundLoc != "null" || $foundLoc != "" ]]
	then

	foundLoc=`curl --silent "https://www.wikidata.org/w/api.php?action=wbgetentities&ids=Q$foundLoc&languages=en&format=json" | jq . | jq -r '.entities | .Q'$foundLoc' | .labels | .en | .value'`

fi
	if [[ $foundLoc == "null" ]]
then

	foundLoc=`echo $wikiContainer | jq -r '.entities | .'$Item' | .claims | .P276 | .[0] | .mainsnak | .datavalue | .value | .["numeric-id"]' `

	if [[ $foundLoc != "null" || $foundLoc != "" ]]
	then

	foundLoc=`curl --silent "https://www.wikidata.org/w/api.php?action=wbgetentities&ids=Q$foundLoc&languages=en&format=json" | jq . | jq -r '.entities | .Q'$foundLoc' | .labels | .en | .value'`

fi
	if [[ $foundLoc == "null" ]]
then

		foundLoc=`echo $wikiContainer | jq -r '.entities | .'$Item' | .claims | .P36 | .[0] | .mainsnak | .datavalue | .value | .["numeric-id"]' `

		if [[ $foundLoc != "null"  || $foundLoc != "" ]]
		then

		foundLoc=`curl --silent "https://www.wikidata.org/w/api.php?action=wbgetentities&ids=Q$foundLoc&languages=en&format=json" | jq . | jq -r '.entities | .Q'$foundLoc' | .labels | .en | .value'`


fi
		if [[ $foundLoc == "null" ]]
then

			foundLoc=`echo $wikiContainer | jq -r '.entities | .'$Item' | .claims | .P195 | .[0] | .mainsnak | .datavalue | .value | .["numeric-id"]' `

			if [[ $foundLoc != "null" || $foundLoc != "" ]]
			then

			foundLoc=`curl --silent "https://www.wikidata.org/w/api.php?action=wbgetentities&ids=Q$foundLoc&languages=en&format=json" | jq . | jq -r '.entities | .Q'$foundLoc' | .labels | .en | .value'`
fi
			if [[ $foundLoc == "null" ]]
then

					foundLoc=`echo $wikiContainer | jq -r '.entities | .'$Item' | .claims | .P17 | .[0] | .mainsnak | .datavalue | .value | .["numeric-id"]' `

				if [[ $foundLoc != "null" || $foundLoc != "" ]]
				then

				foundLoc=`curl --silent "https://www.wikidata.org/w/api.php?action=wbgetentities&ids=Q$foundLoc&languages=en&format=json" | jq . | jq -r '.entities | .Q'$foundLoc' | .labels | .en | .value'`
fi
				if [[ $foundLoc == "null" ]]
then

					foundLoc=`echo $wikiContainer | jq -r '.entities | .'$Item' | .claims | .P131 | .[0] | .mainsnak | .datavalue | .value | .["numeric-id"]' `

					if [[ $foundLoc != "null" || $foundLoc != "" ]]
					then

					foundLoc=`curl --silent "https://www.wikidata.org/w/api.php?action=wbgetentities&ids=Q$foundLoc&languages=en&format=json" | jq . | jq -r '.entities | .Q'$foundLoc' | .labels | .en | .value'`

fi
					if [[ $foundLoc == "null" ]]
then

						foundLoc=`echo $wikiContainer | jq -r '.entities | .'$Item' | .claims | .P131 | .[0] | .mainsnak | .datavalue | .value | .["numeric-id"]' `

						if [[ $foundLoc != "null" || $foundLoc != "" ]]
						then

						foundLoc=`curl --silent "https://www.wikidata.org/w/api.php?action=wbgetentities&ids=Q$foundLoc&languages=en&format=json" | jq . | jq -r '.entities | .Q'$foundLoc' | .labels | .en | .value'`
		

						fi
					fi
				fi
			fi
		fi
	fi
fi

fi


if [[ $foundLoc != "null" ]]
then

encodedString="$(perl -MURI::Escape -e 'print uri_escape($ARGV[0]);' "$foundLoc")"

		wikiURL=`curl --silent "http://api.opencagedata.com/geocode/v1/json?q=$encodedString&key=$apiKey&limit=1&no_annotations=1" | jq -r '.results | .[0] | .geometry'`

		LONGITUDEtmp=`echo $wikiURL | grep -oP '\"lng\": \K.*?(?=\,)'`
		LATITUDEtmp=`echo $wikiURL | grep -oP '\"lat\": \K.*?(?= )'`

fi


if [[ -z $LONGITUDEtmp || $foundLoc == "null" ]]
then

encodedString="$(perl -MURI::Escape -e 'print uri_escape($ARGV[0]);' "$Description")"

		wikiURL=`curl --silent "http://api.opencagedata.com/geocode/v1/json?q=$encodedString&key=$apiKey&limit=1&no_annotations=1" | jq -r '.results | .[0] | .geometry'`

		LONGITUDEtmp=`echo $wikiURL | grep -oP '\"lng\": \K.*?(?=\,)'`
		LATITUDEtmp=`echo $wikiURL | grep -oP '\"lat\": \K.*?(?= )'`

fi

if [[ -z $LONGITUDEtmp ]]
then
encodedString="$(perl -MURI::Escape -e 'print uri_escape($ARGV[0]);' "$WikiLabel")"

		wikiURL=`curl --silent "http://api.opencagedata.com/geocode/v1/json?q=$encodedString&key=$apiKey&limit=1&no_annotations=1" | jq -r '.results | .[0] | .geometry'`

		LONGITUDEtmp=`echo $wikiURL | grep -oP '\"lng\": \K.*?(?=\,)'`
		LATITUDEtmp=`echo $wikiURL | grep -oP '\"lat\": \K.*?(?= )'`

fi




if [[ -n $LONGITUDEtmp ]]
then

foundLoc=`echo $wikiContainer | jq -r '.entities | .'$Item' | .claims | .P31 | .[0] | .mainsnak | .datavalue | .value | .["numeric-id"]'`

foundProperty=`curl --silent "https://www.wikidata.org/w/api.php?action=wbgetentities&ids=Q$foundLoc&languages=en&format=json" | jq . | jq -r '.entities | .Q'$foundLoc' | .labels | .en | .value'`

foundCot=`echo $wikiContainer | jq -r '.entities | .'$Item' | .claims | .P94 | .[0] | .mainsnak | .datavalue | .value '`

echo -e $WikiLabel"\t"$foundProperty"\t"$year"\t"$endYear"\t"$LATITUDEtmp"\t"$LONGITUDEtmp"\t"$foundCot >> citiesAndArt2.csv

fi





#echo -e $WikiLabel"\t"$siegeOrBattle"\t"$year"\t"$latitude"\t"$longitude >> battlesFinal.csv

#echo $wikiContainer | jq -r '.entities | .$Item | .claims | .P585'
#curl --silent "https://www.wikidata.org/w/api.php?action=wbgetentities&ids=Q112016&props=claims|sitelinks&languages=en&format=json" | jq . | grep -oP '\"time\": \K.*?(?=$|,)'


done </home/aumannd/Code/github/uMap/buildingGeojson/noCoords.tsv

#curl --silent "https://www.wikidata.org/w/api.php?action=wbgetentities&ids=Q1392&props=claims|sitelinks&languages=en&format=json" | jq . | grep -oP '\"longitude\": \K.*?(?=\,#)'
#curl --silent "https://www.wikidata.org/w/api.php?action=wbgetentities&ids=Q1392&props=claims|sitelinks&languages=en&format=json" | jq . | grep -oP '\"latitude\": \K.*?(?=$)'

#  580  582  585     for time


# 625 for locations
