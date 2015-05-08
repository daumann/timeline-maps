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
decodedString=`echo $NAME | tr "|" " "  | tr "?" " "`
encodedString="$(perl -MURI::Escape -e 'print uri_escape($ARGV[0]);' "$decodedString")"


wikiURL=`curl --silent "http://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srlimit=2&srwhat=text&srsearch=$encodedString" | jq . | grep -oP '\"title\": \"\K.*?(?=\"\,)' | head -n 1`



tmpDecode="http://en.wikipedia.org/wiki/"$( rawurlencode "$wikiURL" )
echo -e \"$wikiURL\", >> uniqueCapitalsWiki.csv

done </home/aumannd/Code/github/uMap/buildingGeojson/uniqueCapitals.csv
