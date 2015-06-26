console.log("*** enter svgProv overlay logic definitions");

var alert = function(){ console.log.apply(console,arguments); };

var activeListFeature = "rel";
var total = 0;
var total2 = 0;

var sortRuler = [];
var sortCul = [];
var sortRel = [];
var sortmRel = [];
var rulerPops = {}
var culPops = {}
var relPops = {}
var mainRelPops = {}

var sortAll = [];
var rulerPops2 = {}
var culPops2 = {}
var relPops2 = {}
var mainRelPops2 = {}

var sunburstRel = []
var sunburstRul = []

var mainRelPops2 = {}

var blocklist=[]
var imageMap={}

var limit=50

function detailsToAll(e) {
    var provinceToCenter = e;

    for (var i = 0; i< provinceCollection.features.length; i++)
    {
        if (provinceCollection.features[i].properties.name === provinceToCenter){
            ultimateMarker.properties.wikiUrl=escape(provinceCollection.features[i].properties.wikiUrl);
            ultimateMarker.attachPopup()
            break;
        }
    }
};

function goToAll(e) {
    var provinceToCenter = e;

    for (var i = 0; i< provinceCollection.features.length; i++)
    {
        if (provinceCollection.features[i].properties.name === provinceToCenter){
            map.panTo(new L.LatLng(provinceCollection.features[i].geometry.coordinates[0][0][1],provinceCollection.features[i].geometry.coordinates[0][0][0]));
            break;
        }
    }
};

function goToRuler(e) {
    var rulerAcr =e;
    var provinceToCenter = e;

    for (var key in countryPlus){
        if(countryPlus[key][0] == e)
            rulerAcr = key;
    }

    for (var key in activeYear){
        if(activeYear[key][0] == rulerAcr)
            provinceToCenter = key;
    }

    for (var i = 0; i< provinceCollection.features.length; i++)
    {
        if (provinceCollection.features[i].properties.name === provinceToCenter){
            map.panTo(new L.LatLng(provinceCollection.features[i].geometry.coordinates[0][0][1],provinceCollection.features[i].geometry.coordinates[0][0][0]));
            break;
        }
    }
};

function goToCul(e) {
    var culAcr =e;
    var provinceToCenter = e;

    for (var key in culPlus){
        if(culPlus[key][0] == e)
            culAcr = key;
    }

    for (var key in activeYear){
        if(activeYear[key][1] == culAcr)
            provinceToCenter = key;
    }

    for (var i = 0; i< provinceCollection.features.length; i++)
    {
        if (provinceCollection.features[i].properties.name === provinceToCenter){
            map.panTo(new L.LatLng(provinceCollection.features[i].geometry.coordinates[0][0][1],provinceCollection.features[i].geometry.coordinates[0][0][0]));
            break;
        }
    }
};

function goToRel(e) {
    var culAcr =e;
    var provinceToCenter = e;

    for (var key in relPlus){
        if(relPlus[key][0] == e)
            culAcr = key;
    }

    for (var key in activeYear){
        if(activeYear[key][2] == culAcr)
            provinceToCenter = key;
    }

    for (var i = 0; i< provinceCollection.features.length; i++)
    {
        if (provinceCollection.features[i].properties.name === provinceToCenter){
            map.panTo(new L.LatLng(provinceCollection.features[i].geometry.coordinates[0][0][1],provinceCollection.features[i].geometry.coordinates[0][0][0]));
            break;
        }
    }
};

function goTomRel(e) {
    var culAcr =e;
    var isFin=false;
    var provinceToCenter = "notFound";
    var searchId = 0;
    
function selectRel(myFoundId){

    var foundCount=0;
    for (var key in relGen){
        if(relGen[key][0] == e){
            culAcr = key;
            foundCount++;
            if(foundCount == myFoundId){
                break;
            }
        }
    }

    for (var key in activeYear){
        if(activeYear[key][2] == culAcr)
            provinceToCenter = key;
    }

    for (var i = 0; i< provinceCollection.features.length; i++)
    {
        if (provinceCollection.features[i].properties.name === provinceToCenter){
            map.panTo(new L.LatLng(provinceCollection.features[i].geometry.coordinates[0][0][1],provinceCollection.features[i].geometry.coordinates[0][0][0]));
            isFin=true;
            break;
        }
    }
    
    
}

    while(searchId<10 && !isFin) {
        selectRel(searchId);
        searchId++;
    }
    
    
};



function detailsToRul(e) {

    for (var key in countryPlus){
        if(countryPlus[key][0] == e)
        {
            ultimateMarker.properties.wikiUrl=escape(countryPlus[key][2]);
            ultimateMarker.attachPopup()
            break;
        }
    }
};

function detailsToCul(e) {

    for (var key in culPlus){
        if(culPlus[key][0] == e)
        {            
            ultimateMarker.properties.wikiUrl=escape(culPlus[key][2]);
            ultimateMarker.attachPopup()
            break;
        }
    }

};

function detailsToRel(e) {

    for (var key in relPlus){
        if(relPlus[key][0] == e)
        {
            ultimateMarker.properties.wikiUrl=escape(relPlus[key][2]);
            ultimateMarker.attachPopup()
            break;
        }
    }
};

function detailsTomRel(e) {

        for (var key in relGen){
            if(relGen[key][0] == e)
            {
                ultimateMarker.properties.wikiUrl=escape(relGen[key][2]);
                ultimateMarker.attachPopup()
                break;
            }
        }
};


function reloadHierarchy()
{
    console.log("*** reloading hierarchy");
    
    var tmpKey = "";
    sortAll = [];
    sunburstRel = [];
    sunburstRul = [];
    for (var key in activeYear) {
        tmpKey = activeYear[key];
        tmpPop = tmpKey[4];
        tmpArea =  provArea[key];
        
        total +=  tmpKey[4]
        total2 +=  provArea[key];

        if(culPlus[tmpKey[1]] !== undefined)
            sortAll.push([key, countryPlus[tmpKey[0]][0], culPlus[tmpKey[1]][0], relPlus[tmpKey[2]][0], relGen[tmpKey[2]][0], tmpKey[3], tmpArea, tmpPop, "<a class='centerClass' onclick='goToAll(&#39;"+key+"&#39;)'>center</a><a class='centerClass' onclick='detailsToAll(&#39;"+key+"&#39;)'>details</a>"])
        else{
            tmpKey[1] = "sapmi";
        }
        
        sunburstRel.push([relGen[ tmpKey[2] ][0]+"-"+relPlus[tmpKey[2]][0]+"-"+countryPlus[tmpKey[0]][0]+"-"+culPlus[tmpKey[1]][0]+"-"+key,tmpPop]);
        
        sunburstRul.push([countryPlus[tmpKey[0]][0]+"-"+relGen[ tmpKey[2] ][0]+"-"+relPlus[tmpKey[2]][0]+"-"+tmpKey[1]+"-"+key,tmpPop]);
        if (isNaN(rulerPops[countryPlus[tmpKey[0]][0]])){
            rulerPops[countryPlus[tmpKey[0]][0]] = tmpPop;
        } else {
            rulerPops[countryPlus[tmpKey[0]][0]] += tmpPop;
        }
    
        if (isNaN(culPlus[tmpKey[1]][0])){
            culPops[culPlus[tmpKey[1]][0]] = tmpPop;
        } else {
            culPops[culPlus[tmpKey[1]][0]] += tmpPop;
        }
    
        if (isNaN(relPops[relPlus[tmpKey[2]][0]])){
            relPops[relPlus[tmpKey[2]][0]] = tmpPop;
        } else {
            relPops[relPlus[tmpKey[2]][0]] += tmpPop;
        }

        if (isNaN( mainRelPops[relGen[ tmpKey[2] ][0]] )){
            mainRelPops[relGen[ tmpKey[2] ][0]] = tmpPop;
        } else {
            mainRelPops[relGen[ tmpKey[2] ][0]] += tmpPop;
        }
        
        

        if (isNaN(rulerPops2[countryPlus[tmpKey[0]][0]])){
            rulerPops2[countryPlus[tmpKey[0]][0]] = tmpArea;
        } else {
            rulerPops2[countryPlus[tmpKey[0]][0]] += tmpArea;
        }

        if (isNaN(culPops2[culPlus[tmpKey[1]][0]])){
            culPops2[culPlus[tmpKey[1]][0]] = tmpArea;
        } else {
            culPops2[culPlus[tmpKey[1]][0]] +=tmpArea;
        }

        if (isNaN(relPops2[relPlus[tmpKey[2]][0]])){
            relPops2[relPlus[tmpKey[2]][0]] = tmpArea;
        } else {
            relPops2[relPlus[tmpKey[2]][0]] += tmpArea;
        }

        if (isNaN( mainRelPops2[relGen[ tmpKey[2] ][0]] )){
            mainRelPops2[relGen[ tmpKey[2] ][0]] = tmpArea;
        } else {
            mainRelPops2[relGen[ tmpKey[2] ][0]] += tmpArea;
        }
    }
    
    sortRuler = [];
    sortCul = [];
    sortRel = [];
    sortmRel = [];
    console.debug("sunburstRel",sunburstRel);
    console.debug("sunburstRul",sunburstRul);
    
    for (var key in rulerPops)
        sortRuler.push([key, rulerPops2[key], rulerPops[key], "<a class='centerClass' onclick='goToRuler(&#39;"+key+"&#39;)'>center</a><a class='centerClass' onclick='detailsToRul(&#39;"+key+"&#39;)'>details</a>"])
    for (var key in culPops)
        sortCul.push([key, culPops2[key], culPops[key], "<a class='centerClass' onclick='goToCul(&#39;"+key+"&#39;)'>center</a><a class='centerClass' onclick='detailsToCul(&#39;"+key+"&#39;)'>details</a>"])
    for (var key in relPops)
        sortRel.push([key, relPops2[key], relPops[key], "<a class='centerClass' onclick='goToRel(&#39;"+key+"&#39;)'>center</a><a class='centerClass' onclick='detailsToRel(&#39;"+key+"&#39;)'>details</a>"])
    for (var key in mainRelPops)
        sortmRel.push([key, mainRelPops2[key], mainRelPops[key], "<a class='centerClass' onclick='goTomRel(&#39;"+key+"&#39;)'>center</a><a class='centerClass' onclick='detailsTomRel(&#39;"+key+"&#39;)'>details</a>"])

   // createVisualization(buildHierarchy(sunburstRul));
    
    /*
    sortRuler.sort(function(b, a) {return a[1] - b[1]})
    sortCul.sort(function(b, a) {return a[1] - b[1]})
    sortRel.sort(function(b, a) {return a[1] - b[1]})
    sortmRel.sort(function(b, a) {return a[1] - b[1]})
    */
}

