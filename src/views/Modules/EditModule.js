import React, { Component } from "react";
import Database from "variables/Database.js";
import moment from 'moment';

import Input from 'components/Input/Input';

import { Route, Switch, Link, withRouter } from 'react-router-dom';
// core components
import MaterialTable, { MTableCell, MTableBodyRow } from "material-table";
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Card from "components/Card/Card.js";
import Paper from '@material-ui/core/Paper';
import Button from "components/CustomButtons/Button.js";
import AddIcon from '@material-ui/icons/Add';

import ModType3 from './components/ModType3';
import ModType4 from './components/ModType4';

import { localization } from "variables/general.js";

import { toast } from 'react-toastify';

import lightGreen from '@material-ui/core/colors/lightGreen';

import { inputChangedHandler, inputAllChangedHandler } from "variables/input.js";

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


class EditModule extends Component {
  state = {
    orderForm: {
      nombre: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          label: 'Nombre',
          fullWidth: true
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      estado: {
        elementType: 'select',
        elementConfig: {
          label: 'Estado',
          options: [
            { value: 1, displayValue: 'Habilitado' },
            { value: 2, displayValue: 'Deshabilitado' }

          ],
          fullWidth: true
        },
        value: '',
        validation: {
          required: true
        },

        valid: false,
        touched: false
      }



    }


  }
  getModule = (idModule) => {

    this.setState({
      isLoading: true
    })

    Database.get('/list-modules/' + idModule, this)
      .then(res => {
        let resultado = [...res.result];

        if (resultado.length > 0) {


          let orderFormCopy = { ...this.state.orderForm };
          for (let key in orderFormCopy) {
            if (resultado[0][key])
              orderFormCopy[key].value = resultado[0][key];
          }
          if (orderFormCopy.estado && orderFormCopy.estado.value == 3)
            orderFormCopy.estado.value = 1;


          let { orderForm, formIsValid } = inputAllChangedHandler(orderFormCopy)


          this.setState({
            orderForm: orderForm,
            formIsValid: formIsValid,
            module: resultado[0]

          })

        }


      }, err => {
        toast.error(err.message);

      })




  }


  componentDidMount() {
    this.getModule(this.props.match.params.idModule)
  }






  render() {

    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }
    let style = {}
    if (this.props.match.url != this.props.location.pathname) {
      style = { display: 'none' }
    }
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card style={style}>
            <CardHeader color="primary">
              <h4 className={this.props.classes.cardTitleWhite} >Edicion de Modulo</h4>
              <p className={this.props.classes.cardCategoryWhite} >
                Edicion de modulo
                      </p>
            </CardHeader>
            <CardBody>

