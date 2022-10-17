import React from "react";
import {Link, useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material/styles';
import { LockOpen } from "@mui/icons-material";

const useStyles = styled((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      textAlign : "left"
    },
    link: {
        textDecoration : "none",
        boxShadow : "none",
        color : "white"
    }
  }));
  const linkStyle = {
    textDecoration : "none",
    boxShadow : "none",
    color : "white"
  };
  const title = {
    flexGrow: 1,
    textAlign : "left"
  }; 
function Navbar(){
    const classes = useStyles();
    //let history = useHistory(); // has changed in v6 and become useNavigate
    let navigate = useNavigate
    const onClick = () => {
      localStorage.removeItem("tokenKey")
      localStorage.removeItem("currentUser")
      localStorage.removeItem("refreshKey")
      localStorage.removeItem("userName")
      navigate("/");
    }
    return(
<div>
<Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography style={title} variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link style={linkStyle} to="/">Home</Link>
          </Typography>
          {localStorage.getItem("currentUser") == null ? <Link style={linkStyle} to={"/auth/" }>Login/Register</Link> :
          <div>
          <IconButton onClick = {onClick}><LockOpen></LockOpen></IconButton>
          <Link style={linkStyle} to={"/users/" +localStorage.getItem("currentUser")}>Profile</Link>
          </div>
          }
          
        </Toolbar>
      </AppBar>
    </Box>

</div>
    )
}

export default Navbar;