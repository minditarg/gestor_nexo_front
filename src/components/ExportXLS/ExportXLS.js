import React from 'react'
import Button from "components/CustomButtons/Button.js";
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

 const ExportXLS = ({csvData, fileName,header}) => {
     const valores = header.map(elem => {
         return elem.title
     })

     const keys = header.map(elem => {
         return elem.field
     })





    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const exportToXLS = (csvData, fileName) => {
         const jsonToExport = csvData.map(elem => {
         const objectReturn = {}
         keys.forEach((elemKey,index) =>{
             objectReturn[valores[index]] = elem[elemKey]
         })

        return objectReturn

        })
        const ws = XLSX.utils.json_to_sheet(jsonToExport);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, fileName + fileExtension);
    }

    return (
        <Button color="info" onClick={(e) => exportToXLS(csvData,fileName)}>DESCARGAR XLS</Button>
    )
}

export default ExportXLS;
