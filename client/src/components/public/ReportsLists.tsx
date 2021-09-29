import { useState, useEffect } from 'react'
import { DatesResponse } from '../../interfaces/datesResponse';
import { getDates } from '../../provider/services';
import { v4 as uuidv4 } from 'uuid';
import { useReport } from '../../hooks/useReport';
import { convertirFecha } from '../../utils/utils';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { CircularProgress, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip }
    from '@material-ui/core';


import { FaFileCsv, FaFilePdf, FaCalendarAlt } from "react-icons/fa";
import { VscJson } from "react-icons/vsc";
import { CustomDateRangePickerDay } from './DatePicker';


export const ReportsLists = () => {


    const {
        generateCVSreport,
        generateGeoJsonReport,
        generatePdfReport,
        dates
    } = useReport();


    const size = '30px';
    return (
        <div>
            {/* <DataGridDemo />
            {dates?.dates.map(fecha => (
                <div key={uuidv4()} >
                    <p >
                        {convertirFecha(fecha)}
                        <span onClick={() => { consultByDate(fecha) }}>Report PDF &nbsp;</span>
                        <span onClick={() => { reportGEOJSON(fecha) }} >GeoJson &nbsp;</span>
                        <span onClick={() => { reportCVS(fecha) }}>CVS &nbsp;</span>
                    </p>
                </div>
            ))
            }
 */}
            <CustomDateRangePickerDay />

            {dates ?
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Fechas Disponibles</TableCell>
                                <TableCell align="left">Descargar Reportes PDF</TableCell>
                                <TableCell align="left">Descargar GEOJSON</TableCell>
                                <TableCell align="left">Descargar CVS</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dates?.dates.map((fecha) => (
                                <TableRow>
                                    {/*                                 <TableCell component="th" scope="row">

                        </TableCell> */}
                                    <TableCell
                                        align="left">
                                        <div className="align-calendar">
                                            <FaCalendarAlt
                                                color="#211613"
                                                size={size} />
                                            <span>&nbsp;{convertirFecha(fecha)}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell align="left">
                                        <Tooltip title="Descargar PDF">
                                            <FaFilePdf
                                                color="#f40f02"
                                                size={size}
                                                onClick={() => { generatePdfReport(fecha) }}
                                            />
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell align="left">
                                        <Tooltip title="Descargar GEOJSON">
                                            <VscJson
                                                color="#201b1b"
                                                size={size}
                                                onClick={() => { generateGeoJsonReport(fecha) }}
                                            />
                                        </Tooltip>

                                    </TableCell>
                                    <TableCell align="left">
                                        <Tooltip
                                            color="#2174B5"
                                            title="Descargar CSV">
                                            <FaFileCsv
                                                onClick={() => { generateCVSreport(fecha) }}
                                                size={size}
                                            />
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                :
                <CircularProgress />
            }

        </div>
    )
}


