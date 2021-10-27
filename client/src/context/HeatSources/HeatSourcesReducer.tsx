import { CountByDates } from '../../interfaces/countProvinceDepartamento.interface';


export interface HeatSourcestState {
    datesAvailable: Date[];
    loadingState: boolean;
    showProvMun: boolean;
    showOptions: boolean;
    mapStyle: string;
    tab: number;
    graphType: string;
    mounthSelected: number;
    countByDates: CountByDates;
    titleArray: string[];

}

type HeatSourceAction =
    | { type: 'dates', payload: { dates: Date[] } }
    | { type: 'loading', payload: boolean }
    | { type: 'showProvMun', payload: boolean }
    | { type: 'showOptions', payload: boolean }
    | { type: 'changeMapType', payload: string }
    | { type: 'changeTab', payload: number }
    | { type: 'changeGraphType', payload: string }
    | { type: 'changeMounth', payload: number }
    | { type: 'changeCountByDates', payload: CountByDates }
    | { type: 'setTitlesArray', payload: string[] }


/* | { type: 'addError', payload: string }
| { type: 'noAuthenticated' }
| { type: 'logout' } 
 */
export const heatSourcesReducer = (state: HeatSourcestState, action: HeatSourceAction): HeatSourcestState => {

    switch (action.type) {
        case 'dates':
            return {
                ...state,
                datesAvailable: action.payload.dates
            };
        case 'loading':
            return {
                ...state,
                loadingState: action.payload
            };
        case 'showProvMun':
            return {
                ...state,
                showProvMun: action.payload
            }
        case 'showOptions':
            return {
                ...state,
                showOptions: action.payload
            }
        case 'changeMapType':
            return {
                ...state,
                mapStyle: action.payload
            }
        case 'changeTab':
            return {
                ...state,
                tab: action.payload
            }
        case 'changeGraphType':
            return {
                ...state,
                graphType: action.payload
            }
        case 'changeMounth':
            return {
                ...state,
                mounthSelected: action.payload
            }
        case 'changeCountByDates':
            return {
                ...state,
                countByDates: action.payload
            }
        case 'setTitlesArray':
            return {
                ...state,
                titleArray: action.payload
            }

        default:
            return state;
    }

}