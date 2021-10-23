import { createContext, useEffect, useReducer } from 'react';
import { heatSourcesReducer, HottestState as HeatSourcestState } from './HeatSourcesReducer';
import { getAvailableDatesServer } from '../../provider/analysisServices';


type HeatSourcesStateProps = {
    datesAvailable: Date[],
    loadingState: boolean,
}

const HeatSourcesInitialState: HeatSourcestState = {
    datesAvailable: [],
    loadingState: false,
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

    return (
        <HeatSourcesContext.Provider value={{
            ...state,
        }}>
            {children}
        </HeatSourcesContext.Provider>
    );
};