              {formElementsArray.map(formElement => (
                <Input
                  key={"editmodule-" + formElement.id}
                  elementType={formElement.config.elementType}
                  elementConfig={formElement.config.elementConfig}
                  value={formElement.config.value}
                  textValid={formElement.config.textValid}
                  invalid={!formElement.config.valid}
                  shouldValidate={formElement.config.validation}
                  touched={formElement.config.touched}
                  changed={(event) => {

                    let { orderForm, formIsValid } = inputChangedHandler(event, formElement.id, this.state.orderForm)
                    this.setState({
                      orderForm: orderForm,
                      formIsValid: formIsValid
                    })

                  }}
                />
              ))}
              {
                this.state.module && this.state.module.id_type_module == 1 &&
                < ModType3
                  module={this.state.module}
                  orderFormPrincipal={this.state.orderForm}
                  formIsValidPrincipal={this.state.formIsValid}
                  orderForm={{
                    titulo: {
                      elementType: 'input',
                      elementConfig: {
                        type: 'text',
                        label: 'Titulo',
                        fullWidth: true
                      },
                      value: '',
                      validation: {
                        required: false
                      },
                      valid: true,
                      touched: false
                    },
                    texto: {
                      elementType: 'textarea',
                      elementConfig: {
                        type: 'text',
                        label: 'Texto',
                        fullWidth: true
                      },
                      value: '',
                      validation: {
                        required: false
                      },
                      valid: true,
                      touched: false
                    }

                  }}
                  archivo={false}
                  htmlText={false}


                />

              }
              {
                this.state.module && this.state.module.id_type_module == 2 &&
                < ModType3
                  module={this.state.module}
                  orderFormPrincipal={this.state.orderForm}
                  formIsValidPrincipal={this.state.formIsValid}
                  orderForm={{
                    titulo: {
                      elementType: 'input',
                      elementConfig: {
                        type: 'text',
                        label: 'Titulo',
                        fullWidth: true
                      },
                      value: '',
                      validation: {
                        required: false
                      },
                      valid: true,
                      touched: false
                    },
                    url: {
                      elementType: 'input',
                      elementConfig: {
                        type: 'text',
                        label: 'URL  ',
                        fullWidth: true
                      },
                      value: '',
                      validation: {
                        required: false
                      },
                      valid: true,
                      touched: false
                    }

                  }}
                  archivo={false}
                  htmlText={false}


                />

              }
              {
                this.state.module && this.state.module.id_type_module == 3 &&
                < ModType3
                  module={this.state.module}
                  orderFormPrincipal={this.state.orderForm}
                  formIsValidPrincipal={this.state.formIsValid}
                  orderForm={{
                    titulo: {
                      elementType: 'input',
                      elementConfig: {
                        type: 'text',
                        label: 'Titulo',
                        fullWidth: true
                      },
                      value: '',
                      validation: {
                        required: false
                      },
                      valid: true,
                      touched: false
                    },

                    texto_linkedIn: {
                      elementType: 'input',
                      elementConfig: {
                        type: 'text',
                        label: 'Texto LinkedIn',
                        fullWidth: true
                      },
                      value: '',
                      validation: {
                        required: false
                      },
                      valid: true,
                      touched: false
                    },
                    url_linkedIn: {
                      elementType: 'input',
                      elementConfig: {
                        type: 'text',
                        label: 'URL LinkedIn',
                        fullWidth: true
                      },
                      value: '',
                      validation: {
                        required: false
                      },
                      valid: true,
                      touched: false
                    },
                    texto_instagram: {
                      elementType: 'input',
                      elementConfig: {
                        type: 'text',
                        label: 'Texto Instagram',
                        fullWidth: true
                      },
                      value: '',
                      validation: {
                        required: false
                      },
                      valid: true,
                      touched: false
                    },
                    url_instagram: {
                      elementType: 'input',
                      elementConfig: {
                        type: 'text',
                        label: 'URL Instagram',
                        fullWidth: true
                      },
                      value: '',
                      validation: {
                        required: false
                      },
                      valid: true,
                      touched: false
                    },
                    texto_facebook: {
                      elementType: 'input',
                      elementConfig: {
                        type: 'text',
                        label: 'Texto Facebook',
                        fullWidth: true
                      },
                      value: '',
                      validation: {
                        required: false
                      },
                      valid: true,
                      touched: false
                    },
                    url_facebook: {
                      elementType: 'input',
                      elementConfig: {
                        type: 'text',
                        label: 'URL Facebook',
                        fullWidth: true
                      },
                      value: '',
                      validation: {
                        required: false
                      },
                      valid: true,
                      touched: false
                    },
                    texto_telegram: {
                      elementType: 'input',
                      elementConfig: {
                        type: 'text',
                        label: 'Texto Telegram',
                        fullWidth: true
                      },
                      value: '',
                      validation: {
                        required: false
                      },
                      valid: true,
                      touched: false
                    },
                    url_telegram: {
                      elementType: 'input',
                      elementConfig: {
                        type: 'text',
                        label: 'URL Telegram',
                        fullWidth: true
                      },
                      value: '',
                      validation: {
                        required: false
                      },
                      valid: true,
                      touched: false
                    },
                    texto_youtube: {
                      elementType: 'input',
                      elementConfig: {
                        type: 'text',
                        label: 'Texto Youtube',
                        fullWidth: true
                      },
                      value: '',
                      validation: {
                        required: false
                      },
                      valid: true,
                      touched: false
                    },
                    url_youtube: {
                      elementType: 'input',
                      elementConfig: {
                        type: 'text',
                        label: 'URL Youtube',
                        fullWidth: true
                      },
                      value: '',
                      validation: {
                        required: false
                      },
                      valid: true,
                      touched: false
                    },
                    texto_twitter: {
                      elementType: 'input',
                      elementConfig: {
                        type: 'text',
                        label: 'Texto Twitter',
                        fullWidth: true
                      },
                      value: '',
                      validation: {
                        required: false
                      },
                      valid: true,
                      touched: false
                    },
                    url_twitter: {
                      elementType: 'input',
                      elementConfig: {
                        type: 'text',
                        label: 'URL Twitter',
                        fullWidth: true
                      },
                      value: '',
                      validation: {
                        required: false
                      },
                      valid: true,
                      touched: false
                    }


                  }}
                  archivo={false}
                  htmlText={false}


                />

              }

