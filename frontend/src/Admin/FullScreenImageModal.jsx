import React from 'react';
import { Dialog, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const FullScreenImageModal = ({ isOpen, onClose, imageUrl }) => (
    <Dialog open={isOpen} onClose={onClose} maxWidth="lg" fullWidth>
        <DialogContent style={{ padding: 0, textAlign: 'center' }}>
            <IconButton
                style={{
                    position: 'absolute',
                    right: 10,
                    top: 10,
                    color: '#fff',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                }}
                onClick={onClose}
            >
                <CloseIcon />
            </IconButton>
            <img
                src={imageUrl}
                alt="Full screen"
                style={{ width: '100%', height: 'auto', maxHeight: '100vh' }}
            />
        </DialogContent>
    </Dialog>
);

export default FullScreenImageModal;
