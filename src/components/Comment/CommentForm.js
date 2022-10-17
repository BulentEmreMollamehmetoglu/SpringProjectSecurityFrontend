import React,{useState} from 'react'
import { Avatar, Button, CardContent, InputAdornment, makeStyles, OutlinedInput } from '@mui/material'
import { Link } from 'react-router-dom';
import { blue } from '@mui/material/colors';
import axios from 'axios';


function CommentForm(props) {
    const {userId,userName,postId} = props;
    //const classes = useStyles();
    const [text,setText] = useState("");
    var AxiosHeaders = {
      headers : {
            "Authorization" : localStorage.getItem("tokenKey")
          }
      }
    const saveCommentWithAxios = () => {
        axios.post("http://localhost:8080/comments",{
          userId,
          postId,
          text
        },AxiosHeaders).then((res) => console.log(res)).catch((err) => console.log(err))
      }

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
    const handleSubmit = () => {
        saveCommentWithAxios();
        setText("");
    }
    const handleChange = (value) => {
        setText(value);
    }
  return (

    <CardContent className={commentStyle}>
        <OutlinedInput
        id="outlined-adornment-amount"
        multiline
        inputProps={{maxLength : 250}}
        fullWidth
        onChange={(i) => handleChange(i.target.value)}
        startAdornment = {
            <InputAdornment position='start'>
                <Link className={linkStyle} to={{pathname : '/users/' + userId}}>
                    <Avatar aria-label="recipe" sx={{ bgcolor: blue[500] }}>
                        {userName.charAt(0).toUpperCase()}
                    </Avatar>
                </Link>

            </InputAdornment>
        }
        endAdornment = {
            <InputAdornment position='end'>
                <Button
          variant="contained"
          onClick = {handleSubmit}
          >
            Comment
          </Button>
            
            </InputAdornment>
        }
        value={text}
        style = {{color :"black",backgroundColor : 'white'}}

        >


        </OutlinedInput>

    </CardContent>


  )
}


export default CommentForm;
