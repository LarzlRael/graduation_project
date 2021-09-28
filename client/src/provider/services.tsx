import { serverAPI } from './serverProvider';
import { DatesResponse } from '../interfaces/datesResponse';
import { saveAs } from 'file-saver';
import { setFileName } from '../utils/utils';

export const getDates = async (): Promise<DatesResponse> => {
    const { data } = await serverAPI.get<DatesResponse>('/analysis/dates');
    return data;
}

export const getHigherOrLowerByDate = async (date: string): Promise<DatesResponse> => {
    const { data } = await serverAPI.get<DatesResponse>('/analysis/dates');
    return data;
}

export const getCVSreport = async (date: string) => {

    const response = await serverAPI.get(`reports/getreportcvs/${date}`);
    let blob = new Blob([response.data.csv]);
    saveAs(blob, `reporte ${setFileName(date)}.csv`);

}

export const getReportGeoJsonByDate = async (date: string) => {
    /* window.location.href = `${baseURL}/reports/geojsonreport/${date}`; */
    const response = await serverAPI.get(`reports/geojsonreport/${date}`, {
        responseType: 'blob',
    });
    let blob = new Blob([response.data]);
    saveAs(blob, `reporte ${setFileName(date)}.geojson`);

}

export const getCVSreportByTwoDates = async (dateStart: string, dateEnd: string) => {

    const response = await serverAPI.get(`getreportcvsbytwodates/${dateStart}/${dateEnd}`);
    let blob = new Blob([response.data.csv]);
    saveAs(blob, `${setFileName(dateStart, dateEnd)}.csv`);
}

export const getReportGeoJsonByTwoDates = async (dateStart: string, dateEnd: string) => {

    const response = await serverAPI.get(`reports/geojsonreportbytwodays/${dateStart}/${dateEnd}`, {
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