function aud_play_pause() {
    var myAudio = document.getElementById("audio");
    if (myAudio.paused) {
        document.getElementById("audioButton").value = "PAUSE";
        myAudio.play();
    } else {
        document.getElementById("audioButton").value = "PLAY";
        myAudio.pause();
    }
}

var dl500, dl50, dl501, dl502, dl503, dl509;
//var provinceCollection;
var map;
var path;
var svgProv;
var g0;

var gProvinceAreas;
var gProvinceLabels;
var gActiveCouLabels;
var gActiveCulLabels;
var gActiveRelLabels;
var gActiveRelGenLabels;
var provinceLoaded = false;
var activeYear;
var activeLoaded;
var activeAreaFeature;
var activeFeatureCollection;
var gActiveLabels;
var activeAreaFeat = "country";
var activeTextFeat = "country";

var countryIsSetup = false;
var culIsSetup = false;
var relIsSetup = false;
var relGenIsSetup = false;


var undefinedColor = "rgb(191,191,191)"

var provinceTextLine, activeTextLine, provinceFeature0,
    activeFeature0, activeTextLineFeature, provinceTextLineFeature, activeTextFeature0, activeTextFeature1, activeTextFeature2;

var transform2;


/*map = new L.Map("map", {center: [37.8, 0.9], zoom: 3})
    .addLayer(new L.TileLayer("http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg"));
*/

/*
 map.on("moveend", function () {

 var pixelSize = map.getSize();
 var pixelBounds = map.getPixelBounds();
 var pixelOrigin = map.getPixelOrigin();
 svgProv
 .attr("width", pixelSize.x * 3)
 .attr("height", pixelSize.y * 3)
 .attr("viewBox", [0, 0, pixelSize.x * 3, pixelSize.y * 3].join(" "))

 });
 */

function changeYear(newYear,myActiveYear) {
    a_hierLoaded=false;
    console.debug("*** changing area year", newYear,activeYear)
    $("#yearSB").html(newYear)
    activeYear = jQuery.extend({}, myActiveYear);
    $('#geoGallery').empty();
    if ($("#geoGallery").css("display") !== "none"){
        updateGeoGallery(newYear-10,newYear+10,"people");
    }
    
    if ($(".storage-browse-actions").css("display") === "block"){
        a_hierLoaded=true;
        reloadHierarchy();
        aggTable.fnClearTable();
        fulTable.fnClearTable();
        fulTable.fnAddData( sortAll );
        
        switch (activeListFeature){
            case ("rel"):
                aggTable.fnAddData( sortRel );
                break;
            case ("mrel"):
                aggTable.fnAddData( sortmRel );
                break;
            case ("cul"):
                aggTable.fnAddData( sortCul );
                break;
            case ("rul"):
                aggTable.fnAddData( sortRuler );
                break;
        }

        switchSBData(currSB);
        
    }
    /*
    switch (newYear) {
        case 50:
            activeYear = jQuery.extend({}, dl50);
            break;
        case 500:
            activeYear = jQuery.extend({}, dl500);
            break;
        case 501:
            activeYear = jQuery.extend({}, dl501);
            break;
        case 502:
            activeYear = jQuery.extend({}, dl502);
            break;
        case 503:
            activeYear = jQuery.extend({}, dl503);
            break;
        case 509:
            activeYear = jQuery.extend({}, dl509);
            break;
        default:
            activeYear = jQuery.extend({}, dl500);
    }
*/
    countryIsSetup = false;
    culIsSetup = false;
    relIsSetup = false;
    relGenIsSetup = false;

    setupCollections(activeTextFeat);

    addTextFeat(activeTextFeat);

    addAreaFeat(activeAreaFeat);

    console.debug("finished loading")

}
function getExtrema(listOfPoints) {
    console.debug("getting list of points", listOfPoints)
    var minX = [listOfPoints[0][0], listOfPoints[0][1]];
    var minY = [listOfPoints[0][0], listOfPoints[0][1]];
    var maxX = [listOfPoints[0][0], listOfPoints[0][1]];
    var maxY = [listOfPoints[0][0], listOfPoints[0][1]];

    for (var i = 1; i < listOfPoints.length; i++) {
        if (minX[0] > listOfPoints[i][0]) minX = [listOfPoints[i][0], listOfPoints[i][1]];
        if (maxX[0] < listOfPoints[i][0]) maxX = [listOfPoints[i][0], listOfPoints[i][1]];
        if (minY[1] > listOfPoints[i][1]) minY = [listOfPoints[i][0], listOfPoints[i][1]];
        if (maxY[1] < listOfPoints[i][1]) maxY = [listOfPoints[i][0], listOfPoints[i][1]];
    }

    return ([minX, minY, maxX, maxY]);
}

function getExtrema2(listOfPoints) {

    var minX = [listOfPoints[0][0][0], listOfPoints[0][0][1]];
    var minY = [listOfPoints[0][0][0], listOfPoints[0][0][1]];
    var maxX = [listOfPoints[0][0][0], listOfPoints[0][0][1]];
    var maxY = [listOfPoints[0][0][0], listOfPoints[0][0][1]];

    for (var j = 0; j < listOfPoints.length; j++) {
        for (var i = 0; i < listOfPoints[j].length; i++) {
            if (minX[0] > listOfPoints[j][i][0]) minX = [listOfPoints[j][i][0], listOfPoints[j][i][1]];
            if (maxX[0] < listOfPoints[j][i][0]) maxX = [listOfPoints[j][i][0], listOfPoints[j][i][1]];
            if (minY[1] > listOfPoints[j][i][1]) minY = [listOfPoints[j][i][0], listOfPoints[j][i][1]];
            if (maxY[1] < listOfPoints[j][i][1]) maxY = [listOfPoints[j][i][0], listOfPoints[j][i][1]];
        }
    }
    
    return ([minX, minY, maxX, maxY]);
}

function get_polygon_centroid(pts) {

    var twicearea = 0,
        x = 0, y = 0,
        nPts = pts.length,
        p1, p2, f;

    for (var i = 0, j = nPts - 1; i < nPts; j = i++) {
        p1 = pts[i];
        p2 = pts[j];
        f = p1[0] * p2[1] - p2[0] * p1[1];
        twicearea += f;
        x += ( p1[0] + p2[0] ) * f;
        y += ( p1[1] + p2[1] ) * f;
    }
    f = twicearea * 3;
    return [ x / f, y / f ];
}

