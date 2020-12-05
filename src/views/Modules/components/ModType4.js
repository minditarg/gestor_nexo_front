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
import StepAgregarNoticia from './StepAgregarNoticia'
import { inputChangedHandler, inputAllChangedHandler } from "variables/input.js";


import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';


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


const SortableItem = sortableElement(({ value, deleteItem  }) => {
   

    return (
        <TableRow>
            <TableCell>
                <DragHandle />
            </TableCell>
            <TableCell>
                <IconButton onClick={() => deleteItem(value)}>
                    <DeleteIcon />
                </IconButton>
            
            </TableCell>
            <TableCell>
                {value.nombre}
            </TableCell>
            <TableCell>
                {value.descripcion}
            </TableCell>
        

        </TableRow>
    )
}
);

const DragHandle = sortableHandle(() => <span><ControlCamera /></span>);

const SortableContainer = sortableContainer(({ children, orderForm }) => {
   

    return <Table style={{ backgroundColor: '#F9F9F9' }} size="small">
        <TableHead>
            <TableRow>
                <TableCell>Ordenar</TableCell>
                <TableCell>Acciones</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Decripción</TableCell>
                
            </TableRow>
        </TableHead>
        <TableBody>
            {children}
        </TableBody>
    </Table>
});


class ModType4 extends Component {
    state = {
        items: [],
        itemsShow: [],
        rowItem: null,
        tipo: 1,
        orderFormEst: {
            cantidad_noticias: {
                elementType: 'input',
                elementConfig: {
                    type: 'number',
                    label: 'Cantidad a Mostrar ' ,
                    fullWidth: true
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            orden: {
                elementType: 'select',
                elementConfig: {
                    label: 'Orden',
                    options: [
                        { value: 1, displayValue: 'Facha de Publicación ASC' },
                        { value: 2, displayValue: 'Fecha de publicación DESC' }

                    ],
                    fullWidth: true
                },
                value: 2,
                validation: {
                    required: true
                },

                valid: true,
                touched: true
            },

            solo_destacados: {
                elementType: 'checkbox',
                elementConfig: {
                    label: 'Solo destacados'
                },
                value: "0",
                validation: {
                    required: false
                },
                valid: true,
                touched: true
            },





        }

    }

    deleteItem = (rowData) => {
        let indexItem = this.state.itemsShow.findIndex(elem => {
            return elem == rowData

        })

        if (indexItem > -1) {
            let items = [... this.state.items]
            let itemsShow = [... this.state.itemsShow]
            items.splice(indexItem, 1)
            itemsShow.splice(indexItem, 1)
            this.setState({
                items: items,
                itemsShow:itemsShow
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



    handleSubmit = (e) => {
        e.preventDefault();
        let contenido = {};
        if (this.state.tipo == 2) {
            for (let key in this.state.orderFormEst) {
                contenido[key] = this.state.orderFormEst[key].value;
            }

        } else {
            if (this.state.items) {
                contenido.items = [...this.state.items];
            }

        }

        contenido.tipo_modulo = this.state.tipo;




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

    listNoticiasEstaticas = (items) => {
        console.log(items);
        Database.post(`/list-noticias-in`, { queryIn: items }, this)
            .then(res => {
                let itemsShow = res.result;
                let arrayResultante = items.map(elem => {
                    let indexArray = itemsShow.findIndex(elem2 => {
                        return elem2.id == elem
                    })

                    if (indexArray > -1)
                        return itemsShow[indexArray]

                })

                this.setState({
                    itemsShow: arrayResultante
                })

            })


    }


    initializeMod = () => {
        let orderFormCopy;
        let contenido;
        if (this.props.module && this.props.module.contenido)
            contenido = JSON.parse(this.props.module.contenido);

        if (contenido && contenido.tipo_modulo == 1) {

            if (this.props.module && contenido) {
                let items = [];
                if (contenido.items) {
                    items = contenido.items;
                    this.listNoticiasEstaticas(items);
                }
                this.setState({
                    items: items,
                    tipo: contenido.tipo_modulo
                })

            }

        } else if(contenido && contenido.tipo_modulo == 2) {
            if (this.state.orderFormEst)
                orderFormCopy = JSON.parse(JSON.stringify(this.state.orderFormEst));

            if (orderFormCopy) {
                for (let key in orderFormCopy) {
                    if (this.props.module && contenido && contenido[key])
                        orderFormCopy[key].value = contenido[key];
                    orderFormCopy[key].touched = true;
                }
             
                let { orderForm, formIsValid } = inputAllChangedHandler(orderFormCopy);

                this.setState({
                    orderFormEst: orderForm,
                    formIsValidEst: formIsValid,
                    tipo: contenido.tipo_modulo
                })

            }

        }



    }


    componentDidMount() {

        this.initializeMod();

    }

    onSortEnd = ({ oldIndex, newIndex }) => {

        this.setState(({ items, itemsShow }) => ({
            items: arrayMove(items, oldIndex, newIndex),
            itemsShow: arrayMove(itemsShow, oldIndex, newIndex),
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



    onClickItems = (rowData) => {
        let items = [... this.state.items];

        let indexFind = items.findIndex(elem => {
            return elem == rowData.id
        })

        if (indexFind > -1) {

        } else {
            items.push(rowData.id);
        }

        this.listNoticiasEstaticas(items);

        this.setState({
            items: items,
            open: false,
            openItems: false
        })

    }



    render() {

        const formElementsArray = [];
        for (let key in this.state.orderFormEst) {
            formElementsArray.push({
                id: key,
                config: this.state.orderFormEst[key]
            });
        }

        let textoNoticia = null;
        let textoSingular = null;
        if(this.props.idTipoNoticia == 1){
            textoNoticia = 'Noticias';
            textoSingular = 'Noticia';
        } else if (this.props.idTipoNoticia == 2) {
            textoNoticia = 'Actividades';
            textoSingular = 'Actividad';
        } else if(this.props.idTipoNoticia == 3) {
            textoNoticia = 'Campañas'
            textoSingular = 'Campaña';
        }



        return ([
            <div key={"moduletype1-orderform"} >
                <form onSubmit={this.handleSubmit} >

                    <Grid style={{ marginTop: 25, marginBottom: 50 }} container>
                        <Grid item md={7}>
                            <h4>Campos del Componente</h4>
                            <Input
                                key={"edititem-select"}
                                elementType={'select'}
                                elementConfig={{
                                    label: 'Tipo de Modulo',
                                    options: [
                                        { value: 1, displayValue: 'Estatico' },
                                        { value: 2, displayValue: 'Dinamico' }

                                    ],
                                    fullWidth: true
                                }}
                                value={this.state.tipo}
                                textValid={null}
                                invalid={false}
                                shouldValidate={{
                                    required: true
                                }}
                                touched={true}
                                changed={(event) => {
                                    this.setState({ tipo: event.target.value })
                                }}
                            />


                            {this.state.tipo == 2 && formElementsArray.map(formElement => (
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

                                        let { orderForm, formIsValid } = inputChangedHandler(event, formElement.id, this.state.orderFormEst);
                                        console.log(orderForm);
                                        this.setState({
                                            orderFormEst: orderForm,
                                            formIsValidEst: formIsValid

                                        })
                                    }}
                                />
                            ))}

                        </Grid>


                    </Grid>


                    {this.state.tipo == 1 &&
                        <div>

                    <h4>Listado de { textoNoticia }</h4>
                    <Button style={{}} color="primary" variant="contained" type="button" onClick={this.openDialogItems.bind(this)}  ><Save /> Agregar { textoSingular }</Button>
                            <SortableContainer onSortEnd={this.onSortEnd} orderForm={this.props.items && this.props.items.orderForm} useDragHandle>
                                {this.state.itemsShow.map((elem, index) => (
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

                    <Button style={{ marginTop: '25px' }} color="info" onClick={() => this.props.history.goBack()} ><ArrowBack />Volver</Button><Button style={{ marginTop: '25px' }} color="primary" variant="contained" disabled={(this.state.tipo ==2 ? !this.state.formIsValidEst : false) || this.state.disableAllButtons || !this.props.formIsValidPrincipal} type="submit" ><Save /> Guardar</Button>

                </form>

            </div>,

            <Dialog
                disableEnforceFocus={true}
                open={this.state.openItems}
                onClose={this.closeDialog.bind(this)}
                fullWidth={true}
                maxWidth={"md"}
            >
                <DialogTitle>Agregar { textoSingular }
                      <IconButton aria-label="close" className={this.props.classes.closeButton} onClick={this.closeDialog.bind(this)}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>


                <DialogContent>
                    {this.state.openItems &&
                        <StepAgregarNoticia
                            idTipoNoticia = {this.props.idTipoNoticia}
                            onClickItem={this.onClickItems.bind(this)}
                        />
                    }
                </DialogContent>
            </Dialog>







        ]);
    }
}


export default withRouter(withStyles(styles)(ModType4));
