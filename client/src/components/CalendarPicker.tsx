import { useState } from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Stack from '@mui/material/Stack';
import {
    LocalizationProvider,
    DesktopDatePicker
} from '@mui/lab';

export default function ResponsiveDatePickers() {
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [endDate, setEndDate] = useState<Date | null>(new Date());

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3}>
                <DesktopDatePicker
                    label="Desde"
                    value={startDate}
                    minDate={new Date('2017-01-01')}
                    onChange={(newValue) => {
                        setStartDate(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />

                <DesktopDatePicker
                    label="Hasta"
                    value={endDate}
                    minDate={new Date('2017-01-01')}
                    onChange={(newValue) => {
                        setEndDate(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
                {startDate?.toISOString().slice(0, 10)}
                <br />
                {endDate?.toISOString().slice(0, 10)}
            </Stack>
        </LocalizationProvider>
    );
}
