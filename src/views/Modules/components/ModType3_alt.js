import React, { Component } from "react";
import Database from "variables/Database.js";
import { Route, Switch, Link, withRouter } from 'react-router-dom';
import $ from 'jquery';
import moment from "moment";


import Input from 'components/Input/Input';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Save from '@material-ui/icons/Save';

// import { AddBox, ArrowUpward } from "@material-ui/icons";
// import ReactDOM from "react-dom";
import { toast } from 'react-toastify';
import ModalDelete from "./ModalDelete";
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ControlCamera from '@material-ui/icons/ControlCamera';
import CircularProgress from '@material-ui/core/CircularProgress';
import StepAgregarImagen from './StepAgregarImagen'
import { inputChangedHandler, inputAllChangedHandler } from "variables/input.js";


import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

import { Editor } from '@tinymce/tinymce-react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Grid from '@material-ui/core/Grid';

import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';
import arrayMove from 'array-move';

import { StateListadoModType1 } from "../VariablesState";
import { localization } from "variables/general.js";
import lightGreen from '@material-ui/core/colors/lightGreen';
import CloseIcon from '@material-ui/icons/Close';


import { withStyles } from '@material-ui/styles';

const styles = {

    closeButton: {
        position: 'absolute',
        right: '0.5em',
        top: '0.5em',
        color: 'grey',
    }
};


const SortableItem = sortableElement(({ value, deleteItem, editItem, orderForm }) => {
    let imagen = null;
    let array = [];
    if (value.archivo && (value.archivo.endsWith('.jpg') || value.archivo.endsWith('.png') || value.archivo.endsWith('.jpeg') || value.archivo.endsWith('.gif')))
        imagen = (<img src={'/' + process.env.REACT_APP_UPLOADS_FOLDER + '/thumbs/thumb_' + value.archivo} style={{ width: '75px' }} />);
    if (orderForm) {
        for (let key in orderForm) {
            array.push(value[key]);
        }
    }

    return (
        <TableRow>
            <TableCell>
                <DragHandle />
            </TableCell>
            <TableCell>
                <IconButton onClick={() => deleteItem(value)}>
                    <DeleteIcon />
                </IconButton>
                <IconButton onClick={() => editItem(value)}>
                    <EditIcon />
                </IconButton>
            </TableCell>
            <TableCell>
                {imagen}
            </TableCell>
            {array.map(elem =>
                <TableCell>
                    {elem}
                </TableCell>

            )}



        </TableRow>
    )
}
);

const DragHandle = sortableHandle(() => <span><ControlCamera /></span>);

const SortableContainer = sortableContainer(({ children, orderForm }) => {
    let array = [];
    if (orderForm) {
        for (let key in orderForm) {
            array.push(key);
        }
    }

    return <Table style={{ backgroundColor: '#F9F9F9' }} size="small">
        <TableHead>
            <TableRow>
                <TableCell>Ordenar</TableCell>
                <TableCell>Acciones</TableCell>
                <TableCell>Imagen</TableCell>
                {array.map(elem =>
                    <TableCell>
                        {elem}
                    </TableCell>

                )}

            </TableRow>
        </TableHead>
        <TableBody>
            {children}
        </TableBody>
    </Table>
});


class ModType3 extends Component {
    state = {
        items: [],
        rowItem: null

    }

    deleteItem = (rowData) => {
        let indexItem = this.state.items.findIndex(elem => {
            return elem == rowData

        })

        if (indexItem > -1) {
            let items = [... this.state.items]
            items.splice(indexItem, 1)
            this.setState({
                items: items
            })
        }

    }

    editItem = (rowData) => {
        this.setState({
            openItems: true,
            rowItem: rowData

        })



    }




    onChange = (newValue) => {
        this.setState({
            htmlText: newValue
        })
    }

