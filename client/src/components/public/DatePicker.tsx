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
import { es } from "date-fns/locale";
import { Button } from '@mui/material';
import { useReport } from '../../hooks/useReport';
import { FaFileCsv, FaFilePdf, FaCalendarAlt } from "react-icons/fa";
import { VscJson } from "react-icons/vsc";
import { CircularProgress } from '@material-ui/core';
import moment from 'moment'
import 'moment/locale/es'  // without this line it didn't work
moment.locale('es')


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
        generateShapeFile,
        loading
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
    /* const transformDate = (date: Date) => {
        convertirFecha(date);
    } */
    const date = new Date();
    const size = '1.2rem';
    return (
        <div className="calendar-buttons">

            <LocalizationProvider dateAdapter={AdapterDateFns} locale={es}>
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

            <div className="buttons-groups">

                <Button
                    disabled={loading}
                    onClick={() =>
                        generatePdfReport(dates[0]!)
                    }
                    variant="outlined" >
                    <FaFilePdf
                        color="#f40f02"
                        size={size}
                    />Descargar Reporte PDF
                </Button>
                <Button
                    disabled={loading}
                    onClick={() =>
                        generateCVSreport(dates[0]!, dates[1]!)
                    }
                    variant="outlined" >
                    <FaFileCsv
                        size={size}
                    />
                    Descargar CSV
                </Button>
                <Button
                    disabled={loading}
                    onClick={() => generateGeoJsonReport(dates[0]!, dates[1]!)}
                    variant="outlined" >
                    <VscJson
                        color="#201b1b"
                        size={size}
                    />
                    Descargar GeoJson
                </Button>
                <Button
                    disabled={loading}
                    onClick={() => generateShapeFile(dates[0]!, dates[1]!)}
                    variant="outlined" >
                    <VscJson
                        color="#201b1b"
                        size={size}
                    />
                    Descargar ShapeFile
                </Button>

                {loading && <CircularProgress />}
                <h2>Consultas entre fechas</h2>
                {dates.map((home, i) =>
                    <p>
                        {moment(home).format('LL')}
                    </p>
                )}
            </div>
        </div>
    );
}