import { baseURL, serverAPI } from './serverProvider';
import { DatesResponse } from '../interfaces/datesResponse';
import { saveAs } from 'file-saver';
import { setFileName } from '../utils/utils';

export const getDates = async () => {
    const { data } = await serverAPI.get<DatesResponse>('/analysis/dates');
    return data;

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
export const downloadShapeFile = async (dateStart: string, dateEnd: string) => {
    const url = `${baseURL}/reports/getshapefile/${dateStart}/${dateEnd}`;
    const openWindow = window.open(url, '_blank');
    if (openWindow) {
        openWindow.focus();
    }
}


export const consultByDeparments = async (dateEnd: string, dateStart: string, departamentSelected: string) => {
    const resp = await serverAPI.post('/maps/getheatsourcesbydeparment', {
        dateEnd,
        dateStart,
        departament: departamentSelected,
    });

    return resp.data;
};
interface HottestByDeparament {
    dateStart: string;
    dateEnd: string;
    departamento: string;
    orderBy: 'asc' | 'desc';
    limit: number;
}
export const getnHeatSourceByDepartament = async (hottestbydeparament: HottestByDeparament) => {
    const resp = await serverAPI.post('/analysis/getnheatsourcebydepartament', {
        ...hottestbydeparament
    });

    return resp.data;
};



