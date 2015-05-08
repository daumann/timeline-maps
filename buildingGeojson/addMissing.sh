#!/bin/bash
blue='\033[0;34m'
yellow='\033[1;33m'
green='\033[0;32m'
red='\033[0;31m'
NC='\033[0m' # No Color

while read line           
do   


Item=`echo "$line"  | awk  -F'\t' '{ print $1; }'`
WikiLabel=`echo "$line"  | awk  -F'\t' '{ print $4; }'`

		wikiContainer=`curl --silent "https://www.wikidata.org/w/api.php?action=wbgetentities&ids=$Item&props=claims|sitelinks&languages=en&format=json" | jq .`

		#wikiURL=`curl --silent "https://www.wikidata.org/w/api.php?action=wbgetentities&ids=$Item&props=claims|sitelinks&languages=en&format=json" | jq -r '.results | .[0] | .geometry'`

latitude=`echo $wikiContainer | jq -r '.entities | .'$Item' | .claims | .P625' | grep -oP '\"latitude\": \K.*?(?=$|,)'`

longitude=`echo $wikiContainer | jq -r '.entities | .'$Item' | .claims | .P625' | grep -oP '\"longitude\": \K.*?(?=$|,)'`


year=`echo $wikiContainer | jq -r '.entities | .'$Item' | .claims | .P580 | .[0] | .mainsnak' | grep -oP '\"time\": \"\+\K.*?(?=\"$|\",)'`

if [[ -z $year ]]
then
year=`echo $wikiContainer | jq -r '.entities | .'$Item' | .claims | .P582 | .[0] | .mainsnak' | grep -oP '\"time\": \"\+\K.*?(?=\"$|\",)'`
fi

if [[ -z $year ]]
then
year=`echo $wikiContainer | jq -r '.entities | .'$Item' | .claims | .P585 | .[0] | .mainsnak' | grep -oP '\"time\": \"\+\K.*?(?=\"$|\",)'`
fi

if [[ -n $year ]]
then
year=`echo $year | grep -oP '[0]*\K.*?(?=\-[0-9]*-[0-9]*)'`


else
#its BC!

year=`echo $wikiContainer | jq -r '.entities | .'$Item' | .claims | .P580 | .[0] | .mainsnak' | grep -oP '\"time\": \"\-\K.*?(?=\"$|\",)'`

if [[ -z $year ]]
then
year=`echo $wikiContainer | jq -r '.entities | .'$Item' | .claims | .P582 | .[0] | .mainsnak' | grep -oP '\"time\": \"\-\K.*?(?=\"$|\",)'`
fi

if [[ -z $year ]]
then
year=`echo $wikiContainer | jq -r '.entities | .'$Item' | .claims | .P585 | .[0] | .mainsnak' | grep -oP '\"time\": \"\-\K.*?(?=\"$|\",)'`
fi

year=`echo $year | grep -oP '[0]*\K.*?(?=\-[0-9]*-[0-9]*)'`
year=`echo -$year`
fi

siegeOrBattle=`echo $wikiContainer | grep 188055`

if [[ -n $siegeOrBattle ]]
then
siegeOrBattle="s"
else
siegeOrBattle="b"

fi


echo $WikiLabel $siegeOrBattle $latitude $longitude $year     

echo -e $WikiLabel"\t"$siegeOrBattle"\t"$year"\t"$latitude"\t"$longitude >> battlesFinal.csv

#echo $wikiContainer | jq -r '.entities | .$Item | .claims | .P585'
#curl --silent "https://www.wikidata.org/w/api.php?action=wbgetentities&ids=Q112016&props=claims|sitelinks&languages=en&format=json" | jq . | grep -oP '\"time\": \K.*?(?=$|,)'


done </home/aumannd/Code/github/uMap/buildingGeojson/battles.tsv

#curl --silent "https://www.wikidata.org/w/api.php?action=wbgetentities&ids=Q1392&props=claims|sitelinks&languages=en&format=json" | jq . | grep -oP '\"longitude\": \K.*?(?=\,#)'
#curl --silent "https://www.wikidata.org/w/api.php?action=wbgetentities&ids=Q1392&props=claims|sitelinks&languages=en&format=json" | jq . | grep -oP '\"latitude\": \K.*?(?=$)'

#  580  582  585     for time


# 625 for locations
