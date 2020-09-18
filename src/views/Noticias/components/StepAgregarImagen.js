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
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

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
    return ['Seleccione una Imagen', 'Confirme la selección'];
}

function urltoFile(url, filename, mimeType) {
    return (fetch(url)
        .then(function (res) { return res.arrayBuffer(); })
        .then(function (buf) { return new File([buf], filename, { type: mimeType }); })
    );
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
    const [img, setImg] = React.useState(null);
    const [urlImg, setUrlImg] = React.useState(null);
    const [sizeMsj, setSizeMsj] = React.useState(false);


    const steps = getSteps();

    const cropper = useRef();

    const onFilesChange = function (files) {
        setImg(URL.createObjectURL(files[0]));

    }

    const onFilesError = function (error, file) {
        console.log('error code ' + error.code + ': ' + error.message)
    }

    const _crop = function () {

        aceptarBoolean = false;
        /*
        cropper.current.getCroppedCanvas().toBlob((blob) => {



        });
        */


        /*
        let file = urltoFile(imageURL, 'hello.png','image/png');

        file.then( elem => {

           // console.log(elem);


        } )
        */
    }


    const handleFile = (UrlFile, callback) => {
        setIsLoading(true);
        Database.post('/insert-noticia-image', { extension: 'jpg' }, this)
            .then(res => {
                let file_name = res.result[0].file_name;
                let file = urltoFile(UrlFile, file_name, 'image/jpg');
                setIsLoading(false);
                file.then(file => {

                    const formData = new FormData();
                    formData.append('userPhoto', file);
                    if (props.thumbs)
                        formData.append('thumbs', JSON.stringify(props.thumbs));

                    Database.post('/insert-only-file', formData, this, false, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })

                        .then(res => {
                            setIsLoading(false);
                            toast.success("El archivo" + file.name + "se ha subido con exito!");
                            callback.bind(this)(file_name);


                        }, err => {
                            setIsLoading(false);
                            toast.error(err.message)

                        })




                }, err => {
                    setIsLoading(false);
                    this.setState({ isLoading: false })
                })

            }, err => {

                setIsLoading(false);
                toast.error(err.message);

            })



    }

    const handleSelectImage = () => {
        let objeto = {};
        for (let key in orderForm) {
            objeto[key] = orderForm[key].value;

        }
        objeto.imageURL = urlImg;

        props.handleSelectImage(rowItem, objeto);

    }


    React.useEffect(() => {

        if (props.orderForm) {
            let orderFormCopy = JSON.parse(JSON.stringify(props.orderForm));
            for (let key in orderFormCopy) {
                if (rowItem && rowItem[key])
                    orderFormCopy[key].value = rowItem[key];
            }

            let objeto = inputAllChangedHandler(orderFormCopy);
            setOrderForm(objeto.orderForm);
            setFormIsValid(objeto.formIsValid);


        }
        if (rowItem) {
            if (rowItem.imageURL) {
                setUrlImg(rowItem.imageURL);
                setImg('/' + process.env.REACT_APP_UPLOADS_FOLDER + '/' + rowItem.imageURL);
            }
            handleNext();
        }
        if (props.htmlText && rowItem)
            setHtmlText(rowItem.htmlText)


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
        //if (cropper.current.getData().width >= props.width || aceptarBoolean) {
            let imageB64 = cropper.current.getCroppedCanvas({ minWidth: props.width, width: props.width, fillColor: '#fff' }).toDataURL('image/jpeg');
            handleFile(imageB64, function (filename) {
                setUrlImg(filename);
                handleNext();

            });
       // } else {
        //    setSizeMsj(true);
        //    aceptarBoolean = true;
       // }

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
                            accepts={['image/*', '.pdf', 'audio/*']}
                            maxFileSize={10000000}
                            minFileSize={0}
                            clickable
                        >
                            Arrastre una foto aquí o haga click
        </Files>

                        <Cropper
                            ref={cropper}
                            src={img}
                            style={{ height: 300, width: '100%' }}
                            // Cropper.js options
                            aspectRatio={props.aspectradio}
                            guides={false}
                            crop={_crop} />

                        {sizeMsj && <p style={{ color: 'red' }}>El tamaño del recuadro es inferior a la resolución necesaria. Agrande el recuadro o vulva a presionar "Seleccionar" para continuar igualmente"  </p>}
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
                    <div style={{ marginTop: '25px' }}>
                        <img style={{ height: '250px' }} src={'/' + process.env.REACT_APP_UPLOADS_FOLDER + '/' + urlImg} />
                    </div>
                    {props.htmlText &&
                        <div>
                            <h4>Texto/Descripcion</h4>
                            <Editor
                                initialValue={htmlText}
                                apiKey='ursxh3uvsir7p6qyklffy60b3nt2fn5wpwpexy5t9mweaxla'
                                init={{
                                    force_br_newlines: true,
                                    force_p_newlines: false,
                                    forced_root_block: '', // Needed for 3.x
                                    height: 750,
                                    menubar: false,
                                    paste_as_text: true,
                                    plugins: [
                                        'advlist autolink lists link image charmap print preview anchor',
                                        'searchreplace visualblocks code fullscreen',
                                        'insertdatetime media table paste code help wordcount'
                                    ],
                                    toolbar:
                                        'undo redo  | bold italic backcolor | \
                                 alignleft aligncenter alignright alignjustify | \
                                   bullist numlist outdent indent | removeformat | help'
                                }}
                                onEditorChange={handleEditorChange}
                            />
                        </div>
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
            maxWidth={"md"}
            fullWidth={true}
            open={props.openSelectImage}
            onClose={props.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Seleccione Imagen</DialogTitle>
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
                            <Button disabled={!img} variant="contained" color="primary" onClick={handleSeleccionar}>
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
                <Button disabled={!formIsValid || activeStep != 1} onClick={() => handleSelectImage()} color="primary">
                    Aceptar
                </Button>
            </DialogActions>
        </Dialog>
    );
}
