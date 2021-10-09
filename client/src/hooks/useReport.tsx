import { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import { getDates, getCVSreport, getReportGeoJsonByDate, downloadShapeFile } from '../provider/services';
import { Report } from '../interfaces/reportsInterface';
import { convertirFecha } from '../utils/utils';
// Create Document Component

export const useReport = () => {

    const [dateFromTo, setDates] = useState<Date[]>();
    const [loading, setLoading] = useState<boolean>();
    const [diffDays, setdiffDays] = useState<number>(0);


    useEffect(() => {
        setStatus();
    }, []);

    const setStatus = async () => {
        setLoading(true);
        const dates = await getDates();
        setLoading(false);

        if (!loading) {
            const date1 = new Date(dates.dates[0]);
            const date2 = new Date(dates.dates[1]);
            setDates([date1, date2]);
            const diff = Math.abs(date1.getTime() - date2.getTime());
            const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
            setdiffDays(diffDays)
        }

    }



    const generateCVSreport = async (dateStart: Date, dateEnd: Date) => {
        setLoading(true);
        await getCVSreport(
            dateStart.toISOString().slice(0, 10),
            dateEnd.toISOString().slice(0, 10));
        setLoading(false);
    }

    const generateGeoJsonReport = async (dateStart: Date, dateEnd: Date) => {
        setLoading(true);
        const getGeoJsonReport = await getReportGeoJsonByDate(
            dateStart.toISOString().slice(0, 10),
            dateEnd.toISOString().slice(0, 10));
        setLoading(false);
        return getGeoJsonReport;

    }

    const generatePdfReport = (dateToconsult: Date) => {
        setLoading(true);
        const newDate = convertirFecha(dateToconsult)
        const doc = new jsPDF('portrait', 'px', 'letter', false);
        //TODo generar el informe pdf
        setLoading(false);
        doc.save(`reporte${newDate}.pdf`);
    }
    const generateShapeFile = async (dateStart: Date, dateEnd: Date) => {
        setLoading(true);
        await downloadShapeFile(
            dateStart.toISOString().slice(0, 10),
            dateEnd.toISOString().slice(0, 10));
        setLoading(false);
    }


    return {
        generateCVSreport,
        generateGeoJsonReport,
        generatePdfReport,
        generateShapeFile,
        loading,
        dateFromTo,
        diffDays
    }


}