function get_polygon_centroid2(fullpts) {
/*
    console.debug(pts)
    pts=pts[0]
 console.debug(pts)

    var twicearea=0,
        x=0, y=0,
        nPts = pts.length,
        p1, p2, f;
    for ( var i=0, j=nPts-1 ; i<nPts ; j=i++ ) {
        p1 = pts[i]; p2 = pts[j];
        f = p1[0]*p2[1] - p2[0]*p1[1];
        twicearea += f;
        x += ( p1[0] + p2[0] ) * f;
        y += ( p1[1] + p2[1] ) * f;
    }
    f = twicearea * 3;
    return [ x/f, y/f ];
    
    */
    var pts = [];
    for (var j = 0; j < fullpts.length; j++) {
        for (var k = 0; k < fullpts[j].length; k++) {
            pts.push(fullpts[j][k])
        }
    }

    var twicearea = 0,
        x = 0, y = 0,
        nPts = pts.length,
        p1, p2, f;

    for (var i = 0, j = nPts - 1; i < nPts; j = i++) {
        p1 = pts[i];
        p2 = pts[j];
        f = p1[0] * p2[1] - p2[0] * p1[1];
        twicearea += f;
        x += ( p1[0] + p2[0] ) * f;
        y += ( p1[1] + p2[1] ) * f;
    }
    f = twicearea * 3;
    return [ x / f, y / f ];
    
}


function getCoordsForMultiPolyLine(myCoords) {

    var extremas = getExtrema2(myCoords);
    var point = get_polygon_centroid2(myCoords);

    // max x - min x > max y - min y
    if (extremas[2][0] - extremas[0][0] > extremas[3][1] - extremas[1][1] ) {

        currLabelSize = Math.sqrt((  (extremas[0][1] - point[1]) * (extremas[0][1] - point[1])
            + (extremas[0][0] - point[0]) * (extremas[0][0] - point[0]) ))
            +
            Math.sqrt((extremas[2][1] - point[1]) * (extremas[2][1] - point[1])
                + (extremas[2][0] - point[0]) * (extremas[2][0] - point[0]));

        //    minX to  maxX
        return [
            [extremas[0][0], extremas[0][1]],
            [point[0], point[1]],
            [extremas[2][0], extremas[2][1]]
        ];  //angle != 0
    }
    //    minX, minY, maxX, maxY
    else {

        currLabelSize = Math.sqrt((  (extremas[0][1] - point[1]) * (extremas[0][1] - point[1])
            + (extremas[0][0] - point[0]) * (extremas[0][0] - point[0]) ))
            +
            Math.sqrt((extremas[2][1] - point[1]) * (extremas[2][1] - point[1])
                + (extremas[2][0] - point[0]) * (extremas[2][0] - point[0]));

        if (extremas[1][0] - extremas[3][0] < 1){
            return [
                [extremas[1][0], extremas[1][1]],
                [point[0], point[1]],
                [extremas[3][0], extremas[3][1]]
            ];
        } else{
            return [
                [extremas[3][0], extremas[3][1]],
                [point[0], point[1]],
                [extremas[1][0], extremas[1][1]]
            ];
        }
    }
}

function projectPoint(x, y) {
    var point = map.latLngToLayerPoint(
        new L.LatLng(y, x)
    );
    this.stream.point(point.x, point.y);

}

function contains(oldBody, newBody) {
    for (var i1 = 0, tot1 = oldBody.length; i1 < tot1; i1++) {
        for (var i2 = 0, tot2 = oldBody[i1].length; i2 < tot2; i2++) {
            for (var i3 = 0, tot3 = newBody.length; i3 < tot3; i3++) {
//  console.debug("!!comparing!",pNew[0],"with" , pOld[0])
                if (newBody[i3][0] == oldBody[i1][i2][0] && newBody[i3][1] == oldBody[i1][i2][1]) {
                    return true;
                }

            }
        }

    }

    return false;

}
function contains2(oldBody, newBody0) {


    for (var i0 = 0, tot0 = newBody0.length; i0 < tot0; i0++) {

        for (var i1 = 0, tot1 = oldBody.length; i1 < tot1; i1++) {
            for (var i2 = 0, tot2 = oldBody[i1].length; i2 < tot2; i2++) {
//   console.debug("new 1 ",newBody0[i0].length);
                for (var i3 = 0, tot3 = newBody0[i0].length; i3 < tot3; i3++) {
//  console.debug("!!comparing!",pNew[0],"with" , pOld[0])
                    if (newBody0[i0][i3][0] == oldBody[i1][i2][0] && newBody0[i0][i3][1] == oldBody[i1][i2][1]) {
//      console.debug("!!FOUND")
                        return true;
                    }
                }
            }
        }

    }
    return false;
}

function contains3(oldBody, newBody) {
    for (var i1 = 0, tot1 = oldBody.length; i1 < tot1; i1++) {
        for (var i3 = 0, tot3 = newBody.length; i3 < tot3; i3++) {
            if (newBody[i3][0] == oldBody[i1][0] && newBody[i3][1] == oldBody[i1][1]) {
                return true;
            }

        }

    }

    return false;

}

function prepareCollection(targetC, attr, coo) {
    if (attr !== "na" && attr != undefined) {

        if (targetC.hasOwnProperty(attr) && coo) {
            if (targetC[attr][0].length == 0 || attr == "undefined" || contains(targetC[attr][0], coo)) {
                targetC[attr][0].push(coo);
            }

            else {
                var it = 1;

                while ((targetC[attr][it] !== undefined) && (!contains(targetC[attr][it], coo))) {
                    it++
                }

                if (targetC[attr][it] === undefined) targetC[attr][it] = [];

                targetC[attr][it].push(coo)
            }
        }
        else {
            targetC[attr] = [
                [coo]
            ];
        }

    }
}

function isTouching(array1, array2) {

    for (var i = 0; i < array1.length; i++) {
        for (var j = 0; j < array2.length; j++) {
            if (array1[i] == array2[j]) {
                //            console.debug(array1,array2, "yes!");
                return true;
            }
        }
    }
    return false;
};

function prepareCollectionIDs(targetC, attr, provId) {

    //   console.debug("targetC",targetC);

    if (attr !== "na" && attr != undefined) {

        if (targetC.hasOwnProperty(attr)) {
            if (targetC[attr][0].length == 0 || isTouching(targetC[attr][0], adjacent[provId])) {
                targetC[attr][0].push(provId);
            }

            else {
                var it = 1;

                while ((targetC[attr][it] !== undefined) && (!isTouching(targetC[attr][it], adjacent[provId]))) {
                    it++
                }

                if (targetC[attr][it] === undefined) targetC[attr][it] = [];

                targetC[attr][it].push(provId)
            }
        }
        else {
            targetC[attr] = [
                [provId]
            ];
        }

    }
}
function fillCollection(myColl, area, addTo, postfix) {
    // console.debug("filling",myColl,area,addTo,postfix)

    for (var i = 0; i < area.features.length; i++) {  //tmpLength
        myColl.features.push({
            "type": "Feature",
            "geometry": {
                "type": "LineString",

                "coordinates": getCoordsForMultiPolyLine(area.features[i].geometry.coordinates)

            },
            "properties": {
                "name": area.features[i].properties.name
            }
        });
    }
// gActiveLabels.selectAll("*").remove()  // just hide, dont delete
    activeFeature0 = addTo.selectAll("path")


        .data(myColl.features)
        .enter();


    activeTextLineFeature = activeFeature0.append("path")
        .attr("id", function (d, i) {
            return postfix + i;
        }
    )
        .attr("d", path).style("opacity", 0).attr("pointer-events", "none");


    activeTextFeature0 = activeFeature0
        .append("text").attr("position", "absolute").attr("pointer-events", "none")


    activeTextFeature1 = activeTextFeature0
        .append("textPath").attr("class", "shadow").attr("startOffset", "50%")
        .attr({"xlink:href": function (d, i) {
            return "#" + postfix + i
        }})
        .html(function (d, i) {
            return d.properties.name.toUpperCase()
        });

    activeTextFeature2 = activeTextFeature0
        .append("textPath").attr("class", "labels").attr("startOffset", "50%")
        .attr({"xlink:href": function (d, i) {
            return "#" + postfix + i
        }})
        .html(function (d, i) {
            return d.properties.name.toUpperCase()
        })

}

