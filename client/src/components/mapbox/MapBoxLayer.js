import { useState, useEffect } from "react";
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@material-ui/core";
import { CircularProgress } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { getRankDate } from "../../utils/utils";
import { consultByDeparments } from "../../provider/services";
import { CardInfo } from "../CardInfo";

import ReactMapGL, { Layer, Popup, Source } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { departametsArray } from "../../data/data";
import { useFocosCalor } from "../../hooks/usefocosCalor";

const apikey = process.env.REACT_APP_MAPBOX_KEY;

export const MapBoxLayer = () => {

    const { 
        viewport,
        setViewport,
        loading,
        onChange,
        focosDeCalor,
        selecteDepartamentCopy,
        selectedDate,
        selecteDepartament,
        layerStyle,
        setSelectedDay,
        consultar
    } = useFocosCalor();




    var cultureInfo = {
        day: {
            name: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
            abbr: ['Dom', 'Lun', 'Martes', 'Mie', 'Jue', 'Vie', 'Sab']
        },
        month: {
            name: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Jului', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            abbr: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
        }
    };
    return (
        <>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6}>
                    <CardInfo
                        departamento={selecteDepartamentCopy.departamentSelected}
                        numeroFocos={focosDeCalor.features ? focosDeCalor.features.length : 0}
                        dateStart={selectedDate.selectedDate}
                        dateEnd={selectedDate.rank}
                        imageUrl={selecteDepartamentCopy.image}
                    />

                </Grid>
                <Grid item xs={6}>
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
                    <br />
                    <br />

                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            /* cultureInfo={cultureInfo} */
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
                    <br />
                    <br />
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
                </Grid>

            </Grid>

            <ReactMapGL
                minZoom={viewport.zoom}
                mapboxApiAccessToken={apikey}
                {...viewport}
                mapStyle='mapbox://styles/mapbox/light-v10'
                onViewportChange={nextViewport => setViewport(nextViewport)}
            >
                <Source id="my-data" type="geojson" data={focosDeCalor}>
                    <Layer {...layerStyle} />
                </Source>

            </ReactMapGL>



        </>
    );
}



// eslint-disable-next-line no-lone-blocks
{/* <br />
            {
                !loading &&
                JSON.stringify(focosDeCalor.features[0].properties)
            }
            {
                !loading &&
                focosDeCalor.features.map(foco => (
                    <li>{foco.properties.brightness} {foco.properties.longitude} {foco.properties.latitude}</li>
                ))
            } */}