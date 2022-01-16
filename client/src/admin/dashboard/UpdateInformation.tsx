import { useState } from 'react';
import { Button } from '@material-ui/core'
import { ChangeEvent } from 'react';
import { IoCloseCircleSharp } from 'react-icons/io5';
import { MdFileUpload } from "react-icons/md";
import { uploadFileCVS } from '../../provider/reportsServices';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';


export const UpdateInformation = () => {

    const [selectedFile, setSelectedFile] = useState<File>();
    const [isSelected, setIsSelected] = useState(false);

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        setSelectedFile(e.target.files[0]);
        setIsSelected(true);
        e.currentTarget.value = ''
    }

    const uploadFile = async () => {

        if (!selectedFile) return;
        const message = await uploadFileCVS(selectedFile);

        if (message.ok) {
            toast.success(message.msg, {
            })
        } else {
            toast.error(message.msg)
        }
    }

    const clearFile = () => {
        setSelectedFile(undefined);
        setIsSelected(false);
    }

    useDocumentTitle('Actualizar Focos de calor');

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
                onChange={changeHandler}
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
            <span>{selectedFile?.name && selectedFile?.name}</span>
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
                        onClick={clearFile}
                    />
                </>
            }


            <ToastContainer />
        </div>
    )
}
