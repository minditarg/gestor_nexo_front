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
import ModalAgregarTexto from './ModalAgregarTexto';
import StepAgregarImagen from './StepAgregarImagen';
import StepAgregarArchivo from './StepAgregarArchivo';


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

import { StateNewEditNoticia, StateNewEditNoticiaVideoteca,StateNewEditNoticiaTransparente,StateNewEditBolsa } from "../VariablesState";
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


function urltoFile(url, filename, mimeType) {
  return (fetch(url)
    .then(function (res) { return res.arrayBuffer(); })
    .then(function (buf) { return new File([buf], filename, { type: mimeType }); })
  );
}


const SortableItem = sortableElement(({ value, deleteItem, editItem, orderForm,idnoticia }) => {
  let imagen = null;
  let array = [];
  if (value.imageURL && !value.noticiasFolder  && (value.imageURL.endsWith('.jpg') || value.imageURL.endsWith('.png') || value.imageURL.endsWith('.jpeg') || value.imageURL.endsWith('.gif')))
    imagen = (<img src={'/' + process.env.REACT_APP_UPLOADS_FOLDER + '/thumbs/' + value.imageURL} style={{ width: '75px' }} />);
  else if (value.htmlText)
    imagen = (<img src={textIcon} style={{ width: '75px' }} />)
  else if(value.noticiasFolder){
    imagen = (<img src={fileIcon} style={{ width: '75px' }} />)
  }  
  if (orderForm) {
    for (let key in orderForm) {
      array.push(value[key]);
    }
  }

  

  return (
    <TableRow>
      <TableCell>
        <DragHandle />
      </TableCell>
      <TableCell>
        <IconButton onClick={() => deleteItem(value)}>
          <DeleteIcon />
        </IconButton>
        <IconButton disabled={ value.noticiasFolder ? true : false } onClick={() => editItem(value)}>
          <EditIcon />
        </IconButton>
      </TableCell>
      <TableCell>
        {imagen}
      </TableCell>
      {array.map(elem =>
        <TableCell>
          {elem}
        </TableCell>

      )}
      
       <TableCell>
        { value.noticiasFolder ? process.env.REACT_APP_GESTOR_URL + '/' + process.env.REACT_APP_UPLOADS_FOLDER + '/' + process.env.REACT_APP_NOTICIAS_FOLDER + '/' + idnoticia  + '/' + value.imageURL : 
          value.imageURL ? process.env.REACT_APP_GESTOR_URL + '/' + process.env.REACT_APP_UPLOADS_FOLDER + '/'  + value.imageURL : null  }
      </TableCell>
      

    </TableRow>
  )
}
);

const DragHandle = sortableHandle(() => <span><ControlCamera /></span>);

const SortableContainer = sortableContainer(({ children, orderForm }) => {
  let array = [];
  if (orderForm) {
    for (let key in orderForm) {
      array.push(key);
    }
  }

  return <Table style={{ backgroundColor: '#F9F9F9' }} size="small">
    <TableHead>
      <TableRow>
        <TableCell>Ordenar</TableCell>
        <TableCell>Acciones</TableCell>
        <TableCell>Imagen</TableCell>
        {array.map(elem =>
          <TableCell>
            {elem}
          </TableCell>

        )}
          <TableCell>URL</TableCell>

      </TableRow>
    </TableHead>
    <TableBody>
      {children}
    </TableBody>
  </Table>
});


class NewEditNoticia extends Component {

  state = JSON.parse(JSON.stringify(StateNewEditNoticia));


  constructor(props) {
    super(props);
    if (this.props.idTipoNoticia == 4)
    this.state = JSON.parse(JSON.stringify(StateNewEditNoticiaTransparente))
    else if(this.props.idTipoNoticia == 5)
    this.state = JSON.parse(JSON.stringify(StateNewEditNoticiaVideoteca))
    else if(this.props.idTipoNoticia == 6)
    this.state = JSON.parse(JSON.stringify(StateNewEditBolsa))
    else
    this.state = JSON.parse(JSON.stringify(StateNewEditNoticia));

  }

  handleOpenImgPortada = () => {
    this.setState({
      openImgPortada: true
    })
  };

  handleOpenImgPortada2 = () => {
    this.setState({
      openImgPortada2: true
    })
  };

