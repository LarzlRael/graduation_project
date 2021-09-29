import { useState, Fragment } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { DateRange } from '@mui/lab/DateRangePicker';
import StaticDateRangePicker from '@mui/lab/StaticDateRangePicker';
import MuiDateRangePickerDay, {
    DateRangePickerDayProps,
} from '@mui/lab/DateRangePickerDay';

import { Button } from '@mui/material';
import { useReport } from '../../hooks/useReport';
import { getReportGeoJsonByTwoDates } from '../../provider/services';

const DateRangePickerDay = styled(MuiDateRangePickerDay)(
    ({ theme, isHighlighting, isStartOfHighlighting, isEndOfHighlighting }) => ({
        ...(isHighlighting && {
            borderRadius: 0,
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
            '&:hover, &:focus': {
                backgroundColor: theme.palette.primary.dark,
            },
        }),
        ...(isStartOfHighlighting && {
            borderTopLeftRadius: '50%',
            borderBottomLeftRadius: '50%',
        }),
        ...(isEndOfHighlighting && {
            borderTopRightRadius: '50%',
            borderBottomRightRadius: '50%',
        }),
    }),
) as React.ComponentType<DateRangePickerDayProps<Date>>;

export const CustomDateRangePickerDay = () => {
    const [dates, setValue] = useState<DateRange<Date>>([new Date(), new Date()]);
    const {
        generateCVSreport,
        generateGeoJsonReport,
        generatePdfReport,
        dates: datesDB
    } = useReport();

    const renderWeekPickerDay = (
        date: Date,
        dateRangePickerDayProps: DateRangePickerDayProps<Date>,
    ) => {
        return <DateRangePickerDay {...dateRangePickerDayProps} />;
    };

    const onChange = (value: any) => {
        console.log(value[0].toISOString().slice(0, 10));
        setValue(value);
    }

    const date = new Date();

    return (
        <Fragment>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <StaticDateRangePicker
                    displayStaticWrapperAs="desktop"
                    label="date range"
                    value={dates}
                    maxDate={date}
                    onChange={(newValue) => onChange(newValue)}
                    renderDay={renderWeekPickerDay}
                    renderInput={(startProps, endProps) => (
                        <Fragment>
                            <TextField {...startProps} />
                            <Box sx={{ mx: 2 }}> to </Box>
                            <TextField {...endProps} />
                        </Fragment>
                    )}
                />
            </LocalizationProvider>

            {dates.map(home => <div>{home?.toDateString()}</div>)}
            <Button variant="outlined" >
                Descargar Reporte PDF
            </Button>
            <Button variant="outlined" >
                Descargar Reporte CSV
            </Button>
            <Button variant="outlined" >
                Descargar GeoJson
            </Button>
        </Fragment>
    );
}