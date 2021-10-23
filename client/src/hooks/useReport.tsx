import { useEffect, useState, useContext } from 'react';
import jsPDF from 'jspdf';
import { convertirFecha } from '../utils/utils';
import { getCVSreport, getReportGeoJsonByDate, downloadShapeFile } from '../provider/reportsServices';
import { HeatSourcesContext } from '../context/HeatSources/HeatSourceContext';
// Create Document Component

export const useReport = () => {

    const { datesAvailable: dates } = useContext(HeatSourcesContext);
    const [dateFromTo, setDates] = useState<Date[]>();
    const [loading, setLoading] = useState<boolean>();

    useEffect(() => {
        setStatus();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const setStatus = async () => {

        if (!loading) {
            setDates([new Date(dates[0]), new Date(dates[1])]);
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
    }


}