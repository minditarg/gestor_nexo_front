import React, { Component } from "react";
import Database from "variables/Database.js";
import { Route, Switch, Link,withRouter } from 'react-router-dom';
import $ from 'jquery';
import moment from "moment";
import Input from 'components/Input/Input';

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

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';
import arrayMove from 'array-move';

import { StateListadoListModules } from "../VariablesState";
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

const headers = [
    { title: "Identificador", field: "identificador" },
    { title: "Descripcion", field: "descripcion" },
    { title: "Cantidad", field: "cantidad" }
];


const SortableItem = sortableElement(({ value, deleteItem, editItem }) => {
    let estado = null
    if (value.estado == 1)
        estado = 'Habilitado';

    if (value.estado == 2)
        estado = 'Deshabilitado';

    if (value.estado == 3)
        estado = 'Desconfigurado';


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
                {value.nombre}
            </TableCell>
            <TableCell>
                {value.descripcion_type}
            </TableCell>
            <TableCell>
                {value.nombre_page}
            </TableCell>
            <TableCell>
                {estado}
            </TableCell>

        </TableRow>
    )
}
);

const DragHandle = sortableHandle(() => <span><ControlCamera /></span>);

const SortableContainer = sortableContainer(({ children }) => {
    return <Table style={{ backgroundColor: '#F9F9F9' }} size="small">
        <TableHead>
            <TableRow>
                <TableCell>Ordenar</TableCell>
                <TableCell>Acciones</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Pagina</TableCell>
                <TableCell>Estado</TableCell>


            </TableRow>
        </TableHead>
        <TableBody>
            {children}
        </TableBody>
    </Table>
});


class ListModules extends Component {
    state = JSON.parse(JSON.stringify(StateListadoListModules));


    deleteModule = (rowData) => {
        this.handleClickOpen(rowData);

    }

    newModule = (rowData) => {
        this.setState({
            openNewDialog: true
        })

    }

    handleEditButton = (rowData) => {
      //  console.log(rowData.id)

       this.props.history.push( this.props.match.url + '/editmodule/' + rowData.id )

    }

    handleNew = () => {
        this.handleClose();
        Database.post('/insert-module', { nombre:this.state.orderForm.nombre.value,id_page: parseInt(this.props.idPage), id_type_module: this.state.orderForm.tipoModulo.value }, this)
        .then(res => {
            
            this.getModules(this.props.idPage);
            toast.success('El modulo se ha creado con exito');

        }, err => {

            toast.error(err.message);
        })



    }

    getTypesModules = () => {


        Database.get('/list-types-modules', this)
            .then(res => {

                let orderForm = { ...this.state.orderForm };
                res.result.forEach(elem => {
                    orderForm.tipoModulo.elementConfig.options.push({ value: elem.id, displayValue: elem.descripcion });

                })
                if (orderForm.tipoModulo.value && orderForm.tipoModulo.value != '')
                    orderForm.tipoModulo.valid = true;

                this.setState({
                    orderForm: orderForm
                })



            }, err => {

                toast.error(err.message);
            })
    }



    getModules = (idPage) => {
        this.setState({
            isLoading: true
        })
        let url;
        if (idPage)
            url = '/list-modules-bypage/' + idPage
        else
            url = '/list-modules';
        Database.get(url, this)
            .then(res => {

                let resultado = [...res.result];

                this.setState({
                    modules: resultado,
                    isLoading: false
                })

            }, err => {
                this.setState({
                    isLoading: false
                })
                toast.error(err.message);
            })
    }

    checkValidity = (value, rules) => {
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
            isValid = value.length <= rules.maxLength;
            textValid = 'Supera el maximo de caracteres';
        }

        return { isValid: isValid, textValid: textValid };
    }

    inputChangedHandler = (event, inputIdentifier) => {
        let checkValid;
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        checkValid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.valid = checkValid.isValid;
        updatedFormElement.textValid = checkValid.textValid;
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValidAlt = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValidAlt = updatedOrderForm[inputIdentifier].valid && formIsValidAlt;
        }
        this.setState({
            orderForm: updatedOrderForm,
            formIsValid: formIsValidAlt
        })

    }



    handleClickOpen(rowData) {
        this.setState({
            openDeleteDialog: true,
            deleteRowData: rowData
        })
    }

    handleClose() {
        this.setState({
            openDeleteDialog: false,
            openNewDialog: false,
            deleteRowData: null
        })
    }

    handleDelete(rowData) {
        if (rowData.id) {
            Database.post('/delete-module', {
                id: rowData.id
            }, this)
                .then(res => {

                    this.handleClose();
                    this.getModules(this.props.idPage);
                    toast.success("Modulo eliminado");

                }, err => {
                    toast.error(err.message);
                })
        }

    }

    onSortEnd = ({ oldIndex, newIndex }) => {

        this.setState(({ modules }) => ({
            modules: arrayMove(modules, oldIndex, newIndex),
        }), () => {

            let arrayOrder = this.state.modules.map(elem => {
                return elem.id
            })
            Database.post('/order-modules', { arrayOrder: arrayOrder }, this)
                .then(res => {

                    toast.success("El modulo se ha ordenado con exito!");

                }, err => {
                    toast.error(err.message);
                })


        });



    };



    componentDidMount() {


        this.getModules(this.props.idPage);
        this.getTypesModules();

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
            <div key={"modules-list-plantillas"} >

                <Button style={{ marginTop: '25px' }} onClick={() => this.newModule()} color="primary"><AddIcon /> Nuevo modulo</Button>
                <SortableContainer onSortEnd={this.onSortEnd} useDragHandle>
                    {this.state.modules.map((elem, index) => (
                        <SortableItem key={`item-${elem.id}`} index={index} value={elem} deleteItem={this.deleteModule.bind(this)} editItem={( this.handleEditButton.bind(this))} />
                    ))}


                </SortableContainer>
                {this.state.isLoading &&
                    <div style={{ textAlign: 'center' }}>
                        <CircularProgress />
                    </div>

                }


            </div>,

            <ModalDelete
                key={"modules-modal"}
                openDeleteDialog={this.state.openDeleteDialog}
                deleteRowData={this.state.deleteRowData}

                handleClose={() => this.handleClose()}
                handleDelete={(rowData) => this.handleDelete(rowData)}
            />,

            <Dialog
                key={"modules-New"}
                open={this.state.openNewDialog}
                onClose={this.handleClose.bind(this)}
                fullWidth={true}
                maxWidth={"md"}
            >

                <DialogTitle>Nuevo Modulo
                  <IconButton aria-label="close" className={this.props.classes.closeButton} onClick={this.handleClose.bind(this)} >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                {this.state.openNewDialog &&
                    <DialogContent>

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
                                changed={(event) => this.inputChangedHandler(event, formElement.id)}
                            />
                        ))}


                    </DialogContent>


                }

                <DialogActions>
                    <Button onClick={() =>this.handleClose()} color="primary">
                        Cancelar
                    </Button>
                    <Button disabled={ !this.state.formIsValid } onClick={() => this.handleNew()} color="primary" >
                        Aceptar
                    </Button>
                </DialogActions>
            </Dialog>



        ]);
    }
}


export default withRouter(withStyles(styles)(ListModules));
