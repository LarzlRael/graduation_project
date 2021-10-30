import { useState, useEffect, useContext } from 'react';
import { departametsArray } from '../data/data';
import { getRandomArbitrary } from '../utils/utils';
import { getHeatSourcesByDepartament, getHotSourcesByDepMun, getHotSourcesByDepProv } from '../provider/heatSourcesservices';
import { getNombresProvincias, getNombresMunicipios } from '../provider/analysisServices';
import { Resp as ResProv } from '../interfaces/provinciasResponse.interface';
import { Resp as ResMun } from '../interfaces/municipiosResponse.interface';
import { HeatSourcesContext } from '../context/HeatSources/HeatSourceContext';


import { FlyToInterpolator } from 'react-map-gl';

export const useFocosCalor = () => {

    const { datesAvailable,
        loadingState,
        showProvMun,
        showOptions,
        currentLatLong,
        mapStyle,
        currentGeoJson,
        setShowOptions,
        setChangeMapType,
        changeCurrentLatLng,
        changeCurrentGeoJson,
        closeModal,
        dateSelectedAndRange
    } = useContext(HeatSourcesContext);

    const { dateStart, dateEnd } = dateSelectedAndRange;

    const [viewport, setViewport] = useState({
        width: 'fit',
        height: '100vh',
        longitude: currentLatLong.longitude,
        latitude: currentLatLong.latitude,
        zoom: 5.2,
        transitionDuration: 5000,
        transitionInterpolator: new FlyToInterpolator(),
    });

    const goTo = () => {
        setViewport({
            ...viewport,
            longitude: currentLatLong.longitude,
            latitude: currentLatLong.latitude,
            zoom: 6,
            transitionDuration: 1000,
            transitionInterpolator: new FlyToInterpolator(),
        });
    };
    const [loading, setLoading] = useState(false);

    const [selectedDepartament, setSelectedDepartament] = useState({
        departamentSelected: departametsArray[0].name,
        image: departametsArray[0].imageUrl,
    });

    const [provMunSelected, setProvMunSelected] = useState({
        provincia: '',
        municipio: ''
    });

    const [selecteDepartamentCopy, setSelecteDepartamentCopy] = useState({
        departamentSelected: departametsArray[0].name,
        image: departametsArray[0].imageUrl,
    });

    const [stateArrMunProv, setArrMunProv] = useState<{
        sArrayPro: ResProv[];
        sArrayMu: ResMun[];
    }>({
        sArrayPro: [],
        sArrayMu: [],
    });

    const onChange = (e: any) => {
        const index = e.target.value;
        setSelectedDepartament({
            ...selectedDepartament,
            departamentSelected: departametsArray[index].name,
            image: departametsArray[index].imageUrl,
        });
    }

    const layerStyle = {
        id: 'point',
        type: 'circle',
        paint: {
            'circle-radius': [
                'interpolate',
                ['linear'],
                ['zoom'],
                10,
                ['/', ['-', 2017, ['number', ['get', 'brightness'], 2017]], 750],
                13,
                ['/', ['-', 2017, ['number', ['get', 'brightness'], 2017]], 50]
            ],
            'circle-opacity': 0.8,
            'circle-color': 'rgb(145, 0, 16)'
        }
    };
    const getHeatSources = async () => {
        setLoading(true);
    }

    useEffect(() => {
        getHeatSources()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {

        const consultarPorDepartamentos = async () => {
            const queryResult = await getHeatSourcesByDepartament({
                dateEnd: dateEnd.toISOString().slice(0, 10),
                dateStart: dateStart.toISOString().slice(0, 10),
                departamento: selectedDepartament.departamentSelected
            });

            changeCurrentGeoJson(queryResult);

            setLoading(false);
            setSelecteDepartamentCopy({
                ...selecteDepartamentCopy,
                departamentSelected: selectedDepartament.departamentSelected,
                image: selectedDepartament.image
            });

        }

        const consultarProvincias = async () => {
            const queryResult = await getHotSourcesByDepProv(
                {
                    dateEnd: dateEnd.toISOString().slice(0, 10),
                    dateStart: dateStart.toISOString().slice(0, 10),
                    provincia: provMunSelected.provincia
                }
            );
            changeCurrentGeoJson(queryResult);
            console.log(queryResult)

            setLoading(false);
        }

        const consultarMunicipio = async () => {
            const queryResult = await getHotSourcesByDepMun(
                {
                    dateEnd: dateEnd.toISOString().slice(0, 10),
                    dateStart: dateStart.toISOString().slice(0, 10),
                    municipio: provMunSelected.municipio
                }
            );
            changeCurrentGeoJson(queryResult);
            console.log(queryResult)

            setLoading(false);
        }

        if (loading) {
            if (showOptions) {
                if (showProvMun) {
                    /* /? consultar por provincia */
                    consultarProvincias();
                } else {
                    /* //? consultar por municipio */
                    consultarMunicipio();
                }
            } else {
                consultarPorDepartamentos();
            }
        }
        setSelecteDepartamentCopy({
            ...selecteDepartamentCopy,
            departamentSelected: selectedDepartament.departamentSelected,
            image: selectedDepartament.image
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading]);

    useEffect(() => {

        const getArray = async () => {
            const arrayProvinciasList = await getNombresProvincias(selectedDepartament.departamentSelected);
            const arrayMunicipiosList = await getNombresMunicipios(selectedDepartament.departamentSelected);
            setArrMunProv({
                ...stateArrMunProv,
                sArrayMu: arrayMunicipiosList.resp,
                sArrayPro: arrayProvinciasList.resp,
            });
        }
        getArray();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedDepartament.departamentSelected]);

    useEffect(() => {
        if (loading === false && currentGeoJson.features.length > 0) {
            const randomPoint = getRandomArbitrary(0, currentGeoJson.features.length - 1);
            changeCurrentLatLng({
                latitude: currentGeoJson.features[randomPoint].properties.latitude,
                longitude: currentGeoJson.features[randomPoint].properties.longitude
            });
            closeModal();
        }
    }, [loading]);


    useEffect(() => {
        goTo();
    }, [currentLatLong]);



    useEffect(() => {
        setProvMunSelected({
            ...provMunSelected,
            municipio: stateArrMunProv.sArrayMu[0] ? stateArrMunProv.sArrayMu[0].nombre_municipio : '',
            provincia: stateArrMunProv.sArrayPro[0] ? stateArrMunProv.sArrayPro[0].nombre_provincia : '',
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedDepartament.departamentSelected]);

    return {
        viewport,
        setViewport,
        onChange,
        loading,
        currentGeoJson,
        selecteDepartamentCopy,
        selectedDepartament,
        layerStyle,
        stateArrMunProv,
        provMunSelected,
        showOptions,
        getHeatSources,
        setProvMunSelected,
        setShowOptions,
        /* States from provider usestate */
        datesAvailable,
        loadingState,
        showProvMun,
        setChangeMapType,
        mapStyle,
        goTo
    }
}
