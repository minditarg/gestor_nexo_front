import React, { Component } from 'react';
import Input from 'components/Input/Input';
import { Route, Switch, Link, withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/styles';

import Database from "variables/Database.js";
import { toast,ToastContainer } from 'react-toastify';


import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Card from "components/Card/Card.js";
import Button from '@material-ui/core/Button';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Save from '@material-ui/icons/Save';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { StateEditControlFalta } from "../VariablesState";



const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};


class EditControlFalta extends Component {
  state = JSON.parse(JSON.stringify(StateEditControlFalta));

  handleClickOpen = () => {
    this.setState({
      openChangePass:true
    })
  };

  handleClose = () => {
    this.setState({
      openChangePass:false
    })
  };




  checkValidity = (value, rules) => {
    let isValid = true;
    let textValid = null;

    if (rules.required && isValid) {
      isValid = value.toString().trim() !== '';
      textValid = 'El campo es requerido'
    }

    if (rules.minLength && isValid) {
      isValid = value.length >= rules.minLength;
      textValid = 'La cantidad de caracteres minimos es ' + rules.minLength
    }

    if (rules.maxLength && isValid) {
      isValid = value.length <= rules.maxLength;
      textValid = 'Supera el maximo de caracteres';
    }

    return { isValid: isValid, textValid: textValid };
  }


  getControlFaltaEdit = (id) => {
    Database.get('/list-controlfaltas/' + id)
      .then(resultado => {

          if (resultado.result.length > 0) {
            this.setState({
              controlfaltaEdit: resultado.result[0]
            })

            let editControlFaltaFormAlt = { ...this.state.editControlFaltaForm };
            editControlFaltaFormAlt.nombre.value = resultado.result[0].nombre;
            editControlFaltaFormAlt.apellido.value = resultado.result[0].apellido;
            editControlFaltaFormAlt.dni.value = resultado.result[0].dni;
            editControlFaltaFormAlt.telefono.value = resultado.result[0].telefono;
            editControlFaltaFormAlt.direccion.value = resultado.result[0].direccion;
            editControlFaltaFormAlt.id_tipo_controlfalta.value = resultado.result[0].id_tipo_controlfalta;
            editControlFaltaFormAlt.mail.value = resultado.result[0].mail;
            for (let key in editControlFaltaFormAlt) {
              editControlFaltaFormAlt[key].touched = true;
              editControlFaltaFormAlt[key].valid = true;
            }

            this.setState({
              editControlFaltaForm: editControlFaltaFormAlt
            })
           // this.getControlFaltasType("edit", editControlFaltaFormAlt);
          }
          else {
            this.setState({
              controlfaltaEdit: null
            })
          }

      })

    
    Database.get('/list-tipo-controlfalta', this)
    .then(res => {

    let resultado = [...res.result];
    let a = [];
    resultado.forEach(function (entry) {
        a.push({
        value: entry.id,
        displayValue: entry.descripcion
        });
    })
    let formulario = { ...this.state.editControlFaltaForm }
    formulario.id_tipo_controlfalta.elementConfig.options = [...a];
    this.setState({
        editControlFaltaForm: formulario
    })
    }, err => {
    toast.error(err.message);
    })
    
  }


  handleSubmitEditControlFalta = (event) => {

    event.preventDefault();

    Database.post(`/update-controlfalta`, { id: this.props.match.params.idcontrolfalta, 
        nombre: this.state.editControlFaltaForm.nombre.value, 
        apellido: this.state.editControlFaltaForm.apellido.value,
        dni: this.state.editControlFaltaForm.dni.value,
        telefono: this.state.editControlFaltaForm.telefono.value,
        direccion: this.state.editControlFaltaForm.direccion.value,
        id_tipo_controlfalta: this.state.editControlFaltaForm.id_tipo_controlfalta.value,
        mail: this.state.editControlFaltaForm.mail.value},this)
      .then(res => {

          this.setState({
            successSubmitEdit: true,
            editFormIsValid: false,
            disableAllButtons:false
          },()=>{
              toast.success("El controlfalta se ha modificado con exito!");

              this.props.getControlFaltasAdmin();

          })

      },err =>{
          toast.error(err.message);

      })

  }


