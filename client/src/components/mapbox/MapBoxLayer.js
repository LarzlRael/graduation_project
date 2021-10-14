import { useState, useEffect, useRef } from "react";
import mapboxgl from 'mapbox-gl';
import axios from 'axios';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@material-ui/core";
import { CircularProgress } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { getRankDate } from "../../utils/utils";

const departametsArray = [
    'La Paz',
    'Oruro',
    'Potosi',
    'Tarija',
    'Chuquisica',
    'Cochabamba',
    'Beni',
    'Pando',
    'Santa Cruz',
];

export const MapBoxLayer = () => {

    //Assign the Mapbox token from the environment variable set in .env
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;

    const mapContainer = useRef(null);

    const [longLat, setLongLat] = useState({
        long: -66.2137434,
        lat: -17.390915,
    });


    const [hoveredDistrict, _setHoveredDistrict] = useState(null);
    const hoveredDistrictRef = useRef(hoveredDistrict);
    const setHoveredDistrict = (data) => {
        hoveredDistrictRef.current = data;
        _setHoveredDistrict(data);
    };

    const [zoom, setZoom] = useState(4.8);
    const [loading, setLoading] = useState(false);
    const [selecteDepartament, setSelecteDepartament] = useState(departametsArray[0]);
    const [selectedDate, setSelectedDay] = useState({
        selectedDate: new Date(),
        rank: '123',
    });



    const showMapBoxMap = async (data) => {

        let map = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/light-v10",
            center: [longLat.long, longLat.lat],
            zoom: zoom
        });
        // Add zoom and rotation controls to the map.
        map.addControl(new mapboxgl.NavigationControl());

        map.once("load", function () {

            map.addSource('points', {
                type: 'geojson',
                data: data,
                /* cluster: selecteDepartament === 'Santa Cruz' || 'Beni' || 'Pando' ? false : true, */

            });

            map.addLayer({
                'id': 'district-layer',
                'type': 'circle', // <== !important
                'source': 'points',
                'layout': {},
                'paint': {}
            });

            map.on('mousemove', 'district-layer', function (e) {
                if (e.features.length > 0) {
                    if (hoveredDistrictRef.current && hoveredDistrictRef.current > -1) {

                        map.setFeatureState(
                            { source: 'district-source', id: hoveredDistrictRef.current },
                            { hover: false }
                        );
                    }

                    let _hoveredDistrict = e.features[0].id;

                    map.setFeatureState(
                        { source: 'district-source', id: _hoveredDistrict },
                        { hover: true }
                    );

                    setHoveredDistrict(_hoveredDistrict);
                }

            });

            // When the mouse leaves the state-fill layer, update the feature state of the
            // previously hovered feature.
            map.on('mouseleave', 'district-layer', function () {
                if (hoveredDistrictRef.current) {
                    map.setFeatureState(
                        { source: 'district-source', id: hoveredDistrictRef.current },
                        { hover: false }
                    );
                }
                setHoveredDistrict(null);
            });

            map.on('move', () => {
                const { lng, lat } = map.getCenter();

                setLongLat({
                    lat: parseInt(lat.toFixed(4)),
                    long: parseInt(lng.toFixed(4)),
                });
                setZoom(parseInt(map.getZoom().toFixed(2)));
            });

        });
    }

    useEffect(() => {
        consultar();
    }, []);


    const onChange = (e) => {
        setSelecteDepartament(e.target.value);
    }

    const consultar = async (rango = 'today') => {
        switch (rango) {
            case 'today':
                setSelectedDay({ ...setSelectedDay, rank: getRankDate('today', selectedDate.selectedDate) });
                break;
            case '24hr':
                setSelectedDay({ ...setSelectedDay, rank: getRankDate('24hrs', selectedDate.selectedDate) });
                break;
            case 'week':
                setSelectedDay({ ...setSelectedDay, rank: getRankDate('week', selectedDate.selectedDate) });
                break;
            case 'oneMounth':
                setSelectedDay({ ...setSelectedDay, rank: getRankDate('oneMounth', selectedDate.selectedDate) });
                break;

            default:
                break;
        }
        setLoading(true);

        const consult = await axios.post('http://localhost:4000/maps/getheatsourcesbydeparment', {
            dateStart: selectedDate.selectedDate.toISOString().slice(0, 10),
            dateEnd: selectedDate.rank,
            departaments: selecteDepartament
        });
        setLoading(false);

        showMapBoxMap(consult.data);
    }

    return (

        <div className="district-map-wrapper">
            {loading ? <CircularProgress size={50} /> :
                <>
                    <div className="info">
                        Current hovered district: <strong>{hoveredDistrict ? hoveredDistrict : ""}</strong>
                    </div>
                    <div id="districtDetailMap" className="map">
                        <div style={{ height: "100%" }} ref={mapContainer}>
                        </div>
                    </div>
                </>
            }

            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Seleccionar Departamento</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    /* value={Agent} */
                    label="Age"
                    onChange={onChange}
                >
                    {departametsArray.map((departament) => (
                        <MenuItem value={departament}>{departament}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    label="Seleccionar fecha"
                    value={selectedDate.selectedDate}
                    inputFormat="dd/MM/yyyy"
                    maxDate={new Date()}
                    onChange={(newValue) => {
                        setSelectedDay({ ...selectedDate, selectedDate: newValue });
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
            <Button
                onClick={() => consultar('today')}
                variant="contained" href="#contained-buttons">
                HOY
            </Button>
            <Button
                onClick={() => consultar('24hrs')}
                variant="contained" href="#contained-buttons">
                24 horas
            </Button>
            <Button
                onClick={() => consultar('week')}
                variant="contained" href="#contained-buttons">
                1 semana
            </Button>
            <Button
                onClick={() => consultar('oneMounth')}
                variant="contained"
                href="#contained-buttons">
                1 mes
            </Button>
        </div>
    );
}

