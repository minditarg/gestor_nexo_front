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
                label: 'Bajada',
                fullWidth: true,
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        /*
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
    },*/

    
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
    openImagePortada2:false,
    fechaInicio:null,
    fechaFinalizacion:null,
    items: [],
    rowItem:null,
    openImgInterior:false,
    openArchivoInterior:false,
    openAgregarTexto:false,
    thumbs:[],
    thumbsInterno:[],
    vistaPrevia: false

}



export const StateNewEditNoticiaTransparente = {

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
      profesor: {
          elementType: 'input',
          elementConfig: {
              type: 'text',
              label: 'Profesor',
              fullWidth: true,
          },
          value: '',
          validation: {
              required: false
          },
          valid: true,
          touched: false
      },
      nombre_link: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            label: 'Nombre Enlance',
            fullWidth: true,
        },
        value: '',
        validation: {
            required: false
        },
        valid: true,
        touched: false
    },
    url_link: {
      elementType: 'input',
      elementConfig: {
          type: 'text',
          label: 'Enlance',
          fullWidth: true,
      },
      value: '',
      validation: {
          required: false
      },
      valid: true,
      touched: false
  },
  link_vivo: {
    elementType: 'input',
    elementConfig: {
        type: 'text',
        label: 'Link Vivo',
        fullWidth: true,
    },
    value: '',
    validation: {
        required: false
    },
    valid: true,
    touched: false
},
  id_categoria_personal: {
    elementType: 'select',
    elementConfig: {
      label: 'Categoria Personal',
      options: [
        { value: 1, displayValue: 'Estudiantes' },
        { value: 2, displayValue: 'Docentes' },
        { value: 3, displayValue: 'Nodocentes' },
        { value: 4, displayValue: 'Egresados' },
        { value: 5, displayValue: 'Toda la comunidad' }

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
  id_categoria_transparente: {
    elementType: 'select',
    elementConfig: {
      label: 'Categoria Transparente',
      options: [
        { value: 1, displayValue: 'Clases de Grado' },
        { value: 2, displayValue: 'Disertaciones y charlas' },
        { value: 3, displayValue: 'Congresos y jornadas' },
        { value: 4, displayValue: 'Cursos' },
        { value: 10, displayValue: 'Exámenes Finales' },
        { value: 5, displayValue: 'Reuniones de consejo' },
        { value: 6, displayValue: 'Defensa de tesis' },
        { value: 7, displayValue: 'Defensa de PIF' },
        { value: 8, displayValue: 'Interés General' },
        


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
  openImagePortada2:false,
  fechaInicio:null,
  fechaFinalizacion:null,
  items: [],
  rowItem:null,
  openImgInterior:false,
  openAgregarTexto:false,
  thumbs:[],
  thumbsInterno:[],
  vistaPrevia: false

}



export const StateNewEditNoticiaVideoteca= {

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
              label: 'Descripcion',
              fullWidth: true,
          },
          value: '',
          validation: {
              required: false
          },
          valid: true,
          touched: false
      },
     
    url_link: {
      elementType: 'input',
      elementConfig: {
          type: 'text',
          label: 'URL video',
          fullWidth: true,
      },
      value: '',
      validation: {
          required: false
      },
      valid: true,
      touched: false
  },
  id_categoria_personal: {
    elementType: 'select',
    elementConfig: {
      label: 'Dirigido A',
      options: [
        { value: 1, displayValue: 'Estudiantes' },
        { value: 2, displayValue: 'Docentes' },
        { value: 3, displayValue: 'Nodocentes' },
        { value: 4, displayValue: 'Egresados' },
        { value: 5, displayValue: 'Toda la comunidad' }

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
  id_categoria_transparente: {
    elementType: 'select',
    elementConfig: {
      label: 'Categoria',
      options: [
        { value: 1, displayValue: 'Clases de Grado' },
        { value: 2, displayValue: 'Disertaciones y charlas' },
        { value: 3, displayValue: 'Congresos y jornadas' },
        { value: 4, displayValue: 'Cursos' },
        { value: 5, displayValue: 'Reuniones de consejo' },
        { value: 6, displayValue: 'Defensa de tesis' },
        { value: 7, displayValue: 'Defensa de PIF' },
        { value: 8, displayValue: 'Interés General' },
        { value: 9, displayValue: 'Tutoriales' },



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
  openImagePortada2:false,
  fechaInicio:null,
  fechaFinalizacion:null,
  items: [],
  rowItem:null,
  openImgInterior:false,
  openAgregarTexto:false,
  thumbs:[],
  thumbsInterno:[],
  vistaPrevia: false

}


export const StateNewEditBolsa = {

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
              label: 'Descripcion',
              fullWidth: true,
          },
          value: '',
          validation: {
              required: true
          },
          valid: false,
          touched: false
      },
      fecha_string: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            label: 'Fecha',
            fullWidth: true,
        },
        value: '',
        validation: {
            required: false
        },
        valid: true,
        touched: false
    },
    locacion: {
      elementType: 'input',
      elementConfig: {
          type: 'text',
          label: 'Locación',
          fullWidth: true,
      },
      value: '',
      validation: {
          required: false
      },
      valid: true,
      touched: false
  },
  email: {
    elementType: 'input',
    elementConfig: {
        type: 'text',
        label: 'Email',
        fullWidth: true,
    },
    value: '',
    validation: {
        required: false
    },
    valid: true,
    touched: false
},
telefono: {
  elementType: 'input',
  elementConfig: {
      type: 'text',
      label: 'Telefono',
      fullWidth: true,
  },
  value: '',
  validation: {
      required: false
  },
  valid: true,
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
  openImagePortada2:false,
  fechaInicio:null,
  fechaFinalizacion:null,
  items: [],
  rowItem:null,
  openImgInterior:false,
  openArchivoInterior:false,
  openAgregarTexto:false,
  thumbs:[],
  thumbsInterno:[],
  vistaPrevia: false

}





export const ColumnsListado = [
{ title: "Nombre", field: "nombre" },
{ title: "Descripcion", field: "descripcion" },
{ title: "Estado", field: "estado" },
{ title: "Usuario", field: "nombre_user" },

];

export const ColumnsListadoVideoteca = [
  { title: "Titulo", field: "nombre" },
  { title: "Descripcion", field: "descripcion" },
  { title: "Estado", field: "estado" },
  { title: "URL", field: "url" },
  { title: "Usuario", field: "nombre_user" },

  ];