    onChangeCK = (evt) => {
        this.setState({
            htmlText: evt.editor.getData()
        }, () => console.log(this.state.htmlText));
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let contenido = {};
        for (let key in this.state.orderForm) {
            contenido[key] = this.state.orderForm[key].value;
        }


        if (this.props.items) {
            contenido.items = [...this.state.items];

        }

        if (this.props.htmlText) {
            contenido.htmlText = this.state.htmlText;

        }


        contenido = JSON.stringify(contenido);

        this.setState({
            disableAllButtons: true
        })

        Database.post(`/update-module`, { id: this.props.module.id, nombre: this.props.orderFormPrincipal.nombre.value, id_page: this.props.module.id_page, id_type_module: this.props.module.id_type_module, contenido: contenido, estado: this.props.orderFormPrincipal.estado.value })
            .then(res => {

                this.setState({
                    disableAllButtons: false
                }, () => {
                    toast.success("Modificacion exitosa");

                })

            }, err => {
                toast.error(err.message);

            })


    }


    initializeMod = () => {
        let orderFormCopy;
        let contenido;
        if (this.props.orderForm)
            orderFormCopy = JSON.parse(JSON.stringify(this.props.orderForm));

        if (this.props.module && this.props.module.contenido)
            contenido = JSON.parse(this.props.module.contenido);

        let module = { ...this.props.module }
        if (orderFormCopy) {
            for (let key in orderFormCopy) {
                if (module && module.contenido)
                    orderFormCopy[key].value = contenido[key];
                orderFormCopy[key].touched = true;
            }



        }

        let { orderForm, formIsValid } = inputAllChangedHandler(orderFormCopy);

        let htmlText = '';
        if (this.props.htmlText && contenido && contenido.htmlText)
            htmlText = contenido.htmlText

        this.setState({
            orderForm: orderForm,
            formIsValid: formIsValid,
            htmlText: htmlText
        })

        if (this.props.items && module && module.contenido) {
            let items = [];
            if (contenido.items)
                items = contenido.items;

            this.setState({
                items: items
            })

        }





    }


    componentDidMount() {

        this.initializeMod();

    }

    onSortEnd = ({ oldIndex, newIndex }) => {

        this.setState(({ items }) => ({
            items: arrayMove(items, oldIndex, newIndex),
        }))


    };

    openDialog() {
        this.setState({ rowItem: null, open: true });
    }
    openDialogItems() {
        this.setState({ rowItem: null, openItems: true });
    }

    closeDialog() {
        this.setState({ open: false, openItems: false });
    }

    onClick = (rowData, newRowData) => {
        let orderForm = { ... this.state.orderForm }
        for (let key in orderForm) {
            if (newRowData[key]) {
                orderForm[key].value = newRowData[key];
                orderForm[key].touched = true
            }
        }

        this.setState({
            orderForm: orderForm,
            open: false,
            openItems: false
        })

    }

    onClickItems = (rowData, newRowData) => {
        console.log(rowData);
        let items = [... this.state.items];
        if (rowData) {
            let indexFind = items.findIndex(elem => {
                return elem == rowData
            })

            if (indexFind > -1) {
                items[indexFind] = newRowData;
            }


        } else {

            items.push(newRowData)
        }

        this.setState({
            items: items,
            open: false,
            openItems: false
        })

    }
    handleEditorChange = (content, editor) => {
        this.setState({
            htmlText: content
        })
    }



    render() {

        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }



