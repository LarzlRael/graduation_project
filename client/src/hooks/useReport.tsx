import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import { getDates, getCVSreport, getReportGeoJsonByDate } from '../provider/services';
import { DatesResponse } from '../interfaces/datesResponse';
import { Report } from '../interfaces/reportsInterface';
import { convertirFecha } from '../utils/utils';
// Create Document Component

export const useReport = () => {

    const [dates, setDates] = useState<DatesResponse>();

    useEffect(() => {
        const setStatus = async () => {
            const dates = await getDates();
            setDates(dates);
        }
        setStatus();
    }, []);

    const generateCVSreport = async (fecha: Date) => {
        const date = fecha.toString().slice(0, 10)
        await getCVSreport(date);

    }
    const generateGeoJsonReport = async (fecha: Date) => {
        const date = fecha.toString().slice(0, 10)
        const getGeoJsonReport = await getReportGeoJsonByDate(date.toString().slice(0, 10));
        return getGeoJsonReport;
    }

    const generatePdfReport = (dateToconsult: Date) => {
        const newDate = convertirFecha(dateToconsult)
        const doc = new jsPDF('portrait', 'px', 'letter', false);
        dates?.dates.map((date, i) => {
            doc.text(convertirFecha(date), 30, i * 20);
        })
        doc.save(`reporte${newDate}.pdf`);
    }


    return {
        generateCVSreport,
        generateGeoJsonReport,
        generatePdfReport,
        dates
    }


}