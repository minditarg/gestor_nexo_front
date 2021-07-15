export const StateListEmpleados = {
    empleados: [],
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

export const StateEditEmpleado = {

    editEmpleadoForm: {
        nombre: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'Nombre',
                fullWidth: true
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        apellido: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'Apellido',
                fullWidth: true
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        dni: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'DNI',
                fullWidth: true
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        telefono: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'Teléfono',
                fullWidth: true
            },
            value: '',
            validation: {
                required: false
            },
            valid: false,
            touched: false
        },
        direccion: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'Dirección',
                fullWidth: true
            },
            value: '',
            validation: {
                required: false
            },
            valid: false,
            touched: false
        },
        id_tipo_empleado: {
            elementType: 'select',
            elementConfig: {
                label: 'Tipo',
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
        mail: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'Mail',
                fullWidth: true
            },
            value: '',
            validation: {
                required: false
            },
            valid: false,
            touched: false
        },    
    },
    empleadoEdit: null,
    editFormIsValid: false,
    successSubmitEdit: null,
    disableAllButtons:false,
    openChangePass: false

}

export const StateNewEmpleado = {

    newEmpleadoForm: {
        nombre: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'Nombre',
                fullWidth: true
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        apellido: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'Apellido',
                fullWidth: true
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        dni: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'DNI',
                fullWidth: true
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        telefono: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'Teléfono',
                fullWidth: true
            },
            value: '',
            validation: {
                required: false
            },
            valid: false,
            touched: false
        },
        direccion: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'Dirección',
                fullWidth: true
            },
            value: '',
            validation: {
                required: false
            },
            valid: false,
            touched: false
        },
        id_tipo_empleado: {
            elementType: 'select',
            elementConfig: {
                label: 'Tipo',
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
        mail: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'Mail',
                fullWidth: true
            },
            value: '',
            validation: {
                required: false
            },
            valid: false,
            touched: false
        },   
    },

    formIsValid: false,
    successSubmit: null,
    disableAllButtons:false
}

export const ColumnsListado = [
{ title: "Nombre", field: "nombre" },
{ title: "Apellido", field: "apellido" },
{ title: "DNI", field: "dni" },
{ title: "Teléfono", field: "telefono" },
{ title: "Dirección", field: "direccion" },
{ title: "Tipo", field: "tipoempleado" },
{ title: "Mail", field: "mail" }
];
