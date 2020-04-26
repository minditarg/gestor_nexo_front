import React, { Component } from "react";
import Database from "variables/Database.js";

import { Route, Switch ,Link} from 'react-router-dom';
// core components

import Typography from '@material-ui/core/Typography';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

import ListUsers from "./components/ListUsers";
import NewUser from "./components/NewUser";
import EditUser from "./components/EditUser";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { StateListUsers } from "./VariablesState";

const limit = 10;


class Users extends Component {
    state = { ...StateListUsers  };


      componentDidMount() {
        this.getUsersAdmin();

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
          botonesAcciones:botonesAcc,
          checked:newChecked
        })

      };

      menuHandleClose = (value) => {
        this.setState({
          menuContext:null
        })
      }

      menuHandleItemClick = (value) => {
        const newItem = { ...this.state.botonesAcciones[value] };
        let menuContext = {...this.state.menuContext};
        if (newItem.enabled) {
            menuContext= null;

          if(value == 'nuevo') {
            this.setState({
              menuContext:menuContext
            })
          this.props.history.push(this.props.match.url + '/nuevousuario');
        }

        if(value == 'editar' && this.state.checked.length == 1) {
           this.setState({
              menuContext:menuContext
            })
          let idUser = this.state.checked[0].id;
          this.props.history.push(this.props.match.url + '/editarusuario/' + idUser);
        }
        }
      }

      menuHandleOpen = event => {
        this.setState({
          menuContext:event.currentTarget
        })
      }
      ////////////////////////
      ////////////////////////
      //METODOS PARA LISTADO DE USUARIOS
      ////////////////////////
      ////////////////////////
      getUsersAdmin = () => {

        Database.get('/list-users',this)
          .then(res => {

              let resultado = [...res.result];
              this.setState({
                users:resultado,
                checked:[],
                menuContext:null,
                botonesAcciones:{
                  nuevo: {
                    enabled: true,
                    texto: 'Nuevo'
                  },
                  editar: {
                    enabled: false,
                    texto: 'Editar'
                  },
                  delete: {
                    enabled: false,
                    texto: 'Eliminar'
                  }
                }
              })

          },err => {
            toast.error(err.message);
          })
        }


     editSingleUser = value => {
    this.props.history.push(this.props.match.url + '/editarusuario/' + value);
  }

    handlePagination = offset => {
      this.setState({
        offset:offset
      })

    }





    render() {
      let totalUsers = this.state.users.length;
      let users = this.state.users.slice(this.state.offset ,this.state.offset + limit);

        return (
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>

            <Switch>
                  <Route path={ this.props.match.url } exact  render={() =>

                    <ListUsers
                        offset = {this.state.offset}
                        limit={limit}
                        totalUsers = {totalUsers}
                        menuContext={this.state.menuContext}
                        botonesAcciones={this.state.botonesAcciones}
                        users={users}
                        checked={this.state.checked}

                        menuHandleOpen={(event) => this.menuHandleOpen(event)}
                        menuHandleClose={(event) => this.menuHandleClose(event)}
                        menuHandleItemClick={(keyName) => this.menuHandleItemClick(keyName)}
                        handleToggle={(value) => this.handleToggle(value)}
                        editSingleUser={(value) => this.editSingleUser(value)}
                        handlePagination={(offset) => { this.handlePagination(offset)}}
                       reloadUsers={this.reloadUsers}


                    />



                  } />
                  <Route path={ this.props.match.url + "/nuevousuario"}  render={() =>

                   <NewUser


                 />}
                  />

                  <Route path={ this.props.match.url + "/editarusuario/:iduser"}  render={() =>

                   <EditUser
                   orderForm={this.state.editUserForm}
                   editFormIsValid={this.state.editFormIsValid}
                   successSubmitEdit={this.state.successSubmitEdit}


                   handleSubmitEditUser={(event) => {this.handleSubmitEditUser(event)}}
                   inputEditChangedHandler={ (event,inputIdentifier)=> this.inputEditChangedHandler(event,inputIdentifier)}
                   getUserEdit={(id) => { this.getUserEdit(id)}}
                   resetEditForm={this.resetEditForm}
                    reloadUsers={this.reloadUsers}

                 />}
                  />

              </Switch>


            </GridItem>

            <ToastContainer position={toast.POSITION.BOTTOM_RIGHT}  autoClose={3000}/>
          </GridContainer>

        );
    }
}


export default Users;
