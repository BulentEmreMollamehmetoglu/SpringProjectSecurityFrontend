import React from 'react'
import { Avatar, CardContent, InputAdornment, makeStyles, OutlinedInput } from '@mui/material'
import { Link } from 'react-router-dom';
import { blue } from '@mui/material/colors';



function Comment(props) {
    const {text,userId,userName} = props;
    //const classes = useStyles();
    const linkStyle = {
        textDecoration : "none",
        boxShadow : "none",
        color : "white"
      };
      const commentStyle = {
        display : "flex",
        flexWrap : "wrap",
        justifyContent : "flex-start",
        alignItems : "center"
      }
    //   const smallStyle = {
    //     width : theme.spacing(3),
    //     height : theme.spacing(4)
    //   }
    
  return (

    <CardContent className={commentStyle}>
        <OutlinedInput
        disabled
        id="outlined-adornment-amount"
        multiline
        inputProps={{maxLength : 25}}
        fullWidth
        value = {text}
        startAdornment = {
            <InputAdornment position='start'>
                <Link className={linkStyle} to={{pathname : '/users/' + userId}}>
                    <Avatar aria-label="recipe" sx={{ bgcolor: blue[500] }}>
                        {userName.charAt(0).toUpperCase()}
                    </Avatar>
                </Link>

            </InputAdornment>
        }
        style = {{color :"black",backgroundColor : 'white'}}
        >


        </OutlinedInput>

    </CardContent>


  )
}


export default Comment;
