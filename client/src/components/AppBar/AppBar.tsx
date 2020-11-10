import React from 'react';
import clsx from 'clsx';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { AccountCircle } from '@material-ui/icons';
import { Link, NavLink } from 'react-router-dom';
import { Popover } from 'antd';
import { Context } from '../../context';
import { useHistory } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import DraftsIcon from '@material-ui/icons/Drafts';
import PublishIcon from '@material-ui/icons/Publish';
import DescriptionIcon from '@material-ui/icons/Description';
import { ClickAwayListener } from '@material-ui/core';
import GroupIcon from '@material-ui/icons/Group';
import './AppBar.scss'

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    grow: {
      flexGrow: 1,
    }
  }),
);

interface ChildComponentProps {
  username: string,
  role: string
}

const MiniDrawer: React.FC<ChildComponentProps> = ({ username, role }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const { dispatch } = React.useContext(Context); 
  const history = useHistory();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleLogout = (e: any) => {
    e.preventDefault();
    dispatch({
      type: 'LOGOUT'
    })
    history.push('/admin');
  }

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const menuId = 'primary-search-account-menu';

  const content = (
    <div style={{width: '100px', padding: '4px'}}>
      <div style={{paddingBottom: '8px'}}>
        <i className="fas fa-user" />
        <span>Profile</span>
      </div>
      <a>
        <div onClick={handleLogout}>
          <i className="fas fa-sign-out-alt" />
            <span>Logout</span>
        </div>
      </a>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
          <MenuIcon />
          </IconButton>
          <Link to="/dashboard" style={{ textDecoration: 'none' }}>
            <Typography variant="h6" noWrap style={{color: '#FFF' }}>
              Dashboard
            </Typography>
          </Link>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Popover content={content} placement="bottomRight" trigger="hover">
              <div>
                <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{username}</span>
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </div>
              
            </Popover>
            
          </div>
        </Toolbar>
      </AppBar>
      <ClickAwayListener 
      mouseEvent="onMouseDown"
      touchEvent="onTouchStart"
      onClickAway={handleDrawerClose}>
      <Drawer
        variant="permanent"
        onKeyUp={handleDrawerClose}
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {[{title: 'Recent Blogs', icon: <DescriptionIcon />}, {title: 'Published', icon: <PublishIcon />}, {title: 'Drafts', icon: <DraftsIcon />}, {title: 'Trash', icon: <DeleteIcon />}].map((section, index) => (
            <ListItem button key={index}>
              <ListItemIcon>{section.icon}</ListItemIcon>
              <ListItemText primary={section.title} />
            </ListItem>
          ))}
        </List>
        {
          role === "admin" && (<div>
              <Divider />
              <NavLink to="/users" >
                <ListItem>
                <ListItemIcon><GroupIcon /></ListItemIcon>
                    <ListItemText primary='Users' />
                </ListItem>
              </NavLink>
            </div>)
        }
      </Drawer>
      </ClickAwayListener>
    </div>
  );
}

export default MiniDrawer;