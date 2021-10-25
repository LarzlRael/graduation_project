import { createContext, useEffect, useReducer } from 'react';
import { heatSourcesReducer, HeatSourcestState } from './HeatSourcesReducer';
import { getAvailableDatesServer } from '../../provider/analysisServices';
import { mapType } from '../../data/data';


type HeatSourcesStateProps = {
    datesAvailable: Date[],
    loadingState: boolean,
    showProvMun: boolean,
    showOptions: boolean,
    mapStyle: string,
    showProvinvicaMun: (newState: boolean) => void,
    setShowOptions: (newState: boolean) => void,
    setChangeMapType: (map: string) => void,
}

const HeatSourcesInitialState: HeatSourcestState = {
    datesAvailable: [],
    loadingState: false,
    showProvMun: false,
    showOptions: false,
    mapStyle: mapType[2],
};

export const HeatSourcesContext = createContext({} as HeatSourcesStateProps);

export const HeatProvider = ({ children }: any) => {

    const [state, dispatch] = useReducer(heatSourcesReducer, HeatSourcesInitialState);

    useEffect(() => {
        getDatesAvailable();
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

    return (
        <HeatSourcesContext.Provider value={{
            ...state,
            showProvinvicaMun,
            setShowOptions,
            setChangeMapType
        }}>
            {children}
        </HeatSourcesContext.Provider>
    );
};