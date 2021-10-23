
export interface HottestState {
    datesAvailable: Date[];
    loadingState: boolean;
}

type HeatSourceAction =
    | { type: 'dates', payload: { dates: Date[] } }
    | { type: 'loading', payload: boolean }

/* | { type: 'addError', payload: string }
| { type: 'noAuthenticated' }
| { type: 'logout' } 
 */
export const heatSourcesReducer = (state: HottestState, action: HeatSourceAction): HottestState => {

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

        default:
            return state;
    }

}