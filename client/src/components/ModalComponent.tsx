import { useContext } from 'react';

import { HeatSourcesContext } from '../context/HeatSources/HeatSourceContext';
import { Button } from '@mui/material';
import { Modal } from './Modal';

interface ModalProps {
    children: React.ReactNode,
}
export const ModalComponent = ({ children }: ModalProps) => {
    const { openModal } = useContext(HeatSourcesContext);
    return (
        <div
            className="modal-wrapper"
        >
            <Button
                variant="contained"
                onClick={() => openModal()}>Consultar</Button>
            <Modal
                titulo={ 'Consultar Focos de calor' }
            >
                {children}
            </Modal>
        </div>
    );
}
