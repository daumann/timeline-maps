function  openfullWidth(){
    $('#chronasWiki').hide();
    var tmpSource =  $("iframe")[0].src;
    
   // $("iframe")[0].src = "http://www.google.be";
    
    console.debug("source now: ",$("iframe")[0].src )
    
 //   $('#chronasWiki').hide();
    if ($("#storage-ui-container")[0].style.width != "100%"){
        
        $("#storage-ui-container")[0].style.padding = "0 0px 23px 0px";
        $("iframe")[0].style.width = "100%";
               
        console.debug("source now: ",$("iframe")[0].src )
        $("iframe")[0].src = tmpSource + "?printable=yes";
        $("#storage-ui-container")[0].style.width = "100%";
        $("#map")[0].style.display = "none";
        $(".fullWidth")[0].innerHTML = "Half width";

        $('#chronasWiki').load(function(){
            $('#chronasWiki').show();
            
        });
        

        

    }
    else{

        $("#storage-ui-container")[0].style.padding = "0 20px 23px 20px";
        $("iframe")[0].style.width = "calc(100% - 20px)";
        
        $("iframe")[0].src = tmpSource.replace("?printable=yes","");
        $("#storage-ui-container")[0].style.width = "50%";
        $("#map")[0].style.display = "block";
        $(".fullWidth")[0].innerHTML = "Full width";
        $('#chronasWiki').load(function(){

            $('#chronasWiki').show();
            
        });
        
        
        
    }
    
}


L.S.Popup = L.Popup.extend({

    options: {
        parseTemplate: true
    },

    initialize: function (feature) {
        console.debug("!!!!!!! initializing feature: ",feature)
        this.feature = feature;
        this.container = L.DomUtil.create('div', 'storage-popup');
        this.format();
        L.Popup.prototype.initialize.call(this, {}, feature);
        this.setContent(this.container);
    },

    hasFooter: function () {
        return this.feature.hasPopupFooter();
    },

    renderTitle: function () {},

    renderBody: function () {
        console.debug("!!! rendering Body!");

        $(".leaflet-top.leaflet-right")[0].style.display = "none";
        
        
        var template = this.feature.getOption('popupContentTemplate'),
            container = L.DomUtil.create('div', ''),
            content, properties, center = this.feature.getCenter();
        
        
        
        
        if (this.options.parseTemplate) {
            
            // Include context properties
            properties = {
                lat: center.lat,
                lon: center.lng,
                lng: center.lng
            };
            if (typeof this.feature.getMeasure !== 'undefined') {
                properties.measure = this.feature.getMeasure();
            }
            properties = L.extend(properties, this.feature.properties);
            // Resolve properties inside description
            properties.description = L.Util.greedyTemplate(this.feature.properties.description || '', properties);
            content = L.Util.greedyTemplate(template, properties);
            console.debug("inside ha:", content, properties.description);
            
            if(properties){
                if (properties.description.substring(0,11) == "chronasYear"){
                    content = "WikiYear://en.wikipedia.org/wiki/"+properties.description.substr(11)+"?printable=yes loading year "+properties.description.substr(11);
                }
            }
        }
        content = L.Util.toHTML(content);
        console.debug("content received:", content);
        container.innerHTML = content;
        var els = container.querySelectorAll('img,iframe');
        
        for (var i = 0; i < els.length; i++) {
            this.onElementLoaded(els[i]);
        }
        if (container.textContent.replace('\n', '') === '') {
            container.innerHTML = '';
            L.DomUtil.add('h3', '', container, this.feature.getDisplayName());
        }
        
        console.debug(content,properties, "!iframe",$('#chronasWiki'));
/*
        if($('#chronasWiki') != []){
            $('#chronasWiki').on('load', function () {
                console.debug("inside load finish");
                $('#loader1').hide();
                $('#chronasWiki').show();
            });
        }
        */
        
        return container;
    },

    renderFooter: function () {
        if (this.hasFooter()) {
            var footer = L.DomUtil.create('ul', 'storage-popup-footer', this.container),
                previous_li = L.DomUtil.create('li', 'previous', footer),
                zoom_li = L.DomUtil.create('li', 'zoom', footer),
                next_li = L.DomUtil.create('li', 'next', footer),
                next = this.feature.getNext(),
                prev = this.feature.getPrevious();
            if (next) {
                next_li.title = L._('Go to «{feature}»', {feature: next.properties.name});
            }
            if (prev) {
                previous_li.title = L._('Go to «{feature}»', {feature: prev.properties.name});
            }
            zoom_li.title = L._('Zoom to this feature');
            L.DomEvent.on(next_li, 'click', function () {
                if (next) {
                    next.bringToCenter({zoomTo: next.getOption('zoomTo')}, function () {next.view(next.getCenter());});
                }
            });
            L.DomEvent.on(previous_li, 'click', function () {
                if (prev) {
                    prev.bringToCenter({zoomTo: prev.getOption('zoomTo')}, function () {prev.view(prev.getCenter());});
                }
            });
            L.DomEvent.on(zoom_li, 'click', function () {
                this.bringToCenter({zoomTo: this.getOption('zoomTo')});
            }, this.feature);
        }
    },

    format: function () {
        var title = this.renderTitle();
        if (title) {
            this.container.appendChild(title);
        }
        var body = this.renderBody();
        
        console.debug("!!", this.container, body);
        
        if (body) {
            L.DomUtil.add('div', 'storage-popup-content', this.container, body);
        }
        this.renderFooter();
    },

    onElementLoaded: function (el) {
        L.DomEvent.on(el, 'load', function () {
            this._updateLayout();
            this._updatePosition();
            this._adjustPan();
        }, this);
    }

});

