import React, { Component } from "react";

export const ColumnsListado = [
    { title: "Imagen", field: "imagen",render: (rowData) => {
       
        var imagen = null
        if(rowData.id_type_file == 1)
        imagen = <img style={{ width:75 }}  src={ '/' + process.env.REACT_APP_UPLOADS_FOLDER + '/thumbs/thumb_' + rowData.nombre} />
        return <span>{imagen}</span>
    }},
    
    { title: "Archivo", field: "nombre" }


];


export const StateListFiles = {
    files: [],
   
  
    openDeleteDialog: false,
    deleteRowData: null,
    isLoading: false,
    
  
  
  }
  