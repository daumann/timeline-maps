$(function() {
    // Get start/end times

    // Set timeline options
    var timelineOptions = {
        "width":  "100%",
        "height": "120px",
        "style": "box",
        "axisOnTop": true,
        "showCustomTime":true
    };

    


    var startTime = new Date(); //demoTracks[0].properties.time[0]
    var endTime = new Date(demoTracks[0].properties.time[demoTracks[0].properties.time.length - 1]);

    // Create a DataSet with data
    var timelineData = new vis.DataSet([{ start: startTime, end: startTime, content: 'Test interval' }]);


    // Setup timeline
    var timeline = new vis.Timeline(document.getElementById('timeline'), timelineData, timelineOptions);// timelineData, timelineOptions);
        
    // Set custom time marker (blue)
    timeline.setCustomTime(startTime);
/*
    // Setup leaflet map
    var map = new L.Map('map');

    var basemapLayer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
				'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
				'Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom : 18,
        id: 'examples.map-i86knfo3'
    });

    // Center map and default zoom level
    map.setView([44.61131534, -123.4726739], 9);

    // Adds the background layer to the map
    map.addLayer(basemapLayer);
*/
    
    // =====================================================
    // =============== Playback ============================
    // =====================================================
    
    // Playback options
    var playbackOptions = {

        playControl: true,
        dateControl: true,
        
        // layer and marker options
        layer : {
            pointToLayer : function(featureData, latlng){
                var result = {};
                
                if (featureData && featureData.properties && featureData.properties.path_options){
                    result = featureData.properties.path_options;
                }
                
                if (!result.radius){
                    result.radius = 5;
                }
                
                return new L.CircleMarker(latlng, result);
            }
        },
        
        marker: { 
            getPopup: function(featureData){
                var result = '';
                
                if (featureData && featureData.properties && featureData.properties.title){
                    result = featureData.properties.title;
                }
                
                return result;
            }
        }
        
    };
        
    // Initialize playback
    var playback = new L.Playback(map, demoTracks, onPlaybackTimeChange, playbackOptions);
    
    playback.setData(demoTracks);    
    //playback.addData(blueMountain);

    // Uncomment to test data reset;
    //playback.setData(blueMountain);    
    
    // Set timeline time change event, so cursor is set after moving custom time (blue)
    timeline.on('timechange', onCustomTimeChange);
    timeline.on(this._slider, 'mousemove', onSliderChange, this);

    // A callback so timeline is set after changing playback time
    function onPlaybackTimeChange (ms) {
        //   console.debug(ms);
        timeline.setCustomTime(new Date(ms));
    };

    function onSliderChange(e) {
        //    console.debug("onSliderChange",e);
        var val = Number(e.target.value);
        playback.setCursor(val);
    }
    
    // 
    function onCustomTimeChange(properties) {
        //     console.debug(properties);
        if (!playback.isPlaying()){
            playback.setCursor(properties.time.getTime());
        }        
    }

/*
    timeline.on('rangechange', function (properties) {
        console.debug("1");
        logEvent('rangechange', properties);
    });
    timeline.on('rangechanged', function (properties) {
        console.debug("2");
        logEvent('rangechanged', properties);
    });
    timeline.on('select', function (properties) {
        console.debug("3");
        logEvent('select', properties);
    });

    
    function logEvent(event, properties) {
        console.debug( 'event=' + JSON.stringify(event) + ', ' +
            'properties=' + JSON.stringify(properties));
       
    }
    
*/
    
});
