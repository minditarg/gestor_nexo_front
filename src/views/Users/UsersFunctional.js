import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Route, Switch ,Link} from 'react-router-dom';
// core components

import Typography from '@material-ui/core/Typography';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import axios from "axios";
import ListUsers from "./components/ListUsers";
import NewUser from "./components/NewUser";
import EditUser from "./components/EditUser";


//import MaterialTable from "material-table";

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


const usersConst = [];
const userEditConst = null;
const checkedConst = [];
const menuContextConst = null;
const botonesAccionesConst = {
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
};
const modalOpenConst = false;
const newUserFormConst = {
  nombre: {
      elementType: 'input',
      elementConfig: {
          type: 'text',
          label: 'Nombre',
          fullWidth: true
      },
      value: '',
      validation: {
          required: true
      },
      valid: false,
      touched: false
  },
    username: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            label: 'usuario',
            fullWidth: true
        },
        value: '',
        validation: {
            required: true
        },
        valid: false,
        touched: false
    },
    password: {
        elementType: 'input',
        elementConfig: {
            type: 'password',
            label: 'constraseña',
            fullWidth: true
        },
        value: '',
        validation: {
          minLength:5,
            required: true,

        },
        valid: false,
        touched: false
    },
    tipoUser: {
        elementType: 'select',
        elementConfig: {
            label:'Tipo de usuario',
             options: [

            ],
            fullWidth: true
        },
        value: '',
        validation: {
            required:true
        },

        valid: false,
        touched: false
    },
    descripcion: {
        elementType: 'textarea',
        elementConfig: {
            type: 'text',
            label:'Descripción',
            rows:4
        },
        value: '',
        validation: {
            required: true
        },
        valid: false,
        touched: false
    },


};

const editUserFormConst = {
  nombre: {
      elementType: 'input',
      elementConfig: {
          type: 'text',
          label: 'Nombre',
          fullWidth: true
      },
      value: '',
      validation: {
          required: true
      },
      valid: false,
      touched: false
  },
    username: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            label: 'usuario',
            fullWidth: true
        },
        value: '',
        validation: {
            required: true
        },
        valid: false,
        touched: false
    },

    tipoUser: {
        elementType: 'select',
        elementConfig: {
            label:'Tipo de usuario',
             options: [

            ],
            fullWidth: true
        },
        value: '',
        validation: {
            required:true
        },

        valid: false,
        touched: false
    },
    descripcion: {
        elementType: 'textarea',
        elementConfig: {
            type: 'text',
            label:'Descripción',
            rows:4
        },
        value: '',
        validation: {
            required: true
        },
        valid: false,
        touched: false
    },


};

const formIsValidConst = false;
const editFormIsValidConst = false;
const successSubmitConst = null;
const successSubmitEditConst = null;
const actionUpdateUsersConst = false;



const useStyles = makeStyles(styles);

