import React from 'react';

import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import InputAdornment from '@material-ui/core/InputAdornment';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Search from '@material-ui/icons/Search';

import Pagination from "material-ui-flat-pagination";


import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Card from "components/Card/Card.js";


const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

const useStyles = makeStyles(styles);

const ListUsers = ( props ) =>
{
  const classes = useStyles();


return (

  <Card>
    <CardHeader color="primary">
      <h4 className={classes.cardTitleWhite}>Usuarios</h4>
      <p className={classes.cardCategoryWhite}>
        Listado de usuarios del sitio
      </p>
    </CardHeader>
    <CardBody>
          <div style={{ position: 'relative', paddingBottom: '2em' }}>

            <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
            <IconButton
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true"
              onClick={props.menuHandleOpen}
              className="iconmenu"
              >
              <MoreVertIcon />
            </IconButton>
            </Grid>
            <Grid item>
              <Search />
            </Grid>
            <Grid item>
              <TextField id="input-with-icon-grid" label="Buscar Usuario" />
            </Grid>
          </Grid>
          </div>
          <Menu
            id="simple-menu"
            anchorEl={props.menuContext}
            keepMounted
            open={Boolean(props.menuContext)}
            onClose={props.menuHandleClose}
            >

            {Object.keys(props.botonesAcciones).map((keyName, i) => (
              <MenuItem key={'menu-' + keyName} onClick={(event) => { props.menuHandleItemClick(keyName) } }>
                <ListItemIcon>
                  {keyName == 'nuevo' ? (<AddIcon color={props.botonesAcciones[keyName].enabled ? 'inherit' : 'disabled'} />) : keyName == 'editar' ? (<EditIcon color={props.botonesAcciones[keyName].enabled ? 'inherit' : 'disabled'} />) : keyName == 'delete' ? (<DeleteIcon color={props.botonesAcciones[keyName].enabled ? 'inherit' : 'disabled'} />) : null}
                </ListItemIcon>
                <Typography color={props.botonesAcciones[keyName].enabled ? 'textPrimary' : 'textSecondary'} variant="inherit">{props.botonesAcciones[keyName].texto}</Typography>
              </MenuItem>
            ))}


          </Menu>
          <div style={{ clear: 'both', display: 'table' }} />
          <List >
            {props.users.map((value, index) => {
              const labelId = `checkbox-list-label-${index}`;
              return ([
                <ListItem key={index} role={undefined} dense button onClick={() => props.handleToggle(value)}>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={props.checked.indexOf(value) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': labelId }}
                      />
                  </ListItemIcon>
                  <ListItemText
                    id={labelId}
                    primary={
                      <React.Fragment>
                        {value.nombre}
                        <Typography
                          component="span"
                          variant="body2"

                          color="textSecondary"
                          >
                          {' - ' + value.desc}
                        </Typography>
                      </React.Fragment>

                    }
                    secondary={
                      <React.Fragment>
                        Username:
                         <Typography
                          component="span"
                          variant="body2"

                          color="textPrimary"
                          >
                          {' ' + value.username}
                        </Typography>

                      </React.Fragment>

                    }
                    />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="comments" onClick={(event) => { props.editSingleUser(value.id) } }>
                      <EditIcon />

                    </IconButton>

                  </ListItemSecondaryAction>
                </ListItem>,
                <Divider />
              ]);
            })}
          </List>
        </CardBody>
         <Pagination
          limit={props.limit}
          offset={props.offset}
          total={props.totalUsers}
          onClick={(e, offset) => props.handlePagination(offset)}
        />
        <ToastContainer position={toast.POSITION.BOTTOM_RIGHT}  autoClose={3000}/>
      </Card>



)};

export default ListUsers;
