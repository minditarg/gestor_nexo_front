//COMPONENTES GENERALES
import React from 'react';
import Database from "variables/Database.js";
import moment from 'moment';

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

    { title: "Nombre", field: "nombre", editable: 'never' },
    { title: "Descripcion", field: "descripcion", editable: 'never' },
    { title: "Fecha publicacion", field: "fecha_publicacion", render: rowData => { 
        return moment(rowData.fecha_publicacion).format('DD-MM-YYYY HH:mm') + 'HS'
    } },
];

function getSteps() {
    return ['Seleccione un Insumo', 'Modificar cantidad'];
}



export default function HorizontalLabelPositionBelowStepper(props) {
    const classes = useStyles();
    const [orderForm, setOrderForm] = React.useState({});
    const [noticias, setNoticias] = React.useState([]);
    const [formIsValid, setFormIsValid] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [rowItem, setRowItem] = React.useState(props.rowItem);
    const formElementsArray = [];
    const [activeStep, setActiveStep] = React.useState(0);
    const [htmlText, setHtmlText] = React.useState(null);

    const steps = getSteps();


    React.useEffect(() => {

        getNoticias();
        

    }, []);

    const getNoticias = () => {
        setIsLoading(true);
        Database.get('/list-noticias', this)
            .then(res => {
                setIsLoading(false);

                let resultado = [...res.result];

                setNoticias(resultado);

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

        props.onClickItem(rowItem,);
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





    

    for (let key in orderForm) {
        formElementsArray.push({
            id: key,
            config: orderForm[key]
        });
    }

    return (
        <div className={classes.root}>
           

           
            <div style={{ marginTop: '2em' }}>

            <MaterialTable
                    isLoading={isLoading}
                    columns={columns}
                    data={noticias}
                    title="Noticias"
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


                />
              
            </div>

        </div>
    );
}
