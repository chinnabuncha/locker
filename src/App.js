import React from 'react'
import {Button,Container} from '@material-ui/core';
import Header from './components/fragments/Header';
import Menu from './components/fragments/Menu';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch

} from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Stock from './components/pages/Stock';
import StockCreate from './components/pages/StockCreate';
import StockEdit from './components/pages/StockEdit';
import { useSelector, useDispatch } from 'react-redux';
import Report from './components/pages/Report';
import Abouts from './components/pages/Abouts';
import * as loginActions from "./actions/login.action";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    padding: theme.spacing(20)
  }
}));

export default function App() {
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = React.useState(true);
  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const dispatch = useDispatch();
  //relogin
  React.useEffect(() => {
    console.log("App created")
    dispatch(loginActions.reLogin());
  
  }, []);

  const loginReducer = useSelector(({loginReducer})=>loginReducer)
  return (
  <Router>
    {loginReducer.result && !loginReducer.error && (
    <Header handleDrawerOpen ={handleDrawerOpen} open={openDrawer}/>
    )}
    {loginReducer.result &&  !loginReducer.error &&
    (<Menu open ={openDrawer}  handleDrawerClose ={handleDrawerClose}
    />)}
    {/* under switch one components */}
    <Container className={classes.content}>
    <Switch>
    <Route path ="/login" component ={Login}/>
      <Route path ="/register" component ={Register}/>
      <Route path ="/stock" component ={Stock}/>
      <Route path ="/stockCreate" component ={StockCreate}/>
      <Route path ="/stockEdit/:id" component ={StockEdit}/>
      <Route path ="/report" component ={Report}/>
      <Route path ="/aboutus" component ={Abouts}/>
      <Route 
      exact ={true}
      path ="/"
      component ={()=><Redirect to = "/login"/>}
      />
    </Switch>
    </Container>
  </Router>
  );
}
