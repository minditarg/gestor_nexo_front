export const StateListUsers = {
    users: [],
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

export const StateEditUser = {

    editUserForm: {
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
        username: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'usuario',
                fullWidth: true,
                disabled: true
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },

        tipoUser: {
            elementType: 'select',
            elementConfig: {
                label: 'Tipo de usuario',
                options: [

                ],
                fullWidth: true
            },
            value: '',
            validation: {
                required: true
            },

            valid: false,
            touched: false
        },
        /*
        descripcion: {
            elementType: 'textarea',
            elementConfig: {
                type: 'text',
                label: 'Descripción',
                rows: 4
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },*/

    },
    userEdit: null,
    editFormIsValid: false,
    successSubmitEdit: null,
    disableAllButtons:false,
    openChangePass: false

}



export const StateNewUser = {

    newUserForm: {
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
        username: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'usuario',
                fullWidth: true
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                label: 'constraseña',
                fullWidth: true
            },
            value: '',
            validation: {
                minLength: 5,
                required: true,

            },
            valid: false,
            touched: false
        },
        tipoUser: {
            elementType: 'select',
            elementConfig: {
                label: 'Tipo de usuario',
                options: [

                ],
                fullWidth: true
            },
            value: '',
            validation: {
                required: true
            },

            valid: false,
            touched: false
        },
        /*
        descripcion: {
            elementType: 'textarea',
            elementConfig: {
                type: 'text',
                label: 'Descripción',
                rows: 4
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        }, */
    },

    formIsValid: false,
    successSubmit: null,
    disableAllButtons:false
}


export const ColumnsListado = [
{ title: "Nombre", field: "nombre" },
{ title: "Usuario", field: "username" },
{ title: "Tipo de Usuario", field: "descripcion_users_type" }
];
