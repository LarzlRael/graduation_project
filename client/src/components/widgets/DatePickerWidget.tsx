

import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { TextField } from '@mui/material';

interface datePickerProps {
    setDate: React.Dispatch<React.SetStateAction<Date>>
    state: Date;
    title: string
}

export const DatePickerWidget = ({ state, setDate, title }: datePickerProps) => {

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                /* cultureInfo={cultureInfo} */
                label={`Seleccionar fecha ${title}`}
                value={state}
                inputFormat="dd/MM/yyyy"
                maxDate={new Date()}
                onChange={(e) => setDate(e!)}
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
    )
}
