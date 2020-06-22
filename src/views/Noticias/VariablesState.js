export const StateListNoticias = {
    noticias: [],
    modalOpen: false,
    openDeleteDialog:false,
    deleteRowData:null,
    isLoading:false


}

export const StateNewEditNoticia = {

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
        destacado: {
          elementType: 'checkbox',
          elementConfig: {
              label: 'Destacado'
          },
          value: "0",
          validation: {
              required: false
          },
          valid: true,
          touched: true
      },
      principal: {
        elementType: 'checkbox',
        elementConfig: {
            label: 'Principal'
        },
        value: "0",
        validation: {
            required: false
        },
        valid: true,
        touched: true
    },

    
        estado: {
            elementType: 'select',
            elementConfig: {
              label: 'Estado',
              options: [
                { value: 1, displayValue: 'Publicado' },
                { value: 2, displayValue: 'Despublicado' }
    
              ],
              fullWidth: true
            },
            value: '1',
            validation: {
              required: true
            },
    
            valid: false,
            touched: false
          }


        
    },
    orderFormItems: {
        descripcion: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            label: 'Descripción',
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
    tags:[],
    tiposCategorias: [],
    idCategoria:null,
    orderFormIsValid: false,
    successSubmit: null,
    disableAllButtons:false,
    openImagePortada:false,
    fechaInicio:null,
    fechaFinalizacion:null,
    items: [],
    rowItem:null,
    openImgInterior:false,
    openAgregarTexto:false,
    thumbs:[],
    thumbsInterno:[]

}





export const ColumnsListado = [
{ title: "Nombre", field: "nombre" },
{ title: "Descripcion", field: "descripcion" },
{ title: "Estado", field: "estado" }
];
