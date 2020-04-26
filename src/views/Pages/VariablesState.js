export const StateListPages = {
    pages: [],
    modalOpen: false,
    openDeleteDialog:false,
    deleteRowData:null,
    isLoading:false


}

export const StateNewEditPage = {

    orderForm: {
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
        descripcion: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'descripcion',
                fullWidth: true,
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },

        
    },
    orderFormIsValid: false,
    successSubmit: null,
    disableAllButtons:false

}





export const ColumnsListado = [
{ title: "Nombre", field: "nombre" },
{ title: "Descripcion", field: "descripcion" },
{ title: "Estado", field: "estado" }
];
