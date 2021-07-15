import React, { Component } from "react";
import Input from 'components/Input/Input';
import { Route, Switch, Link, withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import { StateNewEmpleado } from "../VariablesState";

import Database from "variables/Database.js";

import { toast } from 'react-toastify';

import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Card from "components/Card/Card.js";
import Button from '@material-ui/core/Button';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Save from '@material-ui/icons/Save';



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


class NewEmpleado extends Component {
  state =JSON.parse(JSON.stringify(StateNewEmpleado));


  handleSubmitNewEmpleado = (event) => {
    event.preventDefault();

    Database.post(`/insert-empleados`, {nombre: this.state.newEmpleadoForm.nombre.value, 
                                        apellido: this.state.newEmpleadoForm.apellido.value,
                                        dni: this.state.newEmpleadoForm.dni.value,
                                        telefono: this.state.newEmpleadoForm.telefono.value,
                                        direccion: this.state.newEmpleadoForm.direccion.value,
                                        id_tipo_empleado: this.state.newEmpleadoForm.id_tipo_empleado.value,
                                        mail: this.state.newEmpleadoForm.mail.value
                                        },this)
      .then(res => {

          toast.success("El empleado se ha creado con exito!");
          this.setState({
            successSubmit: true,
            formIsValid: false,
          },()=>{
              this.props.getEmpleadosAdmin();
          })
          this.resetNewForm();


      },err => {
        toast.error(err.message);

      })
  }


  inputChangedHandler = (event, inputIdentifier) => {
    let checkValid;
    const updatedOrderForm = {
      ...this.state.newEmpleadoForm
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
      newEmpleadoForm: updatedOrderForm,
      formIsValid: formIsValidAlt
    })

  }

  resetNewForm = (all) => {
    let newEmpleadoFormAlt = { ...this.state.newEmpleadoForm };
    let successSubmit = this.state.successSubmit;
    for (let key in newEmpleadoFormAlt) {
      newEmpleadoFormAlt[key].value = ''
    }
    if (all)
      successSubmit = false;

    this.setState({
      successSubmit: successSubmit,
      formIsValid: false
    })
    //this.getEmpleadosType("new", newEmpleadoFormAlt);

  }

  getTipoEmpleado = () => {
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
        let formulario = { ...this.state.newEmpleadoForm }
        formulario.id_tipo_empleado.elementConfig.options = [...a];
        this.setState({
            newEmpleadoForm: formulario
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

    this.getTipoEmpleado();
  }



  render() {

    const formElementsArray = [];
    for (let key in this.state.newEmpleadoForm) {
      formElementsArray.push({
        id: key,
        config: this.state.newEmpleadoForm[key]
      });
    }
    return (

      <form onSubmit={(event) => {
        this.handleSubmitNewEmpleado(event)

      } }>





        <Card>
          <CardHeader color="primary">
            <h4 className={this.props.classes.cardTitleWhite}>Nuevo Empleado</h4>
            <p className={this.props.classes.cardCategoryWhite}>
              Formulario de alta de empleado
      </p>
          </CardHeader>
          <CardBody>

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
                  changed={(event) => this.inputChangedHandler(event, formElement.id)}
                  />
              ))}
            </div>

            <Button style={{ marginTop: '25px' }} color="info" onClick={() => this.props.history.push('/admin/empleados')} ><ArrowBack />Volver</Button>
            <Button style={{ marginTop: '25px' }} color="primary" variant="contained" disabled={!this.state.formIsValid || this.state.disableAllButtons} type="submit" ><Save /> Guardar</Button>


          </CardBody>
        </Card>



      </ form>


    )
  }


};

export default withRouter(withStyles(styles)(NewEmpleado));
