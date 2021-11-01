import { useEffect, useContext } from 'react'
import { FormControlLabel } from '@material-ui/core';
import { Switch, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import moment from 'moment'
import { HeatSourcesContext } from '../context/HeatSources/HeatSourceContext';
import { DateSelectedRangeInterface } from '../context/HeatSources/HeatSourcesReducer';

export const DatePickerRange = () => {

    const {
        dateSelectedAndRange,
        datesAvailable,
        changeDateSelectedAndRanked,
    } = useContext(HeatSourcesContext);

    const { dateStart, dateEnd, findbyOneDate: isShowSwith } = dateSelectedAndRange;

    useEffect(() => {
        /* setEndDateRange(moment(dateStart,).add(6, 'days').toDate()); */
        changeDateSelectedAndRanked({
            ...dateSelectedAndRange,
            dateEnd: moment(dateStart,).add(6, 'days').toDate(),
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dateStart]);

    useEffect(() => {
        if (!isShowSwith) {
            changeDateSelectedAndRanked({
                ...dateSelectedAndRange,
                dateEnd: dateStart,
            });
        } else {
            changeDateSelectedAndRanked({
                ...dateSelectedAndRange,
                dateEnd: moment(dateStart,).add(6, 'days').toDate(),
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isShowSwith]);

    const onChange = (value: any, nameField: keyof DateSelectedRangeInterface) => {
        changeDateSelectedAndRanked({
            ...dateSelectedAndRange,
            [nameField]: value,
        });
    }
    return (
        <>
            <FormControlLabel control={
                <Switch
                    checked={dateSelectedAndRange.findbyOneDate}
                    onChange={(e) => onChange(e.target.checked, 'findbyOneDate')}
                />
            } label={`Buscando por ${isShowSwith ? 'Rango' : 'Un solo dia'}`} />
            <br />

            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    /* cultureInfo={cultureInfo} */

                    label={!isShowSwith ? 'Buscar por fecha' : 'Fecha inicio'}
                    value={dateStart}

                    inputFormat="dd/MM/yyyy"
                    maxDate={datesAvailable[1]}
                    onChange={(e) => onChange(e!, 'dateStart')}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>

            {isShowSwith &&
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        /* cultureInfo={cultureInfo} */
                        label='Selecciona Fecha fin'
                        value={dateEnd}
                        minDate={dateStart ? dateStart : null}
                        inputFormat="dd/MM/yyyy"
                        maxDate={dateEnd ? dateEnd : datesAvailable[1]}
                        onChange={(e) => onChange(e!, 'dateEnd')}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            }
            <br />
        </>
    )
}
