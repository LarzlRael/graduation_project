
import { CustomDateRangePickerDay } from '../components/public/DatePicker';
import { Layout } from '../components/Layout';
import ResponsiveDatePickers from '../components/CalendarPicker';

export const ReportsLists = () => {


    return (
        <Layout>
            <h3>Seleccionar fecha en el calendario</h3>
            <CustomDateRangePickerDay />

            <h3>Escribir fecha manualmente</h3>
        <br />
            <ResponsiveDatePickers />

        </Layout>
    )
}


