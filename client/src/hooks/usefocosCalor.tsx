import { useState, useEffect, useContext } from 'react';
import { departametsArray } from '../data/data';
import { getRankDate, getRandomArbitrary } from '../utils/utils';
import { consultByDeparments, getHotSourcesByDepMun, getHotSourcesByDepProv } from '../provider/heatSourcesservices';
import { getNombresProvincias, getNombresMunicipios } from '../provider/analysisServices';
import { Resp as ResProv } from '../interfaces/provinciasResponse.interface';
import { Resp as ResMun } from '../interfaces/municipiosResponse.interface';
import { HeatSourcesContext } from '../context/HeatSources/HeatSourceContext';
import { GeoJsonFeature } from '../interfaces/geoJsonResponse';

import { FlyToInterpolator } from 'react-map-gl';
// 3rd-party easing functions
/* import d3 from 'd3-ease'; */

export const useFocosCalor = () => {

    const { datesAvailable,
        loadingState,
        showProvMun,
        showOptions,
        mapStyle,
        setShowOptions,
        setChangeMapType,
        currentLatLong,
        changeCurrentLatLng,
    } = useContext(HeatSourcesContext);

    const [viewport, setViewport] = useState({
        width: 'fit',
        height: 800,
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
            /* transitionEasing: d3.easeCubic */
        });
    };

    const [loading, setLoading] = useState(false);
    const [focosDeCalor, setfocosDeCalor] = useState<GeoJsonFeature>({ type: 'FeatureCollection', features: [] });
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

    const [selectedDate, setSelectedDay] = useState({
        selectedDate: !loadingState ? datesAvailable[1] : new Date(),
        rank: getRankDate('today', !loadingState ? datesAvailable[1] : new Date(),),
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
        setLoading(true);
    }

    useEffect(() => {
        consultar()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {

        const consultarPorDepartamentos = async () => {
            const queryResult = await consultByDeparments(
                selectedDate.selectedDate.toISOString().slice(0, 10),
                selectedDate.rank,
                selectedDepartament.departamentSelected);

            setfocosDeCalor(queryResult);

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
                    dateStart: selectedDate.selectedDate.toISOString().slice(0, 10),
                    dateEnd: selectedDate.rank,
                    provincia: provMunSelected.provincia
                }
            );
            setfocosDeCalor(queryResult);
            console.log(queryResult)

            setLoading(false);
        }
        const consultarMunicipio = async () => {
            const queryResult = await getHotSourcesByDepMun(
                {
                    dateStart: selectedDate.selectedDate.toISOString().slice(0, 10),
                    dateEnd: selectedDate.rank,
                    municipio: provMunSelected.municipio
                }
            );
            setfocosDeCalor(queryResult);
            console.log(queryResult)

            setLoading(false);
        }

        if (loading === true) {
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
        console.log('moviendo el mapa');
        if (loading === false && focosDeCalor.features.length > 0) {
            const randomPoint = getRandomArbitrary(0, focosDeCalor.features.length - 1);
            console.log(randomPoint)
            console.log(focosDeCalor.features.length);
            changeCurrentLatLng({
                latitude: focosDeCalor.features[randomPoint].properties.latitude,
                longitude: focosDeCalor.features[randomPoint].properties.longitude
            });
            /* goTo(); */
        }
    }, [loading]);

    useEffect(() => {
        console.log('go to ')
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
        loading,
        onChange,
        focosDeCalor,
        selecteDepartamentCopy,
        selectedDepartament,
        selectedDate,
        setSelectedDay,
        layerStyle,
        consultar,
        stateArrMunProv,
        provMunSelected,
        setProvMunSelected,
        showOptions,
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
