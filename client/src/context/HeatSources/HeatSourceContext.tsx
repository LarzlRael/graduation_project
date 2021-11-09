import { createContext, useEffect, useReducer } from 'react';
import { heatSourcesReducer, HeatSourcestState, DateSelectedRangeInterface, QueryToFindInterface } from './HeatSourcesReducer';
import { getAvailableDatesServer, getCountHeatSourcesByMonth, getCountHeatSourcesByMonths } from '../../provider/analysisServices';
import { graphTypeArray, mapTypeStyle, meses, MapStyleInt, departametsArray } from '../../data/data';

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
    currentLatLongMidLocation: LatLngInt,
    currentGeoJson: GeoJsonFeature,
    modalIsOpen: boolean,
    dateSelectedAndRange: DateSelectedRangeInterface,
    queryToFind: QueryToFindInterface,
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
    changeQueryOneFieldToFind: (field: keyof QueryToFindInterface, value: string) => void,
    changeQueryToFind: (queryToFindInterface: QueryToFindInterface) => void,
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
    currentLatLongMidLocation: {
        longitude: -66.2137434,
        latitude: -17.390915,
    },
    currentGeoJson: {
        type: 'FeatureCollection',
        features: [],
    },
    modalIsOpen: false,
    dateSelectedAndRange: {
        dateEnd: null,
        dateStart: null,
        dateEndRange: 7,
        findbyOneDate: false,
    },
    queryToFind: {
        departamentSelected: departametsArray[0].name,
        image: departametsArray[0].imageUrl,
        municipio: '',
        provincia: '',
    },

};

export const HeatSourcesContext = createContext({} as HeatSourcesStateProps);

export const HeatProvider = ({ children }: any) => {

    const [state, dispatch] = useReducer(heatSourcesReducer, HeatSourcesInitialState);

    useEffect(() => {
        getDatesAvailable();
        setMounthSelected(0);
        changeDateSelectedAndRanked({
            ...state.dateSelectedAndRange,
            dateStart: state.datesAvailable[1],
            dateEnd: state.datesAvailable[1],
        });
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
            dispatch({
                type: 'dates',
                payload: {
                    dates: [
                        addHours(8, new Date(dates.dates[0])),
                        addHours(8, new Date(dates.dates[1])),
                    ]
                },
            });
            dispatch({ type: 'loading', payload: false });

        } catch (error: any) {
            console.log(error);
        }
    };

    const showProvinvicaMun = (state: boolean) => {
        dispatch({
            type: 'showProvMun',
            payload: state,
        });
    }
    const setShowOptions = (state: boolean) => {
        dispatch({
            type: 'showOptions',
            payload: state,
        });
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
            getInformation?.resp.map(resp => (arrayTitles.push(moment(resp.acq_date).add(8, 'hours').format('L'))));
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
    const changeQueryToFind = (queryToFind: QueryToFindInterface) => {

        dispatch({
            type: 'setQueryToFind',
            payload: queryToFind,
        });
    }
    const changeQueryOneFieldToFind = (field: keyof QueryToFindInterface, value: string) => {

        dispatch({
            type: 'setOneFieldQueryToFind',
            payload: {
                field,
                value,
            },
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
            changeDateSelectedAndRanked,
            changeQueryOneFieldToFind,
            changeQueryToFind,
        }}>
            {children}
        </HeatSourcesContext.Provider>
    );
};