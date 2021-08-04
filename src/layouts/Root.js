import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import SnackbarContent from "../components/Snackbar/SnackbarContent.js";

import axios from 'axios';
import Input from '../components/Input/Input';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://fveter.unr.edu.ar/">
        UNR
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

let num = Math.floor((Math.random() * (4-1))+1);

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(/assets/imagenes/login-' + num + '.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


const estadoVar = {

    orderForm: {
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
                required: true
            },
            valid: false,
            touched: false
        },


    },
    formIsValid: false,
    successPass: null
}

export default function SignInSide(props) {
  const classes = useStyles();
  const [estado, setEstado] = React.useState(estadoVar);

React.useEffect(() => {

         axios.get('/me')
            .then(res => {
              console.log(res);
              if (res.data.success == 1) {
                props.history.replace('/admin');
            
              }
            })


  }, []);


  const handleSubmit = (event, index) => {
      event.preventDefault();
      axios.post(`/login-json`, { username: estado.orderForm.username.value, password: estado.orderForm.password.value })
          .then(res => {

              let estadoAlt = null
              if (res.data.success == 0) {
                  estadoAlt = false
              }
              if (res.data.success == 1) {
                  estadoAlt = true
              }

              let password = { ... estado.orderForm.password };
              password.value = '';
              password.touch = false;
              password.validate = false;


              setEstado({
                  orderForm: {
                      ... estado.orderForm,
                      password: {
                          ...password
                      }
                  },
                  formIsValid:false,
                  successPass: estadoAlt
              })

              if (estadoAlt)
                  props.history.push('/admin');

          })

  }

  const checkValidity = (value, rules) => {
      let isValid = true;
      let textValid = null;

      if (rules.required) {
          isValid = value.trim() !== '' && isValid;
          textValid = 'El campo es requerido'
      }

      if (rules.minLength) {
          isValid = value.length >= rules.minLength && isValid;
          textValid = 'No supera la cantidad de caracteres minimos'
      }

      if (rules.maxLength) {
          isValid = value.length <= rules.maxLength && isValid;
          textValid = 'Supera el maximo de caracteres';
      }

      return {isValid:isValid,textValid:textValid};
  }


  const inputChangedHandler = (event, inputIdentifier) => {
      let checkValid;
      const updatedOrderForm = {
          ...estado.orderForm
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

      let formIsValid = true;
      for (let inputIdentifier in updatedOrderForm) {
          formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
      }
      setEstado({
        ...estado,
         orderForm: updatedOrderForm, formIsValid: formIsValid });
  }

  const formElementsArray = [];
  for (let key in estado.orderForm) {
      formElementsArray.push({
          id: key,
          config: estado.orderForm[key]
      });
  }


  let alerta = null

  if (estado.successPass != null && estado.successPass == false) {
      alerta = (
        <SnackbarContent
          message={
            'Usuario o contraseña incorrecto'
          }
          close
          color="danger"
        />

      )
  } else if (estado.successPass != null && estado.successPass == true) {
      alerta = (

        <SnackbarContent
          message={
            'Usuario y contraseña correctos'
          }
          close
          color="success"
        />


      )

  }
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
           Inicio de Sesión
          </Typography>
          <input type="radio" name="matias" id="matias" />
          <form className={classes.form} onSubmit={handleSubmit}>
          {alerta}
          {formElementsArray.map(formElement => (
      <Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          textValid={formElement.config.textValid}
          invalid={!formElement.config.valid}
          shouldValidate={formElement.config.validation}
          touched={formElement.config.touched}
          changed={(event) => inputChangedHandler(event, formElement.id)} />
  ))}
           {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
           /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={!estado.formIsValid}
              className={classes.submit}
            >
             Ingresar
            </Button>
            <Grid container>
            {/*
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
              */}
            </Grid>
            
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
