import { useContext, useEffect } from "react";
import MapContext from "../Map/MapContext";
import OLVectorLayer from "ol/layer/Vector";
import Overlay from "ol/Overlay.js";
import ReactDOM from 'react-dom'
const VectorLayer = ({ source, style, zIndex = 0 }) => {
	const { map } = useContext(MapContext);

	useEffect(() => {
		console.log(source)
		if (!map) return;

		let vectorLayer = new OLVectorLayer({
			source,
			style
		});


		
		map.addLayer(vectorLayer);
		vectorLayer.setZIndex(zIndex);

	  
		
		return () => {
			if (map) {
				map.removeLayer(vectorLayer);
			}
		};
	}, [map,source]);

	return null;
};

export default VectorLayer;