function fillCollectionId(myId, addTo, postfix) {
    //  console.debug("filling",myId,addTo,postfix)
    var tmpName = "";
    var groups = {};
    var myColl = {"type": "FeatureCollection",
        "features": []
    };
    for (var key in myId) {

        if (postfix != "co" && postfix != "r") {
            tmpName = key
        }
        else if (postfix == "co") {
            tmpName = "";
            if (countryPlus[key]) tmpName = countryPlus[key][0];
        }
        else if (postfix == "r") {
            tmpName = "";
            if (relPlus[key]) tmpName = relPlus[key][0];
        }


        for (var i1 = 1; i1 < myId[key].length; i1++) {
            loop1:
                for (var i2 = 0; i2 < myId[key].length; i2++) {
                    for (var i3 = 0; i3 < myId[key][i1].length; i3++) {
                        if (i1 != i2 && isTouching(adjacent[myId[key][i1][i3]], myId[key][i2])) {
                            Array.prototype.push.apply(myId[key][i2], myId[key][i1]);
                            myId[key].splice(i1, 1);
                            i1--;
                            break loop1;
                        }
                    }
                }
        }

        for (var i1 = 0, tot1 = myId[key].length; i1 < tot1; i1++) {
            for (var i2 = 0, tot2 = myId[key][i1].length; i2 < tot2; i2++) {
                if (groups.hasOwnProperty(key)) {
                    if (groups[key][i1] === undefined) groups[key][i1] = [];
                    groups[key][i1].push(provinceCollection.features[myId[key][i1][i2]].geometry.coordinates[0]);
                }
                else {
                    groups[key] = [
                        [provinceCollection.features[myId[key][i1][i2]].geometry.coordinates[0]]
                    ];
                }


            }

        }

        for (var i = 0; i < groups[key].length; i++) {  //tmpLength
            myColl.features.push({
                "type": "Feature",
                "geometry": {
                    "type": "LineString",
                    "coordinates": getCoordsForMultiPolyLine(groups[key][i])
                },
                "properties": {
                    "name": tmpName
                }
            });
        }
    }

    console.debug("finished myColl", myColl)

    activeFeature0 = addTo.selectAll("path")
        .data(myColl.features)
        .enter();


    activeTextLineFeature = activeFeature0.append("path")
        .attr("id", function (d, i) {
            return postfix + i;
        }
    )
        .attr("d", path).style("opacity", 0).attr("pointer-events", "none");


    activeTextFeature0 = activeFeature0
        .append("text").attr("position", "absolute").attr("pointer-events", "none")


    activeTextFeature1 = activeTextFeature0
        .append("textPath").attr("class", "shadow").attr("startOffset", "50%")
        .attr({"xlink:href": function (d, i) {
            return "#" + postfix + i
        }})
        .html(function (d, i) {
            return d.properties.name.toUpperCase()
        });

    activeTextFeature2 = activeTextFeature0
        .append("textPath").attr("class", "labels").attr("startOffset", "50%")
        .attr({"xlink:href": function (d, i) {
            return "#" + postfix + i
        }})
        .html(function (d, i) {
            return d.properties.name.toUpperCase()
        })

}
function setupCollections(myActiveTextFeat) {

    g0.selectAll("text").remove()
    g0.selectAll("path").remove()


    //  provinceLoaded = false;                ->      activeFeat
    activeLoaded = false;


    var countryIdCollection = {};
    var relIdCollection = {};

    var relGenIdCollection = {};
    var culIdCollection = {};

    var tmpProv, tmpCountry, tmpRel, tmpCul, tmpPop, tmpCap, tmpCoo;


    for (var i = 0; i < provinceCollection.features.length; i++) {

        tmpCoo = undefined;
        tmpCountry = undefined;
        tmpRel = undefined;
        tmpCul = undefined;
        tmpPop = undefined;
        tmpCap = undefined;

        tmpProv = provinceCollection.features[i].properties.name;
        tmpCoo = provinceCollection.features[i].geometry.coordinates[0];


        if (activeYear.hasOwnProperty(tmpProv)) {
            try{
            tmpCountry = activeYear[tmpProv][0];
            tmpCul = activeYear[tmpProv][1];
            tmpRel = activeYear[tmpProv][2];
            tmpCap = activeYear[tmpProv][3];
            tmpPop = activeYear[tmpProv][4];
            }
            catch(e){
                console.error("tmpProv",tmpProv,"not found in activeYear") 
            }
            provinceCollection.features[i].properties.Cul = tmpCul;
            provinceCollection.features[i].properties.Rel = tmpRel;
            provinceCollection.features[i].properties.Pop = tmpPop;
            provinceCollection.features[i].properties.Cap = tmpCap;

            if (countryPlus[tmpCountry]) {
                provinceCollection.features[i].properties.nameCountry = countryPlus[tmpCountry][0];
            }

        }

        switch (activeTextFeat) {
            case "country":
                countriesArea = {"type": "FeatureCollection",
                    "features": []
                };
                prepareCollectionIDs(countryIdCollection, tmpCountry, i);
                countryIsSetup = true;
                break;
            case "culture":
                culArea = {"type": "FeatureCollection",
                    "features": []
                }
                prepareCollectionIDs(culIdCollection, tmpCul, i);
                culIsSetup = true;
                break;
            case "religion":
                relArea = {"type": "FeatureCollection",
                    "features": []
                }
                prepareCollectionIDs(relIdCollection, tmpRel, i);
                relIsSetup = true;
                break;
            case "religionGeneral":
                relGenArea = {"type": "FeatureCollection",
                    "features": []
                }
                prepareCollectionIDs(relGenIdCollection, relGen[tmpRel][0], i);
                relGenIsSetup = true;
                break;
        }


    }


    activeTextLine = {"type": "FeatureCollection",
        "features": []
    }

    switch (activeTextFeat) {
        case "country":
            fillCollectionId(countryIdCollection, gActiveCouLabels, "co");
            break;
        case "culture":
            fillCollectionId(culIdCollection, gActiveCulLabels, "cu");
            break;
        case "religion":
            fillCollectionId(relIdCollection, gActiveRelLabels, "r");
            break;
        case "religionGeneral":
            fillCollectionId(relGenIdCollection, gActiveRelGenLabels, "rg");
            break;
    }


    if (!provinceLoaded) {
        console.debug("setting up provinces (only once)");
        provinceLoaded = true;

        provinceTextLine = {
            "type": "FeatureCollection",
            "features": []
        }


        for (var i = 0; i < provinceCollection.features.length; i++) {

            provinceTextLine.features.push({
                "type": "Feature",
                "geometry": {
                    "type": "LineString",

                    "coordinates": getCoordsForMultiPolyLine(provinceCollection.features[i].geometry.coordinates)
                    // "coordinates": getCoordsForPolyLine(collection.features[i].geometry.coordinates[0])
                },
                "properties": {
                    "name": provinceCollection.features[i].properties.name
                }
            });
        }


        provinceFeature0 = gProvinceLabels.selectAll("path")
            .data(provinceTextLine.features)
            .enter();

        provinceTextLineFeature = provinceFeature0.append("path")
            .attr("id", function (d, i) {
                return "p" + i;
            }
        )
            .attr("d", path).style("opacity", 0).attr("pointer-events", "none");


        provinceTextFeature0 = provinceFeature0

            .append("text").attr("position", "absolute").attr("pointer-events", "none")


        provinceTextFeature1 = provinceTextFeature0
            .append("textPath").attr("class", "shadow").attr("startOffset", "50%")
            .attr({"xlink:href": function (d, i) {
                return "#p" + i
            }}) //d.properties.name
            .html(function (d, i) {
                return d.properties.name.toUpperCase()
            });

        provinceTextFeature2 = provinceTextFeature0
            .append("textPath").attr("class", "labels").attr("startOffset", "50%")
            .attr({"xlink:href": function (d, i) {
                return "#p" + i
            }}) //d.properties.name
            .html(function (d, i) {
                return d.properties.name.toUpperCase()
            })

        activeAreaFeature = gProvinceAreas.selectAll("path")
            .data(provinceCollection.features)
            .enter().append("path")
            .attr("d", path)
            .style("fill", function (d) {
                return d.properties.Acolor; //._storage_options
            })
           // .on("dragstart", function() { d3.event.sourceEvent.preventDefault(); })
            .on('click', function (d, i) {
console.debug("clickevent",d3.event.defaultPrevented);
              //  if (d3.event.defaultPrevented) return; // click suppressed
                
                console.debug(d.properties.nameCountry)

                var rulerWiki = "";
                var i = 0;

                for (var key in countryPlus) {
                    if (countryPlus[key][0] == d.properties.nameCountry) {
                        rulerWiki = countryPlus[key][2];
                    }
                    ;
                    i++;
                }
                console.debug(rulerWiki);

                ultimateMarker.properties.name = "ulti"


                var tmpTitle = "";
                switch (getAreaChecked()){
                    case "A-Country":
                        ultimateMarker.properties.wikiUrl = rulerWiki
                        tmpTitle = "Region: "+ d.properties.nameCountry;
                        currSearchKey = d.properties.nameCountry;
                        break;
                    case "A-Culture":
                        ultimateMarker.properties.wikiUrl =  culPlus[d.properties.Cul][2]
                        tmpTitle = "Culture: "+ d.properties.Cul;
                        currSearchKey =  d.properties.Cul;
                        break;
                    case "A-Religion":
                        ultimateMarker.properties.wikiUrl = relPlus[d.properties.Rel][2]
                        tmpTitle = "Religion: "+ relPlus[d.properties.Rel][0];
                        currSearchKey = relPlus[d.properties.Rel][0];
                        break;
                    case "A-Main Religions":
                        ultimateMarker.properties.wikiUrl =  relGen[d.properties.Rel][2]
                        tmpTitle = "Main Religions: "+ relGen[d.properties.Rel][0];
                        currSearchKey = relGen[d.properties.Rel][0];
                        break;
                    case "A-Population":
                        ultimateMarker.properties.wikiUrl =  capitalURL[d.properties.Cap]
                        tmpTitle = "Capital: "+ d.properties.Cap;
                        currSearchKey = d.properties.Cap;
                        break;
                }

                

                                        ultimateMarker.properties.wikiUrl = ultimateMarker.properties.wikiUrl.replace(/ /g,"_")
                console.debug(getAreaChecked(),"->",ultimateMarker.properties.wikiUrl)
                
                ultimateMarker.attachPopup()
// 
                if (culPlus[d.properties.Cul])
                    var tmpculture=  escape(culPlus[d.properties.Cul][2])
                else
                    var tmpculture= ""
                if (relPlus[d.properties.Rel])
                    var tmpreligion= escape(relPlus[d.properties.Rel][2])
                else
                    var tmpreligion= ""
                var tmpruler=    escape(rulerWiki);
                if (relGen[d.properties.Rel])
                    var tmpmainRel=  escape(relGen[d.properties.Rel][2])
                else
                    var tmpmainRel=""
                var tmpcapital=  escape(capitalURL[d.properties.Cap]);
                var tmpregion=   escape(provURL[d.properties.name]);
                /*
                if ($("#storage-ui-container")[0].style.width != "100%"){
                    tmpculture = tmpculture + "?printable=yes";
                    tmpreligion = tmpreligion + "?printable=yes";
                    tmpruler = tmpruler + "?printable=yes";
                    tmpmainRel = tmpmainRel + "?printable=yes";
                    tmpcapital = tmpcapital + "?printable=yes";
                    tmpregion = tmpregion + "?printable=yes";
                }
                    */
                    
                $("#cultureSpec")[0].innerHTML =  d.properties.Cul;
                $("#religionSpec")[0].innerHTML = relPlus[d.properties.Rel][0];
                $("#rulerSpec")[0].innerHTML = (d.properties.nameCountry === undefined) ? "[unsettled]" : d.properties.nameCountry;
                $("#mainRelSpec")[0].innerHTML = relGen[d.properties.Rel][0];
                $("#capitalSpec")[0].innerHTML = d.properties.Cap;
                $("#regionSpec")[0].innerHTML = d.properties.name;
                $("#populationSpec")[0].innerHTML = d.properties.Pop;

                
                $("#content_cul")[0].value =  $("#cultureSpec")[0].innerHTML
                $("#content_rel")[0].value = $("#religionSpec")[0].innerHTML
                $("#content_rul")[0].value =  $("#rulerSpec")[0].innerHTML
                //  $("#mainRelSpec")[0].value = relGen[d.properties.Rel][0];
                $("#content_cap")[0].value =  $("#capitalSpec")[0].innerHTML
                //       $("#regionSpec")[0].value = d.properties.name;
                $("#content_Size")[0].value = $("#populationSpec")[0].innerHTML
                

                
                var js = "';$('#notFoundNotice').hide(); $('#chronasWiki').hide(); $('#overview')[0].style.display = 'none'; $('#loader1')[0].style.display = 'block';  $('#specific')[0].style.display = 'block';  var tmpURL='http://en.wikipedia.org/wiki/"
                var jsRight = "'; $('.GoToWikipedia')[0].href=tmpURL;  if($('#storage-ui-container')[0].style.width != '100%'){tmpURL=tmpURL+'?printable=yes'} ; $('iframe')[0].src=tmpURL; $('#chronasWiki').load(function(){ $('#chronasWiki').show(); }); $('#chronasWiki').load(function(){ if(tmpURL != 'http://en.wikipedia.org/wiki/' && tmpURL != 'http://en.wikipedia.org/wiki/?printable=yes'){  $('#chronasWiki').show();  $('#notFoundNotice').hide() } else { $('#missingEntry')[0].innerHTML = tmpTitle;  $('#chronasWiki').hide(); $('#notFoundNotice').show()  }    }); $('.overview')[0].innerHTML = 'Overview';     ";
                
                $("#cultureSpec").click(new Function("tmpTitle = 'culture: "+$("#cultureSpec")[0].innerHTML+js+tmpculture+jsRight))
                $("#religionSpec").click(new Function("tmpTitle = 'religion: "+$("#religionSpec")[0].innerHTML+js+tmpreligion+jsRight))
                $("#rulerSpec").click(new Function("tmpTitle = 'ruler: "+$("#rulerSpec")[0].innerHTML+js+tmpruler+jsRight))
                $("#mainRelSpec").click(new Function("tmpTitle = 'main religion: "+$("#mainRelSpec")[0].innerHTML+js+tmpmainRel+jsRight))
                $("#capitalSpec").click(new Function("tmpTitle = 'capital: "+$("#capitalSpec")[0].innerHTML+js+tmpcapital+jsRight))
                $("#regionSpec").click(new Function("tmpTitle = 'region: "+$("#regionSpec")[0].innerHTML+js+tmpregion+jsRight))



                if($("iframe")[0].src != 'http://en.wikipedia.org/wiki/' && $("iframe")[0].src != 'http://en.wikipedia.org/wiki/?printable=yes'){  $('#chronasWiki').show(); $('#notFoundNotice').hide()  } 
                else { 
                    
                    console.debug("inside not show with tmpTitle",tmpTitle)
                    $('#chronasWiki').hide();
                    $('#missingEntry')[0].innerHTML = tmpTitle;
                    $('#notFoundNotice').show()
                    $('#loader1').hide()
                }
                
                
                //            $('#chronasWiki').hide(); $('#overview')[0].style.display = 'none'; $('#loader1')[0].style.display = 'block';  $('#specific')[0].style.display = 'block';  var tmpURL=''; tmpURL='http://en.wikipedia.org/wiki/Dacians'; if($('#storage-ui-container')[0].style.width != '100%'){tmpURL=tmpURL+'?printable=yes'}  $('iframe')[0].src=+"'"+tmpURL+"'"; $('#chronasWiki').load(function(){ $('#chronasWiki').show(); });

                
                /*
                                alert(d.properties.name +
                                    " \n(http://en.wikipedia.org/wiki/" + provURL[d.properties.name] +
                                    "\n\nRuled by " +
                                    ( (d.properties.nameCountry === undefined) ? "[unsettled]" : d.properties.nameCountry) +
                                    " \n(http://en.wikipedia.org/wiki/" + rulerWiki +
                
                                    "\nCapital:" + d.properties.Cap +
                                    " \n(http://en.wikipedia.org/wiki/" + capitalURL[d.properties.Cap] +
                                    "\nCulture: " + d.properties.Cul +
                                    " \n(http://en.wikipedia.org/wiki/" + culPlus[d.properties.Cul][2] +
                                    "\nReligion: " + relPlus[d.properties.Rel][0] +
                                    " \n(http://en.wikipedia.org/wiki/" + relPlus[d.properties.Rel][2] +
                                    ")\n part of: " + relGen[d.properties.Rel][0] +
                                    "\n(http://en.wikipedia.org/wiki/" + relGen[d.properties.Rel][2] +
                                    ")\n Population: " + d.properties.Pop)
                */
            });


    }

}