  handleOpenAgregarTexto = () => {
    this.setState({
      rowItem: null,
      openAgregarTexto: true
    })
  };

  handleOpenImgInterior = () => {
    this.setState({
      rowItem: null,
      openImgInterior: true
    })
  };

  handleOpenArchivoInterior = () => {
    this.setState({
      rowItem: null,
      openArchivoInterior: true
    })
  };


  handleClose = () => {
    this.setState({
      openImgPortada: false,
      openImgPortada2: false,
      openImgInterior: false,
      openArchivoInterior:false,
      openAgregarTexto: false,
      openArchivo: false
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

  editItem = (rowData) => {
    let openImgInterior = false;
    let openAgregarTexto = false;

    if (rowData.imageURL) {
      openImgInterior = true;
    } else if (rowData.htmlText) {
      openAgregarTexto = true;
    }

    this.setState({
      openImgInterior: openImgInterior,
      openAgregarTexto: openAgregarTexto,
      rowItem: rowData

    })



  }

  onSortEnd = ({ oldIndex, newIndex }) => {

    this.setState(({ items }) => ({
      items: arrayMove(items, oldIndex, newIndex),
    }))


  };




  getNoticiaEdit = (id) => {
    let url = '/list-noticias/'
    if (this.props.misNoticias)
      url = '/list-mis-noticias/';


    Database.get(url + id, this)
      .then(resultado => {
        console.log(resultado);
        if (resultado.noticia.length > 0) {
          let contenido = null;
          let imgPortada = null;
          let imgPortada2 = null;
          let items = [];
          if (resultado.noticia[0].contenido) {
            contenido = JSON.parse(resultado.noticia[0].contenido);
            imgPortada = contenido.imgPortada || null;
            imgPortada2 = contenido.imgPortada2 || null;
            items = contenido.items || [];
            if(this.props.idTipoNoticia == 4){
              this.state.orderForm.profesor.value = contenido.profesor || '';
              this.state.orderForm.nombre_link.value = contenido.nombre_link || '';
              this.state.orderForm.url_link.value = contenido.url_link || '';
              this.state.orderForm.link_vivo.value = contenido.link_vivo || '';
            }
            if(this.props.idTipoNoticia == 5){
              this.state.orderForm.url_link.value = contenido.url_link || '';
            }
            if(this.props.idTipoNoticia == 6){
              this.state.orderForm.fecha_string.value = contenido.fecha_string || '';
              this.state.orderForm.locacion.value = contenido.locacion || '';
              this.state.orderForm.email.value = contenido.email || '';
              this.state.orderForm.telefono.value = contenido.telefono || '';
            }

          }

          let orderFormCopy = { ...this.state.orderForm };
          for (let key in orderFormCopy) {
            if (key in resultado.noticia[0])
              orderFormCopy[key].value = resultado.noticia[0][key];
          }



          let { orderForm, formIsValid } = inputAllChangedHandler(orderFormCopy)

          let tags = resultado.tags.map(elem => {
            return elem.descripcion;

          })

          let categoria = null;
          console.log(resultado.noticia[0]);
          if (resultado.noticia[0].id_tipo_categoria) {
            categoria = { id: resultado.noticia[0].id_tipo_categoria, descripcion: resultado.noticia[0].descripcion_tipo_categoria }
            console.log(categoria);
            console.log(categoria.id);
            orderForm.categoria.value = categoria.id.toString();
          }

          let fechaInicio = null;
          if (resultado.noticia[0].fecha_inicio) {
            fechaInicio = moment(resultado.noticia[0].fecha_inicio).format("YYYY-MM-DDTHH:mm");
          }

          let fechaFinalizacion = null;
          if (resultado.noticia[0].fecha_finalizacion) {
            fechaFinalizacion = moment(resultado.noticia[0].fecha_finalizacion).format("YYYY-MM-DDTHH:mm");
          }


          this.setState({
            orderForm: orderForm,
            formIsValid: formIsValid,
            tags: tags,
            idCategoria: categoria,
            imgPortada: imgPortada,
            imgPortada2: imgPortada2,
            items: items,
            fechaInicio: fechaInicio,
            fechaFinalizacion: fechaFinalizacion
          })

        }


      })
  }

  getTiposCategorias = () => {
    console.log("getTiposCategorias");
    Database.get('/list-types-categorias', this)
      .then(res => {
        let resultadoCategorias = [...res.result];
        let a = [];
        resultadoCategorias.forEach(function (entry) {
          a.push({
            value: entry.id,
            displayValue: entry.descripcion
          });
        })
        console.log(this.state);
        let formulario = { ...this.state.orderForm };
        console.log(formulario);
        formulario.categoria.elementConfig.options = [...a];
        this.setState({
          orderForm: formulario
        })
        // this.setState({
        //   tiposCategorias: res.result
        // }
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
      contenido.imgPortada2 = this.state.imgPortada2;
      contenido.items = this.state.items;

      //Es para el tipo de noticia transparente unicamente
      if (this.state.orderForm.profesor)
        contenido.profesor = this.state.orderForm.profesor.value;
      if (this.state.orderForm.nombre_link)
        contenido.nombre_link = this.state.orderForm.nombre_link.value;
      if (this.state.orderForm.url_link)
        contenido.url_link = this.state.orderForm.url_link.value;

      if (this.state.orderForm.link_vivo)
        contenido.link_vivo = this.state.orderForm.link_vivo.value;

      if (this.state.orderForm.fecha_string)
        contenido.fecha_string = this.state.orderForm.fecha_string.value;
      if (this.state.orderForm.locacion)
        contenido.locacion = this.state.orderForm.locacion.value;
      if (this.state.orderForm.email)
        contenido.email = this.state.orderForm.email.value;
      if (this.state.orderForm.telefono)
        contenido.telefono = this.state.orderForm.telefono.value;

      contenido = JSON.stringify(contenido);

      if (this.props.match.params.idnoticia) {
        if (this.props.misNoticias)
          url = '/update-mi-noticia';
        else
          url = '/update-noticia/';
        objectoPost = {
          id: parseInt(this.props.match.params.idnoticia),
          nombre:(this.state.orderForm.nombre && this.state.orderForm.nombre.value )|| null,
          descripcion: ( this.state.orderForm.descripcion && this.state.orderForm.descripcion.value )|| null,
          estado: this.state.orderForm.estado.value,
          destacado: (this.state.orderForm.destacado && this.state.orderForm.destacado.value) || null ,
          principal: ( this.state.orderForm.principal && this.state.orderForm.principal.value ) || null,
          idTipoNoticia: this.props.idTipoNoticia,
          idTipoCategoria: (this.state.orderForm.categoria && this.state.orderForm.categoria.value) || null,
          id_categoria_personal: (this.state.orderForm.id_categoria_personal && this.state.orderForm.id_categoria_personal.value) || null,
          id_categoria_transparente: (this.state.orderForm.id_categoria_transparente && this.state.orderForm.id_categoria_transparente.value) || null,
          tags: this.state.tags,
          contenido: contenido,
          fechaInicio: this.state.fechaInicio,
          fechaFinalizacion: this.state.fechaFinalizacion

        }

      } else {
        url = '/insert-noticia';
       // console.log(this.state.orderForm.categoria);
        objectoPost = {
          nombre:(this.state.orderForm.nombre && this.state.orderForm.nombre.value )|| null,
          descripcion: ( this.state.orderForm.descripcion && this.state.orderForm.descripcion.value )|| null,
          estado: this.state.orderForm.estado.value,
          idTipoCategoria: (this.state.orderForm.categoria && this.state.orderForm.categoria.value) || null,
          destacado: (this.state.orderForm.destacado && this.state.orderForm.destacado.value) || null ,
          principal: ( this.state.orderForm.principal && this.state.orderForm.principal.value ) || null,
          idTipoNoticia: this.props.idTipoNoticia,
          
          id_categoria_personal: (this.state.orderForm.id_categoria_personal && this.state.orderForm.id_categoria_personal.value) || null,
          id_categoria_transparente: (this.state.orderForm.id_categoria_transparente && this.state.orderForm.id_categoria_transparente.value) || null,
          tags: this.state.tags,
          contenido: contenido,
          fechaInicio: this.state.fechaInicio,
          fechaFinalizacion: this.state.fechaFinalizacion

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
            this.props.getNoticias();
            if (!this.props.match.params.idnoticia) {
              let urlBase = "/" + this.props.match.path.split("/")[1] + "/" + this.props.match.path.split("/")[2] + "/edit/" + res.resultInsert[0][0].id_noticia;
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




  handleTags = (e, value) => {
    e.preventDefault();
    this.setState({
      tags: value
    })
  }

  handleCategoria = (e, value) => {
    e.preventDefault();
    this.setState({
      idCategoria: value
    })
  }

  handleSelectImage = (filename) => {
    this.handleClose();

    this.setState({
      imgPortada: filename
    })


  }

  handleSelectImage2 = (filename) => {
    this.handleClose();
    console.log(filename);
    this.setState({
      imgPortada2: filename
    })


  }

  handleFechaInicio = (event, soloDate) => {
    let fecha;
    if (soloDate) {
      fecha = moment(event.target.value, "YYYY-MM-DD").format("YYYY-MM-DD HH:mm");
    } else {
      fecha = event.target.value
    }


    this.setState({
      fechaInicio: fecha
    })

  }

  handleFechaFinalizacion = (event, soloDate) => {
    let fecha;
    if (soloDate) {
      fecha = moment(event.target.value, "YYYY-MM-DD").format("YYYY-MM-DD HH:mm");
    } else {
      fecha = event.target.value
    }


    this.setState({
      fechaFinalizacion: fecha
    })

  }

  handleSelectTexto = (rowItem, objeto) => {
    this.handleClose();
    let objetoCopy = { descripcion: objeto.descripcion, htmlText: objeto.htmlText }
    let items = [...this.state.items];
    if (rowItem) {

      let indice = items.indexOf(rowItem);


      if (indice > -1)
        items[indice] = objetoCopy;
    } else {
      items.push(objetoCopy);
    }

    this.setState({
      items: items

    })

  }

  handleSelectImageInterior = (rowData, objeto) => {
    this.handleClose();

    let objetoCopy = { ...objeto };
    let items = [...this.state.items];

    if (rowData) {
      let indexFind = items.findIndex(elem => {
        return elem == rowData
      })

      if (indexFind > -1) {
        items[indexFind] = objetoCopy;
      }


    } else {

      items.push(objetoCopy)
    }

    this.setState({
      items: items

    })




  }



  componentDidMount() {
    let thumbs = [];
    this.getTiposCategorias();
    if (this.props.match.params.idnoticia) {
      this.getNoticiaEdit(this.props.match.params.idnoticia);
      this.setState({ vistaPrevia: true })
    }
    



  }

  render() {

    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      if (this.props.idTipoNoticia == 1 || (key != 'destacado' && key != 'principal'))
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

    let img2 = defaultImage;
    if (this.state.imgPortada2)
      img2 = '/' + process.env.REACT_APP_UPLOADS_FOLDER + '/thumbs/' + this.state.imgPortada2;

    let titulo = null;
    let thumbs = [];
    let thumbs2 = [];
    let aspectRadio = null;
    let aspectRadio2 = null;
    let width = null;
    let width2 = null;

    if (this.props.idTipoNoticia == 1) {
      titulo = 'Noticia';
      thumbs = [{ width: 450, height: 225 }];
      thumbs2 = [{ width: 250, height: 300 }];
      aspectRadio = 2;
      aspectRadio2 = 0.833
      width2 = 500;
      width = 900;
    }
    else if (this.props.idTipoNoticia == 2) {
      titulo = 'Actividad';
      thumbs = [{ width: 450, height: 225 }];
      thumbs2 = [{ width: 250, height: 300 }];
      aspectRadio = 2;
      aspectRadio2 = 0.833
      width2 = 500;
      width = 900;
    }
    else if (this.props.idTipoNoticia == 3) {
      titulo = 'Campaña';
      thumbs = [{ width: 450, height: 225 }];
      thumbs2 = [{ width: 250, height: 300 }];
      aspectRadio = 2;
      aspectRadio2 = 0.833
      width2 = 500;
      width = 900;
    }
    else if (this.props.idTipoNoticia == 4) {
      titulo = 'Transparente';
      thumbs = [{ width: 450, height: 225 }];
      thumbs2 = [{ width: 250, height: 300 }];
      aspectRadio = 2;
      aspectRadio2 = 0.833
      width2 = 500;
      width = 900;
    }   else if (this.props.idTipoNoticia == 5) {
      titulo = 'Videoteca';
      thumbs = [{ width: 450, height: 225 }];
      thumbs2 = [{ width: 250, height: 300 }];
      aspectRadio = 2;
      aspectRadio2 = 0.833
      width2 = 500;
      width = 900;
    }
    else if (this.props.idTipoNoticia == 6) {
      titulo = 'Oferta Laboral';
      
    }

    return ([
      <div>
        {mostrar &&
          <form onSubmit={(event) => {

            this.handleSubmitNewEditNoticia(event)

          }}>

            <Card>
              <CardHeader color="primary">
                <h4 className={this.props.classes.cardTitleWhite}>{(this.props.match.params.idnoticia ? 'Editar' : 'Nueva') + ' ' + titulo}</h4>
                <p className={this.props.classes.cardCategoryWhite}>
                  Formulario para modificar los datos de la {titulo}
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

                <div style={{ marginTop: '20px', marginBottom: '20px' }}>

                  {this.props.idTipoNoticia == 3  &&

                   
                      <TextField
                        id="date"
                        label="Fecha de Inicio"
                        type="date"
                        value={moment(this.state.fechaInicio).format("YYYY-MM-DD")}
                        onChange={(event) => this.handleFechaInicio(event, true)}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                      

                  }
                  { this.props.idTipoNoticia == 3 &&
                 
                      <TextField
                        id="date"
                        style={{ marginLeft: "25px" }}
                        label="Fecha de Finalizacion"
                        type="date"
                        value={moment(this.state.fechaFinalizacion).format("YYYY-MM-DD")}
                        onChange={(event) => this.handleFechaFinalizacion(event, true)}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    

                  }

                  </div>

                  {(this.props.idTipoNoticia == 2 || this.props.idTipoNoticia == 4) &&
                    <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                      <TextField
                        id="date"
                        label="Fecha y Hora de Inicio"
                        type="datetime-local"

                        value={this.state.fechaInicio}
                        onChange={(event) => this.handleFechaInicio(event)}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />

                      <TextField
                        style={{ marginLeft: "25px" }}
                        id="datetime"
                        label="Fecha y Hora de Finalizacion"
                        type="datetime-local"
                        value={this.state.fechaFinalizacion}
                        onChange={(event) => this.handleFechaFinalizacion(event)}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </div>
                  }


                  { /*

                  <Autocomplete
                    multiple
                    id="tags-filled"
                    options={[]}
                    value={this.state.tags}
                    onChange={this.handleTags}
                    freeSolo
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                      ))
                    }
                    renderInput={(params) => (
                      <TextField {...params} label="Tags" />
                    )}
                  />
                  <Autocomplete
                    id="categorias-filled"
                    options={this.state.tiposCategorias}
                    value={this.state.idCategoria}
                    onChange={this.handleCategoria}
                    getOptionLabel={
                      (option) => {
                        return option.descripcion
                      }
                    }
                 

                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="filterSelectedOptions"
                        placeholder="Favorites"
                      />
                    )}
                    renderInput={(params) => (
                      <TextField {...params} label="categoria" />
                    )}
                  />
                  */
                  }

                  { (this.props.idTipoNoticia != 4 && this.props.idTipoNoticia != 6) &&

                  <div>
                      <h5>Imagen Portada</h5>

                      <Button variant="contained" disabled={this.state.isloading} onClick={this.handleOpenImgPortada} >Imagen Portada +</Button>

                      <div style={{ marginTop: 25 }}>
                        <img style={{ height: 150 }} src={img} />
                      </div>
                  
                  </div>
                  }
                  { (this.props.idTipoNoticia != 4 && this.props.idTipoNoticia != 5 && this.props.idTipoNoticia != 6 ) &&

                  <div>
                      <h5>Imagen Secundaria</h5>


                      <Button variant="contained" disabled={this.state.isloading} onClick={this.handleOpenImgPortada2} >Imagen Secundaria +</Button>

                      <div style={{ marginTop: 25 }}>
                        <img style={{ height: 150 }} src={img2} />
                      </div>
                   
                  </div>
                 }
                
                 
                </div>

                {(this.props.idTipoNoticia != 4 && this.props.idTipoNoticia != 5 && this.props.idTipoNoticia != 6)  &&
                  <div>
                    <Button variant="contained" disabled={this.state.isloading} onClick={this.handleOpenImgInterior} >Imagen Interior +</Button>
                    <Button variant="contained" disabled={this.state.isloading} onClick={this.handleOpenAgregarTexto} >Texto +</Button>
                    <Button variant="contained" disabled={this.state.isloading} onClick={this.handleOpenArchivoInterior} >Archivo +</Button>
                    <Button variant="contained" color="secondary" disabled={this.state.isloading || !this.state.vistaPrevia} onClick={() => window.open(process.env.REACT_APP_SITE_URL + "/noticia_preview.php?id=" + this.props.match.params.idnoticia)} >Vista Previa</Button>

                    <SortableContainer onSortEnd={this.onSortEnd} orderForm={this.state.orderFormItems} useDragHandle>
                      {this.state.items.map((elem, index) => (
                        <SortableItem key={`item-${index}`} index={index} value={elem} deleteItem={this.deleteItem.bind(this)} editItem={this.editItem.bind(this)} orderForm={this.state.orderFormItems} idnoticia={this.props.match.params.idnoticia} />
                      ))}


                    </SortableContainer>
                    {this.state.isLoading &&
                      <div style={{ textAlign: 'center' }}>
                        <CircularProgress />
                      </div>

                    }
                  </div>
                }

                {(this.props.idTipoNoticia == 6)  &&
                  <div>
                   
                    <Button variant="contained" disabled={this.state.isloading} onClick={this.handleOpenAgregarTexto} >Texto +</Button>
                    <Button variant="contained" color="secondary" disabled={this.state.isloading || !this.state.vistaPrevia} onClick={() => window.open(process.env.REACT_APP_SITE_URL + "/noticia_preview.php?id=" + this.props.match.params.idnoticia)} >Vista Previa</Button>

                    <SortableContainer onSortEnd={this.onSortEnd} orderForm={this.state.orderFormItems} useDragHandle>
                      {this.state.items.map((elem, index) => (
                        <SortableItem key={`item-${index}`} index={index} value={elem} deleteItem={this.deleteItem.bind(this)} editItem={this.editItem.bind(this)} orderForm={this.state.orderFormItems} idnoticia={this.props.match.params.idnoticia} />
                      ))}


                    </SortableContainer>
                    {this.state.isLoading &&
                      <div style={{ textAlign: 'center' }}>
                        <CircularProgress />
                      </div>

                    }
                  </div>
                }

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

            {this.state.openImgPortada2 &&
              <ModalSelectImage
                openSelectImage={this.state.openImgPortada2}
                handleSelectImage={this.handleSelectImage2}
                handleClose={this.handleClose}
                width={width2}
                aspectradio={aspectRadio2}
                thumbs={thumbs2}
              />
            }

            {this.state.openAgregarTexto &&
              <ModalAgregarTexto
                rowItem={this.state.rowItem}
                openAgregarTexto={this.state.openAgregarTexto}
                orderForm={this.state.orderFormItems}
                handleSelect={this.handleSelectTexto}
                handleClose={this.handleClose}

              />
            }

            {this.state.openImgInterior &&
              <StepAgregarImagen
                openSelectImage={this.state.openImgInterior}
                orderForm={this.state.orderFormItems}
                rowItem={this.state.rowItem}
                handleSelectImage={this.handleSelectImageInterior}
                handleClose={this.handleClose}
                width={900}
                aspectradio={1.8}

              />
            }

            {this.state.openArchivoInterior &&
              <StepAgregarArchivo
                openSelectArchivo={this.state.openArchivoInterior}
                orderForm={this.state.orderFormItems}
                rowItem={this.state.rowItem}
                handleSelectArchivo={this.handleSelectImageInterior}
                handleClose={this.handleClose}
                id_noticia={this.props.match.params.idnoticia}
               
              />
            }




          </ form>
        }
      </div>



    ])
  }

};

export default withRouter(withStyles(styles)(NewEditNoticia));
