import {
  CountByDates,
  LatLngInt,
} from '../../interfaces/countProvinceDepartamento.interface'
import { MapStyleInt } from '../../data/data'
import { GeoJsonFeature } from '../../interfaces/geoJsonResponse'

export interface DateSelectedRangeInterface {
  dateStart: Date | null
  dateEnd: Date | null
  dateEndRange: number
  findbyOneDate: boolean
}
export interface QueryToFindInterface {
  departamentSelected: string
  image: string
  provincia: string
  municipio: string
}
export interface SelectOptionDateInterface {
  month: number
  year: number
  onlyYear: boolean
}
export interface HeatSourcestState {
  datesAvailable: Date[]
  loadingState: boolean
  showProvMun: boolean
  showOptions: boolean
  mapStyle: MapStyleInt
  tab: number
  graphType: string
  mounthAndYearSelected: SelectOptionDateInterface
  countByDates: CountByDates
  titleArray: string[]
  currentLatLongMidLocation: LatLngInt
  currentGeoJson: GeoJsonFeature
  modalIsOpen: boolean
  dateSelectedAndRange: DateSelectedRangeInterface
  queryToFind: QueryToFindInterface
}

type HeatSourceAction =
  | { type: 'dates'; payload: { dates: Date[] } }
  | { type: 'loading'; payload: boolean }
  | { type: 'showProvMun'; payload: boolean }
  | { type: 'showOptions'; payload: boolean }
  | { type: 'changeMapType'; payload: MapStyleInt }
  | { type: 'changeTab'; payload: number }
  | { type: 'changeGraphType'; payload: string }
  | { type: 'changeMounthOrYear'; payload: SelectOptionDateInterface }
  | { type: 'changeCountByDates'; payload: CountByDates }
  | { type: 'setTitlesArray'; payload: string[] }
  | { type: 'setLatLong'; payload: LatLngInt }
  | { type: 'setCurrentGeoJson'; payload: GeoJsonFeature }
  | { type: 'setModalIsOpen'; payload: boolean }
  | { type: 'dateSelectedAndRange'; payload: DateSelectedRangeInterface }
  | { type: 'setQueryToFind'; payload: QueryToFindInterface }
  | {
      type: 'setOneFieldQueryToFind'
      payload: { field: keyof QueryToFindInterface; value: string }
    }

/* | { type: 'addError', payload: string }
| { type: 'noAuthenticated' }
| { type: 'logout' } 
 */
export const heatSourcesReducer = (
  state: HeatSourcestState,
  action: HeatSourceAction,
): HeatSourcestState => {
  switch (action.type) {
    case 'dates':
      return {
        ...state,
        datesAvailable: action.payload.dates,
      }
    case 'loading':
      return {
        ...state,
        loadingState: action.payload,
      }
    case 'showProvMun':
      return {
        ...state,
        showProvMun: action.payload,
      }
    case 'showOptions':
      return {
        ...state,
        showOptions: action.payload,
      }
    case 'changeMapType':
      return {
        ...state,
        mapStyle: action.payload,
      }
    case 'changeTab':
      return {
        ...state,
        tab: action.payload,
      }
    case 'changeGraphType':
      return {
        ...state,
        graphType: action.payload,
      }
    case 'changeMounthOrYear':
      return {
        ...state,
        mounthAndYearSelected: {
          ...state.mounthAndYearSelected,
          month: action.payload.month,
          year: action.payload.year,
          onlyYear: action.payload.onlyYear,
        },
      }
    case 'changeCountByDates':
      return {
        ...state,
        countByDates: action.payload,
      }
    case 'setTitlesArray':
      return {
        ...state,
        titleArray: action.payload,
      }
    case 'setLatLong':
      return {
        ...state,
        currentLatLongMidLocation: action.payload,
      }
    case 'setCurrentGeoJson':
      return {
        ...state,
        currentGeoJson: action.payload,
      }
    case 'setModalIsOpen':
      return {
        ...state,
        modalIsOpen: action.payload,
      }
    case 'dateSelectedAndRange':
      return {
        ...state,
        dateSelectedAndRange: action.payload,
      }
    case 'setOneFieldQueryToFind':
      return {
        ...state,
        queryToFind: {
          ...state.queryToFind,
          [action.payload.field]: action.payload.value,
        },
      }
    case 'setQueryToFind':
      return {
        ...state,
        queryToFind: action.payload,
      }

    default:
      return state
  }
}
