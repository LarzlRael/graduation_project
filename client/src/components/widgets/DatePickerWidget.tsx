

import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { TextField } from '@mui/material';
import { useContext } from 'react';
import { HeatSourcesContext } from '../../context/HeatSources/HeatSourceContext';
interface datePickerProps {
    setDate: React.Dispatch<React.SetStateAction<Date>>
    state: Date;
    title: string
}

export const DatePickerWidget = ({ state, setDate, title }: datePickerProps) => {
    const { datesAvailable } = useContext(HeatSourcesContext);
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                /* cultureInfo={cultureInfo} */
                label={`Seleccionar fecha ${title}`}
                value={state}
                inputFormat="dd/MM/yyyy"
                maxDate={datesAvailable[1]}
                onChange={(e) => setDate(e!)}
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
    )
}
