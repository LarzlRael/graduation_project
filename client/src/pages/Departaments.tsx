
import { Layout } from '../components/Layout';
import LabTabs from '../components/Tabs';


export const Departaments = () => {

    /* const [selectedImage, setselectedImage] = useState(images[0].source);
    const onChange = (e: any) => {
        setselectedImage(e.target.value);
        console.log(e.target.value);
    } */
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
