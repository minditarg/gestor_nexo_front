import moment from "moment";

export const StateListControlFaltas = {
    controlfaltas: [],
    offset:0,
    checked: [],
    menuContext: null,
    botonesAcciones: {
        nuevo: {

            enabled: true,
            texto: 'Nuevo'
        },
        editar: {

            enabled: false,
            texto: 'Editar'
        },
        delete: {

            enabled: false,
            texto: 'Eliminar'
        }
    },
    modalOpen: false,
    openDeleteDialog:false,
    deleteRowData:null,
    isLoading:false




}

export const StateEditControlFalta = {

    editControlFaltaForm: {
        id_empleado: {
            elementType: 'select',
            elementConfig: {
                label: 'Empleado',
                options: [
                ],
                fullWidth: true
            },
            value: '',
            validation: {
                required: false
            },
            valid: true,
            touched: false
        },
        id_tipo_falta: {
            elementType: 'select',
            elementConfig: {
                label: 'Falta',
                options: [
                ],
                fullWidth: true
            },
            value: '',
            validation: {
                required: false
            },
            valid: true,
            touched: false
        },    
    },
    
    files: [],
    url_archivo:null,
    openDeleteArchivo:false,

    fechaInicioLicencia:null,
    fechaFinLicencia:null,
    controlfaltaEdit: null,
    editFormIsValid: false,
    successSubmitEdit: null,
    disableAllButtons:false,
    openChangePass: false

}

export const StateNewControlFalta = {

    newControlFaltaForm: {
        id_empleado: {
            elementType: 'select',
            elementConfig: {
                label: 'Empleado',
                options: [
                ],
                fullWidth: true
            },
            value: '',
            validation: {
                required: false
            },
            valid: true,
            touched: false
        },
        id_tipo_falta: {
            elementType: 'select',
            elementConfig: {
                label: 'Falta',
                options: [
                ],
                fullWidth: true
            },
            value: '',
            validation: {
                required: false
            },
            valid: true,
            touched: false
        },  
    },

    fechaInicioLicencia:null,
    fechaFinLicencia:null,
    formIsValid: false,
    successSubmit: null,
    disableAllButtons:false
}

export const ColumnsListado = [
{ title: "Empleado", field: "nombre_empleado" },
{ title: "Falta", field: "tipo_falta" },
{ title: "Días Tomados", field: "dias_tomados" },
{ title: "Días Restantes", field: "dias_restantes" },
{ title: "Días Totales", field: "dias_totales" }
];
