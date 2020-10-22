import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import SvgIcon from '@material-ui/core/SvgIcon';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import CardTask from "./CardTask";
import { useHistory } from "react-router-dom";
import Modal from 'react-awesome-modal';
import {FilterTask} from './FilterTask';
import moment from "moment";



const drawerWidth = 240;



const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function ResponsiveDrawer(props) {
  const { window } = props;
  const email = localStorage.getItem('user');
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  let history = useHistory();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  
  const vista = () => {
    setMobileOpen(!mobileOpen);
  };
  const filter = (lista) => {
	if(localStorage.getItem("filtroName") === null && localStorage.getItem("filtroEstado") === null && localStorage.getItem("filtroFecha") === null ){
		return lista;
	}
	else{	
		const filtro=[];
		lista.map((task) => {
			console.log(moment(localStorage.getItem("filtroFecha")).format("dd-MM-yyyy"));
			console.log(moment(task.dueDate).format("dd-MM-yyyy"));
			if(localStorage.getItem("filtroName") === task.responsable.username && localStorage.getItem("filtroEstado") === task.estado &&  moment(localStorage.getItem("filtroFecha")).format("dd-MM-yyyy") === moment(task.dueDate).format("dd-MM-yyyy") ){
				filtro.push(task);
			}	
		});
		return filtro;
	}	
  };

  const drawer = (
	<div>
	   <div className={classes.toolbar} />
	   <div style={{alignItems:'center',justifyContent:'center'}}>
	   <AccountCircleIcon style={{ fontSize: 50 }} />	
			<List>
                <ListItem>
                  <ListItemText
                    primary={localStorage.getItem("name")}
                  />
                </ListItem>,
				 <ListItem>
                  <ListItemText
                    primary={localStorage.getItem("user")}
                  />
                </ListItem>,
       </List>
    
      </div>
	  <Divider />
	  <div>
      <List>
        {['Logout'].map((text, index) => (
         <ListItem button key={text} onClick={() =>  history.push("/")}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
	  </div>
    </div>
  );
 
  const container = window !== undefined ? () => window().document.body : undefined;
  const notificaciones=localStorage.getItem("items") === null ? ([]):filter(JSON.parse(localStorage.getItem("items")));	
  
  
  
  const res = true;



  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Responsive drawer
          </Typography>
        </Toolbar>
      </AppBar>
	     <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, 
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
	  <main className={classes.content}>
		  <div className={classes.toolbar} />
			
			<CardTask task={notificaciones} /> 
			<Fab color="primary" aria-label="add" href="/newtask" style={{position: "fixed",bottom: "30px",right: "30px" }}>
			<AddIcon />
			</Fab>	
			<FilterTask/>
	  </main>	
	
    </div>
	
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;