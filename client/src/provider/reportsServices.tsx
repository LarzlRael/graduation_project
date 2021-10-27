
import { saveAs } from 'file-saver';
import { setFileName } from '../utils/utils';
import { baseURL, serverAPI } from './serverConfig';

export const downloadShapeFile = async (dateStart: string, dateEnd: string) => {
    const url = `${baseURL}/reports/getshapefile/${dateStart}/${dateEnd}`;
    const openWindow = window.open(url, '_blank');
    if (openWindow) {
        openWindow.focus();
    }
}

export const getReportGeoJsonByDate = async (dateStart: string, dateEnd?: string) => {

    const query = `reports/geojsonreport/${dateStart}/${dateEnd !== null ? dateEnd : dateStart}`;
    const response = await serverAPI.get(query, {
        responseType: 'blob',
    });

    let blob = new Blob([response.data]);
    saveAs(blob, `reporte ${setFileName(dateStart, dateEnd)}.geojson`);
}

export const getCVSreport = async (dateStart: string, dateEnd?: string) => {

    const query = `reports/getreportcvs/${dateStart}/${dateEnd !== null ? dateEnd : dateStart}`;
    const response = await serverAPI.get(query);

    let blob = new Blob([response.data.csv]);
    saveAs(blob, `reporte ${setFileName(dateStart, dateEnd)}.csv`);
}

export const uploadFileCVS = async (files: FileList): Promise<string> => {
    let formData = new FormData();

    for (let i = 0; i < files.length; i++) {
        formData.append('csv', files[i]);
    }
    try {
        const response = await serverAPI.post('maps/uploadcsvupdate', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        if (response.status === 200 || response.status === 201) {
            return response.data.msg;
        } else {
            return 'Hubo un error al subir el archivo';
        }

    } catch (error) {
        return 'Hubo un error al subir el archivo';
    }
}
