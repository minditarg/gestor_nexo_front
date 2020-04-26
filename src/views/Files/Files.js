import React, { Component } from "react";
import Database from "variables/Database.js";
import moment from 'moment';

import { Route, Switch, Link } from 'react-router-dom';
// core components
import MaterialTable, { MTableCell, MTableBodyRow } from "material-table";

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


import ModalDelete from "./components/ModalDelete"
import { localization } from "variables/general.js";


import { toast } from 'react-toastify';


import { StateListFiles, ColumnsListado } from "./VariablesState";

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





class Files extends Component {
  state = { ...StateListFiles };


  componentDidMount() {
    this.getFiles();
  }


  ////////////////////////
  ////////////////////////
  //METODOS PARA LISTADO DE Items
  ////////////////////////
  ////////////////////////
  getFiles = () => {
    this.setState({
      isLoading: true
    })

    Database.get('/list-files', this, null, true)
      .then(res => {
        let resultado = [...res.result];
        
        this.setState({
          isLoading: false,
          files: resultado,

        })


      }, err => {
        toast.error(err.message);

      })



  }



  

  handleDelete = rowData => {

    Database.post('/delete-file', { id: rowData.id }, this).then(res => {
      let files = [...this.state.files]
      files = files.filter(elem => {
        if (elem.id == rowData.id)
          return false;

        return true

      })

      this.setState({
        files: files,
        openDeleteDialog: false
      }, () => {
        toast.success("El archivo se ha eliminado con exito!");
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

  
  handleFile = (file) => { 
    const formData = new FormData();
    formData.append('userPhoto',file[0])

     Database.post('/insert-file' ,  formData ,this,false,{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
  })

      .then(res => {

        toast.success("El archivo"+ file[0].name +  "se ha subido con exito!");
        this.getFiles();


      }, err => {
        toast.error(err.message);

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
              <h4 className={this.props.classes.cardTitleWhite} >Archivos</h4>
              <p className={this.props.classes.cardCategoryWhite} >
                Listado de Archivos
                      </p>
            </CardHeader>
            <CardBody>
            <label class="custom-file-upload">
              <input onChange={(e) => this.handleFile(e.target.files) } type="file" />
          </label>
            <MaterialTable
                isLoading={this.state.isLoading}
                columns={ColumnsListado}
                data={this.state.files}
                title=""
                localization={localization}

                actions={[
                {
                  icon: 'delete',
                  tooltip: 'Borrar Archivo',
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


export default withStyles(styles)(Files);
