
import axios from "axios";
import storeDefault from 'store/store';



class Database {


  static get(url,_this,props,sendMeSignal ) {
    if(sendMeSignal)
    storeDefault.dispatch({type:"INCREMENT"});

    return new Promise((resolve, reject) => {
          axios.get(url) .then(res => {
            if(res.data.success == 1)
            {
              resolve(res.data);
            }
            else if(res.data.success == 0)
            {
              if(res.data.error_msj)
                reject({message:"Error en consulta SQL. " + res.data.error_msj})
                else
                reject({message:"Error en consulta SQL"});
            } else {

              reject({message:"Error desconocido"});
            }
          },err => {
            if(err.response){
              if(err.response.status == 401) {
                if(_this)
              _this.props.history.replace("/");
              if(props)
              props.history.replace("/");
              reject({message:"No inició sesión en la aplicación"})
              }
              else if(err.response.status == 406) {
                if(_this)
                _this.props.history.replace("/");

                if(props)
                props.history.replace("/");
              reject({message:"No tiene permisos en esta sección"})
              }
              else if(err.response.status == 500)
              {
              reject({message:err.response.data})
              }
              else {
              reject({message:"error desconocido"});
              }
            } else if(err.message) {
              reject({message:err.message});
            } else {
            reject({message:"Error de conexión al servidor"});
          }
          })


       })


  }

  static post(url,data,_this,props) {
    return new Promise((resolve, reject) => {
        if(_this)
          _this.setState({ disableAllButtons: true});
          axios.post(url,data) .then(res => {
            if(_this)
              _this.setState({ disableAllButtons: false});
            if(res.data.success == 1)
            {
              resolve(res.data);
            }
            else if(res.data.success == 0)
            {
              if(res.data.error_msj)
                reject({message:"Error en consulta SQL. " + res.data.error_msj})
                else
                reject({message:"Error en consulta SQL"});
            } else {

              reject({message:"Error desconocido"});
            }
          },err => {
            if(_this)
              _this.setState({ disableAllButtons: false});
            if(err.response){
              if(err.response.status == 401) {
                if(_this)
              _this.props.history.replace("/");
              if(props)
              props.history.replace("/");
              reject({message:"No inició sesión en la aplicación"})
              }
              else if(err.response.status == 406)
              {
                if(_this)
              _this.props.history.replace("/");
              if(props)
              props.history.replace("/");
              reject({message:"No tiene permisos en esta sección"})
              }
              else if(err.response.status == 500)
              {
              reject({message:err.response.data})
              }
              else
              {
              reject({message:"error desconocido"});
              }
            } else if(err.message) {
              reject({message:err.message});
            } else {
            reject({message:"Error de conexión al servidor"});
          }
          })


       })


  }


}

export default Database;