  inputEditChangedHandler = (event, inputIdentifier) => {
    let checkValid;
    const updatedOrderForm = {
      ...this.state.editControlFaltaForm
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    };
    updatedFormElement.value = event.target.value;
    checkValid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.valid = checkValid.isValid;
    updatedFormElement.textValid = checkValid.textValid;
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let formIsValidAlt = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValidAlt = updatedOrderForm[inputIdentifier].valid && formIsValidAlt;
    }
    this.setState({
      editControlFaltaForm: updatedOrderForm,
      editFormIsValid: formIsValidAlt
    })

  }





  resetEditForm = () => {
    let editControlFaltaFormAlt = { ...this.state.editControlFaltaForm };
    let successSubmitEdit = this.state.successSubmitEdit;
    for (let key in editControlFaltaFormAlt) {
      editControlFaltaFormAlt[key].value = ''
    }

    this.setState({
      editFormIsValid: false,
      successSubmitEdit: successSubmitEdit
    })


  }

  componentDidMount() {

   // this.getControlFaltasType();
    this.getControlFaltaEdit(this.props.match.params.idcontrolfalta);
  }

  render() {

    const formElementsArray = [];
    for (let key in this.state.editControlFaltaForm) {
      formElementsArray.push({
        id: key,
        config: this.state.editControlFaltaForm[key]
      });
    }

    return ([

      <form onSubmit={(event) => {
        
        this.handleSubmitEditControlFalta(event)

      } }>





        <Card>
          <CardHeader color="primary">
            <h4 className={this.props.classes.cardTitleWhite}>Editar ControlFalta</h4>
            <p className={this.props.classes.cardCategoryWhite}>
              Formulario para modificar los datos del controlfalta
      </p>
          </CardHeader>
          <CardBody>
          {/* <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
        Cambiar Contraseña
      </Button> */}

            <div className="mt-3 mb-3">
              {formElementsArray.map(formElement => (
                <Input
                  key={"editcontrolfalta-" + formElement.id}
                  elementType={formElement.config.elementType}
                  elementConfig={formElement.config.elementConfig}
                  value={formElement.config.value}
                  textValid={formElement.config.textValid}
                  invalid={!formElement.config.valid}
                  shouldValidate={formElement.config.validation}
                  touched={formElement.config.touched}
                  changed={(event) => this.inputEditChangedHandler(event, formElement.id)}
                  />
              ))}
            </div>

            <Button style={{ marginTop: '25px' }} color="info" onClick={() => this.props.history.push('/admin/controlfaltas')} ><ArrowBack />Volver</Button><Button style={{ marginTop: '25px' }} color="primary" variant="contained" disabled={!this.state.editFormIsValid || this.state.disableAllButtons} type="submit" ><Save /> Guardar</Button>


          </CardBody>
        </Card>


      </ form>,
      
      <Dialog open={this.state.openChangePass} onClose={this.handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Cambio de Contraseña</DialogTitle>
      <form onSubmit={(event) => {
        this.handleChangePass(event)

      } }>
      { this.state.openChangePass &&
      <DialogContent>
      
        <DialogContentText>
          Ingrese una nueva contraseña para el ControlFalta
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="contrasenia"
          name="contrasenia"
          label="nueva contraseña"
          type="password"
          fullWidth
        />
      </DialogContent>
      }
      <DialogActions>
        <Button onClick={this.handleClose} color="primary">
          Cancelar
        </Button>
        <Button type="submit" color="primary">
          Aceptar
        </Button>
      </DialogActions>
      </form>
    </Dialog>
      


              ])
  }

};

export default withRouter(withStyles(styles)(EditControlFalta));
