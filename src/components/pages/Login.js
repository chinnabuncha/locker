import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import {
  CardActions,
  Card,
  CardContent,
  CardMedia,
  Button,
  Typography,
  TextField,
  Link,
  Grid,
} from "@material-ui/core";
import * as loginActions from "./../../actions/login.action";
import { useDispatch,useSelector } from "react-redux";
import Alert from "@material-ui/lab/Alert";
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 200,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login(props) {
  const classes = useStyles();
  const [account, setAccount] = React.useState({
    username: "admin",
    password: "1234",
  });
  const dispatch = useDispatch();
  const loginReducer = useSelector(({ loginReducer }) => loginReducer);
  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={`${process.env.PUBLIC_URL}/images/authen_header.jpg `}
        title="Contemplative Reptile"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          Login
        </Typography>

        <form className={classes.form} noValidate
        onSubmit ={e=>{
          e.preventDefault();
          dispatch(loginActions.login({...account , ...props}))
         
        }}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={account.username}
            onChange={(e) => {
              setAccount({ ...account, username: e.target.value });
            }}
            id="username"
            label="Username"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            onChange={(e) => {
                setAccount({ ...account, password: e.target.value });
              }}
            value={account.password}
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          {loginReducer.error && (
            <Alert severity="error">{loginReducer.result}</Alert>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Button
            onClick={() => props.history.push("/register")}
            fullWidth
            size="small"
            color="primary"
          >
            Register
          </Button>
          #spy{JSON.stringify(account)}
        </form>
      </CardContent>
    </Card>
  );  
}
