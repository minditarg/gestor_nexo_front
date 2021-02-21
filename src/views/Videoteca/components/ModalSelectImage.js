import React, { useState, useRef } from 'react';
import Database from "variables/Database.js";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { toast } from 'react-toastify';

import Files from 'react-files'
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';


function urltoFile(url, filename, mimeType) {
    return (fetch(url)
        .then(function (res) { return res.arrayBuffer(); })
        .then(function (buf) { return new File([buf], filename, { type: mimeType }); })
    );
}

var aceptarBoolean = false;

export default function ModalSelectImage(props) {
    const [img, setImg] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const [sizeMsj, setSizeMsj] = useState(false);




    const cropper = useRef();

    const onFilesChange = function (files) {
        console.log(files);
        setImg(URL.createObjectURL(files[0]));
    }

    const onFilesError = function (error, file) {
        console.log('error code ' + error.code + ': ' + error.message)
    }

    const _crop = () => {
        aceptarBoolean = false;

        /*   console.log(cropper.current.getCroppedCanvas().toBlob((blob) =>{
   
               console.log(blob);
   
           }));
   
           */

        // imageURL = cropper.current.getCroppedCanvas({ minWidth: props.width, width: props.width,fillColor:'#fff' }).toDataURL('image/jpeg');
        /*
        let file = urltoFile(imageURL, 'hello.png','image/png');

        file.then( elem => {

           // console.log(elem);


        } )
        */

    }


    const handleFile = (UrlFile, callback) => {
        setIsLoading(true);
        Database.post('/insert-videoteca-image', { extension: 'jpg' }, this)
            .then(res => {
                let file_name = res.result[0].file_name;
                let file = urltoFile(UrlFile, file_name, 'image/jpg');
                setIsLoading(false);
                file.then(file => {

                    const formData = new FormData();
                    formData.append('userPhoto', file);
                    if (props.thumbs)
                        formData.append('thumbs', JSON.stringify(props.thumbs));

                    Database.post('/insert-only-file', formData, this, false, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })

                        .then(res => {
                            setIsLoading(false);
                            toast.success("El archivo" + file.name + "se ha subido con exito!");
                            callback.bind(this)(file_name);


                        }, err => {
                            setIsLoading(false);
                            toast.error(err.message)

                        })




                }, err => {
                    setIsLoading(false);
                    this.setState({ isLoading: false })
                })

            }, err => {

                setIsLoading(false);
                toast.error(err.message);

            })



    }

    const handleSelect = () => {
       // if (cropper.current.getData().width >= props.width || aceptarBoolean) {
            let imageURL = cropper.current.getCroppedCanvas({ minWidth: props.width, width: props.width, fillColor: '#fff' }).toDataURL('image/jpeg');

            handleFile(imageURL, function (filename) {

                props.handleSelectImage(filename);

            })
       // } else {
         //   setSizeMsj(true);
          //  aceptarBoolean = true;
       // }





    }
    return (
        <Dialog
            disableEnforceFocus={true}
            maxWidth={"md"}
            fullWidth={true}
            open={props.openSelectImage}
            onClose={props.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Seleccione Imagen</DialogTitle>
            <DialogContent>
                <Files
                    className='files-dropzone'
                    onChange={onFilesChange}
                    onError={onFilesError}
                    multiple={false}
                    accepts={['image/*', '.pdf', 'audio/*']}
                    maxFileSize={10000000}
                    minFileSize={0}
                    clickable
                >
                    Arrastre una foto aquí o haga click
        </Files>

                <Cropper
                    ref={cropper}
                    src={img}
                    style={{ height: 300, width: '100%' }}
                    // Cropper.js options
                    aspectRatio={props.aspectradio}

                    zoomable={true}
                    guides={false}
                    crop={_crop} />

                {sizeMsj && <p style={{ color: 'red' }}>El tamaño del recuadro es inferior a la resolución necesaria. Agrande el recuadro o vulva a presionar "Aceptar para continuar igualmente"  </p>}

            </DialogContent>



            <DialogActions>
                <Button onClick={() => props.handleClose()} color="primary">
                    Cancelar
 </Button>
                <Button onClick={() => handleSelect()} color="primary">
                    Aceptar
 </Button>
            </DialogActions>
        </Dialog>

    );

}
