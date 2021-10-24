import { useState, useEffect, useContext } from 'react';
import { Grid } from '@material-ui/core';
import { departametsArray } from '../data/data';
import { getNombresProvincias, getCountByDepPro, getCountByDepartamaments, getCountByDeMun } from '../provider/analysisServices';
import { Graficos } from './Graficos';
import { CountDepProMun } from '../interfaces/countProvinceDepartamento.interface';
import { ComboBoxDepartamentos } from './widgets/ComboBoxDepartamentos';
import { DatePickerWidget } from './widgets/DatePickerWidget';
import { HeatSourcesContext } from '../context/HeatSources/HeatSourceContext';
import { SwitchWidget } from './widgets/SwitchWidget';

interface SearchProps {
    typo: string,
}
export const SearchProvincias = ({ typo }: SearchProps) => {

    const { datesAvailable, showProvMun } = useContext(HeatSourcesContext);
    const [loading, setLoading] = useState<boolean>(false);
    const [showSwitch, setShowSwitch] = useState<boolean>(true);

    const [departamentoProvincia, setDepartamentoProvincia] = useState({
        departamentSelected: departametsArray[0].name,
        provinciaSelected: '',
        todosDepartamentos: false,
    });

    const [countDepProv, setCountDepProv] = useState<CountDepProMun>({
        ok: false,
        resp: []
    });
    const [dateSelectedStart, setDateSelectedStart] = useState<Date>(datesAvailable[1]);
    const [dateSelectedEnd, setDateSelectedEnd] = useState<Date>(datesAvailable[1]);


    useEffect(() => {
        const getProvinciasNamesService = async () => {
            setLoading(true);
            const provinciasList = await getNombresProvincias(departamentoProvincia.departamentSelected);
            setDepartamentoProvincia({ ...departamentoProvincia, provinciaSelected: provinciasList.resp[0].nombre_provincia })
            setLoading(false);
        }
        if (!departamentoProvincia.todosDepartamentos) {
            getProvinciasNamesService();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [departamentoProvincia.departamentSelected]);

    useEffect(() => {
        const getProvinciasNamesService = async () => {
            setLoading(true);
            const depProvList = await getCountByDepPro({
                dateStart: dateSelectedStart.toISOString().slice(0, 10),
                dateEnd: dateSelectedEnd.toISOString().slice(0, 10),
                departamento: departamentoProvincia.departamentSelected,
            });
            setCountDepProv(depProvList);
            setLoading(false);
        }
        const getDepartamentosNamesService = async () => {
            setLoading(true);
            const depList = await getCountByDepartamaments({
                dateStart: dateSelectedStart.toISOString().slice(0, 10),
                dateEnd: dateSelectedEnd.toISOString().slice(0, 10),
            });
            setCountDepProv(depList);
            setLoading(false);
        }
        const getMunicipiosServices = async () => {
            setLoading(true);
            const depMunList = await getCountByDeMun({
                dateStart: dateSelectedStart.toISOString().slice(0, 10),
                dateEnd: dateSelectedEnd.toISOString().slice(0, 10),
                departamento: departamentoProvincia.departamentSelected,

            });
            setCountDepProv(depMunList);
            setLoading(false);
        }
        if (departamentoProvincia.todosDepartamentos) {
            getDepartamentosNamesService();
        } else if(showProvMun){
            getMunicipiosServices();
        }else {
            getProvinciasNamesService();

        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [departamentoProvincia.departamentSelected]);


    return (
        <div>
            <Grid container spacing={6}>
                <Grid item xs={6}>
                    <ComboBoxDepartamentos
                        nameDepartament={departamentoProvincia.departamentSelected}
                        setState={setDepartamentoProvincia}
                    />
                    {showSwitch && <SwitchWidget />}
                    
                </Grid>
                <Grid item xs={6}>
                    <DatePickerWidget
                        state={dateSelectedStart}
                        setDate={setDateSelectedStart}
                        title="Inicio"
                    />
                    <DatePickerWidget
                        state={dateSelectedEnd}
                        setDate={setDateSelectedEnd}
                        title="Fin"
                    />
                </Grid>
            </Grid>

            <Graficos
                info={countDepProv}
                loading={loading}
                nombreDepartamento={
                    departamentoProvincia.departamentSelected}
            />
        </div >
    )
}
