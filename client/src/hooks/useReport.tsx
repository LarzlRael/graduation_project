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

    const generateCVSreport = async (date: string) => {
        await getCVSreport(date);

    }
    const generateGeoJsonReport = async (date: string) => {
        const getGeoJsonReport = await getReportGeoJsonByDate(date);
        return getGeoJsonReport;
    }


    const generatePdfReport = (dateToconsult: string) => {
        const doc = new jsPDF('portrait', 'px', 'letter', false);
        dates?.dates.map((date, i) => {
            doc.text(convertirFecha(date), 30, i * 20);
        })
        doc.save(`reporte${dateToconsult}.pdf`);
    }
    return {
        generatePdfReport,
        generateCVSreport,
        generateGeoJsonReport,
        dates
    }


}