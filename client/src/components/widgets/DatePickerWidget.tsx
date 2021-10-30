

import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { TextField } from '@mui/material';
import { useContext } from 'react';
import { HeatSourcesContext } from '../../context/HeatSources/HeatSourceContext';
interface datePickerProps {
    setDate: React.Dispatch<React.SetStateAction<Date>>
    state: Date;
    title: string;
    limit?: Date;
    minDate?: Date;
}

export const DatePickerWidget = ({ limit, state, setDate, title, minDate }: datePickerProps) => {
    const { datesAvailable } = useContext(HeatSourcesContext);
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                /* cultureInfo={cultureInfo} */
                label={title}
                value={state}
                minDate={minDate ? minDate : null}
                inputFormat="dd/MM/yyyy"
                maxDate={limit ? limit : datesAvailable[1]}
                onChange={(e) => setDate(e!)}
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
    )
}
