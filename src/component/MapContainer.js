import React, { useState, useEffect, } from "react";
import Map from "../Map";
import { Layers, TileLayer, VectorLayer } from "../Layers";
import { Style, Icon } from "ol/style";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { osm, vector } from "../Source";
import { fromLonLat, get } from "ol/proj";
import GeoJSON from "ol/format/GeoJSON";
import FeatureStyles from "../Features/Styles";
import mapConfig from "../config.json";
import countries from "../Layers/countriesList.json";
import FormGroup from '@material-ui/core/FormGroup';
import { useDispatch, useSelector } from 'react-redux'
import { Tooltip } from '@material-ui/core';

import { BUILDING_CLEAN} from "../Redux/types";


//let markersLonLat=[]


const geojsonObject = mapConfig.geojsonObject;

/*
function addMarkers(lonLatArray) {

  let country =JSON.parse(lonLatArray.country);
  var iconStyle = new Style({
    image: new Icon({
      anchorXUnits: "fraction",
      anchorYUnits: "pixels",
      src: mapConfig.markerImage32,
    }),
  });
    markersLonLat = [country.position[0],country.position[1]];
  console.log(markersLonLat)

  let feature = new Feature({
    geometry: new Point(fromLonLat([-94.579228, 39.135386])),
  });
  feature.setStyle(iconStyle);
  console.log(feature)


  return feature;
}
*/



const  markersLonLat = [mapConfig.kansasCityLonLat];
function addMarkers(lonLatArray) {
  var iconStyle = new Style({
    image: new Icon({
      anchorXUnits: "fraction",
      anchorYUnits: "pixels",
      
      src: mapConfig.markerImage32,
    }),
  });
  let features = lonLatArray.map((item) => {
    let feature = new Feature({
      geometry: new Point(fromLonLat(item)),
    });
    feature.setStyle(iconStyle);
    return feature;
  });
  console.log(features)
  return features;
}

export default function MapContainer (props)  {
    const [center, setCenter] = useState(mapConfig.center);
    const [zoom, setZoom] = useState(5);
  
    const [showMarker, setShowMarker] = useState(false);
    //const [feature, setFeature] = useState();
    const [features, setFeatures] = useState();
    const[activebuilding,setActivebuilding]=useState();
const[coordinates,setCoordinate]=useState()
    const dispatch = useDispatch();

    const temp = useSelector(state => state.buildings);
    const {BuildingList, success,loading} = temp;

      useEffect(async()=>{

          if(props.location.loading!=true&&props.location.myCustomProps){
            setActivebuilding(props.location.myCustomProps)

            let country =JSON.parse(props.location.myCustomProps.country);
            let id =country.id
            console.log(id)
             setCoordinate(await mapConfig.geojsonObject.features.find(item=>item.id==id));
            console.log(coordinates)
            let     markersLon = [country.position[1],country.position[0]];
            
            markersLonLat[0]=markersLon
            setCenter(markersLon)

          setFeatures(addMarkers(markersLonLat)) 
          }
          else{
            props.history.push({            pathname: "/",
            });
    
        
          }
       
          },[props.location.myCustomProps,BuildingList]);
          useEffect(()=>{
console.log('updating' )
         
            },[features,activebuilding,markersLonLat]);
      
    return (
        <div className="column">

            <div className="equalHeight">
        <Map center={fromLonLat(center)} zoom={zoom}>
        <Layers>
          <TileLayer source={osm()} zIndex={0} />
          <VectorLayer
            source={vector({

              features: new GeoJSON().readFeatures(geojsonObject, {
                featureProjection: get("EPSG:3857"),
              }),
            })}
            style={FeatureStyles.MultiPolygon}
          />

          <VectorLayer
            source={vector({
              features: new GeoJSON().readFeatures(coordinates?coordinates:{ "type": "Feature", "id": "ZWE", "properties": { "name": "Zimbabwe" }, "geometry": { "type": "Polygon", "coordinates": [[[31.191409, -22.25151], [30.659865, -22.151567], [30.322883, -22.271612], [29.839037, -22.102216], [29.432188, -22.091313], [28.794656, -21.639454], [28.02137, -21.485975], [27.727228, -20.851802], [27.724747, -20.499059], [27.296505, -20.39152], [26.164791, -19.293086], [25.850391, -18.714413], [25.649163, -18.536026], [25.264226, -17.73654], [26.381935, -17.846042], [26.706773, -17.961229], [27.044427, -17.938026], [27.598243, -17.290831], [28.467906, -16.4684], [28.825869, -16.389749], [28.947463, -16.043051], [29.516834, -15.644678], [30.274256, -15.507787], [30.338955, -15.880839], [31.173064, -15.860944], [31.636498, -16.07199], [31.852041, -16.319417], [32.328239, -16.392074], [32.847639, -16.713398], [32.849861, -17.979057], [32.654886, -18.67209], [32.611994, -19.419383], [32.772708, -19.715592], [32.659743, -20.30429], [32.508693, -20.395292], [32.244988, -21.116489], [31.191409, -22.25151]]] } }
                , {
                  featureProjection: get("EPSG:3857"),
                }),
            })}
            style={FeatureStyles.color}
          /><div>
          {( features!=null) ? <div><h4>Selected building {activebuilding.buildingname} Map view</h4>
          <VectorLayer source={vector({ features })} /></div>:<div>loading</div>
          }
          </div>
        </Layers>

      </Map>
</div>
</div>
    );
};

