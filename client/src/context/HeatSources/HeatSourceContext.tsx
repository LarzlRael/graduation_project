import { createContext, useEffect, useReducer } from 'react';
import { heatSourcesReducer, HeatSourcestState, MounthSelected } from './HeatSourcesReducer';
import { getAvailableDatesServer, getCountHeatSourcesBydates } from '../../provider/analysisServices';
import { graphType, mapTypeStyle } from '../../data/data';

import moment from 'moment'
import { CountByDates } from '../../interfaces/countProvinceDepartamento.interface';
moment.locale('es');

type HeatSourcesStateProps = {
    datesAvailable: Date[],
    loadingState: boolean,
    showProvMun: boolean,
    showOptions: boolean,
    mapStyle: string,
    tab: number,
    graphType: string,
    mounthSelected: MounthSelected,
    titleArray: string[],
    countByDates: CountByDates,
    showProvinvicaMun: (newState: boolean) => void,
    setShowOptions: (newState: boolean) => void,
    setChangeMapType: (map: string) => void,
    setChangeTab: (value: number) => void,
    changeTypeGraph: (value: string) => void,
    setMounthSelected: (value: number) => void,
    getHeatSources: (dateStart: string, dateEnd: string) => void,

}

const HeatSourcesInitialState: HeatSourcestState = {
    datesAvailable: [],
    loadingState: false,
    showProvMun: false,
    showOptions: false,
    mapStyle: mapTypeStyle[2].mapStyle,
    tab: 1,
    graphType: graphType[0],
    mounthSelected: {
        dateEnd: '',
        dateStart: '',
        numberMounth: 1
    },
    countByDates: {
        ok: false,
        resp: []
    },
    titleArray: [],
};

export const HeatSourcesContext = createContext({} as HeatSourcesStateProps);

export const HeatProvider = ({ children }: any) => {

    const [state, dispatch] = useReducer(heatSourcesReducer, HeatSourcesInitialState);

    useEffect(() => {
        getDatesAvailable();
        setMounthSelected(0);
    }, []);

    const getDatesAvailable = async () => {
        try {

            dispatch({ type: 'loading', payload: true });
            const dates = await getAvailableDatesServer();

            dispatch({
                type: 'dates',
                payload: {
                    dates: [
                        new Date(dates.dates[0]),
                        new Date(dates.dates[1])
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

    const setChangeMapType = (map: string) => {
        dispatch({
            type: 'changeMapType',
            payload: map,
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
        console.log(mes);
        const yearWith29 = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        const days2021 = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        const finalday = days2021[mes];
        const initialMount = `2021-${mes + 1}-1`
        const finalMounth = `2021-${mes + 1}-${finalday}`;

        dispatch({
            type: 'changeMounth',
            payload: {
                dateStart: initialMount,
                dateEnd: finalMounth,
                numberMounth: mes,
            },
        });
    }
    const getHeatSources = async (dateStart: string, dateEnd: string) => {
        const getInformation = await getCountHeatSourcesBydates({
            dateStart,
            dateEnd,
        });

        dispatch({
            type: 'changeCountByDates',
            payload: getInformation,
        });

        const arrayTitles: string[] = [];

        getInformation?.resp.map(resp => (arrayTitles.push(moment(resp.acq_date).format('L'))));

        dispatch({
            type: 'setTitlesArray',
            payload: arrayTitles,
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
            getHeatSources
        }}>
            {children}
        </HeatSourcesContext.Provider>
    );
};