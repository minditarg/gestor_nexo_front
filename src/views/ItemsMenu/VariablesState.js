
export const ColumnsListado = [
    { title: "Identificador", field: "identificador",customSort: (a, b) => a.id - b.id},
    { title: "Num Presupuesto", field: "cotizacion", editable: 'never' },
    { title: "Chasis", field: "chasis", editable: 'never' },
    { title: "Descripcion", field: "descripcion" }


];


export const StateListItems = {
    items: [],
   
  
    openDeleteDialog: false,
    deleteRowData: null,
    isLoading: false,
    
  
  
  }


  export const StateNewEditItem = {
    items: [],
    

    orderForm: {
      texto: {
          elementType: 'input',
          elementConfig: {
              type: 'text',
              label: 'Texto',
              fullWidth: true
          },
          value: '',
          validation: {
              required: true
          },
          valid: false,
          touched: false
      },
     
      enlace: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            label: 'Enlace',
            fullWidth: true,
        },
        value: '',
        validation: {
            required: true
        },
        valid: false,
        touched: false
    },

      id_page: {
        elementType: 'select',
        elementConfig: {
            label: 'Página',
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
        value: '',
        validation: {
          required: true
        },

        valid: false,
        touched: false
      }


      
  },
  orderFormIsValid: false,
  successSubmit: null,
  disableAllButtons:false,

    
  
  
  }
  
  