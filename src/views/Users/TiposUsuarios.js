import React, { Component } from "react";
import Database from "variables/Database.js";
import { Route, Switch, Link } from 'react-router-dom';
import moment from 'moment';

// import { AddBox, ArrowUpward } from "@material-ui/icons";
// import ReactDOM from "react-dom";
import MaterialTable from "material-table";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import { CardActions } from "@material-ui/core";
import {  toast } from 'react-toastify';
import NewTipoUsuario from './NewTipoUsuario';
import EditTipoUsuario from './components/EditTipoUsuario';
import ModalDeleteTipoUsuario from "./ModalDeleteTipoUsuario";




import { localization } from "variables/general.js";
import lightGreen from '@material-ui/core/colors/lightGreen';

import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Card from "components/Card/Card.js";
import Paper from '@material-ui/core/Paper';

import { withStyles } from '@material-ui/styles';

import AddIcon from '@material-ui/icons/Add';
import Button from "components/CustomButtons/Button.js";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

const ColumnsListado = [
  { title: "Codigo", field: "codigo" },
  { title: "Número", field: "numero" },
  { title: "Descripcion", field: "descripcion" },
  { title: "Unidad", field: "unidad" },
  { title: "Stock Minimo", field: "minimo" }
];

const ColumnsListadoCategorias = [

  { title: "Descripcion", field: "descripcion" }
];

class TiposUsuarios extends Component {
state = {
  isLoading:false
}

  getTiposUsuarios = () => {
    this.setState({
      isLoading:true
    })
    Database.get('/list-tipos-usuarios',this,null,true)
      .then(res => {
        this.setState({
          isLoading:false
        })

          let resultado = [...res.result];
          this.setState({
            tiposUsuarios: resultado
          })


      }, err => {
        toast.error(err.message);
      })
  }

  handleClickOpen(rowData) {
    this.setState({
      openDeleteDialog: true,
      deleteRowData: rowData
    })
  }

  handleClose() {
    this.setState({
      openDeleteDialog: false,
      deleteRowData: null
    })
  }

  handleDelete(rowData) {

    if (rowData.id) {
        this.handleClose();
      Database.post('/delete-tipo-usuario', {
        id: rowData.id
      },this)
        .then(res => {


            this.getTiposUsuarios();
            toast.success("Tipo de usuario Eliminado");

        }, err => {
          toast.error(err.message);
        })
    }

  }

  componentDidMount() {

    this.getTiposUsuarios();

  }


  deleteTipoUsuario = (rowData) => {
    this.setState({
      openDeleteDialog: true,
      deleteRowData: rowData
    })
  }



  reloadCategorias = () => {
    this.getTiposUsuarios();
  }


  render() {

    return ([
      <Switch>
        <Route path={this.props.match.url} exact render={() =>
          <div style={{ maxWidth: "100%" }}>
            <Card>
              <CardHeader color="primary">
                <h4 className={this.props.classes.cardTitleWhite} >TIPOS DE USUARIOS</h4>
                <p className={this.props.classes.cardCategoryWhite} >
                  Listado de Tipos de usuarios
                      </p>
              </CardHeader>
              <CardBody>
              <Button style={{ marginTop: '25px' }} onClick={() => this.props.history.push(this.props.match.url + '/nuevotipousuario')} color="primary"><AddIcon /> Nuevo Tipo de Usuario</Button>

                <MaterialTable
                  isLoading={this.state.isLoading}
                  columns={ColumnsListadoCategorias}
                  data={this.state.tiposUsuarios}
                  title=""
                  localization={localization}
                  actions={[{
                    icon: 'edit',
                    tooltip: 'Editar Tipo Usuario',
                    onClick: (event, rowData) => this.props.history.push(this.props.match.url + '/editartipousuario/' + rowData.id)
                  },
                  {
                    icon: 'delete',
                    tooltip: 'Borrar Categoria',
                    onClick: (event, rowData) => this.deleteTipoUsuario(rowData)
                  }]}
                  options={{
                    exportButton: true,
                    exportAllData:true,
                    exportFileName:"Tipos Usuarios " + moment().format("DD-MM-YYYY"),
                    exportDelimiter:";",
                    headerStyle: {
                      backgroundColor: lightGreen[700],
                      color: '#FFF'
                    },
                  }}
                />
              </CardBody>
            </Card>

          </div>} />

          <Route path={this.props.match.url + "/nuevotipousuario/"} exact render={() =>

          <NewTipoUsuario
            getTiposUsuarios= {()=>this.getTiposUsuarios()}
          />
          } />

          <Route path={this.props.match.url + "/editartipousuario/:idTipoUsuario"} exact render={() =>

          <EditTipoUsuario
            getTiposUsuarios= {()=>this.getTiposUsuarios()}
          />
          } />

      </Switch>,
      <ModalDeleteTipoUsuario
        openDeleteDialog={this.state.openDeleteDialog}
        deleteRowData={this.state.deleteRowData}

        handleClose={() => this.handleClose()}
        handleDelete={(rowData) => this.handleDelete(rowData)}
      />,


    ]);
  }
}


export default withStyles(styles)(TiposUsuarios);
