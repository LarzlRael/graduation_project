import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Typography,
} from '@mui/material';
/* import { es } from "date-fns/locale"; */
import moment from 'moment'
import 'moment/locale/es'  // without this line it didn't work
import { HeatSourcestState } from '../context/HeatSources/HeatSourcesReducer';
import { useContext, useEffect } from 'react';
import { HeatSourcesContext } from '../context/HeatSources/HeatSourceContext';
moment.locale('es')

interface CardInfoInterface {
    imageUrl: string;
}
export const CardInfo = ({ imageUrl }: CardInfoInterface) => {
    const { dateSelectedAndRange, queryToFind, currentGeoJson, showOptions, showProvMun } = useContext(HeatSourcesContext);

    const renderPlaceName = (): string => {

        if (!showOptions) {
            return '';
        } else if (showOptions && showProvMun) {
            return queryToFind.provincia;
        } else {
            return queryToFind.municipio;
        }
    }

    return (
        <Card>
            <CardMedia
                component="img"
                height="160"
                image={imageUrl}
                alt="Contemplative Reptile"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {queryToFind.departamentSelected} {renderPlaceName()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Focos de calor detectados en {renderPlaceName()} <b>{moment(dateSelectedAndRange.dateStart).format('LL')}</b> hasta <b>{moment(dateSelectedAndRange.dateEnd).format('LL')}</b> es de <b>{currentGeoJson.features.length}</b>
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
}