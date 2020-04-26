/*eslint-disable*/
import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
// core components
import AdminNavbarLinks from "components/Navbars/AdminNavbarLinks.js";
import RTLNavbarLinks from "components/Navbars/RTLNavbarLinks.js";

import styles from "assets/jss/material-dashboard-react/components/sidebarStyle.js";

const useStyles = makeStyles(styles);

export default function Sidebar(props) {
  const classes = useStyles();

  const [openVar, setOpenVar] = React.useState({
    open1:false,
    open2:false,
    open3:false,
    open4:false,
    open5:false,
    openStock:true
  });

  function handleClick(value) {
    var openVarCopy = {...openVar};
    openVarCopy[value]=!openVarCopy[value];

    setOpenVar(
      openVarCopy
    );
  }
  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName) {
    return window.location.href.indexOf(routeName) > -1 ? true : false;
  }
  const { color, logo, image, logoText, routes } = props;
  var links = (
    <List className={classes.list}>
      {routes.map((prop, key) => {
        if(prop.groupComponent && prop.show) {

      return(
        <div key={"sidebar-" + key}>
        <div

          className={ classes.item}


        >
        <ListItem button className={classes.itemLink } onClick={()=>handleClick(prop.open)}>
        {typeof prop.icon === "string" ? (
          <Icon
          className={classes.itemIcon}
          >
            {prop.icon}
          </Icon>
        ) : (
          <prop.icon
          className={classes.itemIcon}
          />
        )}

       <ListItemText
       className={classes.itemText}
       disableTypography={true}
       primary={prop.name} />
         {openVar[prop.open] ? <ExpandLess className={classes.itemIcon2} /> : <ExpandMore className={classes.itemIcon2}/>}
     </ListItem>
     </div>
      <Collapse in={openVar[prop.open]} timeout="auto" unmountOnExit>
            <List className={classes.list,classes.nested}>
          {prop.dependences.map((prop, key) => {
            if(prop.show)
            {
            var listItemClasses;

              listItemClasses = classNames({
                [" " + classes[color]]: activeRoute(prop.layout + prop.path)
              });

            const whiteFontClasses = classNames({
              [" " + classes.whiteFont]: activeRoute(prop.layout + prop.path)
            });
          return   <NavLink
              to={prop.layout + prop.path}
              className={classes.item}
              activeClassName="active"
              key={key}
            >
              <ListItem button className={classes.itemLink + listItemClasses}>
                {typeof prop.icon === "string" ? (
                  <Icon
                  className={classNames(classes.itemIcon, whiteFontClasses, {
                    [classes.itemIconRTL]: props.rtlActive
                  })}
                  >
                    {prop.icon}
                  </Icon>
                ) : (
                  <prop.icon
                  className={classNames(classes.itemIcon, whiteFontClasses, {
                    [classes.itemIconRTL]: props.rtlActive
                  })}
                  />
                )}
                <ListItemText
                  primary={props.rtlActive ? prop.rtlName : prop.name}
                  className={classNames(classes.itemText, whiteFontClasses, {
                    [classes.itemTextRTL]: props.rtlActive
                  })}
                  disableTypography={true}
                />
              </ListItem>
            </NavLink>
          }

        })}
        </List>
        </Collapse>
      </div>
   )

 } else if(prop.show) {
        var activePro = " ";
        var listItemClasses;
        if (prop.path === "/upgrade-to-pro") {
          activePro = classes.activePro + " ";
          listItemClasses = classNames({
            [" " + classes[color]]: true
          });
        } else {
          listItemClasses = classNames({
            [" " + classes[color]]: activeRoute(prop.layout + prop.path)
          });
        }
        const whiteFontClasses = classNames({
          [" " + classes.whiteFont]: activeRoute(prop.layout + prop.path)
        });
        return (
          <NavLink
            to={prop.layout + prop.path}
            className={activePro + classes.item}
            activeClassName="active"
           key={"sidebar-" + key}

          >
            <ListItem button className={classes.itemLink + listItemClasses}>
              {typeof prop.icon === "string" ? (
                <Icon
                  className={classNames(classes.itemIcon, whiteFontClasses, {
                    [classes.itemIconRTL]: props.rtlActive
                  })}
                >
                  {prop.icon}
                </Icon>
              ) : (
                <prop.icon
                  className={classNames(classes.itemIcon, whiteFontClasses, {
                    [classes.itemIconRTL]: props.rtlActive
                  })}
                />
              )}
              <ListItemText
                primary={props.rtlActive ? prop.rtlName : prop.name}
                className={classNames(classes.itemText, whiteFontClasses, {
                  [classes.itemTextRTL]: props.rtlActive
                })}
                disableTypography={true}
              />
            </ListItem>
          </NavLink>
        );
      }
      })

    }
    </List>
  );
  var brand = (
    <div className={classes.logo}>
      <a
        href="http://boxrental.com.ar"
        className={classNames(classes.logoLink, {
          [classes.logoLinkRTL]: props.rtlActive
        })}
        target="_blank"
      >
        <div className={classes.logoImage}>
          <img src={logo} alt="logo" className={classes.img} />
        </div>
        {logoText}
      </a>
    </div>
  );
  return (
    <div>
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={props.rtlActive ? "left" : "right"}
          open={props.open}
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: props.rtlActive
            })
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>
            {props.rtlActive ? <RTLNavbarLinks /> : <AdminNavbarLinks user={props.user} handleCloseSession={props.handleCloseSession} />}
            {links}
          </div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          anchor={props.rtlActive ? "right" : "left"}
          variant="permanent"
          open
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: props.rtlActive
            })
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>{links}</div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
    </div>
  );
}

Sidebar.propTypes = {
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  bgColor: PropTypes.oneOf(["purple", "blue", "green", "orange", "red"]),
  logo: PropTypes.string,
  image: PropTypes.string,
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  open: PropTypes.bool
};
