import moment from 'moment';

export const StateListCompensatorios = {
    compensatorios: [],
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
    isLoading:false,
    minutosTotales: null,
    nombreEmpleado:null

}

export const StateEditCompensatorio = {

    editCompensatorioForm: {
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
        horas: {
            elementType: 'input',
            elementConfig: {
                label: 'Horas',
                options: [
                ],
                fullWidth: false
            },
            value: '',
            validation: {
                required: false
            },
            valid: true,
            touched: false
        },
        minutos: {
            elementType: 'input',
            elementConfig: {
                label: 'Minutos',
                options: [
                ],
                fullWidth: false
            },
            value: '',
            validation: {
                required: false
            },
            valid: true,
            touched: false
        },     
    },
    fechaCompensatorio:null,
    compensatorioEdit: null,
    editFormIsValid: false,
    successSubmitEdit: null,
    disableAllButtons:false,
    openChangePass: false

}

export const StateNewCompensatorio = {

    newCompensatorioForm: {
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
        horas: {
            elementType: 'input',
            elementConfig: {
                label: 'Horas',
                options: [
                ],
                fullWidth: false
            },
            value: '',
            validation: {
                required: false
            },
            valid: true,
            touched: false
        },
        minutos: {
            elementType: 'input',
            elementConfig: {
                label: 'Minutos',
                options: [
                ],
                fullWidth: false
            },
            value: '',
            validation: {
                required: false
            },
            valid: true,
            touched: false
        },  
    },

    fechaCompensatorio:null,
    formIsValid: false,
    successSubmit: null,
    disableAllButtons:false
}

export const ColumnsListado = [
{ title: "Empleado", field: "nombre_empleado" },
{ title: "Fecha", field: "fecha_mostrar", customSort: (a, b) => parseInt(moment(a.fecha).format("YYYYMMDD")) - parseInt(moment(b.fecha).format("YYYYMMDD")) },
{ title: "Minutos", field: "minutos" }
];
