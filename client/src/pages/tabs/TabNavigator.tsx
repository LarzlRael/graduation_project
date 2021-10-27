import { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import { MapBoxLayer } from '../../components/mapbox/MapBoxLayer';

import { Municipios } from './Municipios';
import { Provincias } from './Provincias';
import { HeatSourcesContext } from '../../context/HeatSources/HeatSourceContext';

export const TabNavigator = () => {
    const { tab, setChangeTab } = useContext(HeatSourcesContext);

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setChangeTab(parseInt(newValue));
    };

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={tab.toString()}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Departamentos" value="1" />
                        <Tab label="Graficos por meses" value="2" />
                        <Tab label="Graficos por departamentos" value="3" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <MapBoxLayer />
                </TabPanel>
                <TabPanel value="2">
                    <Municipios />
                </TabPanel>
                <TabPanel value="3">
                    <Provincias />
                </TabPanel>
            </TabContext>
        </Box>
    );
}
