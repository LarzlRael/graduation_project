
import { CustomDateRangePickerDay } from './DatePicker';
import { Layout } from '../Layout';
import ResponsiveDatePickers from '../CalendarPicker';

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


