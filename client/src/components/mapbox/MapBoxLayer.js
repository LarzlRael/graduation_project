import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core'
import { CircularProgress } from '@mui/material'
import { CardInfo } from '../CardInfo'
import ReactMapGL, { Layer, NavigationControl, Source } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { departametsArray, mapTypeStyle } from '../../data/data'
import { useFocosCalor } from '../../hooks/usefocosCalor'

import { SwitchWidget } from '../widgets/SwitchWidget'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import { ModalComponent } from '../ModalComponent'
import { DatePickerRange } from '../DatePickerRange'
import { LoadingElipsis } from '../widgets/LoadingElipsis'

const apikey = process.env.REACT_APP_MAPBOX_KEY

export const MapBoxLayer = () => {
  const {
    viewport,
    setViewport,
    loading,
    loadingState,
    onChange,
    currentGeoJson: focosDeCalor,
    selecteDepartamentCopy,
    layerStyle,
    getHeatSources,
    stateArrMunProv,
    //state from usestate
    // menu controls
    showProvMun,
    showOptions,
    setShowOptions,
    //style maps
    setChangeMapType,
    mapStyle,
    //query to find
    queryToFind,
    changeQueryOneFieldToFind,
    darkTheme,
  } = useFocosCalor()
  useDocumentTitle('Mapa de focos de calor')

  const navControlStyle = {
    left: 10,
    top: 10,
  }

  return (
    <div className="mapContainer">
      <ReactMapGL
        /* minZoom={viewport.zoom} */
        mapboxApiAccessToken={apikey}
        {...viewport}
        mapStyle={`mapbox://styles/mapbox/${mapStyle.mapStyle}`}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
      >
        <Source id="my-data" type="geojson" data={focosDeCalor}>
          <Layer {...layerStyle} />
        </Source>

        <NavigationControl style={navControlStyle} />

        <ModalComponent>
          <div className={`modal-content ${darkTheme && 'blackTheme'}`}>
            <div className="modal-info">
              <CardInfo imageUrl={selecteDepartamentCopy.image} />
              <br />
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Seleccionar Tipo de Mapa
                </InputLabel>
                <Select
                  renderValue={() => mapStyle.mapName}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Tipo de Mapa"
                  value={mapStyle.mapName}
                  onChange={(e) => setChangeMapType(e.target.value)}
                >
                  {mapTypeStyle.map((option) => (
                    <MenuItem key={option.mapName} value={option}>
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
                  renderValue={() => queryToFind.departamentSelected}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Age"
                  value={queryToFind.departamentSelected}
                  onChange={onChange}
                >
                  {departametsArray.map((departament, i) => (
                    <MenuItem key={i} value={departament}>
                      {departament.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <DatePickerRange />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={showOptions}
                    onChange={({ target }) => setShowOptions(target.checked)}
                  />
                }
                label="Provincias/municipios"
              />

              {showOptions && (
                <>
                  <SwitchWidget />
                  {showProvMun ? (
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Seleccionar Provincia
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="provincia"
                        label="Age"
                        value={queryToFind.provincia}
                        renderValue={() => queryToFind.provincia}
                        onChange={({ target }) => {
                          changeQueryOneFieldToFind('provincia', target.value)
                        }}
                      >
                        {stateArrMunProv.sArrayPro.map((provincia) => (
                          <MenuItem
                            key={provincia.nombre_provincia}
                            value={provincia.nombre_provincia}
                          >
                            {provincia.nombre_provincia}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  ) : (
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Seleccionar Municipio
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="municipio"
                        label="Age"
                        value={queryToFind.municipio}
                        renderValue={() => queryToFind.municipio}
                        onChange={({ target }) =>
                          changeQueryOneFieldToFind('municipio', target.value)
                        }
                      >
                        {stateArrMunProv.sArrayMu.map((municipios) => (
                          <MenuItem
                            key={municipios.nombre_municipio}
                            value={municipios.nombre_municipio}
                          >
                            {municipios.nombre_municipio}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                </>
              )}
              <br />
              <br />
              {!loading ? (
                <center>
                  <br />
                  <Button
                    onClick={getHeatSources}
                    variant="contained"
                    disabled={loading}
                  >
                    Consultar
                  </Button>
                </center>
              ) : (
                <LoadingElipsis />
              )}
            </div>
          </div>
        </ModalComponent>
      </ReactMapGL>
    </div>
  )
}
