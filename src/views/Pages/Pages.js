import React, { Component } from "react";
import Database from "variables/Database.js";
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

import NewPage from "./components/NewPage";
import EditPage from "./components/EditPage";
import ModalDelete from "./components/ModalDelete"
import { localization } from "variables/general.js";

import { toast } from 'react-toastify';


import { StateListPages, ColumnsListado } from "./VariablesState";

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


class Pages extends Component {
  state = { ...StateListPages };


  componentDidMount() {
    this.getPages();
  }



  handleToggle = value => {
    const currentIndex = this.state.checked.indexOf(value);
    const newChecked = [...this.state.checked];
    let deleteEnabled = false;
    let editEnabled = false;
    const botonesAcc = { ...this.state.botonesAcciones }
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    if (newChecked.length > 0) {
      deleteEnabled = true;
      if (newChecked.length == 1)
        editEnabled = true;
    }
    botonesAcc.editar.enabled = editEnabled;
    botonesAcc.delete.enabled = deleteEnabled;
    this.setState({
      botonesAcciones: botonesAcc,
      checked: newChecked
    })

  };

  menuHandleClose = (value) => {
    this.setState({
      menuContext: null
    })
  }

  menuHandleItemClick = (value) => {
    const newItem = { ...this.state.botonesAcciones[value] };
    let menuContext = { ...this.state.menuContext };
    if (newItem.enabled) {
      menuContext = null;

      if (value == 'nuevo') {
        this.setState({
          menuContext: menuContext
        })
        this.props.history.push(this.props.match.url + '/nuevousuario');
      }

      if (value == 'editar' && this.state.checked.length == 1) {
        this.setState({
          menuContext: menuContext
        })
        let idUser = this.state.checked[0].id;
        this.props.history.push(this.props.match.url + '/editarusuario/' + idUser);
      }
    }
  }

  menuHandleOpen = event => {
    this.setState({
      menuContext: event.currentTarget
    })
  }
  ////////////////////////
  ////////////////////////
  //METODOS PARA LISTADO DE USUARIOS
  ////////////////////////
  ////////////////////////
  getPages = () => {
    this.setState({
      isLoading: true
    })

    Database.get('/list-pages', this, null, true)
      .then(res => {
        let resultado = [...res.result];
        console.log(resultado);
        this.setState({
          isLoading: false,
          pages: resultado,

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

    Database.post('/delete-page', { id: rowData.id }, this).then(res => {
      let pages = [...this.state.pages]
      pages = pages.filter(elem => {
        if (elem.id == rowData.id)
          return false;

        return true

      })

      this.setState({
        pages: pages,
        openDeleteDialog: false
      }, () => {
        toast.success("La pagina se ha eliminado con exito!");
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
    let style = {}
    if (this.props.match.url != this.props.location.pathname) {
      style = { display: 'none' }
    }
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card style={style}>
            <CardHeader color="primary">
              <h4 className={this.props.classes.cardTitleWhite} >Paginas</h4>
              <p className={this.props.classes.cardCategoryWhite} >
                Listado de Paginas
                      </p>
            </CardHeader>
            <CardBody>
              <Button style={{ marginTop: '25px' }} onClick={() => this.props.history.push(this.props.match.url + '/newpage')} color="primary"><AddIcon /> Nueva pagina</Button>
              <MaterialTable
                isLoading={this.state.isLoading}
                columns={ColumnsListado}
                data={this.state.pages}
                title=""
                localization={localization}

                actions={[{
                  icon: 'edit',
                  tooltip: 'Editar Pagina',
                  onClick: (event, rowData) => this.props.history.push(this.props.match.url + '/editpage/' + rowData.id)
                },
                {
                  icon: 'delete',
                  tooltip: 'Borrar Pagina',
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
            <Route path={this.props.match.url + "/newpage"} render={() =>

              <NewPage

                getPages={() => this.getPages()}
                handleListNewUser={(rowData) => this.handleListNewPage(rowData)}


              />}
            />

            <Route path={this.props.match.url + "/editpage/:idpage"} render={() =>

              <EditPage
                
                getPages={() => this.getPages()}



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


export default withStyles(styles)(Pages);
