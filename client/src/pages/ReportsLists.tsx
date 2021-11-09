
import { CustomDateRangePickerDay } from '../components/public/DatePicker';
import { Layout } from '../components/Layout';
import { ResponsiveDatePickers } from '../components/CalendarPicker';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export const ReportsLists = () => {

    useDocumentTitle('Descargas');

    return (
        <Layout>
            <h3>Seleccionar fecha en el calendario</h3>
            <CustomDateRangePickerDay />

            <h3>Escribir fecha manualmente</h3>
            <ResponsiveDatePickers />
        </Layout>
    )
}


