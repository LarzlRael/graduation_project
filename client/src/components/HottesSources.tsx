import { getnHeatSourceByDepartament } from '../provider/services';
import { useEffect } from 'react';

export const HottesSources = () => {
    const getSoruces = async () => {
        const departamentInfo = await getnHeatSourceByDepartament({
            dateEnd: '2021-09-01',
            dateStart: '2021-09-01',
            departamento: 'Santa Cruz',
            limit: 5,
            orderBy: 'desc',
        });
        console.log(departamentInfo);
    }
    useEffect(() => {
        getSoruces()

    }, [])
    return (
        <div>
            graficos we
        </div>
    )
}