              {
                this.state.module && this.state.module.id_type_module == 4 &&
                < ModType3
                  module={this.state.module}
                  orderFormPrincipal={this.state.orderForm}
                  formIsValidPrincipal={this.state.formIsValid}
                  orderForm={{
                    titulo: {
                      elementType: 'input',
                      elementConfig: {
                        type: 'text',
                        label: 'Titulo',
                        fullWidth: true
                      },
                      value: '',
                      validation: {
                        required: false
                      },
                      valid: true,
                      touched: false
                    },
                    mail: {
                      elementType: 'input',
                      elementConfig: {
                        type: 'text',
                        label: 'Email Contacto ',
                        fullWidth: true
                      },
                      value: '',
                      validation: {
                        required: false
                      },
                      valid: true,
                      touched: false
                    }

                  }}
                  archivo={false}
                  htmlText={false}


                />

              }




              {this.state.module && this.state.module.id_type_module == 6 &&
                < ModType4
                  module={this.state.module}
                  orderFormPrincipal={this.state.orderForm}
                  formIsValidPrincipal={this.state.formIsValid}
                  idTipoNoticia={1}


                />

              }

              {this.state.module && this.state.module.id_type_module == 7 &&
                < ModType4
                  module={this.state.module}
                  orderFormPrincipal={this.state.orderForm}
                  formIsValidPrincipal={this.state.formIsValid}
                  idTipoNoticia={2}



                />

              }

              {this.state.module && this.state.module.id_type_module == 8 &&
                < ModType4
                  module={this.state.module}
                  orderFormPrincipal={this.state.orderForm}
                  formIsValidPrincipal={this.state.formIsValid}
                  idTipoNoticia={3}


                />

              }

              {
                this.state.module && this.state.module.id_type_module == 9 &&
                < ModType3
                  module={this.state.module}
                  orderFormPrincipal={this.state.orderForm}
                  formIsValidPrincipal={this.state.formIsValid}
                  items={{
                    orderForm: {
                      titulo: {
                        elementType: 'input',
                        elementConfig: {
                          type: 'text',
                          label: 'Titulo',
                          fullWidth: true
                        },
                        value: '',
                        validation: {
                          required: false
                        },
                        valid: true,
                        touched: false
                      },
                      cantidad: {
                        elementType: 'input',
                        elementConfig: {
                          type: 'text',
                          label: 'Cantidad',
                          fullWidth: true
                        },
                        value: '',
                        validation: {
                          required: false
                        },
                        valid: true,
                        touched: false
                      }

                    },
                    archivo: false,
                    htmlText: false


                  }}
                  archivo={false}
                  htmlText={false}


                />

              }

              {
                this.state.module && this.state.module.id_type_module == 10 &&
                < ModType3
                  module={this.state.module}
                  orderFormPrincipal={this.state.orderForm}
                  formIsValidPrincipal={this.state.formIsValid}
                  orderForm={{
                    titulo: {
                      elementType: 'input',
                      elementConfig: {
                        type: 'text',
                        label: 'Titulo',
                        fullWidth: true
                      },
                      value: '',
                      validation: {
                        required: false
                      },
                      valid: true,
                      touched: false
                    }


                  }}
                  archivo={false}
                  htmlText={true}


                />

              }

              {
                this.state.module && this.state.module.id_type_module == 11 &&
                < ModType3
                  module={this.state.module}
                  orderFormPrincipal={this.state.orderForm}
                  formIsValidPrincipal={this.state.formIsValid}
                  orderForm={{
                    titulo: {
                      elementType: 'textarea',
                      elementConfig: {
                        type: 'text',
                        label: 'Titulo',
                        fullWidth: true
                      },
                      value: '',
                      validation: {
                        required: false
                      },
                      valid: true,
                      touched: false
                    },
                    texto_boton: {
                      elementType: 'input',
                      elementConfig: {
                        type: 'text',
                        label: 'Texto del Botón',
                        fullWidth: true
                      },
                      value: '',
                      validation: {
                        required: false
                      },
                      valid: true,
                      touched: false
                    },
                    url_boton: {
                      elementType: 'input',
                      elementConfig: {
                        type: 'text',
                        label: 'URL del Botón',
                        fullWidth: true
                      },
                      value: '',
                      validation: {
                        required: false
                      },
                      valid: true,
                      touched: false
                    },
                    archivo: {
                      elementType: 'input',
                      elementConfig: {
                        type: 'text',
                        label: 'Archivo',
                        fullWidth: true
                      },
                      value: '',
                      validation: {
                        required: false
                      },
                      valid: true,
                      touched: false
                    }


                  }}
                  archivo={true}
                  aspectRadio={1.5}
                  width={900}
                  htmlText={true}


                />

              }


