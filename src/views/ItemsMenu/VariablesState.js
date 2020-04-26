
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
   
  
    openDeleteDialog: false,
    deleteRowData: null,
    isLoading: false,
    
  
  
  }
  
  