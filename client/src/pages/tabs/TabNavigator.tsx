import { useContext } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import { MapBoxLayer } from '../../components/mapbox/MapBoxLayer';
import { HeatSourcesContext } from '../../context/HeatSources/HeatSourceContext';
import { GraphByDepartaments } from './GraphByDepartaments';
import { GraphByMonths } from './GraphByMonths';

export const TabNavigator = () => {
    const { tab, setChangeTab } = useContext(HeatSourcesContext);

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setChangeTab(parseInt(newValue));
    };

    return (
        <div className="tabContext">
            <TabContext value={tab.toString()}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange}
                        variant="scrollable">
                        <Tab color="white" label="Departamentos" value="1" />
                        <Tab label="Gráficos por periodo de tiempo" value="2" />
                        <Tab label="Gráficos por departamentos" value="3" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <MapBoxLayer />
                </TabPanel>
                <TabPanel value="2">
                    <GraphByMonths />
                </TabPanel>
                <TabPanel value="3">
                    <GraphByDepartaments />
                </TabPanel>
            </TabContext>
        </div>
    );
}
