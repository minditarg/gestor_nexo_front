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

import NewEditVideoteca from "./components/NewEditVideoteca";

import ModalDelete from "./components/ModalDelete"
import { localization } from "variables/general.js";

import { toast } from 'react-toastify';


import { StateListVideoteca, ColumnsListado } from "./VariablesState";

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


class Videoteca extends Component {
  state = { ...StateListVideoteca };


  componentDidMount() {
    this.getVideoteca();
  }




  getVideoteca = () => {
    this.setState({
      isLoading: true
    })
    let url = '/list-videoteca/'
    if (this.props.miVideoteca)
      url = '/list-mi-videoteca/';


    Database.get(url, this, null, true)
      .then(res => {
        let resultado = [...res.result];


        this.setState({
          isLoading: false,
          videos: resultado,

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
    let url = '/delete-videoteca';
    if (this.props.misNoticias)
      url = '/delete-mi-videoteca';


    Database.post(url, { id: rowData.id }, this).then(res => {
      let videos = [...this.state.videos]
      videos = videos.filter(elem => {
        if (elem.id == rowData.id)
          return false;

        return true

      })

      this.setState({
        videos: videos,
        openDeleteDialog: false
      }, () => {
        toast.success("El video se ha eliminado con exito!");
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
    
    let videos = this.state.videos.map(elem => {
      let estado;
      let destacado;
      let principal;

      if (elem.estado == 1)
        estado = 'Publicado';
      if (elem.estado == 2)
        estado = 'Despublicado';

      return {
        ...elem,
        estado: estado,
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
              <h4 className={this.props.classes.cardTitleWhite} >Videoteca</h4>
              <p className={this.props.classes.cardCategoryWhite} >
                Listado de Videos
              </p>
            </CardHeader>
            <CardBody>
              <Button style={{ marginTop: '25px' }} onClick={() => this.props.history.push(this.props.match.url + '/new')} color="primary"><AddIcon /> Nuevo Video</Button>
              <MaterialTable
                isLoading={this.state.isLoading}
                columns={ColumnsListado}
                data={videos}
                title=""
                localization={localization}

                actions={[{
                  icon: 'edit',
                  tooltip: 'Editar Video',
                  onClick: (event, rowData) => this.props.history.push(this.props.match.url + '/edit/' + rowData.id)
                },
                {
                  icon: 'delete',
                  tooltip: 'Borrar Video',
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

              <NewEditVideoteca
                
                getVideoteca={() => this.getVideoteca()}
                miVideoteca={this.props.miVideoteca}


              />}
            />

            <Route path={this.props.match.url + "/edit/:idVideoteca"} render={() =>

              <NewEditVideoteca
              getVideoteca={() => this.getVideoteca()}
              miVideoteca={this.props.miVideoteca}


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


export default withStyles(styles)(Videoteca);
