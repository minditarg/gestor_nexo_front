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



// core components/views for Admin layout
import Pages from "views/Pages/Pages.js";
import ItemsMenu from "views/ItemsMenu/ItemsMenu.js";
import Files from "views/Files/Files.js";
import TiposUsuarios from "views/Users/TiposUsuarios.js";
import Users from "views/Users/Users.js";


const dashboardRoutes = [
   {
     accesos: [],
     path: "/pages",
     name: "Paginas",
     rtlName: "DS",
     icon: WebIcon,
     component: Pages,
     layout: "/admin"
   },
   {
    accesos: [],
    path: "/itemsmenu",
    name: "Menu",
    rtlName: "DS",
    icon: ListIcon,
    component: ItemsMenu,
    layout: "/admin"
  }, 
  

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
  {
    show:false,
    accesos: [],
    groupComponent: true,
    name: 'Usuarios',
    open: 'open21',
    icon: Person,
    dependences: [
      {
        show:false,
        accesos: [],
        path: "/usuarios",
        name: "Usuarios",
        rtlName: "Us",
        icon: Person,
        component: Users,
        layout: "/admin"
      },

      {
        show:false,
        accesos: [],
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
