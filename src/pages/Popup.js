import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import useUserData from '../_mock/UserData';

const Popup = () => {
     const { name } = useUserData();
     const [dialogs, setDialogs] = useState([
          { open: true, content: 'Before you continue, here are some guides and steps to help you navigate to your course contents', position: 'center' },
          { open: false, content: 'Scroll Down to change into Focus Mode', position: 'top-right' },
     ]);
     const [activeDialogIndex, setActiveDialogIndex] = useState(0);

     useEffect(() => {
          const hasVisitedBefore = localStorage.getItem('visitedBefore');
          if (!hasVisitedBefore) {
               setDialogs(dialogs.map((dialog, index) => ({ ...dialog, open: index === activeDialogIndex })));
               localStorage.setItem('visitedBefore', 'true');
          }
     }, []);

     const handleClose = () => {
          if (activeDialogIndex < dialogs.length - 1) {
               setActiveDialogIndex(activeDialogIndex + 1);
               setDialogs(dialogs.map((dialog, index) => ({ ...dialog, open: index === activeDialogIndex + 1 })));
          } else {
               setDialogs(dialogs.map(dialog => ({ ...dialog, open: false })));
          }
     };

     return (
          <>
               {dialogs.map((dialog, index) => (
                    <Dialog
                         key={index}
                         open={dialog.open}
                         onClose={handleClose}
                         sx={{
                              position: 'absolute',
                              // top: dialog.position === 'top-right' ? '0' : '50%',
                              // left: dialog.position === 'top-right' ? '0' : '50%',
                              // right: dialog.position === 'top-right' ? '0' : 'auto',
                              // transform: dialog.position === 'top-right' ? '0' : 'translate(-50%, -50%)',
                              zIndex: 10000,
                              width: '100%',
                              height: '100%',
                         }}
                    >
                         <DialogTitle>{index === 0 ? `Hello ${name}!` : 'Scroll down!'}</DialogTitle>
                         <DialogContent>
                              <p>{dialog.content}</p>
                         </DialogContent>
                         <DialogActions>
                              <Button onClick={handleClose} color="primary">
                                   Close
                              </Button>
                         </DialogActions>
                    </Dialog>
               ))}
          </>
     );
};

export default Popup;
