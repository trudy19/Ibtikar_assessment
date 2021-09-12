import React, { useRef, useState, useEffect } from "react"
import "./Map.css";
import MapContext from "./MapContext";
import * as ol from "ol";
import Overlay from "ol/Overlay.js";
import ReactDOM from 'react-dom'
import $ from 'jquery';
import { Tooltip } from 'react-bootstrap';

const Map = ({ children, zoom, center, activebuilding, activeCountry }) => {
	const mapRef = useRef();
	const [map, setMap] = useState(null);

	// on component mount
	useEffect(() => {
		let options = {
			view: new ol.View({ zoom, center }),
			layers: [],
			controls: [],
			overlays: []
		};

		let mapObject = new ol.Map(options);
		mapObject.setTarget(mapRef.current);
		setMap(mapObject);

		return () => mapObject.setTarget(undefined);
	}, []);

	// zoom change handler
	useEffect(() => {
		if (!map) return;

		map.getView().setZoom(zoom);
	}, [zoom]);

	// center change handler
	useEffect(() => {
		if (!map) return;

		map.getView().setCenter(center)





	}, [center])





	const [tooltipOpen, setTooltipOpen] = useState(false);
	const [text, setText] = useState();

	const toggle = () => setTooltipOpen(!tooltipOpen);

	const tooltips = $('#tooltip');

	const displayFeatureInfo = function (pixel) {
		tooltips.css({
			left: pixel[0] + 'px',
			top: pixel[1] - 15 + 'px',
		});

		const feature = map.forEachFeatureAtPixel(pixel, function (feature) {
			return feature;
		});

		if (activeCountry && feature) {
			if (feature.id_ == activeCountry) {

				tooltips.show();
				setText(activebuilding.buildingname + ' located in ' + JSON.parse(activebuilding.country).name);

			} else {
				tooltips.hide();
			}
		}
	};


	// center change handler
	useEffect(() => {
		if (!map) return;

		map.on('pointermove', function (evt) {
			if (evt.dragging) {
				tooltips.hide();
				return;
			}
			displayFeatureInfo(map.getEventPixel(evt.originalEvent));
		});

	})



	return (
		<MapContext.Provider value={{ map }}>
		
			<div ref={mapRef} className="ol-map">
				{children}
				<Tooltip id="tooltip" placement="auto" isOpen={tooltipOpen} target="TooltipExample"
				toggle={toggle}>
				{text}
			</Tooltip>
			</div>
		</MapContext.Provider>
	)
}

export default Map;