#!/bin/bash
blue='\033[0;34m'
yellow='\033[1;33m'
green='\033[0;32m'
red='\033[0;31m'
NC='\033[0m' # No Color

#umap=# COPY leaflet_storage_datalayer FROM '/home/aumannd/my-app/subjects.csv' CSV;



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

echo "xxx"$ALTERNATIVENAMES >> newFile.csv
done </home/aumannd/Code/github/uMap/buildingGeojson/personDataSnippet2.csv


