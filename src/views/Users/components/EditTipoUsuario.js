import React, { Component } from "react";
import Input from 'components/Input/Input';
import { Route, Switch, Link, withRouter } from 'react-router-dom';
import Database from "variables/Database.js";
import { toast } from 'react-toastify';

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


class EditTipoUsuario extends Component {
state = {
tipoUsuarioEdit:null,
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
  formIsValid:true,
  disableAllButtons: false

}

  getTipoUsuarioEdit = (id) => {
    Database.get('/list-tipo-usuario/' + id,this)
      .then(resultado => {
          if (resultado.tipoUsuario.length > 0) {
          resultado.accesos =  resultado.accesos.map(elem =>{
            let indexResultado = resultado.detalleAccesos.findIndex(elem2 =>{
              return  elem2.id_acceso == elem.id
            })
            if(indexResultado > -1)
            {
            elem.checked =true
          } else {
            elem.checked = false
          }
          elem.id_users_type =  resultado.tipoUsuario[0].id

            return elem;
          });

          delete resultado.success;
          delete resultado.detalleAccesos;

            this.setState({
              tipoUsuarioEdit: resultado
            })

            let orderFormAlt = { ...this.state.orderForm };
            orderFormAlt.descripcion.value = resultado.tipoUsuario[0].descripcion;

            for (let key in orderFormAlt) {
              orderFormAlt[key].touched = true;
              orderFormAlt[key].valid = true;
            }
            this.setState({
              orderForm: orderFormAlt
            })
          }
          else {
            this.setState({
              tipoUsuarioEdit: null
            })
          }

      },err => {
        toast.error(err.message);
      })
  }

  handleSubmitEditTipoUsuario = (event) => {
    event.preventDefault();
    Database.post(`/update-tipo-usuario`, { id: this.state.tipoUsuarioEdit.tipoUsuario[0].id, accesos: this.state.tipoUsuarioEdit.accesos, descripcion: this.state.orderForm.descripcion.value },this)
      .then(res => {

          this.props.getTiposUsuarios();
            toast.success("Los cambios se realizaron correctamente");



      },err => {
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




  inputEditChangedHandler = (event, inputIdentifier) => {
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




  handleCheckbox = (event,index) => {
    let resultado = { ... this.state.tipoUsuarioEdit };
    resultado.accesos[index].checked = event.target.checked;

    this.setState(
      {
        tipoUsuarioEdit: resultado
      }
    )

  }





  componentDidMount() {
    this.getTipoUsuarioEdit(this.props.match.params.idTipoUsuario);

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
        this.handleSubmitEditCategoria(event)

      } }>


        <Card>
          <CardHeader color="primary">
            <h4 className={this.props.classes.cardTitleWhite}>Editar Tipo de Usuario</h4>
            <p className={this.props.classes.cardCategoryWhite}>
              Detalle del Tipo de Usuario
      </p>
          </CardHeader>
          <CardBody>

            <div className="mt-3 mb-3">
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
                  changed={(event) => this.inputEditChangedHandler(event, formElement.id)}
                  />
              ))}
            </div>
              <div className="mt-3 mb-3">
              <h4>Permisos</h4>
              <FormGroup row>
              { this.state.tipoUsuarioEdit && this.state.tipoUsuarioEdit.accesos.map((elem,index) => {
                return (

                    <FormControlLabel
                      control={
                          <Checkbox checked={elem.checked} onChange={(event) => this.handleCheckbox(event,index)}  value={ "id_acceso" + elem.id } />
                          }
                            label={elem.descripcion}
                        />

                )

              })

              }
              </FormGroup>
              </div>

            <Button style={{ marginTop: '25px' }} color="info" onClick={() => this.props.history.push('/admin/tiposusuarios')} ><ArrowBack />Volver</Button><Button style={{ marginTop: '25px' }} onClick={this.handleSubmitEditTipoUsuario} color="primary" variant="contained" disabled={!this.state.formIsValid || this.state.disableAllButtons} type="submit" ><Save /> Guardar</Button>


          </CardBody>
        </Card>


      </ form>


    )
  }



};

export default withRouter(withStyles(styles)(EditTipoUsuario));
