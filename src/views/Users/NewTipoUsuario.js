import React, { Component } from "react";
import Database from "variables/Database.js";
import Input from "components/Input/Input";
import { Route, Switch, Link, withRouter } from 'react-router-dom';

// import { AddBox, ArrowUpward } from "@material-ui/icons";
// import ReactDOM from "react-dom";
import MaterialTable from "material-table";
import { CardActions } from "@material-ui/core";
import { withStyles } from '@material-ui/styles';

import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Card from "components/Card/Card.js";
import Button from '@material-ui/core/Button';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Save from '@material-ui/icons/Save';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import {  toast } from 'react-toastify';




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

class NewTipoUsuario extends Component {
  state = {
    accesos:[],
    orderForm:{
      descripcion: {
          elementType: 'input',
          elementConfig: {
              type: 'text',
              label: 'descripcion',
              fullWidth: true
          },
          value: '',
          validation: {
              required: true
          },
          valid: false,
          touched: false
      }
    },
    formIsValid:false,
    disableAllButtons: false


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

  inputChangedHandler = (event, inputIdentifier) => {
    //alert("modificado");
    let checkValid;
    const updatedOrderForm = {
      ...this.state.orderForm
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
      orderForm: updatedOrderForm,
      formIsValid: formIsValidAlt

    })

  }


  handleSubmitNewTipoUsuario = (event) => {
    event.preventDefault();
    Database.post('/insert-tipo-usuario', {
      descripcion: this.state.orderForm.descripcion.value,
      accesos: this.state.accesos
    },this)
      .then(res => {

          this.props.getTiposUsuarios();

          toast.success("Nuevo tipo de usuario creado");
          this.resetForm();

      },err => {
        toast.error(err.message);
      })
  }

resetForm = () => {
  let newOrderForm = { ...this.state.orderForm };
  let accesos = [... this.state.accesos];
  accesos = accesos.map(elem => {
    return {
      ...elem,
      checked:false
    }
  })
  for(let key in newOrderForm) {
    newOrderForm[key].value = ''
  }
  this.setState({
    orderForm:newOrderForm,
    accesos:accesos
  })

}

handleCheckbox = (event,index) => {
  let resultado =[  ... this.state.accesos ];
  resultado[index].checked = event.target.checked;

  this.setState(
    {
      accesos: resultado
    }
  )

}


componentDidMount() {
Database.get("/list-accesos",this)
        .then(res => {
          let resultado = [...res.result];
          resultado = resultado.map(elem => {
            return {
              ...elem,
              checked:false
            }
          })
          this.setState({
            accesos: resultado
          })

        },err => {
          toast.error(err.message);
        })

}

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }
    return (
      <form onSubmit={(event) => {
        this.handleSubmitNewTipoUsuario(event)

      }}>

        <Card>
          <CardHeader color="primary">
            <h4 className={this.props.classes.cardTitleWhite} >Nuevo Tipo Usuario</h4>
            <p className={this.props.classes.cardCategoryWhite} >
              Formulario alta de Tipo de Usuario
          </p>
          </CardHeader>
          <CardBody>


            {formElementsArray.map(formElement => (
              <Input
                key={formElement.id}
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

            <div className="mt-3 mb-3">
            <h4>Permisos</h4>
            <FormGroup row>
            { this.state.accesos.map((elem,index) => {
              return (

                  <FormControlLabel
                    control={
                        <Checkbox checked={elem.checked} onChange={(event) => this.handleCheckbox(event,index)}  />
                        }
                          label={elem.descripcion}
                      />

              )

            })

            }
            </FormGroup>
            </div>
            <Button style={{ marginTop: '25px' }} color="info" onClick={() => this.props.history.push('/admin/tiposusuarios')} ><ArrowBack />Volver</Button>
            <Button style={{ marginTop: '25px' }} color="primary" variant="contained" disabled={!this.state.formIsValid || this.state.disableAllButtons} type="submit" ><Save /> Guardar</Button>

          </CardBody>
        </Card>
      </ form>
    );
  }
}


export default withRouter(withStyles(styles)(NewTipoUsuario));
