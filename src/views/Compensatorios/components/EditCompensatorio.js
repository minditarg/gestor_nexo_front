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

import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import esLocale from "date-fns/locale/es";

import { StateEditCompensatorio } from "../VariablesState";



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


class EditCompensatorio extends Component {
  state = JSON.parse(JSON.stringify(StateEditCompensatorio));

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


  getCompensatorioEdit = (id) => {
    
    Database.get('/list-compensatorios/' + id)
      .then(resultado => {
        console.log(resultado);
          if (resultado.result.length > 0) {
            this.setState({
              compensatorioEdit: resultado.result[0]
            })

            let editCompensatorioFormAlt = { ...this.state.editCompensatorioForm };
            editCompensatorioFormAlt.id_empleado.value = resultado.result[0].id_empleado;
            if (resultado.result[0].minutos) {
              editCompensatorioFormAlt.horas.value = Math.trunc(resultado.result[0].minutos/60);
              editCompensatorioFormAlt.minutos.value = resultado.result[0].minutos%60;
            }
            else{
              editCompensatorioFormAlt.minutos.value = resultado.result[0].minutos;
            }
            this.state.fechaCompensatorio = resultado.result[0].fecha;
            for (let key in editCompensatorioFormAlt) {
              editCompensatorioFormAlt[key].touched = true;
              editCompensatorioFormAlt[key].valid = true;
            }

            this.setState({
              editCompensatorioForm: editCompensatorioFormAlt
            })
           // this.getCompensatoriosType("edit", editCompensatorioFormAlt);
          }
          else {
            this.setState({
              compensatorioEdit: null
            })
          }

      })

      Database.get('/list-empleado', this)
      .then(res => {

        let resultado = [...res.result];
        let a = [];
        resultado.forEach(function (entry) {
          a.push({
            value: entry.id,
            displayValue: entry.apellido + ", " + entry.nombre
          });
        })
        let formulario = { ...this.state.editCompensatorioForm }
        formulario.id_empleado.elementConfig.options = [...a];
        this.setState({
            editCompensatorioForm: formulario
        })
      }, err => {
        toast.error(err.message);
      })

    
  }


  handleSubmitEditCompensatorio = (event) => {

    event.preventDefault();

    Database.post(`/update-compensatorio`, { id: this.props.match.params.idcompensatorio, 
        id_empleado: this.state.editCompensatorioForm.id_empleado.value, 
        horas: this.state.editCompensatorioForm.horas.value,
        minutos: this.state.editCompensatorioForm.minutos.value,
        fecha: this.state.fechaCompensatorio
        },this)
      .then(res => {

          this.setState({
            successSubmitEdit: true,
            editFormIsValid: false,
            disableAllButtons:false
          },()=>{
              toast.success("El compensatorio se ha modificado con exito!");

              this.props.getCompensatoriosAdmin();

          })

      },err =>{
          toast.error(err.message);

      })

  }


  inputEditChangedHandler = (event, inputIdentifier) => {
    let checkValid;
    const updatedOrderForm = {
      ...this.state.editCompensatorioForm
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
      editCompensatorioForm: updatedOrderForm,
      editFormIsValid: formIsValidAlt
    })

  }





  resetEditForm = () => {
    let editCompensatorioFormAlt = { ...this.state.editCompensatorioForm };
    let successSubmitEdit = this.state.successSubmitEdit;
    for (let key in editCompensatorioFormAlt) {
      editCompensatorioFormAlt[key].value = ''
    }

    this.setState({
      editFormIsValid: false,
      successSubmitEdit: successSubmitEdit
    })


  }

  componentDidMount() {

   // this.getCompensatoriosType();
   console.log(this.props);
    this.getCompensatorioEdit(this.props.match.params.idcompensatorio);
  }

  handleFechaInicio = (date) => {
    this.setState(
      {
        fechaCompensatorio: date
      }
    )
  };

  render() {

    const formElementsArray = [];
    for (let key in this.state.editCompensatorioForm) {
      formElementsArray.push({
        id: key,
        config: this.state.editCompensatorioForm[key]
      });
    }

    return ([

      <form onSubmit={(event) => {
        
        this.handleSubmitEditCompensatorio(event)

      } }>





        <Card>
          <CardHeader color="primary">
            <h4 className={this.props.classes.cardTitleWhite}>Editar Compensatorio</h4>
            <p className={this.props.classes.cardCategoryWhite}>
              Formulario para modificar los datos del compensatorio
      </p>
          </CardHeader>
          <CardBody>
          {/* <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
        Cambiar Contraseña
      </Button> */}

            <div className="mt-3 mb-3">
              {formElementsArray.map(formElement => (
                <Input
                  key={"editcompensatorio-" + formElement.id}
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

              <MuiPickersUtilsProvider locale={esLocale} utils={DateFnsUtils}>
                <div>
                  <KeyboardDatePicker
                    margin="normal"
                    id="fechainicio"
                    label="Fecha"
                    format="dd/MM/yyyy"
                    value={this.state.fechaCompensatorio}
                    onChange={this.handleFechaInicio}
                    autoOk={true}
                    cancelLabel={"Cancelar"}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </div>
              </MuiPickersUtilsProvider>
            </div>

            <Button style={{ marginTop: '25px' }} color="info" onClick={() => this.props.history.push('/admin/compensatorios')} ><ArrowBack />Volver</Button><Button style={{ marginTop: '25px' }} color="primary" variant="contained" type="submit" ><Save /> Guardar</Button>


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
          Ingrese una nueva contraseña para el Compensatorio
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

export default withRouter(withStyles(styles)(EditCompensatorio));
