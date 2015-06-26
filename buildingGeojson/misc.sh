 sudo sh -c "echo 1 > /proc/sys/vm/drop_caches" # did not work


sed -i 's/old-word/new-word/g' *.txt

sed -i 's#iconUrl":"../img/#iconUrl":"/static/i/#g' relDL*

cd /home/aumannd/.virtualenvs/umap/var/uploads/datalayer/people/

! group layers ! http://www.vicchi.org/2015/03/22/vagamente-maleducato-the-vaguely-rude-places-map-goes-international/

https://github.com/turban/Leaflet.Photo
Leaflet.markercluster

changed: polDL1384 heatmap , 1385 cluster, 1386 cluster ohne attr

iconv -f ISO-8859-1 -t UTF-8 DL50.geojson >DL50b.geojson
sed -i '$s/,$//' datalayersbs/bsDL*


# ALL IMAGES OF WIKIDATA
https://wdq.wmflabs.org/api?q=BETWEEN[571,1000,1010]%20AND%20claim[18]%20AND%20claim[625]




# SETTINGS FOR PSQL - settings: {"geometry": {"type": "Point", "coordinates": [50, 4]}, "type": "Feature", "properties": {"popupTemplate": "SimplePanel", "miniMap": false, "captionBar": false, "description": "descriptiondescriptiondescription", "scrollWheelZoom": true, "limitBounds": {}, "color": "#1f6377", "displayPopupFooter": false, "zoom": 6, "slideshow": {}, "scaleControl": true, "tilelayer": {}, "datalayersControl": true, "moreControl": true, "licence": "", "tilelayersControl": true, "zoomControl": true, "name": "testName"}}

for f in *.txt; do sed -i "1s/^/$f\n/"  "$f"; done


# Fuer bots posting to wikidata:
https://www.wikidata.org/wiki/Wikidata:Creating_a_bot

# here is a post to set a property:
JSON.stringify(dodger)
"{"claims":[{"mainsnak":{"snaktype":"value","property":"P585","datavalue":{"value":{"time":"+2013-01-01T00:00:00Z","timezone":0,"before":0,"after":0,"precision":9,"calendarmodel":"http://www.wikidata.org/entity/Q1985727"},"type":"time"}},"type":"statement","rank":"normal"}]}"

function addEditPointInTimeProperty ( newtime, editToken ) {
    $.ajax({
        url: 'https://www.wikidata.org/w/api.php?format=json&action=wbeditentity&id=Q7068331',
        contentType: "application/json; charset=utf-8",
        
        data: {
          	data: JSON.stringify(dodger),
		token: editToken, 
	},
        dataType: 'json',
        type: 'POST',
        success: function( data ) {
            console.debug("Succesfull post with data",data);
        },
        error: function( xhr ) {
            alert( 'Error: Request failed.' );
        }
    });
}

# TODO: get token programaticaly, and find Qvalue

for f in *.txt ; do sed -i 'newEntry$f' $f; done




cat citiesAndArtFinalCleanNull3.csv | awk  -F'\t' '{ if ( $2 !~ /monastery/ ) print $1"\t"$2"\t"$3"\t"$4"\t"$5"\t"$6; }' >> citiesAndArtFinalCleanNull4.csv


# calculate area on nodejs
var provinceCollection=..
var provAreas={};


for (var i=0; i<provinceCollection.features.length; i++ ){
    provinceCollection.features[i].properties.area=Math.round(geojsonArea.geometry(provinceCollection.features[i].geometry)/1000000 * 100) / 100;
    
	if (isNaN(provAreas[provinceCollection.features[i].properties.name])){
	    provAreas[provinceCollection.features[i].properties.name] = Math.round(geojsonArea.geometry(provinceCollection.features[i].geometry)/1000000 * 100) / 100;
	} else {
	    provAreas[provinceCollection.features[i].properties.name] += Math.round(geojsonArea.geometry(provinceCollection.features[i].geometry)/1000000 * 100) / 100;
	}
}

console.log(JSON.stringify(provAreas))


mv 11-Vasterbotten.txt "11 - Vasterbotten.txt";
mv 12-Sjaelland.txt "12 - Sjaelland.txt";
mv 13-Slesvig.txt "13 - Slesvig.txt";
mv 14-Fyn.txt "14 - Fyn.txt";
mv 15-Jylland.txt "15 - Jylland.txt";
mv 16-Bohuslan.txt "16 - Bohuslan.txt";
mv 1776-Karelia.txt "1776 - Karelia.txt";
mv 1777-Kola.txt "1777 - Kola.txt";
mv 17-Akershus.txt "17 - Akershus.txt";
mv "1853- Kozani.txt" "1853 - Kozani.txt";
mv 18-Lappland.txt "18 - Lappland.txt";
mv "1979 -Faroes.txt" "1979 - Faroes.txt";
mv 1981-Bornholm.txt "1981 - Bornholm.txt";
mv 1982-Blekinge.txt "1982 - Blekinge.txt";
mv 1983-Lolland.txt "1983 - Lolland.txt";
mv 1984-Nordjylland.txt "1984 - Nordjylland.txt";
mv 1985-Narke.txt "1985 - Narke.txt";
mv "1996  Palau.txt" "1996 - Palau.txt";
mv 19-Osterbotten.txt "19 - Osterbotten.txt";
mv 1-Uppland.txt "1 - Uppland.txt";
mv 20-Trondelag.txt "20 - Trondelag.txt";
mv 21-Halogaland.txt "21 - Halogaland.txt";
mv 22-Eisdiva.txt "22 - Eisdiva.txt";
mv 23-Bergenshus.txt "23 - Bergenshus.txt";
mv 24-Agder.txt "24 - Agder.txt";
mv 25-Gotland.txt "25 - Gotland.txt";
mv "2694- Bosaso.txt" "2694 - Bosaso.txt";
mv 26-Halland.txt "26 - Halland.txt";
mv 27-Finland.txt "27 - Finland.txt";
mv "29 -Tavastland.txt" "29 - Tavastland.txt";
mv 2-Ostergotland.txt "2 - Ostergotland.txt";
mv 30-Viborg.txt "30 - Viborg.txt";
mv 31-Savolaks.txt "31 - Savolaks.txt";
mv 32-Keksholm.txt "32 - Keksholm.txt";
mv 33-Neva.txt "33 - Neva.txt";
mv 34-Ingermanland.txt "34 - Ingermanland.txt";
mv 3-Smaland.txt "3 - Smaland.txt";
mv 4-Bergslagen.txt "4 - Bergslagen.txt";
mv 5-Varmland.txt "5 - Varmland.txt";
mv 6-Skane.txt "6 - Skane.txt";
mv 7-Vastergotland.txt "7 - Vastergotland.txt";
mv 8-Dalaskogen.txt "8 - Dalaskogen.txt";
mv 9-Halsingland.txt "9 - Halsingland.txt";