function hideAndAdd(idNotTo,selectedFeat){
    var deselect=true;
    var activeCount=0;
 
    var textToIterate = ["T-Country","T-Culture","T-Religion","T-MainRel"];
    var areaToIterate = ["A-Country","A-Culture","A-Religion","A-MainRel","A-Population"];
    
    
    if(idNotTo.substr(0,1) == "T"){
        for (var i=0; i<textToIterate.length;i++){
            if($("#"+textToIterate[i]).prop('checked') === true){
                activeCount++;
                if(textToIterate[i] !== idNotTo) {
                    //only cosmetics
                    $("#"+textToIterate[i]).parent().removeClass("btn-info");
                    $("#"+textToIterate[i]).parent().addClass("btn-default off");
                    $("#"+textToIterate[i]).prop('checked',false);
                    deselect = false;
                }
            }
        }
        console.debug("activeCount is ",activeCount)
        if(!deselect || activeCount == 0){
            addTextFeat(selectedFeat);
        }
        else{
            addTextFeat('none');
        }
        
    }
    else
    {
        if($("#lockIcon").hasClass("fa-unlock-alt")){
            if(idNotTo === "A-Population"){
                hideAndAdd("T-Population","none")
            }
            else{
                $("#"+idNotTo.replace("A-","T-")).parent().click();
            }
            
        }
        for (var i=0; i<areaToIterate.length;i++){
            if($("#"+areaToIterate[i]).prop('checked') === true){
                activeCount++;
                if(areaToIterate[i] !== idNotTo) {
                    $("#"+areaToIterate[i]).parent().removeClass("btn-info");
                    $("#"+areaToIterate[i]).parent().addClass("btn-default off");
                    $("#"+areaToIterate[i]).prop('checked',false);
                    deselect = false;
                }
            }
        }
        if(!deselect || activeCount == 0){
            addAreaFeat(selectedFeat);
        }
        else{
            addAreaFeat('none');
        }
        
    }
}

