
import { useState } from 'react';
import { Layout } from '../components/Layout';
import { MapBoxLayer } from '../components/mapbox/MapBoxLayer.js';
import { Header } from '../components/public/landingPage/Header';
import LabTabs from '../components/Tabs';
import { CardInfo } from '../components/CardInfo';


const images = [
    { name: 'La Paz', source: 'lapaz.png' },
    { name: 'Oruro', source: 'Oruro.png' },
    { name: 'Potosi', source: 'potosi.png' },
    { name: 'Tarija', source: 'tarija.png' },
    { name: 'Chuquisica', source: 'chuquisaca.png' },
    { name: 'Cochabamba', source: 'cochabamba.png' },
    { name: 'Beni', source: 'beni.png' },
    { name: 'Pando', source: 'pando.png' },
    { name: 'Santa Cruz', source: 'santacruz.png' },
]
export const Departaments = () => {

    const [selectedImage, setselectedImage] = useState(images[0].source);
    const onChange = (e: any) => {
        setselectedImage(e.target.value);
        console.log(e.target.value);
    }
    return (
        <Layout>
            {/* <select name="" id="" onChange={onChange}>
                {images.map(image => (
                    <option value={image.source}>{image.name}</option>
                ))}
            </select>

            <>
                <img
                    style={{
                        width: '90px',
                        height: '90px',
                    }}
                    src={process.env.PUBLIC_URL + `/departamentos/${selectedImage}`} alt={images[0].name} />
                <br />
            </> */}
            
            <LabTabs />
            {/* <MapBoxLayer /> */}
        </Layout>
    )
}
