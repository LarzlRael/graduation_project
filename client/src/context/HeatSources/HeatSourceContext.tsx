import { createContext, useEffect, useReducer } from 'react';
import { heatSourcesReducer, HeatSourcestState, DateSelectedRangeInterface } from './HeatSourcesReducer';
import { getAvailableDatesServer, getCountHeatSourcesByMonth, getCountHeatSourcesByMonths } from '../../provider/analysisServices';
import { graphTypeArray, mapTypeStyle, meses, MapStyleInt } from '../../data/data';

import moment from 'moment'
import { CountByDates, LatLngInt } from '../../interfaces/countProvinceDepartamento.interface';
import { GeoJsonFeature } from '../../interfaces/geoJsonResponse';
moment.locale('es');

type HeatSourcesStateProps = {
    datesAvailable: Date[],
    loadingState: boolean,
    showProvMun: boolean,
    showOptions: boolean,
    mapStyle: MapStyleInt,
    tab: number,
    graphType: string,
    mounthSelected: number,
    titleArray: string[],
    countByDates: CountByDates,
    currentLatLong: LatLngInt,
    currentGeoJson: GeoJsonFeature,
    modalIsOpen: boolean,
    dateSelectedAndRange: DateSelectedRangeInterface,
    showProvinvicaMun: (newState: boolean) => void,
    setShowOptions: (newState: boolean) => void,
    setChangeMapType: (mapStyle: MapStyleInt) => void,
    setChangeTab: (value: number) => void,
    changeTypeGraph: (value: string) => void,
    setMounthSelected: (value: number) => void,
    getHeatSourcesInfoToGragh: (monthNumber: number) => void,
    changeCurrentLatLng: (currentLatLong: LatLngInt) => void,
    changeCurrentGeoJson: (geoJsonCurrent: GeoJsonFeature) => void,
    changeDateSelectedAndRanked: (dateSelectedAndRange: DateSelectedRangeInterface) => void,
    closeModal: () => void,
    openModal: () => void,
}

const HeatSourcesInitialState: HeatSourcestState = {
    datesAvailable: [],
    loadingState: false,
    showProvMun: false,
    showOptions: false,
    mapStyle: mapTypeStyle[2],
    tab: 1,
    graphType: graphTypeArray[0],
    mounthSelected: 0,
    countByDates: {
        ok: false,
        resp: []
    },
    titleArray: [],
    currentLatLong: {
        longitude: -66.2137434,
        latitude: -17.390915,
    },
    currentGeoJson: {
        type: 'FeatureCollection',
        features: [],
    },
    modalIsOpen: true,
    dateSelectedAndRange: {
        dateEnd: new Date(),
        dateStart: new Date(),
        dateEndRange: 7,
        findbyOneDate: false,
    }
};

export const HeatSourcesContext = createContext({} as HeatSourcesStateProps);

export const HeatProvider = ({ children }: any) => {

    const [state, dispatch] = useReducer(heatSourcesReducer, HeatSourcesInitialState);

    useEffect(() => {
        getDatesAvailable();
        setMounthSelected(0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const addHours = (h: number, date: Date) => {
        date.setHours(date.getHours() + h);
        return date;
    }


    const getDatesAvailable = async () => {


        try {

            dispatch({ type: 'loading', payload: true });
            const dates = await getAvailableDatesServer();
            console.log(new Date(dates.dates[0]),
                new Date(dates.dates[1]));
            dispatch({
                type: 'dates',
                payload: {
                    dates: [
                        addHours(4, new Date(dates.dates[0])),
                        addHours(4, new Date(dates.dates[1])),
                    ]
                },
            });
            dispatch({ type: 'loading', payload: false });

        } catch (error: any) {
            console.log(error);
        }
    };

    const showProvinvicaMun = (state: boolean) => {
        console.log(state);
        dispatch({
            type: 'showProvMun',
            payload: state,
        })
    }
    const setShowOptions = (state: boolean) => {
        dispatch({
            type: 'showOptions',
            payload: state,
        })
    }

    const setChangeMapType = (mapStyle: MapStyleInt) => {
        dispatch({
            type: 'changeMapType',
            payload: mapStyle,
        })
    }

    const setChangeTab = (value: number) => {
        dispatch({
            type: 'changeTab',
            payload: value,
        })
    }
    const changeTypeGraph = (value: string) => {
        dispatch({
            type: 'changeGraphType',
            payload: value,
        })
    }

    const setMounthSelected = (mes: number) => {

        dispatch({
            type: 'changeMounth',
            payload: mes,
        });
    }
    const getHeatSourcesInfoToGragh = async (month: number) => {

        let getInformation: CountByDates;
        const arrayTitles: string[] = [];
        if (month === 0) {
            getInformation = await getCountHeatSourcesByMonths({
                year: 2021,
            });
            getInformation?.resp.map((_, i) => (arrayTitles.push(
                meses[i + 1],
            )));
        } else {
            getInformation = await getCountHeatSourcesByMonth({
                month: month,
                year: 2021,
            });
            getInformation?.resp.map(resp => (arrayTitles.push(moment(resp.acq_date).format('L'))));
        }

        dispatch({
            type: 'changeCountByDates',
            payload: getInformation,
        });


        dispatch({
            type: 'setTitlesArray',
            payload: arrayTitles,
        });

    }
    const changeCurrentLatLng = (latLng: LatLngInt) => {
        dispatch({
            type: 'setLatLong',
            payload: latLng,
        });
    }

    const changeCurrentGeoJson = (currentGeoJson: GeoJsonFeature) => {
        dispatch({
            type: 'setCurrentGeoJson',
            payload: currentGeoJson,
        });
    }
    const closeModal = () => {
        dispatch({
            type: 'setModalIsOpen',
            payload: false,
        });
    }
    const openModal = () => {
        console.log('opening modal')
        dispatch({
            type: 'setModalIsOpen',
            payload: true,
        });
    }
    const changeDateSelectedAndRanked = (dateSelectedAndRange: DateSelectedRangeInterface) => {

        dispatch({
            type: 'dateSelectedAndRange',
            payload: dateSelectedAndRange,
        });
    }

    return (
        <HeatSourcesContext.Provider value={{
            ...state,
            showProvinvicaMun,
            setShowOptions,
            setChangeMapType,
            setChangeTab,
            changeTypeGraph,
            setMounthSelected,
            getHeatSourcesInfoToGragh,
            changeCurrentLatLng,
            changeCurrentGeoJson,
            closeModal,
            openModal,
            changeDateSelectedAndRanked
        }}>
            {children}
        </HeatSourcesContext.Provider>
    );
};