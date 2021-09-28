import { useState, useEffect } from 'react'
import { DatesResponse } from '../../interfaces/datesResponse';
import { getDates } from '../../provider/services';
import { v4 as uuidv4 } from 'uuid';
import { useReport } from '../../hooks/useReport';
import { convertirFecha } from '../../utils/utils';


export const ConsultByDate = () => {


    const { generateCVSreport, generateGeoJsonReport, generatePdfReport, dates } = useReport();

    const reportCVS = async (fecha: Date) => {
        await generateCVSreport(fecha.toString().slice(0, 10))
    }
    const reportGEOJSON = (fecha: Date) => {
        generateGeoJsonReport(fecha.toString().slice(0, 10));
    }
    const consultByDate = (date: Date) => {
        generatePdfReport(convertirFecha(date));
    }
    return (
        <div>
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
        </div>
    )
}
