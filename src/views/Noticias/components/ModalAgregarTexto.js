import React, { useState, useRef } from 'react';
import Database from "variables/Database.js";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { toast } from 'react-toastify';
import Input from "components/Input/Input";
import { localization } from "variables/general.js";
import { inputChangedHandler, inputAllChangedHandler } from "variables/input.js";

import { Editor } from '@tinymce/tinymce-react';








var aceptarBoolean = false;

export default function ModalSelectImage(props) {
    const [htmlText, setHtmlText] = useState('');
    const [orderForm, setOrderForm] = useState({ ...props.orderForm });
    const [formIsValid, setFormIsValid] = React.useState(false);
    const [rowItem, setRowItem] = React.useState(props.rowItem);
    const formElementsArray = [];


    const handleEditorChange = (content, editor) => {

        setHtmlText(content)
    }


    React.useEffect(() => {

        if (props.orderForm) {
            let orderFormCopy = JSON.parse(JSON.stringify(props.orderForm));
            for (let key in orderFormCopy) {
                if (rowItem && rowItem[key])
                    orderFormCopy[key].value = rowItem[key];
            }

            let objeto = inputAllChangedHandler(orderFormCopy);
            setOrderForm(objeto.orderForm);
            setFormIsValid(objeto.formIsValid);


        }
        if (rowItem && rowItem.htmlText)
            setHtmlText(rowItem.htmlText);


    }, []);



    for (let key in orderForm) {
        formElementsArray.push({
            id: key,
            config: orderForm[key]
        });
    }

    return (
        <Dialog
            fullScreen={true}
            open={props.openAgregarTexto}
            onClose={props.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Agregue Texto</DialogTitle>
            <DialogContent>
                {
                    formElementsArray.map(formElement => (
                        <Input
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            textValid={formElement.config.textValid}
                            invalid={!formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            touched={formElement.config.touched}
                            changed={(event) => {
                                let objeto = inputChangedHandler(event, formElement.id, orderForm)
                                setOrderForm(objeto.orderForm);
                                setFormIsValid(objeto.formIsValid);
                            }}
                        />
                    ))
                }

                <div>
                    <h4>Texto/Descripcion</h4>
                    <Editor
                        initialValue={htmlText}
                        apiKey='ursxh3uvsir7p6qyklffy60b3nt2fn5wpwpexy5t9mweaxla'
                    
                        init={{
                            force_br_newlines: true,
                            force_p_newlines: false,
                            forced_root_block: '', // Needed for 3.x
                            min_height:650,
                            menubar: false,
                            paste_as_text: true,
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount'
                            ],
                            toolbar:
                                'undo redo  | bold italic backcolor | \
                                 alignleft aligncenter alignright alignjustify | \
                                   bullist numlist outdent indent | removeformat | help'
                        }}
                        onEditorChange={handleEditorChange}
                    />
                </div>


            </DialogContent>



            <DialogActions>
                <Button onClick={() => props.handleClose()} color="primary">
                    Cancelar
 </Button>
                <Button onClick={() =>{ 
                    let objeto = {}
                    objeto.descripcion = orderForm.descripcion.value;
                    objeto.htmlText = htmlText;
                    props.handleSelect(rowItem, objeto) } } color="primary">
                    Aceptar
 </Button>
            </DialogActions>
        </Dialog>

    );

}
