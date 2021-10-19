import { useState, useEffect } from "react";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@material-ui/core";
import { CircularProgress } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { getRankDate } from "../../utils/utils";
import { consultByDeparments } from "../../provider/services";
import { CardInfo } from "../CardInfo";

import ReactMapGL, { Layer, Source } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { departametsArray } from "../../data/data";

const apikey = process.env.REACT_APP_MAPBOX_KEY;

export const MapBoxLayer = () => {

    const [viewport, setViewport] = useState({
        width: 600,
        height: 600,
        longitude: -66.2137434,
        latitude: -17.390915,
        zoom: 4.5
    });

    const [loading, setLoading] = useState(false);
    const [focosDeCalor, setfocosDeCalor] = useState({});
    const [selecteDepartament, setSelecteDepartament] = useState({
        departamentSelected: departametsArray[0].name,
        image: departametsArray[0].imageUrl,
    });
    const [selecteDepartamentCopy, setSelecteDepartamentCopy] = useState({
        departamentSelected: departametsArray[0].name,
        image: departametsArray[0].imageUrl,
    });
    const [selectedDate, setSelectedDay] = useState({
        selectedDate: new Date(),
        rank: getRankDate('today', new Date()),
    });


    const onChange = (e) => {
        const index = e.target.value;
        setSelecteDepartament({
            ...selecteDepartament,
            departamentSelected: departametsArray[index].name,
            image: departametsArray[index].imageUrl,
        });
    }

    const consultar = async (rango = 'today') => {

        switch (rango) {
            case 'today':
                setSelectedDay({ ...selectedDate, rank: getRankDate('today', selectedDate.selectedDate) });
                break;
            case '24hr':
                setSelectedDay({ ...selectedDate, rank: getRankDate('24hrs', selectedDate.selectedDate) });
                break;
            case 'week':
                setSelectedDay({ ...selectedDate, rank: getRankDate('week', selectedDate.selectedDate) });
                break;
            case 'oneMounth':
                setSelectedDay({ ...selectedDate, rank: getRankDate('oneMounth', selectedDate.selectedDate) });
                break;

            default:
                break;
        }
        console.log('consultando we')
        setLoading(true);


        /* const consult = await consultByDeparments(selectedDate.selectedDate.toISOString().slice(0, 10), selectedDate.rank, selecteDepartament.departamentSelected);
        setfocosDeCalor(consult);
        setLoading(false);
        setSelecteDepartamentCopy({ ...selecteDepartamentCopy, departamentSelected: selecteDepartament.departamentSelected, image: selecteDepartament.image }); */

    }

    const layerStyle = {
        id: 'point',
        type: 'circle',
        paint: {
            'circle-radius': 5,
            'circle-color': '#000'

        }
        /* paint: {
            // Make circles larger as the user zooms from z12 to z22.
            'circle-radius': 5,
            // Color circles by ethnicity, using a `match` expression.
            'circle-color': [
                "rgb",
                // red is higher when feature.properties.temperature is higher
                ["get", "brightness"],
                // green is always zero
                0,
                // blue is higher when feature.properties.temperature is lower
                ["-", 100, ["get", "brightness"]]
            ]
        } */
    };

    useEffect(() => {
        consultar()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {


        const consultar = async () => {
            const queryResult = await consultByDeparments(selectedDate.selectedDate.toISOString().slice(0, 10), selectedDate.rank, selecteDepartament.departamentSelected);
            setfocosDeCalor(queryResult);
            setLoading(false);
            setSelecteDepartamentCopy({ ...selecteDepartamentCopy, departamentSelected: selecteDepartament.departamentSelected, image: selecteDepartament.image });
        }
        if (loading === true) {

            consultar();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading]);


    return (
        <>
            <CardInfo
                departamento={selecteDepartamentCopy.departamentSelected}
                numeroFocos={focosDeCalor.features ? focosDeCalor.features.length : 0}
                dateStart={selectedDate.selectedDate}
                dateEnd={selectedDate.rank}
                imageUrl={selecteDepartamentCopy.image}
            />

            <ReactMapGL
                mapboxApiAccessToken={apikey}
                {...viewport}
                mapStyle='mapbox://styles/mapbox/light-v10'
                onViewportChange={nextViewport => setViewport(nextViewport)}
            >
                <Source id="my-data" type="geojson" data={focosDeCalor}>
                    <Layer {...layerStyle} />
                </Source>
            </ReactMapGL>


            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Seleccionar Departamento</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="departamento"
                    label="Age"
                    value={selecteDepartament.departamentSelect}
                    onChange={onChange}
                >
                    {departametsArray.map((index, i) => (
                        <MenuItem
                            key={departametsArray[i].name}
                            value={i}>{departametsArray[i].name}
                        </MenuItem>
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
                variant="contained"
                disabled={loading}
            >
                HOY
            </Button>
            <Button
                onClick={() => consultar('24hrs')}
                disabled={loading}
                variant="contained" >
                24 horas
            </Button>
            <Button
                onClick={() => consultar('week')}
                disabled={loading}
                variant="contained" >
                1 semana
            </Button>
            <Button
                onClick={() => consultar('oneMounth')}
                disabled={loading}
                variant="contained"
            >
                1 mes
            </Button>
        </>
    );
}

