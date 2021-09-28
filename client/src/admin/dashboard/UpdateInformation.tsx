import { useState } from 'react';
import { Button } from '@material-ui/core'
import { ChangeEvent } from 'react';
import { uploadFileCVS } from '../../provider/services';
import { IoCloseCircleSharp } from 'react-icons/io5';
import { MdFileUpload } from "react-icons/md";
export const UpdateInformation = () => {

    const [selectedFile, setSelectedFile] = useState<File>();
    const [isSelected, setIsSelected] = useState(false);

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        setSelectedFile(e.target.files[0]);
        setIsSelected(true);
    }

    const uploadFile = async () => {

        if (!selectedFile) return;
        const message = await uploadFileCVS(selectedFile);
        console.log(message);

    }
    const clearFile = () => {

        setSelectedFile(undefined);
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
            {selectedFile?.name && selectedFile?.name}
            <br />
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
