import { useState, useEffect } from 'react';
import { departametsArray } from '../data/data';
import { getRankDate } from '../utils/utils';
import { consultByDeparments } from '../provider/services';
import { getNombresProvincias, getNombresMunicipios } from '../provider/analysisServices';
import { Resp as ResProv } from '../interfaces/provinciasResponse.interface';
import { Resp as ResMun } from '../interfaces/municipiosResponse.interface';

export const useFocosCalor = () => {

    const [viewport, setViewport] = useState({
        width: "fit",
        height: 800,
        longitude: -66.2137434,
        latitude: -17.390915,
        zoom: 5
    });

    const [loading, setLoading] = useState(false);
    const [focosDeCalor, setfocosDeCalor] = useState({});
    const [selecteDepartament, setSelecteDepartament] = useState({
        departamentSelected: '',
        image: '',
    });

    const [selecteDepartamentCopy, setSelecteDepartamentCopy] = useState({
        departamentSelected: departametsArray[0].name,
        image: departametsArray[0].imageUrl,
    });

    const [selectedDate, setSelectedDay] = useState({
        selectedDate: new Date(),
        rank: getRankDate('today', new Date()),
    });

    const [stateArrMunProv, setArrMunProv] = useState<{
        sArrayPro: ResProv[];
        sArrayMu: ResMun[];
    }>({
        sArrayPro: [],
        sArrayMu: [],
    });


    const onChange = (e: any) => {
        const index = e.target.value;
        setSelecteDepartament({
            ...selecteDepartament,
            departamentSelected: departametsArray[index].name,
            image: departametsArray[index].imageUrl,
        });
    }

    const layerStyle = {
        id: 'point',
        type: 'circle',
        paint: {
            'circle-radius': [
                'interpolate',
                ['linear'],
                ['zoom'],
                10,
                ['/', ['-', 2017, ['number', ['get', 'brightness'], 2017]], 750],
                13,
                ['/', ['-', 2017, ['number', ['get', 'brightness'], 2017]], 30]
            ],
            'circle-opacity': 0.8,
            'circle-color': 'rgb(145, 0, 16)'
        }
    };
    const consultar = async (rango = 'today') => {

        switch (rango) {
            case 'today':
                setSelectedDay({ ...selectedDate, rank: getRankDate('today', selectedDate.selectedDate) });
                break;
            case '24hr':
                setSelectedDay({ ...selectedDate, rank: getRankDate('24hrs', selectedDate.selectedDate) });
                break;
            case 'week':
                setSelectedDay({ ...selectedDate, rank: getRankDate('week', selectedDate.selectedDate) });
                break;
            case 'oneMounth':
                setSelectedDay({ ...selectedDate, rank: getRankDate('oneMounth', selectedDate.selectedDate) });
                break;

            default:
                break;
        }
        setLoading(true);
    }

    useEffect(() => {
        setSelecteDepartament({
            departamentSelected: departametsArray[0].name,
            image: departametsArray[0].imageUrl,
        })
        consultar()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {

        const consultar = async () => {
            const queryResult = await consultByDeparments(selectedDate.selectedDate.toISOString().slice(0, 10), selectedDate.rank, selecteDepartament.departamentSelected);
            setfocosDeCalor(queryResult);
            setLoading(false);
            setSelecteDepartamentCopy({ ...selecteDepartamentCopy, departamentSelected: selecteDepartament.departamentSelected, image: selecteDepartament.image });
        }
        if (loading === true) {
            consultar();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading]);

    const [provMunSelected, setProvMunSelected] = useState({
        provincia: '',
        municipio: ''
    });


    useEffect(() => {
        const getArray = async () => {
            const arrayProvinciasList = await getNombresProvincias(selecteDepartament.departamentSelected);
            const arrayMunicipiosList = await getNombresMunicipios(selecteDepartament.departamentSelected);
            setArrMunProv({
                ...stateArrMunProv,
                sArrayMu: arrayMunicipiosList.resp,
                sArrayPro: arrayProvinciasList.resp,
            });
        }
        getArray();
    }, [selecteDepartament.departamentSelected]);

    useEffect(() => {
        setProvMunSelected({
            ...provMunSelected,
            municipio: stateArrMunProv.sArrayMu[0] ? stateArrMunProv.sArrayMu[0].nombre_municipio : '',
            provincia: stateArrMunProv.sArrayPro[0] ? stateArrMunProv.sArrayPro[0].nombre_provincia : '',
        })

    }, [selecteDepartament.departamentSelected]);
    return {
        viewport,
        setViewport,
        loading,
        onChange,
        focosDeCalor,
        selecteDepartamentCopy,
        selecteDepartament,
        selectedDate,
        setSelectedDay,
        layerStyle,
        consultar,
        stateArrMunProv,
        provMunSelected,
        setProvMunSelected
    }
}
