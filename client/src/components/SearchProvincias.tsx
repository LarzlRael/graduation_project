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

export const SearchProvincias = () => {

    const { datesAvailable, showProvMun } = useContext(HeatSourcesContext);
    const [showSwitch, setShowSwitch] = useState<boolean>(true);

    const [departamentoProvincia, setDepartamentoProvincia] = useState({
        departamentSelected: departametsArray[0].name,
        provinciaSelected: '',
        todosDepartamentos: false,
    });

    const [countDepProvState, setCountDepProvState] = useState<CountDepProMun>({
        ok: false,
        resp: []
    });
    const [dateSelectedStart, setDateSelectedStart] = useState<Date>(datesAvailable[1]);
    const [dateSelectedEnd, setDateSelectedEnd] = useState<Date>(datesAvailable[1]);
    const [loading, setLoading] = useState(false);

    const getProvinciasNamesService = async () => {
        setLoading(true);
        setCountDepProvState(
            await getCountByDepPro({
                dateStart: dateSelectedStart.toISOString().slice(0, 10),
                dateEnd: dateSelectedEnd.toISOString().slice(0, 10),
                departamento: departamentoProvincia.departamentSelected,
            })
        );
        setLoading(false);

    }

    const getDepartamentosNamesService = async () => {
        setLoading(true);

        setCountDepProvState(await getCountByDepartamaments({
            dateStart: dateSelectedStart.toISOString().slice(0, 10),
            dateEnd: dateSelectedEnd.toISOString().slice(0, 10),
        }));
        setLoading(false);

    }
    const getMunicipiosServices = async () => {
        setLoading(true);
        setCountDepProvState(await getCountByDeMun({
            dateStart: dateSelectedStart.toISOString().slice(0, 10),
            dateEnd: dateSelectedEnd.toISOString().slice(0, 10),
            departamento: departamentoProvincia.departamentSelected,
        }))
        setLoading(false);
    }
    useEffect(() => {

        if (departamentoProvincia.todosDepartamentos) {
            getDepartamentosNamesService();
        } else if (showProvMun) {
            getMunicipiosServices();
        } else {
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
                info={countDepProvState}
                loading={loading}
                nombreDepartamento={
                    departamentoProvincia.departamentSelected}
            />
        </div >
    )
}
