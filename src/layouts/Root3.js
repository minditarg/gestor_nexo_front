import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import Input from '../components/Input/Input';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';




class Root extends Component {
    state = {

        orderForm: {
            username: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    label: 'usuario',
                    fullWidth: true
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    label: 'constraseña',
                    fullWidth: true
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },


        },
        formIsValid: false,
        successPass: null
    }

    componentDidMount() {

    }

    /*handleValue = (event,index) => {
      let newObject = {orderForm: { ...this.state.orderForm }};
      newObject['orderForm'][event.target.name] = event.target.value;
      this.setState(newObject);

    } */

    handleSubmit = (event, index) => {
        event.preventDefault();
        axios.post(`/login-json`, { username: this.state.orderForm.username.value, password: this.state.orderForm.password.value })
            .then(res => {

                let estado = null
                if (res.data.success == 0) {
                    estado = false
                }
                if (res.data.success == 1) {
                    estado = true
                }

                let password = { ...this.state.orderForm.password };
                password.value = '';


                this.setState({
                    orderForm: {
                        ... this.state.orderForm,
                        password: {
                            ...password
                        }
                    },
                    formIsValid:false,
                    successPass: estado
                }, () => {
                    if (estado)
                        this.props.history.push('/admin');
                })

            })

    }

    checkValidity(value, rules) {
        let isValid = true;
        let textValid = null;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
            textValid = 'El campo es requerido'
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
            textValid = 'No supera la cantidad de caracteres minimos'
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
            textValid = 'Supera el maximo de caracteres';
        }

        return {isValid:isValid,textValid:textValid};
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
        checkValid =  this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.valid = checkValid.isValid;
        updatedFormElement.textValid = checkValid.textValid;
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
    }


    render() {


        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }


        let alerta = null
        if (this.state.successPass != null && this.state.successPass == false) {
            alerta = (
                <div className="alert alert-danger" role="alert">
                    El usuario o contraseña son incorrectos
            </div>

            )
        } else if (this.state.successPass != null && this.state.successPass == true) {
            alerta = (
                <div className="alert alert-success" role="alert">
                    usuario y contraseña correcto
            </div>

            )

        }
        return (


                <form onSubmit={this.handleSubmit}>



                    <div className="row justify-content-center">
                        <div className="col-md-4 mt-5">
                            {alerta}
                            <div className="card" >
                                { /* <img src="..." class="card-img-top" alt="..."> */}
                                <div className="card-body" style={{ marginLeft:25,marginRight:25 }}>
                                    <h5 className="card-title">Inicio de sesión</h5>
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
                                    changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                            ))}
                            </div>

                                    <button className="btn btn-primary" disabled={!this.state.formIsValid} type="submit" >Ingresar </button>

                                </div>
                            </div>



                        </div>
                    </div>



                </ form>

        );
    }
}



export default Root;