function addAreaFeat(setActiveFeat) {
    activeAreaFeat = setActiveFeat;
    if (setActiveFeat === 'none'){
        $("#provinceAreas").css("visibility", "hidden")
    }
    else {
        $("#provinceAreas").css("visibility", "visible")
        console.debug("setting active Area to " + setActiveFeat)
        
    
    
        switch (activeAreaFeat) {
            case "country":
    
                for (var i = 0; i < provinceCollection.features.length; i++) {
                    tmpCountry = "undefined";
                    tmpProv = provinceCollection.features[i].properties.name;
    
                    if (activeYear.hasOwnProperty(tmpProv)) {
                        tmpCountry = activeYear[tmpProv][0];
                    }
    
    
                    if (tmpCountry != "undefined")
                        provinceCollection.features[i].properties.Acolor = countryPlus[tmpCountry][1];
                    else {
                        provinceCollection.features[i].properties.Acolor = undefinedColor;
                    }
    
                }
    
    //        activeFeatureCollection = jQuery.extend({}, countriesArea);
                break;
            case "culture":
    
                for (var i = 0; i < provinceCollection.features.length; i++) {
                    provinceCollection.features[i].properties.Acolor = (culPlus[provinceCollection.features[i].properties.Cul] !== undefined) ? culPlus[provinceCollection.features[i].properties.Cul][1] : undefinedColor;
                }
    //        activeFeatureCollection = jQuery.extend({}, culArea);
                break;
            case "religion":
    
                for (var i = 0; i < provinceCollection.features.length; i++) {
    
                    provinceCollection.features[i].properties.Acolor = (relPlus[provinceCollection.features[i].properties.Rel] !== undefined) ? relPlus[provinceCollection.features[i].properties.Rel][1] : undefinedColor;
                }
                break;
    
    
            case "religionGeneral":
    
                for (var i = 0; i < provinceCollection.features.length; i++) {
    
                    provinceCollection.features[i].properties.Acolor =
                        (relGen[provinceCollection.features[i].properties.Rel] !== undefined)
                            ? relGen[provinceCollection.features[i].properties.Rel][1]
                            : undefinedColor;
                }
    
    //         activeFeatureCollection = jQuery.extend({}, relArea);
                break;
            case "population":
    
                var max = 1000;
                for (var i = 0; i < provinceCollection.features.length; i++) {
                    if (provinceCollection.features[i].properties.Pop > max)
                        max = provinceCollection.features[i].properties.Pop;
                }
                max = Math.log(max / 1000);
                var fraction = 0
                for (var i = 0; i < provinceCollection.features.length; i++) {
                    fraction = Math.log(provinceCollection.features[i].properties.Pop / 1000) / max;
    
                    provinceCollection.features[i].properties.Acolor = "rgb(" + Math.round(200 + fraction * 55) + "," + Math.round(200 - fraction * 200) + "," + Math.round(200 - fraction * 200) + ")";
                }
                //         activeFeatureCollection = jQuery.extend({}, popArea);
                break;
            
    
    
        }
    
        activeAreaFeature
            .style("fill", function (d) {
                return d.properties.Acolor; //._storage_options
            })
    }
}

function addTextFeat(setActiveFeat) {


    console.debug("setting active text to " + setActiveFeat)

    activeTextFeat = setActiveFeat; //"country";


    if ((activeTextFeat == "country" && !countryIsSetup) ||
        (activeTextFeat == "culture" && !culIsSetup) ||
        (activeTextFeat == "religion" && !relIsSetup) ||
        (activeTextFeat == "religionGeneral" && !relGenIsSetup)) {
        console.debug("setting up Rest");

        console.debug(activeTextFeat, "---", countryIsSetup, culIsSetup, relIsSetup, relGenIsSetup);


        countriesArea = {"type": "FeatureCollection",
            "features": []
        }
        culArea = {"type": "FeatureCollection",
            "features": []
        }
        relArea = {"type": "FeatureCollection",
            "features": []
        }

        var countryCollection = {};
        var relCollection = {};

        var relGenIdCollection = {};
        var culCollection = {};
        var popCollection = {};

        var tmpProv, tmpCountry, tmpRel, tmpCul, tmpPop, tmpCap, tmpCoo;

        for (var i = 0; i < provinceCollection.features.length; i++) {  //tmpLength

            tmpCoo = undefined;
            tmpCountry = undefined;
            tmpRel = undefined;
            tmpCul = undefined;
            tmpPop = undefined;
            tmpCap = undefined;

            tmpProv = provinceCollection.features[i].properties.name;
            tmpCoo = provinceCollection.features[i].geometry.coordinates[0];


            if (activeYear.hasOwnProperty(tmpProv)) {
                tmpCountry = activeYear[tmpProv][0];
                tmpCul = activeYear[tmpProv][1];
                tmpRel = activeYear[tmpProv][2];
                tmpCap = activeYear[tmpProv][3];
                tmpPop = activeYear[tmpProv][4];

                provinceCollection.features[i].properties.Cul = tmpCul;
                provinceCollection.features[i].properties.Rel = tmpRel;
                provinceCollection.features[i].properties.Pop = tmpPop;
                provinceCollection.features[i].properties.Cap = tmpCap;

                if (countryPlus[tmpCountry]) {
                    provinceCollection.features[i].properties.nameCountry = countryPlus[tmpCountry][0];
                }

            }
            //          console.debug(countryCollection, tmpCountry, i);
            if (!countryIsSetup)
            prepareCollectionIDs(countryCollection, tmpCountry, i);
            if (!culIsSetup)
            prepareCollectionIDs(culCollection, tmpCul, i);
            if (!relIsSetup)
            prepareCollectionIDs(relCollection, tmpRel, i);
            if (!relGenIsSetup)
            prepareCollectionIDs(relGenIdCollection, relGen[tmpRel][0], i);

        }

        if (!countryIsSetup)
        fillCollectionId(countryCollection, gActiveCouLabels, "co");
        if (!culIsSetup)
        fillCollectionId(culCollection, gActiveCulLabels, "cu");
        if (!relIsSetup)
        fillCollectionId(relCollection, gActiveRelLabels, "r");
        if (!relGenIsSetup)
        fillCollectionId(relGenIdCollection, gActiveRelGenLabels, "rg");

        countryIsSetup = true;
        culIsSetup = true;
        relIsSetup = true;
        relGenIsSetup = true;

    }


    switch (activeTextFeat) {
        case "country":
            activeTextLineFeature = gActiveCouLabels.selectAll("path");
            activeTextFeature0 = gActiveCouLabels.selectAll("text")
            gActiveCouLabels.attr("visibility", "visible");
            gActiveRelLabels.attr("visibility", "hidden");
            gActiveCulLabels.attr("visibility", "hidden");
            gActiveRelGenLabels.attr("visibility", "hidden");
            gActiveLabels = gActiveCouLabels;

            break;
        case "culture":
            activeTextLineFeature = gActiveCulLabels.selectAll("path");
            activeTextFeature0 = gActiveCulLabels.selectAll("text")
            gActiveCouLabels.attr("visibility", "hidden");
            gActiveRelLabels.attr("visibility", "hidden");
            gActiveCulLabels.attr("visibility", "visible");
            gActiveRelGenLabels.attr("visibility", "hidden");
            gActiveLabels = gActiveCulLabels;

            break;
        case "religion":
            activeTextFeature0 = gActiveRelLabels.selectAll("text")
            activeTextLineFeature = gActiveRelLabels.selectAll("path");
            gActiveCouLabels.attr("visibility", "hidden");
            gActiveRelLabels.attr("visibility", "visible");
            gActiveCulLabels.attr("visibility", "hidden");
            gActiveRelGenLabels.attr("visibility", "hidden");
            gActiveLabels = gActiveRelLabels;

            break;


        case "religionGeneral":
            activeTextFeature0 = gActiveRelGenLabels.selectAll("text")
            activeTextLineFeature = gActiveRelGenLabels.selectAll("path");
            gActiveCouLabels.attr("visibility", "hidden");
            gActiveRelLabels.attr("visibility", "hidden");
            gActiveRelGenLabels.attr("visibility", "visible");
            gActiveCulLabels.attr("visibility", "hidden");
            gActiveLabels = gActiveRelGenLabels;

            break;
        case "none":
            gActiveCouLabels.attr("visibility", "hidden");
            gActiveRelLabels.attr("visibility", "hidden");
            gActiveRelGenLabels.attr("visibility", "hidden");
            gActiveCulLabels.attr("visibility", "hidden");

            break;


    }
    activeLoaded = false;
    reset();
}

