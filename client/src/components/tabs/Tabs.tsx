import { useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { MapBoxLayer } from '../mapbox/MapBoxLayer';

import { Municipios } from './Municipios';
import { Provincias } from './Provincias';

export default function LabTabs() {
    const [value, setValue] = useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Departamentos" value="1" />
                        <Tab label="Provincias" value="2" />
                        <Tab label="Municipios" value="3" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <MapBoxLayer />
                </TabPanel>
                <TabPanel value="2">
                    <Provincias />
                </TabPanel>
                <TabPanel value="3">
                    <Municipios />
                </TabPanel>
            </TabContext>
        </Box>
    );
}
