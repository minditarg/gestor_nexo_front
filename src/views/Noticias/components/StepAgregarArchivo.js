//COMPONENTES GENERALES
import React, { useRef } from 'react';
import Database from "variables/Database.js";

//COMPONENTES LOCALES
import Input from "components/Input/Input";
import { localization } from "variables/general.js";
import { toast } from 'react-toastify';

//ESTILOS Y COLORES
import { makeStyles } from '@material-ui/core/styles';

//CONTENEDORES
import MaterialTable, { MTableBodyRow } from "material-table";
import Paper from '@material-ui/core/Paper';
import $ from 'jquery';

import { Editor } from '@tinymce/tinymce-react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Files from 'react-files'

//BOTONES Y VARIOS
import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';

import { inputChangedHandler, inputAllChangedHandler } from "variables/input.js";


var aceptarBoolean = false;

const useStyles = makeStyles(theme => ({
    root: {
        width: '90%',
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

const columns = [

    {
        title: "Imagen", field: "imagen", render: rowData => {
            if (rowData.id_type_file == 1)
                return (<img src={'/' + process.env.REACT_APP_UPLOADS_FOLDER + '/thumbs/thumb_' + rowData.nombre} style={{ width: 100, borderRadius: '5%' }} />);

        }
    },
    { title: "Nombre", field: "nombre", editable: 'never' },
];

function getSteps() {
    return ['Seleccione un Archivo', 'Confirme la selección'];
}




export default function HorizontalLabelPositionBelowStepper(props) {
    const classes = useStyles();
    const [orderForm, setOrderForm] = React.useState({});
    const [files, setFiles] = React.useState([]);
    const [formIsValid, setFormIsValid] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [rowItem, setRowItem] = React.useState(props.rowItem);
    const formElementsArray = [];
    const [activeStep, setActiveStep] = React.useState(0);
    const [htmlText, setHtmlText] = React.useState(null);
    const [archivo, setArchivo] = React.useState(null);
    const [urlImg, setUrlImg] = React.useState(null);
    const [sizeMsj, setSizeMsj] = React.useState(false);


    const steps = getSteps();

    const cropper = useRef();

    const onFilesChange = function (files) {
        setArchivo(files[0]);
    }

    const onFilesError = function (error, file) {
        if (error.code == 1){
            //error.message
            toast.error("Tipo de archivo no autorizado para subir")
        } else {
            toast.error("Ha ocurrido un error al subir el archivo")
        }
    }

  

    const handleFile = (file,id_noticia, callback) => {
        setIsLoading(true);
        const formData = new FormData();
        formData.append('id_noticia',id_noticia)
        formData.append('userFile', file);
        Database.post('/insert-noticia-file', formData, this,false,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            
                
            .then(res => {
                    setIsLoading(false);
                            toast.success("El archivo " + res.file.filename + " se ha subido con exito!");
                            callback.bind(this)(res.file.filename);


                     


            }, err => {

                setIsLoading(false);
                toast.error(err.message);

            })



    }

    const handleSelectArchivo = () => {
        let objeto = {};
        for (let key in orderForm) {
            objeto[key] = orderForm[key].value;

        }
        objeto.imageURL = urlImg;
        objeto.noticiasFolder = true;

        props.handleSelectArchivo(rowItem, objeto);

    }


    React.useEffect(() => {

        if (props.orderForm) {
            let orderFormCopy = JSON.parse(JSON.stringify(props.orderForm));
            let objeto = inputAllChangedHandler(orderFormCopy);
            setOrderForm(objeto.orderForm);
            setFormIsValid(objeto.formIsValid);


        }

    }, []);






    const handleNext = () => {
        // let orderFormAlt = { ...orderForm };
        //  orderFormAlt.archivo.value = '';

        //setOrderForm(orderFormAlt);
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };



    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const handleEditorChange = (content, editor) => {

        setHtmlText(content)
    }

    const handleSeleccionar = () => {
            handleFile(archivo,props.id_noticia,function (filename) {
                setUrlImg(filename);
                handleNext();

            });
     

    }





    const getStepContent = (stepIndex) => {
        switch (stepIndex) {
            case 0:
                return (
                    <div>
                        <Files
                            className='files-dropzone'
                            onChange={onFilesChange}
                            onError={onFilesError}
                            multiple={false}
                            accepts={['image/*', '.pdf', 'audio/*','application/*','text/*',]}
                            maxFileSize={10000000}
                            minFileSize={0}
                            clickable
                        >
                            Arrastre una archivo aquí o haga click
        </Files>
                    { archivo ? <p>Nombre: <b>{ archivo.name }</b></p> : null }
                       
                    </div>

                )

            case 1:

                return (<React.Fragment>

                    {
                        formElementsArray.map(formElement => (
                            <Input
                                key={formElement.id}
                                elementType={formElement.config.elementType}
                                elementConfig={formElement.config.elementConfig}
                                value={formElement.config.value}
                                textValid={formElement.config.textValid}
                                invalid={!formElement.config.valid}
                                shouldValidate={formElement.config.validation}
                                touched={formElement.config.touched}
                                changed={(event) => {
                                    let objeto = inputChangedHandler(event, formElement.id, orderForm)
                                    setOrderForm(objeto.orderForm);
                                    setFormIsValid(objeto.formIsValid);
                                }}
                            />
                        ))
                    }
                 
                 
                </React.Fragment>);
            default:
                return 'Paso no seleccionado';
        }
    }

    for (let key in orderForm) {
        formElementsArray.push({
            id: key,
            config: orderForm[key]
        });
    }

    return (
        <Dialog
            disableEnforceFocus={true}
            maxWidth={"md"}
            fullWidth={true}
            open={props.openSelectArchivo}
            onClose={props.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Seleccione Archivo</DialogTitle>
            <DialogContent>
                <div className={classes.root}>
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map(label => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    {getStepContent(activeStep)}
                    <div style={{ marginTop: '2em' }}>


                        <Button
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            className={classes.backButton}
                        >
                            Atras
              </Button>


                        {activeStep === 0 ? (
                            <Button disabled={!archivo} variant="contained" color="primary" onClick={handleSeleccionar}>
                                Seleccionar
                            </Button>
                        ) : null}

                    </div>

                </div>
            </DialogContent>



            <DialogActions>
                <Button onClick={() => props.handleClose()} color="primary">
                    Cancelar
                </Button>
                <Button disabled={!formIsValid || activeStep != 1} onClick={() => handleSelectArchivo()} color="primary">
                    Aceptar
                </Button>
            </DialogActions>
        </Dialog>
    );
}
