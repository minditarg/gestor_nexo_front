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

import { StateNewEditNoticia } from "../VariablesState";
import { inputChangedHandler, inputAllChangedHandler } from "variables/input.js";

import textIcon from 'assets/img/textIcon.png';


const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },

];


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


const SortableItem = sortableElement(({ value, deleteItem, editItem, orderForm }) => {
  let imagen = null;
  let array = [];
  if (value.imageURL && (value.imageURL.endsWith('.jpg') || value.imageURL.endsWith('.png') || value.imageURL.endsWith('.jpeg') || value.imageURL.endsWith('.gif')))
    imagen = (<img src={'/' + process.env.REACT_APP_UPLOADS_FOLDER + '/thumbs/' + value.imageURL} style={{ width: '75px' }} />);
  else if (value.htmlText)
    imagen = (<img src={textIcon} style={{ width: '75px' }} />)
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
        <IconButton onClick={() => editItem(value)}>
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

      </TableRow>
    </TableHead>
    <TableBody>
      {children}
    </TableBody>
  </Table>
});


class NewEditNoticia extends Component {
  fecha = "matias";
  state = JSON.parse(JSON.stringify(StateNewEditNoticia));

  handleOpenImgPortada = () => {
    this.setState({
      openImgPortada: true
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


  handleClose = () => {
    this.setState({
      openImgPortada: false,
      openImgInterior: false,
      openAgregarTexto: false
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
    Database.get('/list-noticias/' + id, this)
      .then(resultado => {
        console.log(resultado);
        if (resultado.noticia.length > 0) {
          let contenido = null;
          let imgPortada = null;
          let items = [];
          if (resultado.noticia[0].contenido) {
            contenido = JSON.parse(resultado.noticia[0].contenido);
            imgPortada = contenido.imgPortada || null;
            items = contenido.items || [];
          }

          let orderFormCopy = { ...this.state.orderForm };
          for (let key in orderFormCopy) {
            if (resultado.noticia[0][key])
              orderFormCopy[key].value = resultado.noticia[0][key];
          }



          let { orderForm, formIsValid } = inputAllChangedHandler(orderFormCopy)

          let tags = resultado.tags.map(elem => {
            return elem.descripcion;

          })

          let categoria = null;
          if (resultado.noticia[0].id_tipo_categoria) {
            categoria = { id: resultado.noticia[0].id_tipo_categoria, descripcion: resultado.noticia[0].descripcion_tipo_categoria }
          }

          let fechaInicio = null;
          if (resultado.noticia[0].fecha_inicio) {
            fechaInicio = moment(resultado.noticia[0].fecha_inicio).format("YYYY-MM-DD HH:mm");
          }

          let fechaFinalizacion = null;
          if (resultado.noticia[0].fecha_finalizacion) {
            fechaFinalizacion = moment(resultado.noticia[0].fecha_finalizacion).format("YYYY-MM-DD HH:mm");
          }


          this.setState({
            orderForm: orderForm,
            formIsValid: formIsValid,
            tags: tags,
            idCategoria: categoria,
            imgPortada: imgPortada,
            items: items,
            fechaInicio: fechaInicio,
            fechaFinalizacion: fechaFinalizacion
          })

        }


      })
  }

  getTiposCategorias = () => {
    Database.get('/list-types-categorias', this)
      .then(res => {

        this.setState({
          tiposCategorias: res.result
        })




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
      contenido.items = this.state.items;

      contenido = JSON.stringify(contenido);

      if (this.props.match.params.idnoticia) {
        url = '/update-noticia';
        objectoPost = {
          id: parseInt(this.props.match.params.idnoticia),
          nombre: this.state.orderForm.nombre.value,
          descripcion: this.state.orderForm.descripcion.value,
          estado: this.state.orderForm.estado.value,
          destacado: this.state.orderForm.destacado.value,
          principal: this.state.orderForm.principal.value,
          idTipoNoticia: this.props.idTipoNoticia,
          idTipoCategoria: (this.state.idCategoria && this.state.idCategoria.id) || null,
          tags: this.state.tags,
          contenido: contenido,
          fechaInicio: this.state.fechaInicio,
          fechaFinalizacion: this.state.fechaFinalizacion

        }

      } else {
        url = '/insert-noticia';
        objectoPost = {
          nombre: this.state.orderForm.nombre.value,
          descripcion: this.state.orderForm.descripcion.value,
          estado: this.state.orderForm.estado.value,
          destacado: this.state.orderForm.destacado.value,
          principal: this.state.orderForm.principal.value,
          idTipoNoticia: this.props.idTipoNoticia,
          idTipoCategoria: (this.state.idCategoria && this.state.idCategoria.id) || null,
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
      console.log(rowItem);
      let indice = items.indexOf(rowItem);

      console.log(indice);
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
    if (this.props.match.params.idnoticia) {
      this.getNoticiaEdit(this.props.match.params.idnoticia);
      this.setState({ vistaPrevia: true })
    }
    this.getTiposCategorias();



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

    let titulo = null;
    let thumbs = [];
    let aspectRadio = null;
    let width = null;

    if (this.props.idTipoNoticia == 1) {
      titulo = 'Noticia';
      thumbs = [{ width: 900, height: 400 }, { width: 500, height: 650 }, { width: 600, height: 350 }, { width: 230, height: 230 }, { width: 768, height: 600 }];
      aspectRadio = 1.5;
      width = 900;
    }
    else if (this.props.idTipoNoticia == 2) {
      titulo = 'Actividad';
      thumbs = [{ width: 400, height: 500 }, { width: 230, height: 230 }];
      aspectRadio = 1.5;
      width = 900;
    }
    else if (this.props.idTipoNoticia == 3) {
      titulo = 'Campaña';
      thumbs = [{ width: 400, height: 270 }, { width: 200, height: 200 }, { width: 230, height: 230 }];
      aspectRadio = 1.5;
      width = 900;
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
                  {this.props.idTipoNoticia == 3 &&

                    <div style={{ marginTop: '20px', marginBottom: '20px' }}>
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
                    </div>


                  }
                  {this.props.idTipoNoticia == 2 &&
                    <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                      <TextField
                        id="date"
                        label="Fecha y Hora de Inicio"
                        type="datetime-local"

                        value={moment(this.state.fechaInicio).format("YYYY-MM-DDTHH:mm")}
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
                        value={moment(this.state.fechaFinalizacion).format("YYYY-MM-DDTHH:mm")}
                        onChange={(event) => this.handleFechaFinalizacion(event)}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </div>
                  }

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

                  <h5>Imagen Portada</h5>

                  <Button variant="contained" disabled={this.state.isloading} onClick={this.handleOpenImgPortada} >Imagen Portada +</Button>

                  <div style={{ marginTop: 25 }}>
                    <img style={{ height: 150 }} src={img} />
                  </div>

                </div>
                <Button variant="contained" disabled={this.state.isloading} onClick={this.handleOpenImgInterior} >Imagen Interior +</Button>
                <Button variant="contained" disabled={this.state.isloading} onClick={this.handleOpenAgregarTexto} >Texto +</Button>
                <Button variant="contained" color="secondary" disabled={this.state.isloading || !this.state.vistaPrevia} onClick={() => window.open(process.env.REACT_APP_SITE_URL + "/noticia_preview.php?id=" + this.props.match.params.idnoticia)} >Vista Previa</Button>

                <SortableContainer onSortEnd={this.onSortEnd} orderForm={this.state.orderFormItems} useDragHandle>
                  {this.state.items.map((elem, index) => (
                    <SortableItem key={`item-${index}`} index={index} value={elem} deleteItem={this.deleteItem.bind(this)} editItem={this.editItem.bind(this)} orderForm={this.state.orderFormItems} />
                  ))}


                </SortableContainer>
                {this.state.isLoading &&
                  <div style={{ textAlign: 'center' }}>
                    <CircularProgress />
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



          </ form>
        }
      </div>



    ])
  }

};

export default withRouter(withStyles(styles)(NewEditNoticia));
