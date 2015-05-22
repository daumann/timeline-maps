  
#use only owner
counter=1


iLappland=`echo ff`
iHannover=`echo ff`
iSalonica=`echo ff`
iGrodno=`echo ff`
iAsyut=`echo ff`
iAlJawf=`echo ff`
iAru=`echo ff`
iSaoTome=`echo ff`
iCuenca=`echo ff`
iJicarilla=`echo ff`
iLakota=`echo ff`
iCaceres=`echo ff`
iAcre=`echo ff`
iHuizhou=`echo ff`
iBourbon=`echo ff`

while read line           
do   

echo $counter"now serving line "$line

NAME=`echo "$line"  | awk  -F'\t' '{ print $1; }'`
YEAR=`echo "$line"  | awk  -F'\t' '{ print $2; }'`
CULTURE=`echo "$line"  | awk  -F'\t' '{ print $3; }'`
RELIGION=`echo "$line"  | awk  -F'\t' '{ print $4; }'`
CAPITAL=`echo "$line"  | awk  -F'\t' '{ print $5; }'`
OWNER=`echo "$line"  | awk  -F'\t' '{ print $6; }'`
SIZE=`echo "$line"  | awk  -F'\t' '{ print $8; }'`
ID=`echo "$line"  | awk  -F'\t' '{ print $9; }'`




lineC=`grep $NAME colorProvs.txt`

rgb=`echo "$lineC"  | awk  -F':' '{ print $2; }'  | grep -oP 'color = { \K.*?(?=\ })'`

r=`echo "$rgb"  | awk  -F' ' '{ print $1; }'`
g=`echo "$rgb"  | awk  -F' ' '{ print $2; }'`
b=`echo "$rgb"  | awk  -F' ' '{ print $3; }'`

COUNTRYNAME=`echo "$lineC" | grep -oP 'countries/\K.*?(?=\.txt)'`

echo $country is $r $g $b





#DL$tmpCurrYear.geojson
if [[ $oldNAME == $NAME ]]
then

tmpName=`echo $oldNAME`

	if [[ $iLappland == "tt"  && $tmpName == "Lappland" ]]; then
	tmpName=`echo Lappland East`
	elif [[ $iLappland == "ff" && $tmpName == "Lappland" ]]; then
	tmpName=`echo Lappland West`


	elif [[ $iAru == "tt" && $tmpName == "Aru" ]]; then
	tmpName=`echo Aru Moluccan`

	elif [[ $iHannover == "tt" && $tmpName == "Hannove" ]]; then
	tmpName=`echo Hannover`
	elif [[ $iHannover == "ff" && $tmpName == "Hannove" ]]; then
	tmpName=`echo Braunschweig`

	elif [[ $iSalonica == "tt" && $tmpName == "Salonica" ]]; then
	tmpName=`echo Salonica`
	elif [[ $iSalonica == "ff" && $tmpName == "Salonica" ]]; then
	tmpName=`echo Larissa`

	elif [[ $iGrodno == "tt" && $tmpName == "Grodno" ]]; then
	tmpName=`echo Grodno`
	elif [[ $iGrodno == "ff" && $tmpName == "Grodno" ]]; then
	tmpName=`echo Brest`

	elif [[ $iAsyut == "ff" && $tmpName == "Asyut" ]]; then
	tmpName=`echo Asyut South`

	elif [ $iAlJawf == "ff" && $tmpName == "Al Jawf" ]]; then
	tmpName=`echo Dumat`

	elif [[ $iSaoTome == "tt" && $tmpName == "Sao Tome" ]]; then
	tmpName=`echo Sao Tome2`

	elif [[ $iCuenca == "ff" && $tmpName == "Cuenca" ]]; then
	tmpName=`echo Santa Ana`

	elif [[ $iJicarilla == "tt" && $tmpName == "Jicarilla" ]]; then
	tmpName=`echo Jicarilla West`
	elif [[ $iJicarilla == "ff" && $tmpName == "Jicarilla" ]]; then
	tmpName=`echo Jicarilla East`

	elif [[ $iLakota == "tt" && $tmpName == "Lakota" ]]; then
	tmpName=`echo Lakota West`
	elif [[ $iLakota == "ff" && $tmpName == "Lakota" ]]; then
	tmpName=`echo Lakota East`

	elif [[ $iAcre == "ff" && $tmpName == "Acre" ]]; then
	tmpName=`echo Acre State`

	elif [[ $iHuizhou == "tt" && $tmpName == "Huizhou" ]]; then
	tmpName=`echo Huizhou Wu`
	elif [[ $iBourbon == "tt" && $tmpName == "Bourbon" ]]; then
	tmpName=`echo Réunion`
	elif [[ $iCaceres == "tt" && $tmpName == "Caceres" ]]; then
	tmpName=`echo Mato Caceres`

	fi


