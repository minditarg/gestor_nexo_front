import React, { Component } from "react";
import Input from 'components/Input/Input';
import { Route, Switch, Link, withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import { StateNewEditItem } from "../VariablesState";

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


class NewItem extends Component {
  state = JSON.parse(JSON.stringify(StateNewEditItem));


  handleSubmitNewItem = (event) => {
    event.preventDefault();
    let id_page = null;
    if (this.state.orderForm.id_page.value > 0 && this.state.orderForm.id_page.value != '')
      id_page = this.state.orderForm.id_page.value;
    Database.post(`/insert-item`, { texto: this.state.orderForm.texto.value, enlace: this.state.orderForm.enlace.value, id_page: id_page, estado: this.state.orderForm.estado.value }, this)
      .then(res => {

        toast.success("El item se ha creado con exito!");
        this.setState({
          successSubmit: true,
          formIsValid: false,
        }, () => {
          this.props.getItems();
        })
        this.resetNewForm();


      }, err => {
        toast.error(err.message);

      })
  }


  inputChangedHandler = (event, inputIdentifier) => {
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

  resetNewForm = (all) => {
    let orderForm = { ...this.state.orderForm };
    let successSubmit = this.state.successSubmit;
    for (let key in orderForm) {
      orderForm[key].value = ''
    }
    if (all)
      successSubmit = false;

    this.setState({
      orderForm: orderForm,
      successSubmit: successSubmit,
      formIsValid: false
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

    this.getPages()
  }

  getPages = () => {
    Database.get(`/list-pages`, this)
      .then(res => {

        let resultado = res.result;

        let orderForm = { ...this.state.orderForm };
        orderForm.id_page.elementConfig.options.push({ value: 0, displayValue: 'Ninguna' });
        res.result.forEach(elem => {
          orderForm.id_page.elementConfig.options.push({ value: elem.id, displayValue: elem.nombre });

        })
        if (orderForm.id_page.value && orderForm.id_page.value != '')
          orderForm.pagina.valid = true;

        this.setState({
          orderForm: orderForm
        })


      }, err => {
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
        this.handleSubmitNewItem(event)

      }}>





        <Card>
          <CardHeader color="primary">
            <h4 className={this.props.classes.cardTitleWhite}>Nuevo Item</h4>
            <p className={this.props.classes.cardCategoryWhite}>
              Formulario de un item nuevo
      </p>
          </CardHeader>
          <CardBody>

            <div className="mt-3 mb-3">
              {formElementsArray.map(formElement => (
                <Input
                  key={"newitem-" + formElement.id}
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

            <Button style={{ marginTop: '25px' }} color="info" onClick={() => this.props.history.goBack()} ><ArrowBack />Volver</Button><Button style={{ marginTop: '25px' }} color="primary" variant="contained" disabled={!this.state.formIsValid || this.state.disableAllButtons} type="submit" ><Save /> Guardar</Button>


          </CardBody>
        </Card>



      </ form>


    )
  }


};

export default withRouter(withStyles(styles)(NewItem));
