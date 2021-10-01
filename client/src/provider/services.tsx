import { serverAPI } from './serverProvider';
import { DatesResponse } from '../interfaces/datesResponse';
import { saveAs } from 'file-saver';
import { setFileName } from '../utils/utils';

export const getDates = async () => {
    const { data } = await serverAPI.get<DatesResponse>('/analysis/dates');
    return data;
    /* console.log(data.dates[0].getTime() , data.dates[1].getTime()); */
    /* var diff = Math.abs(data.dates[0].getTime() - data.dates[1].getTime());
    var diffDays = Math.ceil(diff / (1000 * 3600 * 24)); */
    
}

export const getHigherOrLowerByDate = async (date: string): Promise<DatesResponse> => {
    const { data } = await serverAPI.get<DatesResponse>('/analysis/dates');
    return data;
}

export const getCVSreport = async (dateStart: string, dateEnd?: string) => {

    const query = `reports/getreportcvs/${dateStart}/${dateEnd !== null ? dateEnd : dateStart}`;
    const response = await serverAPI.get(query);

    let blob = new Blob([response.data.csv]);
    saveAs(blob, `reporte ${setFileName(dateStart, dateEnd)}.csv`);
}

export const getReportGeoJsonByDate = async (dateStart: string, dateEnd?: string) => {

    const query = `reports/geojsonreport/${dateStart}/${dateEnd !== null ? dateEnd : dateStart}`;
    const response = await serverAPI.get(query, {
        responseType: 'blob',
    });

    let blob = new Blob([response.data]);
    saveAs(blob, `reporte ${setFileName(dateStart, dateEnd)}.geojson`);
}

export const uploadFileCVS = async (file: File): Promise<string> => {
    let formData = new FormData();
    formData.append('csv', file);
    try {
        const response = await serverAPI.post('maps/uploadcsvupdate', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log(response);
        if (response.status === 200 || response.status === 201) {
            return response.data.msg;
        } else {
            return 'Hubo un error al subir el archivo';
        }

    } catch (error) {
        return 'Hubo un error al subir el archivo';
    }

}