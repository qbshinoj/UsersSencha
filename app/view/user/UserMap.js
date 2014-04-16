Ext.define('UM.view.user.UserMap', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.usermap',
	title : 'All Users',
	store : 'Users',
	initComponent : function() {
		map = new OpenLayers.Map('map');
		map.addControl(new OpenLayers.Control.LayerSwitcher());
		var osm = new OpenLayers.Layer.OSM();
		var toMercator = OpenLayers.Projection.transforms['EPSG:4326']['EPSG:3857'];
		var gphy = new OpenLayers.Layer.Google("Google Physical", {
			type : google.maps.MapTypeId.TERRAIN
		});
		var gmap = new OpenLayers.Layer.Google("Google Streets", // the default
		{
			numZoomLevels : 20
		});
		var ghyb = new OpenLayers.Layer.Google("Google Hybrid", {
			type : google.maps.MapTypeId.HYBRID,
			numZoomLevels : 20
		});

		map.addLayers([ gphy, gmap, ghyb ]);
		 /*
		 * Create 5 random vector features.  Your features would typically be fetched
		 * from the server. The features are given an attribute named "foo".
		 * The value of this attribute is an integer that ranges from 0 to 100.longitude,latitude
		 */
		var geocoder =  new google.maps.Geocoder();
	    address ="Mumbai";
	    var latitude;
	    var longitude;
	    geocoder.geocode( { 'address': address}, function(results, status) {
	          if (status == google.maps.GeocoderStatus.OK) {
	            latitude = results[0].geometry.location.lat();
	            longitude = results[0].geometry.location.lng();
	            var center = toMercator(new OpenLayers.Geometry.Point(longitude,latitude));	            
	           console.log(center);
	            /* var markers = new OpenLayers.Layer.Markers( "Markers" );
	            map.addLayer(markers);
	            var size = new OpenLayers.Size(21,25);
	            var offset = new OpenLayers.Pixel(-(size.w/2), -size.h);
	            var icon = new OpenLayers.Icon('http://www.openlayers.org/dev/img/marker.png',size,offset);
	            markers.addMarker(new OpenLayers.Marker(new OpenLayers.LonLat(center.x,center.y)),icon);*/
	            
	            map.setCenter(new OpenLayers.LonLat(center.x,center.y),10);
	            
	            //Creating nodes
	            var features = [];
	    		features[0] =new OpenLayers.Feature.Vector(
	    		        new OpenLayers.Geometry.Point(center.x,center.y),{
							foo : 100 * Math.random() | 0
						}, {
							id :"node1",
	    		        	fillColor : 'red',
							fillOpacity : 0.5,
							strokeColor : "white",
							strokeOpacity : 1,
							strokeWidth : 2,
							pointRadius : 10,
	    				}
	    				);
	    		features[1] =new OpenLayers.Feature.Vector(
	    		        new OpenLayers.Geometry.Point(8933342.714689014,1466636.1849701507),{
							foo : 100 * Math.random() | 0
						}, {
							id :"node2",
	    		        	fillColor : 'red',
							fillOpacity : 0.5,
							strokeColor : "white",
							strokeOpacity : 1,
							strokeWidth : 2,
							pointRadius : 10
	    				}
	    				);
	    		
	    		//creating a link to connect nodes
	    		 var lineLayer = new OpenLayers.Layer.Vector("Line Layer");
	    		 map.addLayer(lineLayer); 
	    		 map.addControl(new OpenLayers.Control.DrawFeature(lineLayer, OpenLayers.Handler.Path));
	    		 var points = new Array(
	  				   new OpenLayers.Geometry.Point(center.x,center.y),
	  				   new OpenLayers.Geometry.Point(8933342.714689014,1466636.1849701507)
	  				);
	    		 var line = new OpenLayers.Geometry.LineString(points);
	    		 var style = { 
	   				  strokeColor: '#0000ff', 
	   				  strokeOpacity: 0.5,
	   				  strokeWidth: 5
	   				};
   				var lineFeature = new OpenLayers.Feature.Vector(line, null, style);
   				lineLayer.addFeatures([lineFeature]);
   				
		    	// create the layer with listeners to create and destroy popups
   				var vector = new OpenLayers.Layer.Vector("Points", {
   					eventListeners : {
   						'featureselected' : function(evt) {
	   						 var tooltips = [{
	   				            target: evt.feature.geometry.id,
	   				            text    : 'Basic ToolTip',
	   				            renderTo: 'easiest'
	   				         }];
	   						 Ext.each(tooltips, function(config) {
	   					        Ext.create('Ext.tip.ToolTip', config);
	   						 });  
	   					     Ext.QuickTips.init();
   						}
   					}
   				});
		    	vector.addFeatures(features);
		    	// create the select feature control
		    	var selector = new OpenLayers.Control.SelectFeature(vector, {
		    		hover : true,
		    		autoActivate : true
		    	});
		    	map.addLayers([ osm, vector ]);
		    	map.addControl(selector);
	
		          }
		    });
	}
});