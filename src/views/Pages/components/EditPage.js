import React, { Component } from 'react';
import Input from 'components/Input/Input';
import { Route, Switch, Link, withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/styles';

import Database from "variables/Database.js";
import { toast, ToastContainer } from 'react-toastify';

import ListModules from '../../Modules/components/ListModules.js';
import EditModule from '../../Modules/EditModule.js';

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

import { StateNewEditPage } from "../VariablesState";
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


class EditPage extends Component {
  state = JSON.parse(JSON.stringify(StateNewEditPage));

  handleClickOpen = () => {
    this.setState({
      openChangePass: true
    })
  };

  handleClose = () => {
    this.setState({
      openChangePass: false
    })
  };




  getPageEdit = (id) => {
    Database.get('/list-pages/' + id, this)
      .then(resultado => {

        if (resultado.result.length > 0) {


          let orderFormCopy = { ...this.state.orderForm };
          for (let key in orderFormCopy) {
            if (resultado.result[0][key])
              orderFormCopy[key].value = resultado.result[0][key];
          }

          let { orderForm, formIsValid } = inputAllChangedHandler(orderFormCopy)


          this.setState({
            orderForm: orderForm,
            formIsValid: formIsValid
          })

        }
    

      })
  }



  handleSubmitEditPage = (event) => {

    event.preventDefault();

    Database.post(`/update-page`, { id: this.props.match.params.idpage, nombre: this.state.orderForm.nombre.value, descripcion: this.state.orderForm.descripcion.value })
      .then(res => {

        this.setState({
          successSubmit: true,
          formIsValid: false,
          disableAllButtons: false
        }, () => {
          toast.success("Modificacion exitosa");

          this.props.getPages();

        })

      }, err => {
        toast.error(err.message);

      })

  }





  componentDidMount() {

    this.getPageEdit(this.props.match.params.idpage);
  }

  render() {

    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }

    let mostrar = true;
    if (this.props.match.url != this.props.location.pathname) {
      mostrar = false
    }

    return ([
      <div>
        {mostrar &&
          <form onSubmit={(event) => {

            this.handleSubmitEditPage(event)

          }}>

            <Card>
              <CardHeader color="primary">
                <h4 className={this.props.classes.cardTitleWhite}>Editar Pagina</h4>
                <p className={this.props.classes.cardCategoryWhite}>
                  Formulario para modificar los datos de la pagina
      </p>
              </CardHeader>
              <CardBody>


                <div className="mt-3 mb-3">
                  {formElementsArray.map(formElement => (
                    <Input
                      key={"editpage-" + formElement.id}
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
                </div>

                <ListModules idPage={this.props.match.params.idpage} />


                <Button style={{ marginTop: '25px' }} color="info" onClick={() => this.props.history.goBack()} ><ArrowBack />Volver</Button><Button style={{ marginTop: '25px' }} color="primary" variant="contained" disabled={!this.state.formIsValid || this.state.disableAllButtons} type="submit" ><Save /> Guardar</Button>


              </CardBody>
            </Card>


          </ form>
        }
      </div>,

      <Switch>
        <Route path={this.props.match.url + "/editmodule/:idModule"} render={() =>

          <EditModule />
        }
        />


      </Switch>





    ])
  }

};

export default withRouter(withStyles(styles)(EditPage));
