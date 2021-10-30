import { Button, Checkbox, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, TextField } from "@material-ui/core";
import { CircularProgress } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { CardInfo } from "../CardInfo";
import ReactMapGL, { Layer, NavigationControl, Source } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { departametsArray, mapTypeStyle } from "../../data/data";
import { useFocosCalor } from "../../hooks/usefocosCalor";

import { SwitchWidget } from "../widgets/SwitchWidget";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { ModalComponent } from "../ModalComponent";
import { DatePickerRange } from "../DatePickerRange";

const apikey = process.env.REACT_APP_MAPBOX_KEY;

export const MapBoxLayer = () => {
    const {
        viewport,
        setViewport,
        loading,
        onChange,
        currentGeoJson: focosDeCalor,
        selecteDepartamentCopy,
        selectedDate,
        selectedDepartament,
        layerStyle,
        setSelectedDay,
        getHeatSources,

        stateArrMunProv,
        provMunSelected,
        setProvMunSelected,

        //state from usestate
        datesAvailable,
        loadingState,
        // menu controls
        showProvMun,
        showOptions,
        setShowOptions,
        //style maps
        setChangeMapType,
        mapStyle,

    } = useFocosCalor();
    useDocumentTitle('Mapa de focos de calor');

    const navControlStyle = {
        left: 10,
        top: 10
    };

    return (
        <div className="mapContainer">

            <ReactMapGL
                /* minZoom={viewport.zoom} */
                mapboxApiAccessToken={apikey}
                {...viewport}

                mapStyle={`mapbox://styles/mapbox/${mapStyle.mapStyle}`}
                onViewportChange={nextViewport => setViewport(nextViewport)}
            >
                <Source id="my-data" type="geojson" data={focosDeCalor}>
                    <Layer {...layerStyle} />
                </Source>

                <NavigationControl style={navControlStyle} />

                <ModalComponent>
                    <div className="modal-content">
                        <div className="modal-info">
                            <CardInfo
                                departamento={selecteDepartamentCopy.departamentSelected}
                                numeroFocos={focosDeCalor.features ? focosDeCalor.features.length : 0}
                                dateStart={new Date()}
                                dateEnd={new Date()}
                                imageUrl={selecteDepartamentCopy.image}
                            />
                            <br />
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">
                                    Seleccionar Tipo de Mapa
                                </InputLabel>
                                <Select
                                    renderValue={() => mapStyle.mapName}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    name="departamento"
                                    label="Tipo de Mapa"
                                    value={mapStyle.mapName}
                                    onChange={(e) => setChangeMapType(e.target.value)}>

                                    {mapTypeStyle.map((option) => (
                                        <MenuItem
                                            key={option.mapName}
                                            value={option}>
                                            {option.mapName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>

                        <div>
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
                            <DatePickerRange />

                            <FormControlLabel control={
                                <Checkbox
                                    checked={showOptions} onChange={({ target }) => setShowOptions(target.checked)} />
                            } label="Provincias/municipios" />

                            {showOptions &&
                                <>
                                    <SwitchWidget />
                                    {showProvMun ?
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
                                                onChange={
                                                    ({ target }) => {
                                                        setProvMunSelected(prevState => ({
                                                            ...prevState,
                                                            provincia: target.value
                                                        }))
                                                    }}>
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
                                                onChange={({ target }) => setProvMunSelected(prevState => ({ ...prevState, municipio: target.value }))}>

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

                            {/* {loadingState ?
                                <CircularProgress />
                                :
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        
                                        label="Seleccionar fecha"
                                        value={selectedDate.selectedDate}
                                        inputFormat="dd/MM/yyyy"
                                        maxDate={datesAvailable[1]}
                                        onChange={(newValue) => {
                                            setSelectedDay({ ...selectedDate, selectedDate: newValue });
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            } */}

                            <Button
                                onClick={getHeatSources}
                                variant="contained"
                                disabled={loading}>
                                Consultar
                            </Button>
                        </div>
                    </div >
                </ModalComponent>
            </ReactMapGL>
        </div >
    );
}