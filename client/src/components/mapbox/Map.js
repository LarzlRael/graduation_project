import { useState } from 'react';
import ReactMapGL, { Layer, Source } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const apykey = process.env.REACT_APP_MAPBOX_KEY;

export const Map = () => {
    const [viewport, setViewport] = useState({
        width: 400,
        height: 400,
        longitude: -66.2137434,
        latitude: -17.390915,
        zoom: 4.5
    });

    const geojson = {
        type: 'FeatureCollection',
        features: [
            { type: 'Feature', geometry: { type: 'Point', coordinates: [-122.4, 37.8] } }
        ]
    };

    const layerStyle = {
        id: 'point',
        type: 'circle',
        paint: {
            'circle-radius': 10,
            'circle-color': '#007cbf'
        }
    };

    return (
        <ReactMapGL
            mapboxApiAccessToken={apykey}
            {...viewport}
            onViewportChange={nextViewport => setViewport(nextViewport)}
        >
            <Source id="my-data" type="geojson" data={geojson}>
                <Layer {...layerStyle} />
            </Source>
        </ReactMapGL>
    );
}