export default function Users(props) {


  const classes = useStyles();
  const [users, setUsers] = React.useState(JSON.parse(JSON.stringify(usersConst)));
  const [userEdit, setUserEdit] = React.useState(JSON.parse(JSON.stringify(userEditConst)));
  const [checked, setChecked] = React.useState(JSON.parse(JSON.stringify(checkedConst)));
  const [menuContext, setMenuContext] = React.useState(JSON.parse(JSON.stringify(menuContextConst)));
  const [botonesAcciones, setBotonesAcciones] = React.useState(JSON.parse(JSON.stringify(botonesAccionesConst)));
  const [modalOpen, setModalOpen] = React.useState(JSON.parse(JSON.stringify(modalOpenConst)));
  const [newUserForm, setNewUserForm] = React.useState(JSON.parse(JSON.stringify(newUserFormConst)));
  const [editUserForm, setEditUserForm] = React.useState(JSON.parse(JSON.stringify(editUserFormConst)));
  const [editFormIsValid, setEditFormIsValid] = React.useState(JSON.parse(JSON.stringify(editUserFormConst)));
  const [formIsValid, setFormIsValid] = React.useState(JSON.parse(JSON.stringify(formIsValidConst)));
   const [successSubmit, setSuccessSubmit] = React.useState(JSON.parse(JSON.stringify(successSubmitConst)));
   const [successSubmitEdit, setSuccessSubmitEdit] = React.useState(JSON.parse(JSON.stringify(successSubmitEditConst)));
    const [actionUpdateUsers, setActionUpdateUsers] = React.useState(JSON.parse(JSON.stringify(actionUpdateUsersConst)));

  const editSingleUser = value => {

  props.history.push(props.match.url + '/editarusuario/' + value);

  }

  const handleToggle = value => {

    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    let deleteEnabled = false;
    let editEnabled = false;
    const botonesAcc = { ...botonesAcciones }
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

    setBotonesAcciones(botonesAcc);
    setChecked(newChecked);

  };

  const menuHandleClose = (value) => {

    setMenuContext(null);

  }

  const menuHandleItemClick = (value) => {
    const newItem = { ...botonesAcciones[value] };

    if (botonesAcciones[value].enabled) {

      setMenuContext(null);

      if(value == 'nuevo') {
        setSuccessSubmit(false);
        resetNewForm();
        setFormIsValid(false);
      props.history.push(props.match.url + '/nuevousuario');
    }
    if(value == 'editar' && checked.length == 1) {
      let idUser = checked[0].id;
      props.history.push(props.match.url + '/editarusuario/' + idUser);

    }

    }
  }

  const menuHandleOpen = event => {
    setMenuContext(event.currentTarget)

  }

  const modalHandleOpen = () => {
    setModalOpen(true);

  };

  const modalHandleClose = () => {
    setModalOpen(false);
  };

  const getUsersAdmin = () => {

    axios.get('/list-users')
      .then(res => {
        if (res.data.success == 1) {
          let resultado = [...res.data.result];
        setUsers(resultado);
        setChecked(JSON.parse(JSON.stringify(checkedConst)));
        setMenuContext(JSON.parse(JSON.stringify(menuContextConst)));
        setBotonesAcciones(JSON.parse(JSON.stringify(botonesAccionesConst)))

        }
      })

    }

    const getUsersType = (tipo,formulario) =>
    {

    axios.get('/list-users_type')
      .then(res => {

        if (res.data.success == 1) {

          let resultadoUserType = [...res.data.result];

          let a = [];
          resultadoUserType.forEach(function(entry){
            a.push({
              value: entry.id,
              displayValue: entry.desc
            });
          })

          if(tipo == 'new'){
            formulario.tipoUser.elementConfig.options=[...a];
            setNewUserForm(formulario);
          }

          if(tipo == 'edit') {
            formulario.tipoUser.elementConfig.options=[...a];
            setEditUserForm(formulario);
          }



        }
      })
    }


  React.useEffect(() => {

    getUsersAdmin();

  }, []);

  React.useEffect(() => {

  }, [props.location]);



    const checkValidity = (value, rules) => {
        let isValid = true;
        let textValid = null;

        if (rules.required && isValid) {
            isValid = value.toString().trim() !== '';
            textValid = 'El campo es requerido'
        }

        if (rules.minLength && isValid) {
            isValid = value.length >= rules.minLength;
            textValid = 'La cantidad de caracteres minimos es ' + rules.minLength
        }

        if (rules.maxLength && isValid) {
            isValid = value.length <= rules.maxLength ;
            textValid = 'Supera el maximo de caracteres';
        }

        return {isValid:isValid,textValid:textValid};
    }

    const inputChangedHandler = (event, inputIdentifier) => {
        let checkValid;
        const updatedOrderForm = {
            ...newUserForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        checkValid =  checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.valid = checkValid.isValid;
        updatedFormElement.textValid = checkValid.textValid;
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValidAlt = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValidAlt = updatedOrderForm[inputIdentifier].valid && formIsValidAlt;
        }
        setNewUserForm(updatedOrderForm);
        setFormIsValid(formIsValidAlt);
    }

    const inputEditChangedHandler = (event, inputIdentifier) => {
        let checkValid;
        const updatedOrderForm = {
            ...editUserForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        checkValid =  checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.valid = checkValid.isValid;
        updatedFormElement.textValid = checkValid.textValid;
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValidAlt = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValidAlt = updatedOrderForm[inputIdentifier].valid && formIsValidAlt;
        }
        setEditUserForm(updatedOrderForm);
        setEditFormIsValid(formIsValidAlt);
    }


    const handleSubmitNewUser = (event) => {

        event.preventDefault();
        axios.post(`/signup-json`, { username: newUserForm.username.value, password: newUserForm.password.value,nombre:newUserForm.nombre.value,id_users_type:newUserForm.tipoUser.value})
            .then(res => {

                let estadoAlt = null
                if (res.data.success == 0) {
                    estadoAlt = false
                }
                if (res.data.success == 1) {
                    estadoAlt = true
                }

                if(estadoAlt){

                  setSuccessSubmit(true);
                  resetNewForm();
                  setFormIsValid(false);
                  setActionUpdateUsers(true);
                  }
            })

    }

    const handleSubmitEditUser = (event) => {

        event.preventDefault();
        axios.post(`/update-user`, { id:userEdit.id,nombre: editUserForm.nombre.value, id_users_type: editUserForm.tipoUser.value})
            .then(res => {

                let estadoAlt = null
                if (res.data.success == 0) {
                    estadoAlt = false
                }
                if (res.data.success == 1) {
                    estadoAlt = true
                }

                if(estadoAlt){

                  setSuccessSubmitEdit(true);
                  setEditFormIsValid(false);
                  }
            })

    }

    const resetNewForm = (all)=> {
    let newUserFormAlt = JSON.parse(JSON.stringify(newUserForm));
      for(let key in newUserFormAlt){
        newUserFormAlt[key].value = ''
      }
      if(all)
      setSuccessSubmit(false);
      setFormIsValid(false);
      getUsersType("new",newUserFormAlt);

    }

    const resetEditForm = (all)=> {
    let editUserFormAlt = JSON.parse(JSON.stringify(editUserForm));
      for(let key in editUserFormAlt){
        editUserFormAlt[key].value = ''
      }
      if(all)
      setSuccessSubmitEdit(false);
      setEditFormIsValid(false);
      getUsersType("edit",editUserFormAlt);

    }

    const reloadUsers = () => {
          getUsersAdmin();

    }

    const reloadUserEdit = () => {

    }



    const getUserEdit = (id) => {
      axios.get('/list-users/' + id)
            .then(resultado => {
                if(resultado.data.success == 1) {

                    if(resultado.data.result.length > 0) {
                      setUserEdit(resultado.data.result[0]);
                      let editUserFormAlt = JSON.parse(JSON.stringify(editUserForm));
                        editUserFormAlt.username.value = resultado.data.result[0].username;
                        editUserFormAlt.nombre.value = resultado.data.result[0].nombre;
                        editUserFormAlt.tipoUser.value = resultado.data.result[0].id_users_type.toString();
                        for(let key in editUserFormAlt){
                          editUserFormAlt[key].touched = true;
                          editUserFormAlt[key].valid = true;

                        }

                        getUsersType("edit",editUserFormAlt);

                    }
                      else
                  {
                      setUserEdit(null);
                  }
                }

            })

    }




  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>

      <Switch>
            <Route path={ props.match.url } exact  render={() =>

              <ListUsers
                  menuHandleOpen={(event) => menuHandleOpen(event)}
                  menuHandleClose={(event) => menuHandleClose(event)}
                  menuHandleItemClick={(keyName) => menuHandleItemClick(keyName)}
                  handleToggle={(value) => handleToggle(value)}
                  editSingleUser={(value) => editSingleUser(value)}
                 reloadUsers={reloadUsers}

                  menuContext={menuContext}
                  botonesAcciones={botonesAcciones}
                  users={users}
                  checked={checked}



              />



            } />
            <Route path={ props.match.url + "/nuevousuario"}  render={() =>

             <NewUser
             orderForm={newUserForm}
             formIsValid={formIsValid}
             successSubmit={successSubmit}

             handleSubmitNewUser={(event) => {handleSubmitNewUser(event)}}
             inputChangedHandler={ (event,inputIdentifier)=> inputChangedHandler(event,inputIdentifier)}
             resetNewForm={resetNewForm}
             reloadUsers={reloadUsers}



           />}
            />

            <Route path={ props.match.url + "/editarusuario/:iduser"}  render={() =>

             <EditUser
             orderForm={editUserForm}
             editFormIsValid={editFormIsValid}
             successSubmitEdit={successSubmitEdit}


             handleSubmitEditUser={(event) => {handleSubmitEditUser(event)}}
             inputEditChangedHandler={ (event,inputIdentifier)=> inputEditChangedHandler(event,inputIdentifier)}
             getUserEdit={(id) => { getUserEdit(id)}}
             resetEditForm={resetEditForm}
              reloadUsers={reloadUsers}

           />}
            />

        </Switch>


      </GridItem>
    </GridContainer>
  );
}
