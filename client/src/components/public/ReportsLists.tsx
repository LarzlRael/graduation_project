import { useState, useEffect } from 'react'
import { DatesResponse } from '../../interfaces/datesResponse';
import { getDates } from '../../provider/services';
import { v4 as uuidv4 } from 'uuid';
import { useReport } from '../../hooks/useReport';
import { convertirFecha } from '../../utils/utils';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { CircularProgress, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip }
    from '@material-ui/core';
import TextField from '@mui/material/TextField';

import { FaFileCsv, FaFilePdf, FaCalendarAlt } from "react-icons/fa";
import { VscJson } from "react-icons/vsc";
import { CustomDateRangePickerDay } from './DatePicker';
import { Layout } from '../Layout';
import { Header } from './landingPage/Header';
import { Pagination } from '../Pagination';
import { DesktopDatePicker } from '@mui/lab';
import ResponsiveDatePickers from '../CalendarPicker';

export const ReportsLists = () => {

    const {
        generateCVSreport,
        generateGeoJsonReport,
        generatePdfReport,
        dates,
        diffDays
    } = useReport();


    const [value, setValue] = useState<Date | null>(new Date());
    return (
        <Layout>
            <Header />
            <CustomDateRangePickerDay />


            <ResponsiveDatePickers />


        </Layout>
    )
}


