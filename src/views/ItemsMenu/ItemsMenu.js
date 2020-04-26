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
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ControlCamera from '@material-ui/icons/ControlCamera';
import CircularProgress from '@material-ui/core/CircularProgress';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import NewItem from "./components/NewItem";
import EditItem from "./components/EditItem";
import ModalDelete from "./components/ModalDelete"
import { localization } from "variables/general.js";

import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';
import arrayMove from 'array-move';

import { toast } from 'react-toastify';


import { StateListItems, ColumnsListado } from "./VariablesState";

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

const SortableItem = sortableElement(({ value, deleteItem, editItem }) => {
  let estado = null
  if (value.estado == 1)
    estado = 'Habilitado';

  if (value.estado == 2)
    estado = 'Deshabilitado';


  return (
    <TableRow>
      <TableCell>
        <DragHandle />
      </TableCell>
      <TableCell>
        <IconButton onClick={() => deleteItem(value)}>
          <DeleteIcon />
        </IconButton>
        <IconButton onClick={() => editItem(value.id)}>
          <EditIcon />
        </IconButton>
      </TableCell>
      <TableCell>
        {value.texto}
      </TableCell>
      <TableCell>
        {value.enlace}
      </TableCell>
      <TableCell>
        {value.nombre_pagina}
      </TableCell>
      <TableCell>
        {estado}
      </TableCell>

    </TableRow>
  )
}
);

const DragHandle = sortableHandle(() => <span><ControlCamera /></span>);

const SortableContainer = sortableContainer(({ children }) => {
  return <Table style={{ backgroundColor: '#F9F9F9' }} size="small">
    <TableHead>
      <TableRow>
        <TableCell>Ordenar</TableCell>
        <TableCell>Acciones</TableCell>
        <TableCell>Texto</TableCell>
        <TableCell>Enlace</TableCell>
        <TableCell>Pagina</TableCell>
        <TableCell>Estado</TableCell>


      </TableRow>
    </TableHead>
    <TableBody>
      {children}
    </TableBody>
  </Table>
});



class ItemsMenu extends Component {
  state = { ...StateListItems };


  componentDidMount() {
    this.getItems();
  }


  ////////////////////////
  ////////////////////////
  //METODOS PARA LISTADO DE Items
  ////////////////////////
  ////////////////////////
  getItems = () => {
    this.setState({
      isLoading: true
    })

    Database.get('/list-items', this, null, true)
      .then(res => {
        let resultado = [...res.result];
        console.log(resultado);
        this.setState({
          isLoading: false,
          items: resultado,

        })


      }, err => {
        toast.error(err.message);

      })



  }



  editSingleItem = value => {
    this.props.history.push(this.props.match.url + '/edititem/' + value);
  }

  

  handleDelete = rowData => {

    Database.post('/delete-item', { id: rowData.id }, this).then(res => {
      let items = [...this.state.items]
      items = items.filter(elem => {
        if (elem.id == rowData.id)
          return false;

        return true

      })

      this.setState({
        items: items,
        openDeleteDialog: false
      }, () => {
        toast.success("El item se ha eliminado con exito!");
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

  handleEditButton = id => {

    this.props.history.push(this.props.match.url + "/edititem/" + id)
  }




  handleModalClose() {
    this.setState({
      openDeleteDialog: false,
      deleteRowData: null
    })
  }

  onSortEnd = ({ oldIndex, newIndex }) => {

    this.setState(({ items }) => ({
      items: arrayMove(items, oldIndex, newIndex),
    }), () => {

      let arrayOrder = this.state.items.map(elem => {
        return elem.id
      })
      Database.post('/order-items', { arrayOrder: arrayOrder }, this)
        .then(res => {

          toast.success("El item se ha ordenado con exito!");

        }, err => {
          toast.error(err.message);
        })


    });



  };




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
              <h4 className={this.props.classes.cardTitleWhite} >Items de Menu</h4>
              <p className={this.props.classes.cardCategoryWhite} >
                Listado de Items de Menu
                      </p>
            </CardHeader>
            <CardBody>
              <Button style={{ marginTop: '25px' }} onClick={() => this.props.history.push(this.props.match.url + '/newitem')} color="primary"><AddIcon /> Nuevo Item</Button>
              <SortableContainer onSortEnd={this.onSortEnd} useDragHandle>
                {this.state.items.map((elem, index) => (
                  <SortableItem key={`item-${elem.id}`} index={index} value={elem} deleteItem={this.handleDeleteButton} editItem={this.handleEditButton} />
                ))}


              </SortableContainer>
              {this.state.isLoading &&
                <div style={{ textAlign: 'center' }}>
                  <CircularProgress />
                </div>

              }
            </CardBody>
          </Card>

          <Switch>
            <Route path={this.props.match.url + "/newitem"} render={() =>

              <NewItem

                getItems={() => this.getItems()}



              />}
            />

            <Route path={this.props.match.url + "/edititem/:iditem"} render={() =>

              <EditItem

                getItems={() => this.getItems()}



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


export default withStyles(styles)(ItemsMenu);
