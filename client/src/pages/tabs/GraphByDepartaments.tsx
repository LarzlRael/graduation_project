import { useState, useEffect, useContext } from 'react';
import { Grid } from '@material-ui/core';
import { departametsArray } from '../../data/data';
import { getCountByDepPro, getCountByDepartamaments, getCountByDeMun } from '../../provider/analysisServices';
import { Graficos } from '../../components/Graficos';
import { CountDepProMun } from '../../interfaces/countProvinceDepartamento.interface';
import { ComboBoxDepartamentos } from '../../components/widgets/ComboBoxDepartamentos';
import { HeatSourcesContext } from '../../context/HeatSources/HeatSourceContext';
import { SwitchWidget } from '../../components/widgets/SwitchWidget';
import { DatePickerRange } from '../../components/DatePickerRange';

export const GraphByDepartaments = () => {

    const { dateSelectedAndRange, showProvMun } = useContext
        (HeatSourcesContext);
    const { dateStart, dateEnd, findbyOneDate } = dateSelectedAndRange;
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
    console.log('render searcho provincias')
    const [loading, setLoading] = useState(false);

    const getProvinciasNamesService = async () => {

        const dateStartToQuery = dateStart.toISOString().slice(0, 10);
        const dateEndToQuery = findbyOneDate ? dateEnd.toISOString().slice(0, 10) : dateStart.toISOString().slice(0, 10);

        setCountDepProvState(
            await getCountByDepPro({
                dateStart: dateStartToQuery,
                dateEnd: dateEndToQuery,
                departamento: departamentoProvincia.departamentSelected,
            })
        );
        setLoading(false);
    }

    const getDepartamentosNamesService = async () => {

        const dateStartToQuery = dateStart.toISOString().slice(0, 10);
        const dateEndToQuery = findbyOneDate ? dateEnd.toISOString().slice(0, 10) : dateStart.toISOString().slice(0, 10);


        setCountDepProvState(await getCountByDepartamaments({
            dateStart: dateStartToQuery,
            dateEnd: dateEndToQuery,
        }));
        setLoading(false);
    }

    const getMunicipiosServices = async () => {

        const dateStartToQuery = dateStart.toISOString().slice(0, 10);
        const dateEndToQuery = findbyOneDate ? dateEnd.toISOString().slice(0, 10) : dateStart.toISOString().slice(0, 10);

        setCountDepProvState(await getCountByDeMun({
            dateStart: dateStartToQuery,
            dateEnd: dateEndToQuery,
            departamento: departamentoProvincia.departamentSelected,
        }))
        setLoading(false);
    }

    useEffect(() => {
        if (loading) {
            if (departamentoProvincia.todosDepartamentos) {
                getDepartamentosNamesService();
                setShowSwitch(false);
            } else if (showProvMun) {
                getMunicipiosServices();
                setShowSwitch(true);

            } else {
                getProvinciasNamesService();
                setShowSwitch(true);
                setShowSwitch(false);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading]);
    const consultar = () => {
        setLoading(true)
    }

    useEffect(() => {
        consultar()
    }, [])

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
                    
                    <DatePickerRange />

                    <button onClick={
                        consultar
                    }>Consultar</button>
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
