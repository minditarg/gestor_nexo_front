import React, { Component } from "react";
import Input from 'components/Input/Input';
import { Route, Switch, Link, withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import { StateNewCompensatorio } from "../VariablesState";

import Database from "variables/Database.js";

import { toast } from 'react-toastify';
import moment from "moment";

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


class NewCompensatorio extends Component {
  state =JSON.parse(JSON.stringify(StateNewCompensatorio));


  handleSubmitNewCompensatorio = (event) => {
    event.preventDefault();

    let fechaCompensatorio = null;

    if (this.state.fechaCompensatorio != null)
    fechaCompensatorio = moment(this.state.fechaCompensatorio).format("YYYY-MM-DD HH:mm");

    Database.post(`/insert-compensatorios`, {id_empleado: this.state.newCompensatorioForm.id_empleado.value, horas: this.state.newCompensatorioForm.horas.value * this.props.Testing(), 
                                            minutos: this.state.newCompensatorioForm.minutos.value * this.props.Testing(), fecha: this.state.fechaCompensatorio},this)
      .then(res => {

          toast.success("El compensatorio se ha creado con exito!");
          this.setState({
            successSubmit: true,
            formIsValid: false,
          },()=>{
              this.props.getCompensatoriosAdmin();
          })
          this.resetNewForm();


      },err => {
        toast.error(err.message);

      })
  }


  inputChangedHandler = (event, inputIdentifier) => {
    let checkValid;
    const updatedOrderForm = {
      ...this.state.newCompensatorioForm
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
      newCompensatorioForm: updatedOrderForm,
      formIsValid: formIsValidAlt
    })

  }

  resetNewForm = (all) => {
    let newCompensatorioFormAlt = { ...this.state.newCompensatorioForm };
    let successSubmit = this.state.successSubmit;
    for (let key in newCompensatorioFormAlt) {
      newCompensatorioFormAlt[key].value = ''
    }
    if (all)
      successSubmit = false;

    this.setState({
      successSubmit: successSubmit,
      formIsValid: false
    })
    //this.getCompensatoriosType("new", newCompensatorioFormAlt);

  }

  getTipoCompensatorio = () => {
    console.log(this.props.Testing());
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
        let formulario = { ...this.state.newCompensatorioForm }
        formulario.id_empleado.elementConfig.options = [...a];
        this.setState({
            newCompensatorioForm: formulario
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

    this.getTipoCompensatorio();
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
    for (let key in this.state.newCompensatorioForm) {
      formElementsArray.push({
        id: key,
        config: this.state.newCompensatorioForm[key]
      });
    }
    return (

      <form onSubmit={(event) => {
        this.handleSubmitNewCompensatorio(event)

      } }>





        <Card>
          <CardHeader color="primary">
            <h4 className={this.props.classes.cardTitleWhite}>Nuevo Compensatorio</h4>
            <p className={this.props.classes.cardCategoryWhite}>
              Formulario de alta de compensatorio
      </p>
          </CardHeader>
          <CardBody>

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
                  changed={(event) => this.inputChangedHandler(event, formElement.id)}
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

            <Button style={{ marginTop: '25px' }} color="info" onClick={() => this.props.history.push('/admin/compensatorios')} ><ArrowBack />Volver</Button>
            <Button style={{ marginTop: '25px' }} color="primary" variant="contained" disabled={!this.state.formIsValid || this.state.disableAllButtons} type="submit" ><Save /> Guardar</Button>


          </CardBody>
        </Card>



      </ form>


    )
  }


};

export default withRouter(withStyles(styles)(NewCompensatorio));
