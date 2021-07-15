export const StateListTiposFaltas = {
    tiposfaltas: [],
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

export const StateEditTipoFalta = {

    editTipoFaltaForm: {
        descripcion: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'Tipo de Falta',
                fullWidth: true
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        cantidad_dias: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'Cantidad de días',
                fullWidth: true
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        }, 
    },
    tipofaltaEdit: null,
    editFormIsValid: false,
    successSubmitEdit: null,
    disableAllButtons:false,
    openChangePass: false

}



export const StateNewTipoFalta = {

    newTipoFaltaForm: {
        descripcion: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'Tipo de Falta',
                fullWidth: true
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        cantidad_dias: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'Cantidad de días',
                fullWidth: true
            },
            value: '',
            validation: {
                required: true
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
{ title: "Tipo de Falta", field: "descripcion" },
{ title: "Cantidad de días", field: "cantidad_dias" }
];
