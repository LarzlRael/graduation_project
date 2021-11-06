import { useContext } from 'react';
import Modal from 'react-modal';
import { HeatSourcesContext } from '../context/HeatSources/HeatSourceContext';
import { IoCloseCircleSharp } from 'react-icons/io5';
import { Button } from '@mui/material';

const customStyles = {
    content: {
        top: '45%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

interface ModalProps {
    children: any
}
export const ModalComponent = ({ children }: ModalProps) => {

    const { modalIsOpen, openModal, closeModal } = useContext(HeatSourcesContext);


    return (
        <div
            className="modal-wrapper"
        >
            <Button
                variant="contained"
                onClick={() => openModal()}>Consultar</Button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => closeModal()}
                style={customStyles}
            >
                <div className="title_close">
                    <h2>Buscar Focos de Calor</h2>
                    <button
                        className="close-button"
                        onClick={() => closeModal()}>
                        <IoCloseCircleSharp
                            size="1.5rem"
                            color="white"
                        />
                        <span>Cerrar</span>
                    </button>
                </div>
                {children}
            </Modal>
        </div>
    );
}