L.S.Popup.Large = L.S.Popup.extend({
    options: {
        maxWidth: 500,
        className: 'storage-popup-large'
    }
});

L.S.Popup.BaseWithTitle = L.S.Popup.extend({

    renderTitle: function () {
        var title;
        if (this.feature.getDisplayName()) {
            title = L.DomUtil.create('h3', 'popup-title');
            title.innerHTML = L.Util.escapeHTML(this.feature.getDisplayName());
        }
        return title;
    }

});

L.S.Popup.Table = L.S.Popup.BaseWithTitle.extend({

    formatRow: function (key, value) {
        if (value.indexOf('http') === 0) {
            value = '<a href="' + value + '" target="_blank">' + value + '</a>';
        }
        return value;
    },

    addRow: function (container, key, value) {
        var tr = L.DomUtil.create('tr', '', container);
        L.DomUtil.add('th', '', tr, key);
        L.DomUtil.add('td', '', tr, this.formatRow(key, value));
    },

    renderBody: function () {
        var table = L.DomUtil.create('table');

        for (var key in this.feature.properties) {
            if (typeof this.feature.properties[key] === 'object' || key === 'name') {
                continue;
            }
            // TODO, manage links (url, mailto, wikipedia...)
            this.addRow(table, key, L.Util.escapeHTML(this.feature.properties[key]).trim());
        }
        return table;
    }

});

L.S.Popup.table = L.S.Popup.Table;  // backward compatibility

L.S.Popup.GeoRSSImage = L.S.Popup.BaseWithTitle.extend({

    options: {
        minWidth: 300,
        maxWidth: 500,
        className: 'storage-popup-large storage-georss-image'
    },

    renderBody: function () {
        var container = L.DomUtil.create('a');
        container.href = this.feature.properties.link;
        container.target = '_blank';
        if (this.feature.properties.img) {
            var img = L.DomUtil.create('img', '', container);
            img.src = this.feature.properties.img;
            // Sadly, we are unable to override this from JS the clean way
            // See https://github.com/Leaflet/Leaflet/commit/61d746818b99d362108545c151a27f09d60960ee#commitcomment-6061847
            img.style.maxWidth = this.options.maxWidth + 'px';
            img.style.maxHeight = this.options.maxWidth + 'px';
            this.onElementLoaded(img);
        }
        return container;
    }

});

L.S.Popup.GeoRSSLink = L.S.Popup.extend({

    options: {
        className: 'storage-georss-link'
    },

    renderBody: function () {
        var title = this.renderTitle(this),
            a = L.DomUtil.add('a');
        a.href = this.feature.properties.link;
        a.target = '_blank';
        a.appendChild(title);
        return a;
    }
});


L.S.Popup.SimplePanel = L.S.Popup.extend({

    allButton: function () {
        console.debug("L.S.Popup.SimplePanel allButton")
        
        var button = L.DomUtil.create('li', '');
        
        L.DomUtil.create('i', 'storage-icon-16 storage-list', button);
        var label = L.DomUtil.create('span', '', button);
        label.innerHTML = label.title = L._('See all (will move)');
        
        L.DomEvent.on(button, 'click', this.feature.map.openBrowser, this.feature.map);
        return button;
    },
    allButton2: function () {
        console.debug("L.S.Popup.SimplePanel allButton")

        if($($(this)[0].container).find("iframe").length  != 0){
        var button2 = L.DomUtil.create('li', '');
        L.DomUtil.create('i', 'chronas-icon-1 storage-fullWidth', button2);
        var label2 = L.DomUtil.create('span', 'fullWidth', button2);
        label2.innerHTML = label2.title = L._('Full width');
      //  label2.id = "fullWidth";
        
        L.DomEvent.on(button2, 'click', openfullWidth );
        return button2;
        }
        else
            return null;
    },
    
    allButton3: function () {

        if($($(this)[0].container).find("iframe").length  != 0){
            var button3 = L.DomUtil.create('li', '');
            L.DomUtil.create('i', 'chronas-icon-2 storage-GoToWikipedia', button3);
            var label3 = L.DomUtil.create('a', 'GoToWikipedia', button3);
          //  label3.id = "GoToWikipedia";
            label3.innerHTML = label3.title = L._('View on Wikipedia');
            label3.href = $($(this)[0].container).find("iframe")[0].src.replace("?printable=yes","");
            label3.target = "_blank";
        //    L.DomEvent.on(button3, 'click',  goToWikipedia);
            
            return button3;
        }
        else
        return null;
    },

    update: function () {
        
        if(this.allButton3() != null )
        {
        L.S.fire('ui:start', {data: {html: this._content}, actions: [this.allButton(),this.allButton3(),this.allButton2()]});
        }
        else
            L.S.fire('ui:start', {data: {html: this._content}, actions: [this.allButton()]});
        
    },

    onRemove: function (map) {
        L.S.fire('ui:end');
        L.S.Popup.prototype.onRemove.call(this, map);
    },

    _initLayout: function () {this._container = L.DomUtil.create('span');},
    _updateLayout: function () {},
    _updatePosition: function () {},
    _adjustPan: function () {}
});