        return ([
            <div key={"moduletype1-orderform"} >
                <form onSubmit={this.handleSubmit} >
                    {this.props.orderForm &&
                        <Grid style={{ marginTop: 25, marginBottom: 50 }} container>
                            <Grid item md={7}>
                                <h4>Campos del Componente</h4>
                                {this.props.archivo &&
                                    <Button style={{}} color="primary" variant="contained" type="button" onClick={this.openDialog.bind(this)}  ><Save /> Agregar Archivo</Button>
                                }
                                {formElementsArray.map(formElement => (
                                    <Input
                                        key={"edititem-" + formElement.id}
                                        elementType={formElement.config.elementType}
                                        elementConfig={formElement.config.elementConfig}
                                        value={formElement.config.value}
                                        textValid={formElement.config.textValid}
                                        invalid={!formElement.config.valid}
                                        shouldValidate={formElement.config.validation}
                                        touched={formElement.config.touched}
                                        changed={(event) => {

                                            let { orderForm, formIsValid } = inputChangedHandler(event, formElement.id, this.state.orderForm)
                                            this.setState({
                                                orderForm: orderForm,
                                                formIsValid: formIsValid

                                            })
                                        }}
                                    />
                                ))}

                            </Grid>

                            <Grid style={{ paddingLeft: 25, textAlign: 'center' }} item md={5}>
                                <h4>Imagen</h4>


                                {this.state.orderForm && this.state.orderForm.archivo && (this.state.orderForm.archivo.value.endsWith('.jpg') || this.state.orderForm.archivo.value.endsWith('.jpeg') || this.state.orderForm.archivo.value.endsWith('.gif') || this.state.orderForm.archivo.value.endsWith('.png')) &&
                                    <img src={'/' + process.env.REACT_APP_UPLOADS_FOLDER + '/thumbs/thumb_' + this.state.orderForm.archivo.value} />

                                }

                            </Grid>
                        </Grid>
                    }
                    {this.props.htmlText &&
                        <div>
                            <h4>Texto/Descripcion</h4>
                            <Editor
                                initialValue={this.state.htmlText}
                                apiKey='ursxh3uvsir7p6qyklffy60b3nt2fn5wpwpexy5t9mweaxla'
                                init={{
                                    relative_urls : false,
                                    remove_script_host : false,
                                    convert_urls : true,
                                    language: "es",
                                    language_url: "/langs/es.js",
                                    force_br_newlines: true,
                                    force_p_newlines: false,
                                    forced_root_block: '', // Needed for 3.x
                                    height: 150,
                                    menubar: true,
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
                                onEditorChange={this.handleEditorChange}
                            />
                        </div>
                    }
                    {this.props.items &&
                        <div>

                            <h4>Listado de Items</h4>
                            <Button style={{}} color="primary" variant="contained" type="button" onClick={this.openDialogItems.bind(this)}  ><Save /> Agregar Item</Button>
                            <SortableContainer onSortEnd={this.onSortEnd} orderForm={this.props.items && this.props.items.orderForm} useDragHandle>
                                {this.state.items.map((elem, index) => (
                                    <SortableItem key={`item-${index}`} index={index} value={elem} deleteItem={this.deleteItem.bind(this)} editItem={this.editItem.bind(this)} orderForm={this.props.items && this.props.items.orderForm} />
                                ))}


                            </SortableContainer>
                            {this.state.isLoading &&
                                <div style={{ textAlign: 'center' }}>
                                    <CircularProgress />
                                </div>

                            }

                        </div>
                    }

                    <Button style={{ marginTop: '25px' }} color="info" onClick={() => this.props.history.goBack()} ><ArrowBack />Volver</Button><Button style={{ marginTop: '25px' }} color="primary" variant="contained" disabled={!this.state.formIsValid || this.state.disableAllButtons || !this.props.formIsValidPrincipal} type="submit" ><Save /> Guardar</Button>

                </form>

            </div>,
            <Dialog
                open={this.state.open}
                onClose={this.closeDialog.bind(this)}
                fullWidth={true}
                maxWidth={"sm"}
            >
                <DialogTitle>Agregar Archivo
                         <IconButton aria-label="close" className={this.props.classes.closeButton} onClick={this.closeDialog.bind(this)}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>


                <DialogContent>
                    {this.state.open &&
                        <StepAgregarImagen
                            orderForm={{
                                archivo: {
                                    elementType: 'input',
                                    elementConfig: {
                                        type: 'text',
                                        label: 'Archivo',
                                        fullWidth: true
                                    },
                                    value: '',
                                    validation: {
                                        required: true
                                    },
                                    valid: true,
                                    touched: false
                                },
                            }}
                            archivo={this.props.archivo}
                            onClickItem={this.onClick.bind(this)}
                        />
                    }
                </DialogContent>
            </Dialog>,
            <Dialog
                open={this.state.openItems}
                onClose={this.closeDialog.bind(this)}
                fullWidth={true}
                maxWidth={"md"}
            >
                <DialogTitle>Agregar Item
                      <IconButton aria-label="close" className={this.props.classes.closeButton} onClick={this.closeDialog.bind(this)}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>


                <DialogContent>
                    {this.state.openItems &&
                        <StepAgregarImagen
                            rowItem={this.state.rowItem}
                            orderForm={this.props.items && this.props.items.orderForm}
                            archivo={this.props.items && this.props.items.archivo}
                            onClickItem={this.onClickItems.bind(this)}
                            htmlText={this.props.items && this.props.items.htmlText}
                        />
                    }
                </DialogContent>
            </Dialog>







        ]);
    }
}


export default withRouter(withStyles(styles)(ModType3));
