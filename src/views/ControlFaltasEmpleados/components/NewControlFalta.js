import React, { Component } from "react";
import Input from 'components/Input/Input';
import { Route, Switch, Link, withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import { StateNewControlFalta } from "../VariablesState";

import Database from "variables/Database.js";

import { toast } from 'react-toastify';

import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Card from "components/Card/Card.js";
import Button from '@material-ui/core/Button';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Save from '@material-ui/icons/Save';

import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import esLocale from "date-fns/locale/es";



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


class NewControlFalta extends Component {
  state =JSON.parse(JSON.stringify(StateNewControlFalta));


  handleSubmitNewControlFalta = (event) => {
    event.preventDefault();

    Database.post(`/insert-controlfaltas`, {id_empleado: this.state.newControlFaltaForm.id_empleado.value,
                                        id_tipo_falta: this.state.newControlFaltaForm.id_tipo_falta.value,
                                        inicio_licencia: this.state.fechaInicioLicencia,
                                        fin_licencia: this.state.fechaFinLicencia
                                        },this)
      .then(res => {

          toast.success("La falta se ha creado con exito!");
          this.setState({
            successSubmit: true,
            formIsValid: false,
          },()=>{
              this.props.getControlFaltasAdmin();
          })
          this.resetNewForm();


      },err => {
        toast.error(err.message);

      })
  }


  inputChangedHandler = (event, inputIdentifier) => {
    let checkValid;
    const updatedOrderForm = {
      ...this.state.newControlFaltaForm
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
      newControlFaltaForm: updatedOrderForm,
      formIsValid: formIsValidAlt
    })

  }

  resetNewForm = (all) => {
    let newControlFaltaFormAlt = { ...this.state.newControlFaltaForm };
    let successSubmit = this.state.successSubmit;
    for (let key in newControlFaltaFormAlt) {
      newControlFaltaFormAlt[key].value = ''
    }
    if (all)
      successSubmit = false;

    this.setState({
      successSubmit: successSubmit,
      formIsValid: false
    })
    //this.getControlFaltasType("new", newControlFaltaFormAlt);

  }

  getTipoControlFalta = () => {
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
        let formulario = { ...this.state.newControlFaltaForm }
        formulario.id_empleado.elementConfig.options = [...a];
        this.setState({
            newControlFaltaForm: formulario
        })
      }, err => {
        toast.error(err.message);
      })


    Database.get('/list-tipo-falta', this)
    .then(res => {

      let resultado = [...res.result];
      let a = [];
      resultado.forEach(function (entry) {
        a.push({
          value: entry.id,
          displayValue: entry.descripcion
        });
      })
      let formulario = { ...this.state.newControlFaltaForm }
      formulario.id_tipo_falta.elementConfig.options = [...a];
      this.setState({
          newControlFaltaForm: formulario
      })
    }, err => {
      toast.error(err.message);
    })
  }



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

  componentDidMount() {

    this.getTipoControlFalta();
  }

  handleFechaInicio = (date) => {
    this.setState(
      {
        fechaInicioLicencia: date
      }
    )
  };

  handleFechaFin = (date) => {
    this.setState(
      {
        fechaFinLicencia: date
      }
    )
  };



  render() {

    const formElementsArray = [];
    for (let key in this.state.newControlFaltaForm) {
      formElementsArray.push({
        id: key,
        config: this.state.newControlFaltaForm[key]
      });
    }
    return (

      <form onSubmit={(event) => {
        this.handleSubmitNewControlFalta(event)

      } }>





        <Card>
          <CardHeader color="primary">
            <h4 className={this.props.classes.cardTitleWhite}>Nueva Falta</h4>
            <p className={this.props.classes.cardCategoryWhite}>
              Formulario de alta de falta
      </p>
          </CardHeader>
          <CardBody>

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
                  changed={(event) => this.inputChangedHandler(event, formElement.id)}
                  />
              ))}

              <MuiPickersUtilsProvider locale={esLocale} utils={DateFnsUtils}>
                <div>
                  <KeyboardDatePicker
                    margin="normal"
                    id="fechainicio"
                    label="Inicio Licencia"
                    format="dd/MM/yyyy"
                    value={this.state.fechaInicioLicencia}
                    onChange={this.handleFechaInicio}
                    autoOk={true}
                    cancelLabel={"Cancelar"}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </div>
              </MuiPickersUtilsProvider>

              <MuiPickersUtilsProvider locale={esLocale} utils={DateFnsUtils}>
                <div>
                  <KeyboardDatePicker
                    margin="normal"
                    id="fechafin"
                    label="Fin Licencia"
                    format="dd/MM/yyyy"
                    value={this.state.fechaFinLicencia}
                    onChange={this.handleFechaFin}
                    autoOk={true}
                    cancelLabel={"Cancelar"}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </div>
              </MuiPickersUtilsProvider>
            </div>

            <Button style={{ marginTop: '25px' }} color="info" onClick={() => this.props.history.push('/admin/controlfaltas')} ><ArrowBack />Volver</Button>
            <Button style={{ marginTop: '25px' }} color="primary" variant="contained" disabled={!this.state.formIsValid || this.state.disableAllButtons} type="submit" ><Save /> Guardar</Button>


          </CardBody>
        </Card>



      </ form>


    )
  }


};

export default withRouter(withStyles(styles)(NewControlFalta));
