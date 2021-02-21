export const StateListVideoteca = {
    videos: [],
    modalOpen: false,
    openDeleteDialog:false,
    deleteRowData:null,
    isLoading:false


}

export const StateNewEditVideoteca = {

    orderForm: {
        nombre: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'Título',
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
                label: 'Descripción',
                fullWidth: true,
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
      
      url: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            label: 'URL Video',
            fullWidth: true,
        },
        value: '',
        validation: {
            required: true
        },
        valid: false,
        touched: false
    }
  ,
  id_videoteca_categoria: {
    elementType: 'select',
    elementConfig: {
      label: 'Categoria',
      options: [
        { value: 1, displayValue: 'Clases de grado' },
        { value: 2, displayValue: 'Disertaciones y Charlas' },
        { value: 3, displayValue: 'Congresos y jornadas' },
        { value: 4, displayValue: 'Cursos' },
        { value: 5, displayValue: 'Reuniones de Consejo' },
        { value: 6, displayValue: 'Defensa de tesis' },
        { value: 7, displayValue: 'Defensa de PIF' }

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

  id_videoteca_dirigido_a: {
    elementType: 'select',
    elementConfig: {
      label: 'Dirigido A',
      options: [
        { value: 1, displayValue: 'Estudiantes' },
        { value: 2, displayValue: 'Docentes' },
        { value: 3, displayValue: 'Nodocentes' },
        { value: 4, displayValue: 'Egresados' }

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
  value: '1',
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
    openImagePortada:false,
    rowItem:null,
    
    thumbs:[],
    thumbsInterno:[],

}









export const ColumnsListado = [
{ title: "Nombre", field: "nombre" },
{ title: "Descripcion", field: "descripcion" },
{ title: "Estado", field: "estado" },
{ title: "Dest", field: "destacado" },
{ title: "Princ", field: "principal" }
];
