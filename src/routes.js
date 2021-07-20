/*!

=========================================================
* Material Dashboard React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons

import ListIcon from '@material-ui/icons/List';
import WebIcon from '@material-ui/icons/Web';
import FourKIcon from '@material-ui/icons/FourK';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import Person from "@material-ui/icons/Person";
import Today from "@material-ui/icons/Today";
import Notes from "@material-ui/icons/Notes";
import DirectionsBike from "@material-ui/icons/DirectionsBike";



// core components/views for Admin layout
import Pages from "views/Pages/Pages.js";
import ItemsMenu from "views/ItemsMenu/ItemsMenu.js";
import Files from "views/Files/Files.js";
import TiposUsuarios from "views/Users/TiposUsuarios.js";
import Users from "views/Users/Users.js";
import Noticias from "views/Noticias/Noticias.js";
import TiposFaltas from 'views/TiposFaltas/TiposFaltas.js';
import Empleados from 'views/Empleados/Empleados.js';
import ControlFaltas from 'views/ControlFaltas/ControlFaltas.js';


const dashboardRoutes = [
   {
    show:false,
     accesos: [21],
     path: "/pages",
     name: "Paginas",
     rtlName: "DS",
     icon: WebIcon,
     component: Pages,
     layout: "/admin"
   },
   /*
   {
    accesos: [],
    path: "/itemsmenu",
    name: "Menu",
    rtlName: "DS",
    icon: ListIcon,
    component: ItemsMenu,
    layout: "/admin"
  }, 
  */
  
  {
    show:false,
    accesos: [31],
    path: "/noticias",
    name: "Noticias",
    rtlName: "DS",
    icon: Notes,
    component: Noticias,
    parametros:{
      idTipoNoticia:1
    },
    layout: "/admin"
  }, 
  {
    show:false,
    accesos: [32],
    path: "/misnoticias",
    name: "Mis Noticias",
    rtlName: "DS",
    icon: Notes,
    component: Noticias,
    parametros:{
      idTipoNoticia:1,
      misNoticias:true
    },
    layout: "/admin"
  }, 

  {
    show:false,
    accesos: [61],
    path: "/transparente",
    name: "Transparente",
    rtlName: "DS",
    icon: Notes,
    component: Noticias,
    parametros:{
      idTipoNoticia:4
    },
    layout: "/admin"
  }, 

  {
    show:false,
    accesos: [62],
    path: "/mistransparentes",
    name: "Mis Transparente",
    rtlName: "DS",
    icon: Notes,
    component: Noticias,
    parametros:{
      idTipoNoticia:4,
      misNoticias:true
    },
    layout: "/admin"
  }, 

  {
    show:false,
    accesos: [71],
    path: "/videoteca",
    name: "Videoteca",
    rtlName: "DS",
    icon: Notes,
    component: Noticias,
    parametros:{
      idTipoNoticia:5,
    },
    layout: "/admin"
  }, 

  {
    show:false,
    accesos: [72],
    path: "/mivideoteca",
    name: "Mi Videoteca",
    rtlName: "DS",
    icon: Notes,
    component: Noticias,
    parametros:{
      idTipoNoticia:5
      ,
      misNoticias:true
    },
    layout: "/admin"
  }, 
  {
    show:false,
    accesos: [81],
    path: "/bolsa",
    name: "Bolsa de Trabajo",
    rtlName: "DS",
    icon: Notes,
    component: Noticias,
    parametros:{
      idTipoNoticia:6,
    },
    layout: "/admin"
  }, 

  {
    show:false,
    accesos: [91,92,93],
    groupComponent: true,
    name: 'Personal',
    open: 'open22',
    icon: Person,
    dependences: [
      {
        show:false,
        accesos: [91],
        path: "/empleados",
        name: "Empleados",
        rtlName: "EM",
        icon: Person,
        component: Empleados,
        layout: "/admin"
      },
      {
        show:false,
        accesos: [92],
        path: "/tiposfaltas",
        name: "Tipos Faltas",
        rtlName: "TF",
        icon: Person,
        component: TiposFaltas,
        layout: "/admin"
      },
      {
        show:false,
        accesos: [93],
        path: "/controlfaltas",
        name: "Control Faltas",
        rtlName: "CF",
        icon: Person,
        component: ControlFaltas,
        layout: "/admin"
      },
    ]
  },

  {
    show:false,
    accesos: [41],
    path: "/actividades",
    name: "Actividades",
    rtlName: "DS",
    icon: DirectionsBike,
    component: Noticias,
    parametros:{
      idTipoNoticia:2
    },
    layout: "/admin"
  },
  {
    show:false,
    accesos: [51],
    path: "/campanas",
    name: "Campañas",
    rtlName: "DS",
    icon: Today,
    component: Noticias,
    parametros:{
      idTipoNoticia:3
    },
    layout: "/admin"
  },  
  /*
  {
    show:false,
    accesos: [],
    groupComponent: true,
    name: 'Multimedia',
    open: 'open20',
    icon: FourKIcon,
    dependences: [
      {
        show:false,
        accesos: [],
        path: "/files",
        name: "Archivos",
        icon: FolderOpenIcon,
        component: Files,
        layout: "/admin"
      },

      


    ]
  },
  */
  {
    show:false,
    accesos: [11,12],
    groupComponent: true,
    name: 'Usuarios',
    open: 'open21',
    icon: Person,
    dependences: [
      {
        show:false,
        accesos: [11],
        path: "/usuarios",
        name: "Usuarios",
        rtlName: "Us",
        icon: Person,
        component: Users,
        layout: "/admin"
      },

      {
        show:false,
        accesos: [12],
        path: "/tiposusuarios",
        name: "Tipos Usuarios",
        rtlName: "Us",
        icon: Person,
        component: TiposUsuarios,
        layout: "/admin"
      },




    ]
  },
  
];


export const breadcrumRoutes = [
  {
    path: "/admin/usuarios",
    name: "Usuarios",
    to: "/admin/usuarios",
    children: [
      {
        path: "/nuevousuario",
        name: "Nuevo",
        to: "/admin/usuarios/nuevousuario"
      },
      {
        path: "/editarusuario",
        name: "Editar",
        to: "/admin/usuarios/editarusuario"
      }
    ]
  }

]

export default dashboardRoutes
