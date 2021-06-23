import React from 'react';
import Database from "variables/Database.js";

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { toast } from 'react-toastify';

export default function ModalChangePass(props) {

const [oldPass,setOldPass] = React.useState(null);
const [newPass,setNewPass] = React.useState(null);
const [repeatPass,setRepeatPass] = React.useState(null);
const [disableButtons, setDisableButtons] = React.useState(false);


const handleChangePass = () => {
    
    if(!oldPass) {
      toast.error("Complete la constraseña Anterior");
    } else if(!(newPass && repeatPass && newPass == repeatPass)) {
        toast.error("Las contraseñas no coinciden")
    } else {
      setDisableButtons(true);
      Database.post(`/update-me-pass`, { oldPass : oldPass, newPass:newPass })
      .then(res => {
        setDisableButtons(false);
        toast.success("La contraseña ha sido modificada correctamente");
        props.handleClose();
      }, err => {
          toast.error(err.message);
          setDisableButtons(false);
          
      })


    }


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
<form>
 <div style={{ marginBottom:'25px'}}>   
<TextField type="password"  label="Contraseña actual" onChange={(event) => setOldPass(event.target.value)  } />
</div>
<div>
<TextField type="password"  label="Nueva contraseña" onChange={(event) => setNewPass(event.target.value)  } />
</div>
<div>
<TextField type="password"  label="Repetir contraseña" onChange={(event) => setRepeatPass(event.target.value)  }  />
</div>
</form>
</DialogContent>
<DialogActions>
 <Button onClick={() => props.handleClose()} color="primary">
   Cancelar
 </Button>
 <Button disabled={disableButtons} onClick={() => handleChangePass()} color="primary" autoFocus>
   Aceptar
 </Button>
</DialogActions>
</Dialog>

  );

}