tmpCurrYear=$oldYEAR
#"Gelre": ["FRS","FRS"],

if [[ $iLappland != *Tome2 ]]; then
         while [ $tmpCurrYear -lt $YEAR ]; do

	     echo -e \"$tmpName\"\:\[\"$oldOWNER\",\"$oldCULTURE\",\"$oldRELIGION\",\"$oldCAPITAL\",$oldSIZE,$oldID\,\"$oldCOUNTRY\",$oldRGB\], >> /home/aumannd/Code/github/uMap/buildingGeojson/provinceLayers/DL$tmpCurrYear.geojson

             let tmpCurrYear=tmpCurrYear+1 
	#loop here
	done
fi

else

	if [ $oldNAME == "Lappland"]; then
	iLappland=`echo tt`
	elif [ $oldNAME == "Aru" ]; then
	iAru=`echo tt`
	elif [ $oldNAME == "Hannover" ]; then
	iHannover=`echo tt`
	elif [ $oldNAME == "Salonica" ]; then
	iSalonica=`echo tt`
	elif [ $oldNAME == "Grodno" ]; then
	iGrodno=`echo tt`
	elif [ $oldNAME == "Asyut" ]; then
	iAsyut=`echo tt`
	elif [ $oldNAME == "Al Jawf" ]; then
	iAlJawf=`echo tt`
	elif [ $oldNAME == "Sao Tome" ]; then
	iSaoTome=`echo tt`
	elif [ $oldNAME == "Cuenca" ]; then
	iCuenca=`echo tt`
	elif [ $oldNAME == "Jicarilla" ]; then
	iJicarilla=`echo tt`
	elif [ $oldNAME == "Lakota" ]; then
	iLakota=`echo tt`
	elif [ $oldNAME == "Acre" ]; then
	iAcre=`echo tt`
	elif [ $oldNAME == "Huizhou" ]; then
	iHuizhou=`echo tt`
	elif [ $oldNAME == "Bourbon" ]; then
	iBourbon=`echo tt`
	elif [ $oldNAME == "Caceres" ]; then
	iCaceres=`echo tt`

	fi

tmpCurrYear=$oldYEAR

         while [ $tmpCurrYear -lt 2001 ]; do
	     echo -e \"$oldNAME\"\:\[\"$oldOWNER\",\"$oldCULTURE\",\"$oldRELIGION\",\"$oldCAPITAL\",$oldSIZE,$oldID,\"$oldCOUNTRY\",$oldRGB\], >> /home/aumannd/Code/github/uMap/buildingGeojson/provinceLayers/DL$tmpCurrYear.geojson

             let tmpCurrYear=tmpCurrYear+1 
	#loop here
	done

fi

#  echo -e [\"$NAME\",\"$OWNER\",\"$CULTURE\",\"$RELIGION\",\"$CAPITAL\",$SIZE] >> /home/aumannd/Code/github/uMap/buildingGeojson/provinceLayers/$YEAR.json


oldNAME=$NAME
oldYEAR=$YEAR
oldCULTURE=$CULTURE
oldRELIGION=$RELIGION
oldCAPITAL=$CAPITAL
oldOWNER=$OWNER
oldSIZE=$SIZE
oldID=$ID
#oldCOUNTRY=$COUNTRYNAME
#oldRGB=[$r][$g][$b]


             let counter=counter+1 
done </home/aumannd/Code/github/uMap/buildingGeojson/extendedtimeline/history/provinces/provinceHistoryFinal.csv

# write in format for province settings (not geojson! - as efficient as possible)    for updating labels
