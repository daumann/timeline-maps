search="Ząb, Lesser Poland Voivodeship, Poland"
encodedString="$(perl -MURI::Escape -e 'print uri_escape($ARGV[0]);' "$search")"

wikiURL=`curl --silent "http://api.opencagedata.com/geocode/v1/json?q=$encodedString&key=7d02f243a3950e3e069714affed3d4ae&limit=1&no_annotations=1" | jq -r '.results | .[0] | .geometry'`

lng=`echo $wikiURL | grep -oP '\"lng\": \K.*?(?=\,)'`
lat=`echo $wikiURL | grep -oP '\"lat\": \K.*?(?= )'`

echo $lat $lng
