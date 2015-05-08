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

if [[ $line == newEntry*-* ]] ; then

curCapital="undefined"

fi

if  [[ $line == *capital* ]] ; then

curCapital=`echo $line  | grep -oP '(?<=capital \= ").*(?=")'`

echo -e $curCapital >> listCapitals.csv

fi

done </home/aumannd/Code/github/uMap/buildingGeojson/extendedtimeline/history/provinces/compilation.txt


