//COMPONENTES GENERALES
import React from 'react';
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

//BOTONES Y VARIOS
import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';

import { inputChangedHandler, inputAllChangedHandler } from "variables/input.js";


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
    return ['Seleccione un Insumo', 'Modificar cantidad'];
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

    const steps = getSteps();


    React.useEffect(() => {

        getFiles();
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
        if (rowItem || !props.archivo)
            handleNext();

        if (props.htmlText && rowItem)
            setHtmlText(rowItem.htmlText)


    }, []);

    const getFiles = () => {
        setIsLoading(true);
        Database.get('/list-files', this)
            .then(res => {
                setIsLoading(false);

                let resultado = [...res.result];

                setFiles(resultado);

            }, err => {
                setIsLoading(false);
                toast.error(err.message);
            })
    }




    const handleNext = () => {
        // let orderFormAlt = { ...orderForm };
        //  orderFormAlt.archivo.value = '';

        //setOrderForm(orderFormAlt);
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleFinish = () => {
        let objeto = {}
        if (orderForm) {
            for (let key in orderForm) {
                objeto[key] = orderForm[key].value
            }
        }
        if (props.htmlText)
            objeto.htmlText = htmlText;

        props.onClickItem(rowItem, objeto);
    }

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const handleEditorChange = (content, editor) => {

        setHtmlText(content)
    }





    const getStepContent = (stepIndex) => {
        switch (stepIndex) {
            case 0:
                return <MaterialTable
                    isLoading={isLoading}
                    columns={columns}
                    data={files}
                    title="Imagenes"
                    localization={localization}
                    onRowClick={(event, rowData) => {
                        let orderForm_Alt = { ...orderForm };
                        if (orderForm_Alt && orderForm_Alt.archivo)
                            orderForm_Alt.archivo.value = rowData.nombre;

                        var objeto = inputAllChangedHandler(orderForm_Alt);
                        console.log(objeto);
                        setOrderForm(objeto.orderForm);
                        setFormIsValid(objeto.formIsValid);
                        handleNext();
                    }}
                    components={{
                        Container: props => (
                            <Paper elevation={0} {...props} />
                        )
                    }}


                />;

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
                    {props.htmlText &&
                        <div>
                            <h4>Texto/Descripcion</h4>
                            <Editor
                                initialValue={htmlText}
                                apiKey='ursxh3uvsir7p6qyklffy60b3nt2fn5wpwpexy5t9mweaxla'
                                init={{
                                    language: "es",
                                    language_url: "/langs/es.js",
                                    directionality :"rtl",  
                                    force_br_newlines: true,
                                    force_p_newlines: false,
                                    forced_root_block: '', // Needed for 3.x
                                    height: 150,
                                    menubar: true,
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
                    disabled={activeStep === 0 || !props.archivo}
                    onClick={handleBack}
                    className={classes.backButton}
                >
                    Atras
              </Button>


                {activeStep === steps.length - 1 ? (
                    <Button variant="contained" color="primary" disabled={!formIsValid} onClick={handleFinish}>
                        Agregar
                    </Button>
                ) : null}

            </div>

        </div>
    );
}
