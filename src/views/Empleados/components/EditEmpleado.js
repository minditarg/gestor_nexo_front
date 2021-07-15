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

import { StateEditEmpleado } from "../VariablesState";



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


class EditEmpleado extends Component {
  state = JSON.parse(JSON.stringify(StateEditEmpleado));

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


  getEmpleadoEdit = (id) => {
    Database.get('/list-empleados/' + id)
      .then(resultado => {

          if (resultado.result.length > 0) {
            this.setState({
              empleadoEdit: resultado.result[0]
            })

            let editEmpleadoFormAlt = { ...this.state.editEmpleadoForm };
            editEmpleadoFormAlt.nombre.value = resultado.result[0].nombre;
            editEmpleadoFormAlt.apellido.value = resultado.result[0].apellido;
            editEmpleadoFormAlt.dni.value = resultado.result[0].dni;
            editEmpleadoFormAlt.telefono.value = resultado.result[0].telefono;
            editEmpleadoFormAlt.direccion.value = resultado.result[0].direccion;
            editEmpleadoFormAlt.id_tipo_empleado.value = resultado.result[0].id_tipo_empleado;
            editEmpleadoFormAlt.mail.value = resultado.result[0].mail;
            for (let key in editEmpleadoFormAlt) {
              editEmpleadoFormAlt[key].touched = true;
              editEmpleadoFormAlt[key].valid = true;
            }

            this.setState({
              editEmpleadoForm: editEmpleadoFormAlt
            })
           // this.getEmpleadosType("edit", editEmpleadoFormAlt);
          }
          else {
            this.setState({
              empleadoEdit: null
            })
          }

      })

    
    Database.get('/list-tipo-empleado', this)
    .then(res => {

    let resultado = [...res.result];
    let a = [];
    resultado.forEach(function (entry) {
        a.push({
        value: entry.id,
        displayValue: entry.descripcion
        });
    })
    let formulario = { ...this.state.editEmpleadoForm }
    formulario.id_tipo_empleado.elementConfig.options = [...a];
    this.setState({
        editEmpleadoForm: formulario
    })
    }, err => {
    toast.error(err.message);
    })
    
  }


  handleSubmitEditEmpleado = (event) => {

    event.preventDefault();

    Database.post(`/update-empleado`, { id: this.props.match.params.idempleado, 
        nombre: this.state.editEmpleadoForm.nombre.value, 
        apellido: this.state.editEmpleadoForm.apellido.value,
        dni: this.state.editEmpleadoForm.dni.value,
        telefono: this.state.editEmpleadoForm.telefono.value,
        direccion: this.state.editEmpleadoForm.direccion.value,
        id_tipo_empleado: this.state.editEmpleadoForm.id_tipo_empleado.value,
        mail: this.state.editEmpleadoForm.mail.value},this)
      .then(res => {

          this.setState({
            successSubmitEdit: true,
            editFormIsValid: false,
            disableAllButtons:false
          },()=>{
              toast.success("El empleado se ha modificado con exito!");

              this.props.getEmpleadosAdmin();

          })

      },err =>{
          toast.error(err.message);

      })

  }


  inputEditChangedHandler = (event, inputIdentifier) => {
    let checkValid;
    const updatedOrderForm = {
      ...this.state.editEmpleadoForm
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
      editEmpleadoForm: updatedOrderForm,
      editFormIsValid: formIsValidAlt
    })

  }





  resetEditForm = () => {
    let editEmpleadoFormAlt = { ...this.state.editEmpleadoForm };
    let successSubmitEdit = this.state.successSubmitEdit;
    for (let key in editEmpleadoFormAlt) {
      editEmpleadoFormAlt[key].value = ''
    }

    this.setState({
      editFormIsValid: false,
      successSubmitEdit: successSubmitEdit
    })


  }

  componentDidMount() {

   // this.getEmpleadosType();
    this.getEmpleadoEdit(this.props.match.params.idempleado);
  }

  render() {

    const formElementsArray = [];
    for (let key in this.state.editEmpleadoForm) {
      formElementsArray.push({
        id: key,
        config: this.state.editEmpleadoForm[key]
      });
    }

    return ([

      <form onSubmit={(event) => {
        
        this.handleSubmitEditEmpleado(event)

      } }>





        <Card>
          <CardHeader color="primary">
            <h4 className={this.props.classes.cardTitleWhite}>Editar Empleado</h4>
            <p className={this.props.classes.cardCategoryWhite}>
              Formulario para modificar los datos del empleado
      </p>
          </CardHeader>
          <CardBody>
          {/* <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
        Cambiar Contraseña
      </Button> */}

            <div className="mt-3 mb-3">
              {formElementsArray.map(formElement => (
                <Input
                  key={"editempleado-" + formElement.id}
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

            <Button style={{ marginTop: '25px' }} color="info" onClick={() => this.props.history.push('/admin/empleados')} ><ArrowBack />Volver</Button><Button style={{ marginTop: '25px' }} color="primary" variant="contained" disabled={!this.state.editFormIsValid || this.state.disableAllButtons} type="submit" ><Save /> Guardar</Button>


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
          Ingrese una nueva contraseña para el Empleado
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

export default withRouter(withStyles(styles)(EditEmpleado));
