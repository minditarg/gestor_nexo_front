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


class ModType4 extends Component {
    state = {
        items: [],
        rowItem: null,
        tipo:1,
        orderFormEst: {
            cantidad_noticias: {
              elementType: 'input',
              elementConfig: {
                type: 'number',
                label: 'Cantidad de Noticias',
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
        
                valid: false,
                touched: false
              },

              solo_destacados: {
                elementType: 'checkbox',
                elementConfig: {
                  label: 'Solo destacados'
                },
                value: "0",
                validation: {
                  required: true
                },
                valid: false,
                touched: false
              },


         


          }

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
        if (this.state.orderFormEst)
            orderFormCopy = JSON.parse(JSON.stringify(this.state.orderFormEst));

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
            orderFormEst: orderForm,
            formIsValidEst: formIsValid,
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
    


    render() {

        const formElementsArray = [];
        for (let key in this.state.orderFormEst) {
            formElementsArray.push({
                id: key,
                config: this.state.orderFormEst[key]
            });
        }



        return ([
            <div key={"moduletype1-orderform"} >
                <form onSubmit={this.handleSubmit} >
                    
                        <Grid style={{ marginTop: 25, marginBottom: 50 }} container>
                            <Grid item md={7}>
                                <h4>Campos del Componente</h4>
                                <Input
                                        key={"edititem-select" }
                                        elementType={'select'}
                                        elementConfig={{
                                            label: 'Tipo de Modulo',
                                            options: [
                                              { value: 1, displayValue: 'Estatico' },
                                              { value: 2, displayValue: 'Dinamico' }
                                  
                                            ],
                                            fullWidth: true
                                          }}
                                        value={ this.state.tipo }
                                        textValid={null}
                                        invalid={ false }
                                        shouldValidate={{
                                            required: true
                                          }}
                                        touched={ true }
                                        changed={(event) => {
                                            this.setState({ tipo: event.target.value})
                                        }}
                                    />


                                { this.state.tipo == 2 && formElementsArray.map(formElement => (
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
                    
                  
                    { this.state.tipo == 1 &&
                        <div>

                            <h4>Listado de Noticias</h4>
                            <Button style={{}} color="primary" variant="contained" type="button" onClick={this.openDialogItems.bind(this)}  ><Save /> Agregar Noticia</Button>
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

                    <Button style={{ marginTop: '25px' }} color="info" onClick={() => this.props.history.goBack()} ><ArrowBack />Volver</Button><Button style={{ marginTop: '25px' }} color="primary" variant="contained" disabled={!this.state.formIsValidEst || this.state.disableAllButtons || !this.props.formIsValidPrincipal} type="submit" ><Save /> Guardar</Button>

                </form>

            </div>,
           
            <Dialog
                open={this.state.openItems}
                onClose={this.closeDialog.bind(this)}
                fullWidth={true}
                maxWidth={"md"}
            >
                <DialogTitle>Agregar Noticia
                      <IconButton aria-label="close" className={this.props.classes.closeButton} onClick={this.closeDialog.bind(this)}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>


                <DialogContent>
                    {this.state.openItems &&
                        <StepAgregarNoticia
                            onClickItem={this.onClickItems.bind(this)}
                        />
                    }
                </DialogContent>
            </Dialog>







        ]);
    }
}


export default withRouter(withStyles(styles)(ModType4));
