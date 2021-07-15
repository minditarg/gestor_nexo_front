import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function ModalDelete(props) {


  return (
    <Dialog
open={props.openDeleteDialog}
onClose={props.handleClose}
aria-labelledby="alert-dialog-title"
aria-describedby="alert-dialog-description"
>
<DialogTitle id="alert-dialog-title">{props.deleteRowData && (`Eliminar al empleado "${props.deleteRowData.apellido}, ${props.deleteRowData.nombre}"?` )}</DialogTitle>
<DialogContent>
 <DialogContentText id="alert-dialog-description">
 Se eliminará el empleado seleccionado. Realmente desea eliminarlo?
  </DialogContentText>
</DialogContent>
<DialogActions>
 <Button onClick={() => props.handleClose()} color="primary">
   Cancelar
 </Button>
 <Button onClick={() => props.handleDelete(props.deleteRowData)} color="primary" autoFocus>
   Aceptar
 </Button>
</DialogActions>
</Dialog>

  );

}
