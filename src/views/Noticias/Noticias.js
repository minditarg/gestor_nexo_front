import React, { Component } from "react";
import Database from "variables/Database.js";
import Prueba from "variables/Prueba.js";
import moment from 'moment';

import { Route, Switch, Link } from 'react-router-dom';
// core components
import MaterialTable, { MTableCell, MTableBodyRow } from "material-table";
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Card from "components/Card/Card.js";
import Paper from '@material-ui/core/Paper';
import Button from "components/CustomButtons/Button.js";
import AddIcon from '@material-ui/icons/Add';

import NewEditNoticia from "./components/NewEditNoticia";

import ModalDelete from "./components/ModalDelete"
import { localization } from "variables/general.js";

import { toast } from 'react-toastify';


import { StateListNoticias, ColumnsListado } from "./VariablesState";

import lightGreen from '@material-ui/core/colors/lightGreen';



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


class Noticias extends Component {
  state = { ...StateListNoticias };


  componentDidMount() {
    this.getNoticias();
    Prueba.sumar();
  }




  getNoticias = () => {
    this.setState({
      isLoading: true
    })
    let url = '/list-noticias-bytipo/'
    if (this.props.misNoticias)
      url = '/list-mis-noticias-bytipo/';


    Database.get(url + this.props.idTipoNoticia, this, null, true)
      .then(res => {
        let resultado = [...res.result];


        this.setState({
          isLoading: false,
          noticias: resultado,

        })


      }, err => {
        toast.error(err.message);

      })



  }



  editSinglePage = value => {
    this.props.history.push(this.props.match.url + '/editpage/' + value);
  }

  handlePagination = offset => {
    this.setState({
      offset: offset
    })

  }

  handleDelete = rowData => {
    let url = '/delete-noticia';
    if (this.props.misNoticias)
      url = '/delete-mi-noticia';


    Database.post(url, { id: rowData.id }, this).then(res => {
      let noticias = [...this.state.noticias]
      noticias = noticias.filter(elem => {
        if (elem.id == rowData.id)
          return false;

        return true

      })

      this.setState({
        noticias: noticias,
        openDeleteDialog: false
      }, () => {
        toast.success("La noticia se ha eliminado con exito!");
      })


    }, err => {
      toast.error(err.message);
    })

  }

  handleDeleteButton = rowData => {
    this.setState({
      openDeleteDialog: true,
      deleteRowData: rowData
    })
  }




  handleModalClose() {
    this.setState({
      openDeleteDialog: false,
      deleteRowData: null
    })
  }





  render() {
    let titulo = null;
    let singular = null;
    if (this.props.idTipoNoticia == 1) {
      titulo = 'Noticias';
      singular = 'noticia'
    }
    else if (this.props.idTipoNoticia == 2) {
      titulo = 'Actividades';
      singular = 'actividad';
    }
    else if (this.props.idTipoNoticia == 3) {
      titulo = 'Campañas';
      singular = 'campaña'
    }
    else if (this.props.idTipoNoticia == 4) {
      titulo = 'Transparentes';
      singular = 'transparente'
    }
    console.log(this.state.noticias);

    let noticias = this.state.noticias.map(elem => {
      let estado;
      let destacado;
      let principal;

      if (elem.estado == 1)
        estado = 'Publicado';
      if (elem.estado == 2)
        estado = 'Despublicado';

      if (elem.destacado == 1)
        destacado = 'Si';
      if (elem.destacado == 0)
        destacado = '';

      if (elem.principal == 1)
        principal = 'Si';
      if (elem.principal == 0)
        principal = '';

      return {
        ...elem,
        estado: estado,
        destacado: destacado,
        principal: principal
      }

    })

    let style = {}
    if (this.props.match.url != this.props.location.pathname) {
      style = { display: 'none' }
    }
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card style={style}>
            <CardHeader color="primary">
              <h4 className={this.props.classes.cardTitleWhite} >{titulo}</h4>
              <p className={this.props.classes.cardCategoryWhite} >
                Listado de {titulo}
              </p>
            </CardHeader>
            <CardBody>
              <Button style={{ marginTop: '25px' }} onClick={() => this.props.history.push(this.props.match.url + '/new')} color="primary"><AddIcon /> Nueva {singular}</Button>
              <MaterialTable
                isLoading={this.state.isLoading}
                columns={ColumnsListado}
                data={noticias}
                title=""
                localization={localization}

                actions={[{
                  icon: 'edit',
                  tooltip: 'Editar ${singular}',
                  onClick: (event, rowData) => this.props.history.push(this.props.match.url + '/edit/' + rowData.id)
                },
                {
                  icon: 'delete',
                  tooltip: 'Borrar ${singular}',
                  onClick: (event, rowData) => this.handleDeleteButton(rowData)

                }]}
                components={{
                  Container: props => (
                    <Paper elevation={0} {...props} />
                  )
                }}


              />
            </CardBody>
          </Card>

          <Switch>
            <Route path={this.props.match.url + "/new"} render={() =>

              <NewEditNoticia
                idTipoNoticia={this.props.idTipoNoticia}
                getNoticias={() => this.getNoticias()}
                misNoticias={this.props.misNoticias}


              />}
            />

            <Route path={this.props.match.url + "/edit/:idnoticia"} render={() =>

              <NewEditNoticia
                idTipoNoticia={this.props.idTipoNoticia}
                getNoticias={() => this.getNoticias()}
                misNoticias={this.props.misNoticias}



              />}
            />

          </Switch>


        </GridItem>
        <ModalDelete
          openDeleteDialog={this.state.openDeleteDialog}
          deleteRowData={this.state.deleteRowData}

          handleClose={() => this.handleModalClose()}
          handleDelete={(rowData) => this.handleDelete(rowData)}
        />


      </GridContainer>

    );
  }
}


export default withStyles(styles)(Noticias);
