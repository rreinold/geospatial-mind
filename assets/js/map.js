
console.log("Startup")
  mapboxgl.accessToken = 'pk.eyJ1IjoicnJlaW5vbGQiLCJhIjoiY2lwOTllOGQ2MDB4Y2VhbnJnMWtzcW9qaiJ9.1mNTDQ5rwabgUL9onzaLxg';
  console.log("Accesstoken set")
var mapStyle = {
    "version": 8,
    "sources": {
        "mapbox": {
            "type": "vector",
            "url": "mapbox://mapbox.mapbox-streets-v6"
        }
    },
    "glyphs": "mapbox://fonts/mapbox/{fontstack}/{range}.pbf",
    "layers": [
        {
            "id": "water",
            "source": "mapbox",
            "source-layer": "water",
            "type": "fill",
            "paint": {"fill-color": "#2c2c2c"}
        },
        {
            "id": "boundaries",
            "source": "mapbox",
            "source-layer": "admin",
            "type": "line",
            "paint": {"line-color": "#797979", "line-dasharray": [2, 2, 6, 2]},
            "filter": ["all", ["==", "maritime", 0]]
        },
        {
            "id": "overlay",
            "source": "overlay",
            "type": "raster",
            "paint": {"raster-opacity": 0.85}
        },
        {
            "id": "cities",
            "source": "mapbox",
            "source-layer": "place_label",
            "type": "symbol",
            "layout": {
                "text-field": "{name_en}",
                "text-font": ["DIN Offc Pro Bold", "Arial Unicode MS Bold"],
                "text-size": {"stops": [[4, 9], [6, 12]]}
            },
            "paint": {
                "text-color": "#969696",
                "text-halo-width": 2,
                "text-halo-color": "rgba(0, 0, 0, 0.85)"
            }
        },
        {
            "id": "states",
            "source": "mapbox",
            "source-layer": "state_label",
            "type": "symbol",
            "layout": {
                "text-transform": "uppercase",
                "text-field": "{name_en}",
                "text-font": ["DIN Offc Pro Bold", "Arial Unicode MS Bold"],
                "text-letter-spacing": 0.15,
                "text-max-width": 7,
                "text-size": {"stops": [[4, 10], [6, 14]]}
            },
            "filter": [">=", "area", 80000],
            "paint": {
                "text-color": "#969696",
                "text-halo-width": 2,
                "text-halo-color": "rgba(250, 0, 0, 0.85)"
            }
        }
    ]
};

console.log(mapStyle)

window.mapObj = new mapboxgl.Map({
    style: 'mapbox://styles/mapbox/light-v9',
    zoom: 4,
    pitch: 30,
    bearing: 0,
    hash: true,
    container: 'map',
    center: [-97.742815,30.268069], 
});


var modification = function(){
    console.log("executing modification")
    
    //window.mapObj.addControl(new mapboxgl.Navigation());
    
// Insert the layer beneath any symbol layer.
    var layers = window.mapObj.getStyle().layers.reverse();
    var labelLayerIdx = layers.findIndex(function (layer) {
        return layer.type !== 'symbol';
    });
    var labelLayerId = labelLayerIdx !== -1 ? layers[labelLayerIdx].id : undefined;
    window.mapObj.addLayer({
        'id': '3d-buildings',
        'source': 'composite',
        'source-layer': 'building',
        'filter': ['==', 'extrude', 'true'],
        'type': 'fill-extrusion',
        'minzoom': 15,
        'paint': {
            'fill-extrusion-color': '#aaa',
            'fill-extrusion-height': {
                'type': 'identity',
                'property': 'height'
            },
            'fill-extrusion-base': {
                'type': 'identity',
                'property': 'min_height'
            },
            'fill-extrusion-opacity': .6
        }
    }, labelLayerId);


 }
 
 window.setTimeout(modification, 1000)