function reset() {


    var bounds = path.bounds(provinceCollection),
        topLeft = bounds[0],
        bottomRight = bounds[1];

    svgProv.attr("width", bottomRight[0] - topLeft[0])
        .attr("height", bottomRight[1] - topLeft[1])
        .style("left", topLeft[0] + "px")
        .style("top", topLeft[1] + "px");

    g00.attr("transform", "translate(" + -topLeft[0] + "," + -topLeft[1] + ")");


    activeAreaFeature.attr("d", path);

    if (map.getZoom() < 7) {

        gProvinceLabels.attr("visibility", "hidden")

        if (!activeLoaded) {
            activeLoaded = true;


        }


        activeTextLineFeature.attr("d",function (d) {
            var toReturn = "";

            var point1 = map.latLngToLayerPoint(new L.LatLng(d.geometry.coordinates[0][1], d.geometry.coordinates[0][0]));
            var point2 = map.latLngToLayerPoint(new L.LatLng(d.geometry.coordinates[1][1], d.geometry.coordinates[1][0]));
            var point3 = map.latLngToLayerPoint(new L.LatLng(d.geometry.coordinates[2][1], d.geometry.coordinates[2][0]));

            return 'M' + point1.x + ' ' + point1.y + 'Q' + point2.x + ' ' + point2.y + ' ' + point3.x + ' ' + point3.y;
        }).each(function () {
                this.__data__.totalLength = parseInt(this.getTotalLength());
            });


        activeTextFeature0.attr("font-size", function (d, i) {

            tmpSize = d.totalLength / (Math.sqrt(20 * Math.sqrt(d.properties.name.length)) * 1.4);

            if (tmpSize > 7)
                return tmpSize
            else return 0
        })

        if (activeTextFeat != "none") {
            gActiveLabels.attr("visibility", "visible");
        }

    }
    else if (map.getZoom() > 6) {

        gActiveLabels.attr("visibility", "hidden")

        if (!provinceLoaded) {
            provinceLoaded = true;

        }


        provinceTextLineFeature.attr("d",function (d) {
            var toReturn = "";

            var point1 = map.latLngToLayerPoint(new L.LatLng(d.geometry.coordinates[0][1], d.geometry.coordinates[0][0]));
            var point2 = map.latLngToLayerPoint(new L.LatLng(d.geometry.coordinates[1][1], d.geometry.coordinates[1][0]));
            var point3 = map.latLngToLayerPoint(new L.LatLng(d.geometry.coordinates[2][1], d.geometry.coordinates[2][0]));

            return 'M' + point1.x + ' ' + point1.y + 'Q' + point2.x + ' ' + point2.y + ' ' + point3.x + ' ' + point3.y;
        }).each(function () {
                this.__data__.totalLength = parseInt(this.getTotalLength());
            });


        provinceTextFeature0.attr("font-size", function (d, i) {

            tmpSize = d.totalLength / (Math.sqrt(19 * Math.sqrt(d.properties.name.length)) * 1.4);

            if (tmpSize > 7)
                return tmpSize;
            else return 0
        })

        if (activeTextFeat != "none") {
            gProvinceLabels.attr("visibility", "visible")
        }

        console.debug("FERTIG");

    }

}

function lockFeatureSelection() {

    if( $("#rulerTR td:eq(2)").css("display") !== "none" ){

        $("#lockIcon").removeClass("fa-lock")
        $("#lockIcon").addClass("fa-unlock-alt")

        $("#lockFeatureButton").attr("title","Select labels and area feature separately");

        $("#rulerTR td:eq(2)").css("display","none")
        $("#rulerTR td:eq(1)").attr("colspan","2")
        $("#rulerTR div:eq(0)").css("width","98px")

        $("#cultureTR td:eq(2)").css("display","none")
        $("#cultureTR td:eq(1)").attr("colspan","2")
        $("#cultureTR div:eq(0)").css("width","98px")

        $("#religionTR td:eq(2)").css("display","none")
        $("#religionTR td:eq(1)").attr("colspan","2")
        $("#religionTR div:eq(0)").css("width","98px")

        $("#mainreligionTR td:eq(2)").css("display","none")
        $("#mainreligionTR td:eq(1)").attr("colspan","2")
        $("#mainreligionTR div:eq(0)").css("width","98px")

        $("#populationTR td:eq(2)").css("display","none")
        $("#populationTR td:eq(1)").attr("colspan","2")
        $("#populationTR div:eq(0)").css("width","98px")

        $("#noneTR td:eq(2)").css("display","none")
        $("#noneTR td:eq(1)").attr("colspan","2")
        $("#noneTR div:eq(0)").css("width","98px")

        var textToIterate = ["T-Country","T-Culture","T-Religion","T-MainRel","T-Population"];
        var areaToIterate = ["A-Country","A-Culture","A-Religion","A-MainRel","A-Population"];

        for (var i=0; i<areaToIterate.length;i++){
            if($("#"+areaToIterate[i]).prop('checked') && !$("#"+textToIterate[i]).prop('checked')){
                if (textToIterate[i] === "T-Population"){
                    hideAndAdd("T-Population","none")
                }
                else{
                    $("#"+textToIterate[i]).parent().click();
                }

            }
        }
    }

    else {

        $("#lockIcon").removeClass("fa-unlock-alt")
        $("#lockIcon").addClass("fa-lock")
        $("#lockFeatureButton").attr("title","Always use labels of the area feature");

        $("#rulerTR td:eq(2)").css("display","block")
        $("#rulerTR td:eq(1)").attr("colspan","1")
        $("#rulerTR div:eq(0)").css("width","39px")

        $("#cultureTR td:eq(2)").css("display","block")
        $("#cultureTR td:eq(1)").attr("colspan","1")
        $("#cultureTR div:eq(0)").css("width","39px")

        $("#religionTR td:eq(2)").css("display","block")
        $("#religionTR td:eq(1)").attr("colspan","1")
        $("#religionTR div:eq(0)").css("width","39px")

        $("#mainreligionTR td:eq(2)").css("display","block")
        $("#mainreligionTR td:eq(1)").attr("colspan","1")
        $("#mainreligionTR div:eq(0)").css("width","39px")

        $("#populationTR td:eq(2)").css("display","block")
        $("#populationTR td:eq(1)").attr("colspan","1")
        $("#populationTR div:eq(0)").css("width","39px")

        

    }



};


