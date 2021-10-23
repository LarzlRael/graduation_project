import { Button, Checkbox, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, Switch, TextField } from "@material-ui/core";
import { CircularProgress } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { CardInfo } from "../CardInfo";
import ReactMapGL, { Layer, Source } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { departametsArray } from "../../data/data";
import { useFocosCalor } from "../../hooks/usefocosCalor";
import { useContext, useEffect, useState } from "react";
import { getNombresProvincias } from "../../provider/analysisServices";
import { HeatSourcesContext } from "../../context/HeatSources/HeatSourceContext";

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
        selectedDepartament,
        layerStyle,
        setSelectedDay,
        consultar,

        stateArrMunProv,
        provMunSelected,
        setProvMunSelected,

        // menu controls
        showHide,
        setShowHide,
        //state from usestate
        datesAvailable,
        loadingState
    } = useFocosCalor();


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
                        <InputLabel id="demo-simple-select-label">
                            Seleccionar Departamento
                        </InputLabel>
                        <Select
                            renderValue={() => selectedDepartament.departamentSelected}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="departamento"
                            label="Age"
                            value={selectedDepartament.departamentSelected}
                            onChange={onChange}>
                            {departametsArray.map((_, i) => (
                                <MenuItem
                                    key={departametsArray[i].name}
                                    value={i}>{departametsArray[i].name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControlLabel control={
                        <Checkbox value={showHide.showOptions} onChange={(e) => setShowHide({ ...showHide, showOptions: e.target.checked })} />
                    } label="Provincias/municipios" />

                    {showHide.showOptions &&
                        <>
                            <FormControlLabel control={
                                <Switch value={showHide.showProvMun}
                                    onChange={(e) => setShowHide({ ...showHide, showProvMun: e.target.checked })}
                                />
                            } label={`Buscar por ${showHide.showProvMun ? 'Provincia' : 'Municipio'}`} />

                            {showHide.showProvMun ?

                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">
                                        Seleccionar Provincia
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name="provincia"
                                        label="Age"
                                        value={provMunSelected.provincia}
                                        renderValue={() => provMunSelected.provincia}
                                        onChange={(e) => setProvMunSelected(prevState => ({ ...prevState, provincia: e.target.value }))}>
                                        {stateArrMunProv.sArrayPro.map((provincia) => (
                                            <MenuItem
                                                key={provincia.nombre_provincia}
                                                value={provincia.nombre_provincia}>{provincia.nombre_provincia}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                :
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">
                                        Seleccionar Municipio
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name="municipio"
                                        label="Age"
                                        value={provMunSelected.municipio}
                                        renderValue={() => provMunSelected.municipio}
                                        onChange={(e) => setProvMunSelected(prevState => ({ ...prevState, municipio: e.target.value }))}>

                                        {stateArrMunProv.sArrayMu.map(municipios => (
                                            <MenuItem
                                                key={municipios.nombre_municipio}
                                                value={municipios.nombre_municipio}>{municipios.nombre_municipio}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            }
                        </>
                    }
                    <br />
                    <br />

                    {loadingState ?
                        <CircularProgress />
                        :
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                /* cultureInfo={cultureInfo} */
                                label="Seleccionar fecha"
                                value={selectedDate.selectedDate}
                                inputFormat="dd/MM/yyyy"
                                //toDO
                                maxDate={datesAvailable[1]}
                                onChange={(newValue) => {
                                    setSelectedDay({ ...selectedDate, selectedDate: newValue });
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    }
                    <br />
                    <br />
                    <Button
                        onClick={() => consultar('today')}
                        variant="contained"
                        disabled={loading}>
                        Hoy
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
                        variant="contained">
                        1 semana
                    </Button>
                    <Button
                        onClick={() => consultar('oneMounth')}
                        disabled={loading}
                        variant="contained">
                        1 mes
                    </Button>
                </Grid>

            </Grid >

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