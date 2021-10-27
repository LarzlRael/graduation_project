import { useState } from 'react';
import { Button } from '@material-ui/core'
import { ChangeEvent } from 'react';
import { IoCloseCircleSharp } from 'react-icons/io5';
import { MdFileUpload } from "react-icons/md";
import { uploadFileCVS } from '../../provider/reportsServices';
import { MapBoxLayer } from '../../components/mapbox/MapBoxLayer';

export const UpdateInformation = () => {

    const [selectedFiles, setSelectedFiles] = useState<FileList>();
    const [isSelected, setIsSelected] = useState(false);

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        setSelectedFiles(e.target.files);
        setIsSelected(true);
    }

    const uploadFile = async () => {

        if (!selectedFiles) return;
        const message = await uploadFileCVS(selectedFiles);
        console.log(message);

    }
    const clearFile = () => {
        setSelectedFiles(undefined);
        setIsSelected(false);
    }

    return (
        <div>
            <h2>Actualizar focos de calor</h2>
            <span>¿De donde consigo el archivo ?</span>
            <br />
            <span>Subir achivo de formato <b>.CVS</b> </span>
            <br />
            <input
                accept=".csv"
                /* className={classes.input} */
                style={{ display: 'none' }}
                id="raised-button-file"
                type="file"
                onChange={(e) => { changeHandler(e) }}
            />
            <label htmlFor="raised-button-file">
                <Button variant="outlined" component="span" >
                    Seleccionar archivo CVS
                </Button>
            </label>
            {/*  {
                selectedFiles!.map(file => (
                    <span>{file?.name && file?.name}</span>
                ))
            } */}
            < br />
            {isSelected &&
                <>
                    <Button
                        onClick={uploadFile}
                        variant="outlined"
                        component="span"
                        startIcon={
                            <MdFileUpload
                                size="1.5rem"
                                onClick={clearFile}
                            />}
                    >
                        Actualizar Base de datos
                    </Button>
                    <IoCloseCircleSharp
                        size="1.5rem"
                        onClick={clearFile} />
                </>
            }
        </div>
    )
}
