import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
// import { Paper } from '@mui/material';

interface ModalProps {
    open: boolean;
    onClose: () => void
    children: React.ReactNode; 
}


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius:5,
    boxShadow: 24,
    p: 4,
};

export function BasicModal(props: ModalProps) {
    return (
        <div>
            <Modal
                open={props.open}
                onClose={props.onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {props.children}
                </Box>
            </Modal>
        </div>
    );
}