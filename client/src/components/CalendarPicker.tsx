import { useState, Fragment } from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Stack from '@mui/material/Stack';
import { Box, InputLabel, FormControl, MenuItem, Button, TextField } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Grid } from '@material-ui/core';
import { useReport } from '../hooks/useReport';

import {
    LocalizationProvider,
    DesktopDatePicker
} from '@mui/lab';
import moment from 'moment'
import 'moment/locale/es'  // without this line it didn't work
moment.locale('es')

export default function ResponsiveDatePickers() {
    const {
        generateCVSreport,
        generateGeoJsonReport,
        generatePdfReport,
        generateShapeFile,
    } = useReport();

    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [endDate, setEndDate] = useState<Date | null>(new Date());

    const [typeFile, setTypeFile] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setTypeFile(event.target.value as string);
    };

    const dowloadFileSelected = () => {
        switch (typeFile) {
            case 'PDF':
                return generatePdfReport(new Date());

            case 'CSV':
                return generateCVSreport(startDate!, endDate!);

            case 'ShapeFile':
                return generateShapeFile(startDate!, endDate!);

            case 'GeoJson':
                generateGeoJsonReport(startDate!, endDate!)
                break;
            default:
                break;
        }
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Stack spacing={3}>
                        <DesktopDatePicker
                            inputFormat="dd/MM/yyyy"
                            label="Desde"
                            value={startDate}
                            minDate={new Date('2017-01-01')}
                            onChange={(newValue) => {
                                setStartDate(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />

                        <DesktopDatePicker
                            inputFormat="dd/MM/yyyy"
                            label="Hasta"
                            value={endDate}
                            minDate={new Date('2017-01-01')}
                            onChange={(newValue) => {
                                setEndDate(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />

                    </Stack>
                </LocalizationProvider>
            </Grid>
            <Grid item xs={6}>
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Seleccionar descarga</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={typeFile}
                            label="Age"
                            onChange={handleChange}
                        >
                            <MenuItem value="PDF">Reporte PDF</MenuItem>
                            <MenuItem value="GeoJson">GeoJson File</MenuItem>
                            <MenuItem value="ShapeFile">ShapeFile</MenuItem>
                            <MenuItem value="CSV">CSV</MenuItem>
                        </Select>
                    </FormControl>
                    {typeFile !== '' &&
                        <Fragment>
                            Descargar Archivo {typeFile} <br />
                            Desde: <b>{moment(startDate).format('LL')}</b>
                            <br />
                            hasta: 
                            <b> {moment(endDate).format('LL')}</b>
                            <br />
                            <Button
                                onClick={dowloadFileSelected}
                                variant="contained">
                                Descargar archivo {typeFile}
                            </Button>
                        </Fragment>
                    }

                </Box>
            </Grid>
        </Grid>
    );
}
