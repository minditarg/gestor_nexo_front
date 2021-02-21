import React, { Component } from 'react';
import Input from 'components/Input/Input';
import { Route, Switch, Link, withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/styles';

import Database from "variables/Database.js";
import { toast, ToastContainer } from 'react-toastify';
import { Editor } from '@tinymce/tinymce-react';

import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Card from "components/Card/Card.js";
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Save from '@material-ui/icons/Save';

import CircularProgress from '@material-ui/core/CircularProgress';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ControlCamera from '@material-ui/icons/ControlCamera';

import Autocomplete from '@material-ui/lab/Autocomplete';
import Chip from '@material-ui/core/Chip';

import ModalSelectImage from './ModalSelectImage';


import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import moment from 'moment';


import Grid from '@material-ui/core/Grid';

import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';
import arrayMove from 'array-move';



import defaultImage from 'assets/img/default-image.jpg';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { StateNewEditVideoteca } from "../VariablesState";
import { inputChangedHandler, inputAllChangedHandler } from "variables/input.js";

import textIcon from 'assets/img/textIcon.png';
import fileIcon from 'assets/img/file_icon.png';





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



  

class NewEditVideoteca extends Component {

  state = JSON.parse(JSON.stringify(StateNewEditVideoteca));


  handleOpenImgPortada = () => {
    this.setState({
      openImgPortada: true
    })
  };

  

  handleClose = () => {
    this.setState({
      openImgPortada: false,
     
    })
  };


  deleteItem = (rowData) => {
    let indexItem = this.state.items.findIndex(elem => {
      return elem == rowData

    })

    if (indexItem > -1) {
      let items = [... this.state.items]
      items.splice(indexItem, 1)
      this.setState({
        items: items
      })
    }

  }

 

 



  getVideoEdit = (id) => {
    let url = '/list-videoteca/'
    if (this.props.misNoticias)
      url = '/list-mi-videoteca/';


    Database.get(url + id, this)
      .then(resultado => {
        if (resultado.noticia.length > 0) {
          let contenido = null;
          let imgPortada = null;
          if (resultado.video[0].contenido) {
            contenido = JSON.parse(resultado.video[0].contenido);
            imgPortada = contenido.imgPortada || null;
           
          }

          let orderFormCopy = { ...this.state.orderForm };
          for (let key in orderFormCopy) {
            if (key in resultado.video[0])
              orderFormCopy[key].value = resultado.video[0][key];
          }



          let { orderForm, formIsValid } = inputAllChangedHandler(orderFormCopy)


      


          this.setState({
            orderForm: orderForm,
            formIsValid: formIsValid,
            imgPortada: imgPortada,
          })

        }


      })
  }

 

  handleSubmitNewEditNoticia = (event) => {
    let url;
    let objectoPost = {}
    let contenido = {}
    event.preventDefault();

    let orderFormCopy = { ... this.state.orderForm }
    for (let key in orderFormCopy) {
      orderFormCopy[key].touched = true
    }

    let { orderForm, formIsValid } = inputAllChangedHandler(orderFormCopy)

    this.setState({
      formIsValid: formIsValid,
      orderForm: orderForm
    })

    if (formIsValid) {
      contenido.imgPortada = this.state.imgPortada;
      //Es para el tipo de noticia transparente unicamente

      contenido = JSON.stringify(contenido);

      if (this.props.match.params.idvideoteca) {
        if (this.props.miVideoteca)
          url = '/update-mi-videoteca';
        else
          url = '/update-videoteca/';
        objectoPost = {
          id: parseInt(this.props.match.params.idvideoteca),
          nombre:(this.state.orderForm.nombre && this.state.orderForm.nombre.value )|| null,
          descripcion: ( this.state.orderForm.descripcion && this.state.orderForm.descripcion.value )|| null,
          estado: this.state.orderForm.estado.value,
          contenido: contenido,
          id_videoteca_dirigido_a: ( this.state.orderForm.id_videoteca_dirigido_a && this.state.orderForm.id_videoteca_dirigido_a.value )|| null,
          id_videoteca_categoria: ( this.state.orderForm.id_videoteca_categoria && this.state.orderForm.id_videoteca_categoria.value )|| null,
          
        }

      } else {
        url = '/insert-videoteca';
        objectoPost = {
          nombre:(this.state.orderForm.nombre && this.state.orderForm.nombre.value )|| null,
          descripcion: ( this.state.orderForm.descripcion && this.state.orderForm.descripcion.value )|| null,
          estado: this.state.orderForm.estado.value,
          contenido: contenido,
          id_videoteca_dirigido_a: ( this.state.orderForm.id_videoteca_dirigido_a && this.state.orderForm.id_videoteca_dirigido_a.value )|| null,
          id_videoteca_categoria: ( this.state.orderForm.id_videoteca_categoria && this.state.orderForm.id_videoteca_categoria.value )|| null,
          
          
        }


      }



      Database.post(url, objectoPost, this)
        .then(res => {

          this.setState({
            successSubmit: true,
            formIsValid: false,
            disableAllButtons: false
          }, () => {
            toast.success("Modificacion exitosa");
            this.props.getVideos();
            if (!this.props.match.params.idvideoteca) {
              let urlBase = "/" + this.props.match.path.split("/")[1] + "/" + this.props.match.path.split("/")[2] + "/edit/" + res.resultInsert[0][0].id_videoteca;
              this.props.history.replace(urlBase);
              this.setState({ vistaPrevia: true })
            }



          })

        }, err => {
          toast.error(err.message);

        })

    } else {
      toast.error("verifique los campos a completar");
    }
  }


  handleSelectImage = (filename) => {
    this.handleClose();

    this.setState({
      imgPortada: filename
    })


  }




  componentDidMount() {
    let thumbs = [];
    if (this.props.match.params.idvideoteca) {
      this.getVideoEdit(this.props.match.params.idvideoteca);
      this.setState({ vistaPrevia: true })
    }
   


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

    let img = defaultImage;
    if (this.state.imgPortada)
      img = '/' + process.env.REACT_APP_UPLOADS_FOLDER + '/thumbs/' + this.state.imgPortada;

   
     let titulo = 'Video';
     let thumbs = [{ width: 450, height: 225 }];
     let aspectRadio = 2;
    let width = 900;
    
 
    return ([
      <div>
        {mostrar &&
          <form onSubmit={(event) => {

            this.handleSubmitNewEditVideoteca(event)

          }}>

            <Card>
              <CardHeader color="primary">
                <h4 className={this.props.classes.cardTitleWhite}>{(this.props.match.params.idnoticia ? 'Editar' : 'Nuevo') + ' ' + titulo}</h4>
                <p className={this.props.classes.cardCategoryWhite}>
                  Formulario para modificar los datos del {titulo}
                </p>
              </CardHeader>
              <CardBody>


                <div className="mt-3 mb-3">
                  {formElementsArray.map(formElement => (
                    <Input
                      key={"editnoticia-" + formElement.id}
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
                

                <div>
                      <h5>Imagen Portada</h5>

                      <Button variant="contained" disabled={this.state.isloading} onClick={this.handleOpenImgPortada} >Imagen Portada +</Button>

                      <div style={{ marginTop: 25 }}>
                        <img style={{ height: 150 }} src={img} />
                      </div>

                   
                  
                </div>

              

                <Button style={{ marginTop: '25px' }} color="info" onClick={() => this.props.history.goBack()} ><ArrowBack />Volver</Button><Button style={{ marginTop: '25px' }} color="primary" variant="contained" disabled={this.state.disableAllButtons} type="submit" ><Save /> Guardar</Button>


              </CardBody>
            </Card>
            {this.state.openImgPortada &&
              <ModalSelectImage
                openSelectImage={this.state.openImgPortada}
                handleSelectImage={this.handleSelectImage}
                handleClose={this.handleClose}
                width={width}
                aspectradio={aspectRadio}
                thumbs={thumbs}
              />
            }

         

    

          </ form>
        }
      </div>



    ])
  }

};

export default withRouter(withStyles(styles)(NewEditVideoteca));
