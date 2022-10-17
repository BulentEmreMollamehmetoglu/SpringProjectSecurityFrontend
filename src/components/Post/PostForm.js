import React, {useState, useRef, useEffect} from "react";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import { Link } from "react-router-dom";
import { Button, InputAdornment, OutlinedInput } from "@mui/material";
import axios from "axios"
import Stack from '@mui/material/Stack';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const useStyles = styled((theme) => ({ // this is not working so i have just found another way
  root: {
    width: 800,
    textAlign : "left",
    margin : 20
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  avatar: {
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
  },
  link: {
      textDecoration : "none",
      boxShadow : "none",
      color : "white"
  }
}));


const rootCard = {
  width: 800,
  textAlign : "left",
  margin : 20,
}
const linkStyle = {
  textDecoration : "none",
  boxShadow : "none",
  color : "white"
}
function PostForm(props){
  const {userId,userName, refreshPosts} = props;
  const classes = useStyles();
  const [text,setText] = useState("");
  const [title,setTitle] = useState(""); 
  const [isSent,setIsSent] = useState(false);
    const savePost = () => { // it has been giving error so I used with axios
      fetch("/posts",
      {
        method : "POST",
        header : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({
          title : title,
          userId: userId,
          text : text,
        }),
      }).then((res) => res.json()).catch((err) => console.log("error"))
    }
    var AxiosHeaders = {
      headers : {
            "Authorization" : localStorage.getItem("tokenKey")
          }
      }
    const savePostWithAxios = () => {
      axios.post("http://localhost:8080/posts",{
        title,
        userId,
        text
      },AxiosHeaders).then((res) => console.log(res)).catch((err) => console.log(err))
    }
    const handleSubmit = () => {
      savePostWithAxios();
      setIsSent(true);
      setTitle("");
      setText("");
      refreshPosts();
    }
    const handleTitle = (value) => {
        setTitle(value);
        setIsSent(false);
    }
    const handleText = (value) => {
      setText(value);
      setIsSent(false);
    }
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setIsSent(false);
    }; 
  return(
    <div>
      <Snackbar open={isSent} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Your post has been successfully sent.
        </Alert>
      </Snackbar>
    
       <Card sx={{ maxWidth: 800 }} style={rootCard}>
      <CardHeader
        avatar={
          <Link style={linkStyle} to={"/users/" +userId}>User

          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {userName.charAt(0).toUpperCase()}
            
          </Avatar>
          </Link>
        }
        title={<OutlinedInput id="outlined-adornment-amount"
        multiline
        placeholder="Title"
        inputProps={{maxLength : 25}}
        fullWidth
        value = {title}
        onChange = { (i) => handleTitle(i.target.value) }
        >
        
        </OutlinedInput>}

      />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
        <OutlinedInput id="outlined-adornment-amount"
        multiline
        placeholder="Text"
        inputProps={{maxLength : 250}}
        fullWidth
        value = {text}
        onChange = { (i) => handleText(i.target.value) }
        endAdornment={
          <InputAdornment position="end">
          <Button
          variant="contained"
          onClick = {handleSubmit}
          >
            Post
          </Button>
          </InputAdornment>
        }
        >
        
        </OutlinedInput>
        </Typography>
      </CardContent>

    </Card>
    </div>
    )
}

export default PostForm;