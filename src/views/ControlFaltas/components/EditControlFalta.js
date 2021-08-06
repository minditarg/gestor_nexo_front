import React, { Component } from 'react';
import Input from 'components/Input/Input';
import { Route, Switch, Link, withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/styles';

import Database from "variables/Database.js";
import { toast,ToastContainer } from 'react-toastify';
import moment from "moment";


import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Card from "components/Card/Card.js";
import Button from '@material-ui/core/Button';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Save from '@material-ui/icons/Save';
import BackupIcon from '@material-ui/icons/Backup';
import Files from 'react-files'

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import esLocale from "date-fns/locale/es";

import { StateEditControlFalta } from "../VariablesState";



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


class EditControlFalta extends Component {
  state = JSON.parse(JSON.stringify(StateEditControlFalta));

  handleClickOpen = () => {
    this.setState({
      openChangePass:true
    })
  };

  handleClose = () => {
    this.setState({
      openChangePass:false
    })
  };




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


  getControlFaltaEdit = (id) => {
    Database.get('/list-controlfaltas/' + id)
      .then(resultado => {

          if (resultado.result.length > 0) {
            this.setState({
              controlfaltaEdit: resultado.result[0]
            })

            let editControlFaltaFormAlt = { ...this.state.editControlFaltaForm };
            editControlFaltaFormAlt.id_empleado.value = resultado.result[0].id_empleado;
            editControlFaltaFormAlt.id_tipo_falta.value = resultado.result[0].id_tipo_falta;
            this.state.fechaInicioLicencia = resultado.result[0].inicio_licencia;
            this.state.fechaFinLicencia = resultado.result[0].fin_licencia;
            for (let key in editControlFaltaFormAlt) {
              editControlFaltaFormAlt[key].touched = true;
              editControlFaltaFormAlt[key].valid = true;
            }

            this.setState({
              editControlFaltaForm: editControlFaltaFormAlt,
              url_archivo: resultado.result[0].archivo
            })
           // this.getControlFaltasType("edit", editControlFaltaFormAlt);
          }
          else {
            this.setState({
              controlfaltaEdit: null
            })
          }

      })

    
      Database.get('/list-empleado', this)
      .then(res => {

        let resultado = [...res.result];
        let a = [];
        resultado.forEach(function (entry) {
          a.push({
            value: entry.id,
            displayValue: entry.apellido + ", " + entry.nombre
          });
        })
        let formulario = { ...this.state.editControlFaltaForm }
        formulario.id_empleado.elementConfig.options = [...a];
        this.setState({
            editControlFaltaForm: formulario
        })
      }, err => {
        toast.error(err.message);
      })


    Database.get('/list-tipo-falta', this)
    .then(res => {

      let resultado = [...res.result];
      let a = [];
      resultado.forEach(function (entry) {
        a.push({
          value: entry.id,
          displayValue: entry.descripcion
        });
      })
      let formulario = { ...this.state.editControlFaltaForm }
      formulario.id_tipo_falta.elementConfig.options = [...a];
      this.setState({
          editControlFaltaForm: formulario
      })
    }, err => {
      toast.error(err.message);
    })
    
  }


  handleSubmitEditControlFalta = (event) => {

    event.preventDefault();

    let fechaInicioLicencia = null;
    let fechaFinLicencia = null;

    if (this.state.fechaInicioLicencia != null)
    fechaInicioLicencia = moment(this.state.fechaInicioLicencia).format("YYYY-MM-DD HH:mm");

    if (this.state.fechaFinLicencia != null)
    fechaFinLicencia = moment(this.state.fechaFinLicencia).format("YYYY-MM-DD HH:mm");

    Database.post(`/update-controlfalta`, { id: this.props.match.params.idcontrolfalta, 
        id_empleado: this.state.editControlFaltaForm.id_empleado.value, 
        id_tipo_falta: this.state.editControlFaltaForm.id_tipo_falta.value,
        inicio_licencia: this.state.fechaInicioLicencia,
        fin_licencia: this.state.fechaFinLicencia
        },this)
      .then(res => {

          this.setState({
            successSubmitEdit: true,
            editFormIsValid: false,
            disableAllButtons:false
          },()=>{
              toast.success("La falta se ha modificado con exito!");

              this.props.getControlFaltasAdmin();

          })

      },err =>{
        err.message = err.message.substring(err.message.indexOf(':') + 1 );
        toast.error(err.message);

      })

  }


  inputEditChangedHandler = (event, inputIdentifier) => {
    let checkValid;
    const updatedOrderForm = {
      ...this.state.editControlFaltaForm
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
      editControlFaltaForm: updatedOrderForm,
      editFormIsValid: formIsValidAlt
    })

  }

  onFilesArchivoChange = (files) => {
    console.log(files)
    this.setState({
      files: files
    })
    console.log(this.state.files);

    const formData = new FormData();
    formData.append('archivo', files[0]);
    // if (props.thumbs)
    //     formData.append('thumbs', JSON.stringify(props.thumbs));

    var id = this.props.match.params.idcontrolfalta;//buscar id

    Database.post('/insert-archivo/' + id + "/" + files[0].name, formData, this, false, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

      .then(res => {
        // setIsLoading(false);
        toast.success("El archivo " + files[0].name + " se ha subido con exito!");
        // callback.bind(this)(file_name);
        console.log(res);

      }, err => {
        //    setIsLoading(false);
        toast.error(err.message)

      })

  }

  onFilesArchivoError = (error, file) => {
    toast.warn('Error al subir el archivo ' + error.code + ': ' + error.message);
    console.log('error code ' + error.code + ': ' + error.message)
  }





  resetEditForm = () => {
    let editControlFaltaFormAlt = { ...this.state.editControlFaltaForm };
    let successSubmitEdit = this.state.successSubmitEdit;
    for (let key in editControlFaltaFormAlt) {
      editControlFaltaFormAlt[key].value = ''
    }

    this.setState({
      editFormIsValid: false,
      successSubmitEdit: successSubmitEdit
    })


  }

  componentDidMount() {

   // this.getControlFaltasType();
    this.getControlFaltaEdit(this.props.match.params.idcontrolfalta);
  }

  handleClickOpenArchivo = () => {
    this.setState({
      openDeleteArchivo: true
    })
  };

  handleCloseArchivo = () => {
    this.setState({
      openDeleteArchivo: false
    })
  };

  handleDeleteArchivo = (event) => {
    event.preventDefault();
    this.setState({
      openDeleteArchivo: false
    })

    Database.post(`/delete-archivo`, { id: this.props.match.params.idcontrolfalta }, this)
      .then(res => {
        this.setState({
          successSubmitEdit: true,
          editFormIsValid: false,
          disableAllButtons: false
        }, () => {
          toast.success("El archivo se ha eliminado con exito!");

          //this.props.getEmpleadosAdmin();

        })
      }, err => {
        toast.error(err.message);

      })
  }

  handleFechaInicio = (date) => {
    this.setState(
      {
        fechaInicioLicencia: date,
        editFormIsValid: true,
      }
    )
  };

  handleFechaFin = (date) => {
    this.setState(
      {
        fechaFinLicencia: date,
        editFormIsValid: true,
      }
    )
  };

  render() {

    const formElementsArray = [];
    for (let key in this.state.editControlFaltaForm) {
      formElementsArray.push({
        id: key,
        config: this.state.editControlFaltaForm[key]
      });
    }

    return ([

      <form onSubmit={(event) => {
        
        this.handleSubmitEditControlFalta(event)

      } }>





        <Card>
          <CardHeader color="primary">
            <h4 className={this.props.classes.cardTitleWhite}>Editar Falta</h4>
            <p className={this.props.classes.cardCategoryWhite}>
              Formulario para modificar los datos de la falta
      </p>
          </CardHeader>
          <CardBody>
          {/* <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
        Cambiar Contraseña
      </Button> */}

            <div className="mt-3 mb-3">
              {formElementsArray.map(formElement => (
                <Input
                  key={"editcontrolfalta-" + formElement.id}
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
              <MuiPickersUtilsProvider locale={esLocale} utils={DateFnsUtils}>
                <div>
                  <KeyboardDatePicker
                    margin="normal"
                    id="fechainicio"
                    label="Inicio Licencia"
                    format="dd/MM/yyyy"
                    value={this.state.fechaInicioLicencia}
                    onChange={this.handleFechaInicio}
                    autoOk={true}
                    cancelLabel={"Cancelar"}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </div>
              </MuiPickersUtilsProvider>

              <MuiPickersUtilsProvider locale={esLocale} utils={DateFnsUtils}>
                <div>
                  <KeyboardDatePicker
                    margin="normal"
                    id="fechafin"
                    label="Fin Licencia"
                    format="dd/MM/yyyy"
                    value={this.state.fechaFinLicencia}
                    onChange={this.handleFechaFin}
                    autoOk={true}
                    cancelLabel={"Cancelar"}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </div>
              </MuiPickersUtilsProvider>

              <div className="files">
                <Files
                  className='files-dropzone'
                  onChange={this.onFilesArchivoChange}
                  onError={this.onFilesArchivoError}
                  accepts={['image/png', '.pdf', 'audio/*', '.docx', '.doc', '.jpg']}
                  multiple
                  maxFiles={3}
                  maxFileSize={10000000}
                  minFileSize={0}
                  clickable
                >
                  <Button style={{ marginTop: '25px' }} color="primary" variant="contained" ><BackupIcon />&nbsp; Adjuntar archivo</Button>
                </Files>
                </div>

                {this.state.url_archivo ?
                <div>
                <br></br>
                <a target="_blank" href={this.state.url_archivo}>ver archivo adjunto</a>
                <Button color="info" onClick={this.handleClickOpenArchivo} >Eliminar archivo</Button>
                </div>
                :null}

              <Dialog open={this.state.openDeleteArchivo} onClose={this.handleCloseArchivo} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Eliminar archivo</DialogTitle>
                <form onSubmit={(event) => {
                  this.handleDeleteArchivo(event)

                }}>
                  {this.state.openDeleteArchivo &&
                    <DialogContent>

                      <DialogContentText>
                        Esta seguro que desea eliminar el archivo subido?
                      </DialogContentText>
                    </DialogContent>
                  }
                  <DialogActions>
                    <Button onClick={this.handleCloseArchivo} color="primary">
                      Cancelar
                    </Button>
                    <Button type="submit" color="primary">
                      Aceptar
                    </Button>
                  </DialogActions>
                </form>
              </Dialog>

            </div>

            <Button style={{ marginTop: '25px' }} color="info" onClick={() => this.props.history.push('/admin/controlfaltas')} ><ArrowBack />Volver</Button><Button style={{ marginTop: '25px' }} color="primary" variant="contained" disabled={!this.state.editFormIsValid || this.state.disableAllButtons} type="submit" ><Save /> Guardar</Button>


          </CardBody>
        </Card>


      </ form>,
      
      <Dialog open={this.state.openChangePass} onClose={this.handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Cambio de Contraseña</DialogTitle>
      <form onSubmit={(event) => {
        this.handleChangePass(event)

      } }>
      { this.state.openChangePass &&
      <DialogContent>
      
        <DialogContentText>
          Ingrese una nueva contraseña para el ControlFalta
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="contrasenia"
          name="contrasenia"
          label="nueva contraseña"
          type="password"
          fullWidth
        />
      </DialogContent>
      }
      <DialogActions>
        <Button onClick={this.handleClose} color="primary">
          Cancelar
        </Button>
        <Button type="submit" color="primary">
          Aceptar
        </Button>
      </DialogActions>
      </form>
    </Dialog>
      


              ])
  }

};

export default withRouter(withStyles(styles)(EditControlFalta));
