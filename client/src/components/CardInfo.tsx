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
moment.locale('es')

interface CardInfoInterface {
    departamento: string;
    numeroFocos: string;
    dateStart: Date;
    dateEnd: string;
    imageUrl: string;
}
export const CardInfo = ({ departamento, numeroFocos, dateStart, dateEnd, imageUrl }: CardInfoInterface) => {
    return (
        <Card>
            <CardMedia
                component="img"
                height="160"
                image={imageUrl}
                alt={departamento}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {departamento}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Focos de calor detectados en {departamento} en <b>{moment(dateEnd).format('LL')}</b> hasta <b>{moment(dateStart).format('LL')}</b> es de <b>{numeroFocos}</b>
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
}