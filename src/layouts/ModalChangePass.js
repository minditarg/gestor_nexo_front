import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function ModalChangePass(props) {

const handleChangePass = () => {
    
}



  return (
    <Dialog
open={props.openChangePass}
onClose={props.handleClose}
aria-labelledby="alert-dialog-title"
aria-describedby="alert-dialog-description"
>
<DialogTitle id="alert-dialog-title">Cambio de Contraseña del usuario</DialogTitle>
<DialogContent>
 
</DialogContent>
<DialogActions>
 <Button onClick={() => props.handleClose()} color="primary">
   Cancelar
 </Button>
 <Button onClick={() => handleChangePass()} color="primary" autoFocus>
   Aceptar
 </Button>
</DialogActions>
</Dialog>

  );

}