              {
                this.state.module && this.state.module.id_type_module == 12 &&
                < ModType3
                  module={this.state.module}
                  orderFormPrincipal={this.state.orderForm}
                  formIsValidPrincipal={this.state.formIsValid}
                  orderForm={{
                    titulo: {
                      elementType: 'textarea',
                      elementConfig: {
                        type: 'text',
                        label: 'Titulo',
                        fullWidth: true
                      },
                      value: '',
                      validation: {
                        required: false
                      },
                      valid: true,
                      touched: false
                    },
                    texto_boton: {
                      elementType: 'input',
                      elementConfig: {
                        type: 'text',
                        label: 'Texto del Botón',
                        fullWidth: true
                      },
                      value: '',
                      validation: {
                        required: false
                      },
                      valid: true,
                      touched: false
                    },
                    url_boton: {
                      elementType: 'input',
                      elementConfig: {
                        type: 'text',
                        label: 'URL del Botón',
                        fullWidth: true
                      },
                      value: '',
                      validation: {
                        required: false
                      },
                      valid: true,
                      touched: false
                    },
                    archivo: {
                      elementType: 'input',
                      elementConfig: {
                        type: 'text',
                        label: 'Archivo',
                        fullWidth: true
                      },
                      value: '',
                      validation: {
                        required: false
                      },
                      valid: true,
                      touched: false
                    }


                  }}
                  archivo={true}
                  aspectRadio={1.33}
                  width={600}
                  htmlText={true}


                />

              }

{
                this.state.module && this.state.module.id_type_module == 13 &&
                < ModType3
                  module={this.state.module}
                  orderFormPrincipal={this.state.orderForm}
                  formIsValidPrincipal={this.state.formIsValid}
                  orderForm={{
                    titulo: {
                      elementType: 'input',
                      elementConfig: {
                        type: 'text',
                        label: 'Titulo',
                        fullWidth: true
                      },
                      value: '',
                      validation: {
                        required: false
                      },
                      valid: true,
                      touched: false
                    },
                    texto_boton: {
                      elementType: 'input',
                      elementConfig: {
                        type: 'text',
                        label: 'Texto del Botón',
                        fullWidth: true
                      },
                      value: '',
                      validation: {
                        required: false
                      },
                      valid: true,
                      touched: false
                    },
                    url_boton: {
                      elementType: 'input',
                      elementConfig: {
                        type: 'text',
                        label: 'URL del Botón',
                        fullWidth: true
                      },
                      value: '',
                      validation: {
                        required: false
                      },
                      valid: true,
                      touched: false
                    },
                  


                  }}
                  archivo={false}
                  htmlText={true}


                />

              }

{
                this.state.module && this.state.module.id_type_module == 14 &&
                < ModType3
                  module={this.state.module}
                  orderFormPrincipal={this.state.orderForm}
                  formIsValidPrincipal={this.state.formIsValid}
                  orderForm={{
                    titulo: {
                      elementType: 'input',
                      elementConfig: {
                        type: 'text',
                        label: 'Titulo',
                        fullWidth: true
                      },
                      value: '',
                      validation: {
                        required: false
                      },
                      valid: true,
                      touched: false
                    },
                    texto: {
                      elementType: 'textarea',
                      elementConfig: {
                        type: 'text',
                        label: 'Texto',
                        fullWidth: true
                      },
                      value: '',
                      validation: {
                        required: false
                      },
                      valid: true,
                      touched: false
                    },
                    url: {
                      elementType: 'input',
                      elementConfig: {
                        type: 'text',
                        label: 'URL',
                        fullWidth: true
                      },
                      value: '',
                      validation: {
                        required: false
                      },
                      valid: true,
                      touched: false
                    },

                  }}
                  archivo={false}
                  htmlText={false}


                />

              }







            </CardBody>
          </Card>




        </GridItem>


      </GridContainer>

    );
  }
}


export default withRouter(withStyles(styles)(EditModule));