function asyncCall(myUrl){

    $.ajax({
        url: myUrl,
        jsonp: "callback",
        dataType: "jsonp",

        success: function( response ) {

            var geoTagged=[];
            var bakedImages={};


            // blocking all cities and city likes 253019
            for (var i=0; i<response.props["31"].length && i<limit; i++){
                if (response.props["31"][i][2] == "515" ||
                    response.props["31"][i][2] == "253019"||
                    response.props["31"][i][2] == "2983893") blocklist.push(response.props["31"][i][0])
            }

            // baking imageMap
            for (var i=0; i<response.props["18"].length; i++){
                if (blocklist.indexOf(response.props["18"][i][0]) == -1){
                    imageMap[response.props["18"][i][0]] = response.props["18"][i][2]

                }
            }


            // gathering coordinates

            if (response.props["625"]){
                for (var i=0; i<response.props["625"].length && i<limit; i++){
                    if (blocklist.indexOf(response.props["625"][i][0]) == -1){
                        blocklist.push(response.props["625"][i][0])

                        $.ajax({
                            url: "//wikidata.org/w/api.php?action=wbgetentities&ids=Q"+response.props["625"][i][0]+"&props=sitelinks&languages=en&format=json",
                            jsonp: "callback",
                            dataType: "jsonp",
                            indexValue2: response.props["625"][i][0],
                            indexValue3: response.props["625"][i][2],
                            success: function( response2 ) {
                                var returningObj = {};
                                getObject(response2,returningObj)
                                appendImage(imageMap[this.indexValue2], this.indexValue3,returningObj.enwiki);
                            }
                        });
                    }
                }
            }

            if (response.props["276"]){
                // get 276
                for (var i=0; i<response.props["276"].length && i<limit; i++){
                    if (blocklist.indexOf(response.props["276"][i][0]) == -1){
                        blocklist.push(response.props["276"][i][0])

                        $.ajax({
                            url: "//wdq.wmflabs.org/api?q=ITEMS["+response.props["276"][i][2]+"]&props=625",
                            dataType: "jsonp",
                            indexValue: response.props["276"][i][0],
                            success: function( response ) {
                                if(response.props["625"] ){
                                    // console.log( "625 received", imageMap[this.indexValue], response.props["625"][0][2] );
                                    //		appendImage(imageMap[this.indexValue], response.props["625"][0][2]);

                                    $.ajax({
                                        url: "//wikidata.org/w/api.php?action=wbgetentities&ids=Q"+this.indexValue+"&props=sitelinks&languages=en&format=json",
                                        jsonp: "callback",
                                        dataType: "jsonp",
                                        indexValue2: this.indexValue,
                                        indexValue3: response.props["625"][0][2],
                                        success: function( response2 ) {
                                            var returningObj = {};
                                            getObject(response2,returningObj)
                                            appendImage(imageMap[this.indexValue2], this.indexValue3,returningObj.enwiki);
                                        }
                                    });
                                }
                            }
                        });

                    }
                }
            }
            if (response.props["19"]){
                // get 19
                for (var i=0; i<response.props["19"].length && i<limit; i++){
                    if (blocklist.indexOf(response.props["19"][i][0]) == -1){
                        blocklist.push(response.props["19"][i][0])

                        $.ajax({
                            url: "//wdq.wmflabs.org/api?q=ITEMS["+response.props["19"][i][2]+"]&props=625",
                            indexValue: response.props["19"][i][0],
                            dataType: "jsonp",

                            success: function( response ) {
                                if(response.props["625"] && response.props["625"][0]){
                                    // console.log( "!625 received",imageMap[this.indexValue], response.props["625"][0][2] );
                                    //appendImage(imageMap[this.indexValue], response.props["625"][0][2]);
                                    $.ajax({
                                        url: "//wikidata.org/w/api.php?action=wbgetentities&ids=Q"+this.indexValue+"&props=sitelinks&languages=en&format=json",
                                        jsonp: "callback",
                                        dataType: "jsonp",
                                        indexValue2: this.indexValue,
                                        indexValue3: response.props["625"][0][2],
                                        success: function( response2 ) {
                                            var returningObj = {};
                                            getObject(response2,returningObj)
                                            appendImage(imageMap[this.indexValue2], this.indexValue3,returningObj.enwiki);
                                        }
                                    });
                                }

                            }
                        });

                    }
                }
            }
            if (response.props["189"]){
                // get 189
                for (var i=0; i<response.props["189"].length && i<limit; i++){
                    if (blocklist.indexOf(response.props["189"][i][0]) == -1){
                        blocklist.push(response.props["189"][i][0])

                        $.ajax({
                            url: "//wdq.wmflabs.org/api?q=ITEMS["+response.props["189"][i][2]+"]&props=625",
                            indexValue: response.props["189"][i][0],
                            dataType: "jsonp",

                            success: function( response ) {
                                if(response.props["625"] && response.props["625"][0]){
                                    // console.log( "!625 received",imageMap[this.indexValue], response.props["625"][0][2] );
                                    //appendImage(imageMap[this.indexValue], response.props["625"][0][2]);
                                    $.ajax({
                                        url: "//wikidata.org/w/api.php?action=wbgetentities&ids=Q"+this.indexValue+"&props=sitelinks&languages=en&format=json",
                                        jsonp: "callback",
                                        dataType: "jsonp",
                                        indexValue2: this.indexValue,
                                        indexValue3: response.props["625"][0][2],
                                        success: function( response2 ) {
                                            var returningObj = {};
                                            getObject(response2,returningObj)
                                            appendImage(imageMap[this.indexValue2], this.indexValue3,returningObj.enwiki);
                                        }
                                    });
                                }

                            }
                        });

                    }
                }
            }

        }

    });

}

function updateGeoGallery (myStart,myEnd,scope){
    $('#geoGallery').empty();

    blocklist=[],
    imageMap={},
        
    asyncCall("//wdq.wmflabs.org/api?q=(BETWEEN[569,"+myStart+","+myEnd+"] OR BETWEEN[571,"+myStart+","+myEnd+"] OR BETWEEN[580,"+myStart+","+myEnd+"] OR BETWEEN[582,"+myStart+","+myEnd+"] OR BETWEEN[585,"+myStart+","+myEnd+"]) AND claim[18] AND claim[189] &props=31,18,189");
    asyncCall("//wdq.wmflabs.org/api?q=(BETWEEN[569,"+myStart+","+myEnd+"] OR BETWEEN[571,"+myStart+","+myEnd+"] OR BETWEEN[580,"+myStart+","+myEnd+"] OR BETWEEN[582,"+myStart+","+myEnd+"] OR BETWEEN[585,"+myStart+","+myEnd+"]) AND claim[18] AND claim[625] &props=31,18,625");
    asyncCall("//wdq.wmflabs.org/api?q=(BETWEEN[569,"+myStart+","+myEnd+"] OR BETWEEN[571,"+myStart+","+myEnd+"] OR BETWEEN[580,"+myStart+","+myEnd+"] OR BETWEEN[582,"+myStart+","+myEnd+"] OR BETWEEN[585,"+myStart+","+myEnd+"]) AND claim[18] AND claim[276] &props=31,18,276");
    asyncCall("//wdq.wmflabs.org/api?q=(BETWEEN[569,"+myStart+","+myEnd+"] OR BETWEEN[571,"+myStart+","+myEnd+"] OR BETWEEN[580,"+myStart+","+myEnd+"] OR BETWEEN[582,"+myStart+","+myEnd+"] OR BETWEEN[585,"+myStart+","+myEnd+"]) AND claim[18] AND claim[19] &props=31,18,19");


};

function appendImage(myImageId,myCoords,enwiki) {
    $.ajax({
        url: "//commons.wikimedia.org/w/api.php?action=query&titles=File%3A"+myImageId+"&prop=imageinfo&iiurlwidth=260&iiurlheight=400&iiprop=url%7Csize&format=json",
        dataType: "jsonp",

        success: function( response ) {
            //	console.log( "last response", response.query.pages );
            var buildingBlock={}
            getObject2(response.query.pages,buildingBlock);
            //	console.log( "!!! final:", myCoords, buildingBlock.thumb, buildingBlock.url );


            $( "#geoGallery" ).append( '<a  title="'+enwiki+' '+myCoords+'" href="'+buildingBlock.url+'" data-lightbox="geogal"><img class="singImage" src="'+buildingBlock.thumb+'"></a>' );


        }
    });
}

function getObject(theObject,returningObj) {
    var result = null;

    if(theObject instanceof Array) {
        for(var i = 0; i < theObject.length; i++) {
            result = getObject(theObject[i],returningObj);
            if (result) {
                break;
            }
        }
    }
    else
    {
        for(var prop in theObject) {
            if(prop == "enwiki")
                returningObj.enwiki=theObject[prop].title;

            if(prop == 'id') {
                if(theObject[prop] == 1) {
                    return theObject;
                }
            }
            if(theObject[prop] instanceof Object || theObject[prop] instanceof Array) {
                result = getObject(theObject[prop],returningObj);
                if (result) {
                    break;
                }
            }
        }
    }

    return result;
}


function getObject2(theObject,returningObj) {
    var result = null;

    if(theObject instanceof Array) {
        for(var i = 0; i < theObject.length; i++) {
            result = getObject2(theObject[i],returningObj);
            if (result) {
                break;
            }
        }
    }
    else
    {
        for(var prop in theObject) {
            //	console.debug(prop,theObject[prop]);
            if(theObject[prop] && theObject[prop].imageinfo && theObject[prop].imageinfo[0]  ){
                returningObj.thumb=theObject[prop].imageinfo[0].thumburl;
                returningObj.url=theObject[prop].imageinfo[0].url;
            }

            if(prop == 'id') {
                if(theObject[prop] == 1) {
                    return theObject;
                }
            }
            if(theObject[prop] instanceof Object || theObject[prop] instanceof Array) {
                result = getObject2(theObject[prop],returningObj);
                if (result) {
                    break;
                }
            }
        }
    }

    return result;
}


/*



 iconv -f ISO-8859-1 -t UTF-8 DL50.geojson >DL50b.geojson

 */

/**
 *
 *

 for (var it in x.features){
for (var cs in cols){

if (rgbToHex(parseInt(cols[cs][1]), parseInt(cols[cs][2]), parseInt(cols[cs][3])) == x.features[it].properties._storage_options.color){
x.features[it].properties.name = cols[cs][4];
}

}
}


 get adjacent

 var adjacentList = [];

 for (var i = 0; i < provinceCollection.features.length; i++) { 
adjacentList[i] = []
for (var j = 0; j < provinceCollection.features.length; j++) { 

if (i != j && contains3(provinceCollection.features[i].geometry.coordinates[0],provinceCollection.features[j].geometry.coordinates[0]))
adjacentList[i].push(j)

}
}

 */
