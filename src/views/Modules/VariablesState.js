

export const ColumnsListado = [
    { title: "Identificador", field: "identificador",customSort: (a, b) => a.id - b.id},
    { title: "Num Presupuesto", field: "cotizacion", editable: 'never' },
    { title: "Chasis", field: "chasis", editable: 'never' },
    { title: "Descripcion", field: "descripcion" }


];


export const StateListadoListModules = {
    modules: [],
   
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
        tipoModulo: {
            elementType: 'select',
            elementConfig: {
                label: 'Tipo de modulo',
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
        }
    },
        
  
    openDeleteDialog: false,
    deleteRowData: null,
    isLoading: false,
    
  
  
  }
  