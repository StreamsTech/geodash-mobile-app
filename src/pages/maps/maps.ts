import { Component, AfterViewInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
@Component({
    selector: 'page-maps',
    templateUrl: 'maps.html',
})
export class MapsPage {
    public isButtonHidden: any = true;
    constructor() { }

    ngOnInit() {

        let bangladeshLonLat = [90.35633099999995, 23.684994];

        bangladeshWebMercator = ol.proj.fromLonLat(bangladeshLonLat);

        map = getMap();

        let vectorLayer = new ol.layer.Vector({
            source: vectorSource
        });
        map.addLayer(vectorLayer);

        map.on('click', function (evt) {
            if (startPointDefiend)
                destinationPointClickedAction(evt);
            else
                startPointClickedAction(evt);
        });
    }

    displayRoute() {
        if (startPoiint && endPoint) {
            addRoutePlyLine(startPoiint, endPoint);
            startPoiint = endPoint = undefined;
        }
    }
}


declare let ol: any;
declare let google: any;
let startPoiint;
let endPoint;
let startPointDefiend = false;
let endPointDefined = false;
let vectorSource = new ol.source.Vector();
let map;
let routeFeature;
let bangladeshWebMercator;

function AddMoveInteraction(feature, pointName) {
    var modify = new ol.interaction.Modify({
        features: new ol.Collection([feature])
    });

    feature.on('change', function () {
        if (pointName == "Source") {
            startPoiint = this.getGeometry().getCoordinates();
        } else {
            endPoint = this.getGeometry().getCoordinates();
        }

    }, feature);
    map.addInteraction(modify);
}

function addRoutePlyLine(startPoiint, endPoint) {
    let origin = ol.proj.transform(startPoiint, 'EPSG:3857', 'EPSG:4326');
    let destination = ol.proj.transform(endPoint, 'EPSG:3857', 'EPSG:4326');
    let directionsService = new google.maps.DirectionsService();
    let request = getDirectionServiceRequest(origin, destination, 'DRIVING');
    directionsService.route(request, function (response, status) {
        if (status == 'OK') {
            drawRoute(response);
        } else {
            console.log("No route found");
        }
    });

}


function getDirectionServiceRequest(origin, destination, travelMode) {
    return {
        origin: new google.maps.LatLng(origin[1], origin[0]),
        destination: new google.maps.LatLng(destination[1], destination[0]),
        travelMode: travelMode
    };
}

function addMarker(coordinate, textLabel) {
    let feature = new ol.Feature(new ol.geom.Point(coordinate));
    feature.setStyle(getSourceStyle(textLabel));
    vectorSource.addFeature(feature);
    return feature;

}

function drawRoute(response) {
    let polyline = response.routes[0].overview_polyline;
    let route = /** @type {ol.geom.LineString} */ (new ol.format.Polyline({
        factor: 1e5
    }).readGeometry(polyline, {
        dataProjection: 'EPSG:4326',
        featureProjection: 'EPSG:3857'
    }));
    routeFeature = new ol.Feature({
        type: 'route',
        geometry: route
    });

    setRouteStyle();
    vectorSource.addFeature(routeFeature);

}

function setRouteStyle() {
    routeFeature.setStyle(new ol.style.Style({
        stroke: new ol.style.Stroke({
            width: 6, color: [255, 0, 0, 0.8]
        })
    }));
}

function startPointClickedAction(evt) {
    endPointDefined = false;
    vectorSource.clear();
    startPointDefiend = true;
    startPoiint = evt.coordinate;

    let feature = addMarker(evt.coordinate, "Source");
    AddMoveInteraction(feature, "Source");
}

function destinationPointClickedAction(evt) {
    startPointDefiend = false;
    endPointDefined = true;
    endPoint = evt.coordinate;

    let feature = addMarker(evt.coordinate, "Destination");
    AddMoveInteraction(feature, "Destination");
}

function getView(webMercator, zoomLabel) {
    return new ol.View({
        center: webMercator,
        zoom: zoomLabel
    });
}

function getMapTitle() {
    return new ol.layer.Tile({
        source: new ol.source.OSM()
    });
}
function getMapControls() {
    return ol.control.defaults({
        attributionOptions: ({
            collapsible: false
        })
    });
}

function getMap() {
    return new ol.Map({
        target: 'map',
        layers: [getMapTitle()],
        controls: getMapControls(),
        view: getView(bangladeshWebMercator, 7)
    });
}

function getSourceStyle(textLabel) {

    let sourceStyle = new ol.style.Style({
        image: getIconStyle(),
        text: getTextStyle(textLabel)
    });
    return sourceStyle;
}

function getTextStyle(label) {
    return new ol.style.Text({
        font: '12px Calibri,sans-serif',
        fill: new ol.style.Fill({ color: '#000' }),
        stroke: new ol.style.Stroke({
            color: '#fff', width: 2
        }),
        padding: [0, 0, 0, 0],
        text: label
    })
}

function getIconStyle() {
    return new ol.style.Icon({
        anchor: [15, 10],
        anchorXUnits: 'pixels',
        anchorYUnits: 'pixels',
        opacity: 0.75,
        src: 'assets/marker.png',
        size: [50, 50]
    })
}