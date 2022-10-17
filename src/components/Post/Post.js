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
import { Container } from "@mui/system";
import Comment from "../Comment/Comment";
import CommentForm from "../Comment/CommentForm";
import axios from 'axios';

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
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
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
function Post(props){
  const {title,text,userId,userName,postId,likes} = props;
  const classes = useStyles();
  const [expanded,setExpanded] = useState(false);

  const [error,setError] = useState(null);
  const [isLoaded,setIsLoaded] = useState(false);
  const [commentList,setCommentList] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount,setLikeCount] = useState(likes.length); // likes.length || 0
  const isInitialMount = useRef(true); // like static variable
  const [likeId,setLikeId] = useState(null);
  let disabled = localStorage.getItem("currentUser") == null ? true:false;
  // use ref stands for
  // says is it loaded first time or has anyone clicked the comment button
    const handleExpandClick = () => {
      setExpanded(!expanded);
      refreshComments();
    };

    const handleLike = () => {
        setIsLiked(!isLiked);
        if(!isLiked){
          saveLikeWithAxios();
          setLikeCount(likeCount + 1);
        }else{
          deleteLikeWithAxios();
          setLikeCount(likeCount -1);
        }
    }
    const refreshComments = () => {
      fetch("/comments?postId="+postId).then(res => res.json()) // fetch address in package.json
      .then((result) => {
          setIsLoaded(true);
          setCommentList(result)
      },
      (error) => {
          console.log(error)
          setIsLoaded(true);
          setError(error);
      }
      
      )
  }
  const checkLikes = () => {
    var likeControl = likes.find((like => like.userId === localStorage.getItem("currentUser")))
    if(likeControl != null){
      setLikeId(likeControl.id);
      setIsLiked(true);
    }   

  }
  var AxiosHeaders = {
    headers : {
          "Authorization" : localStorage.getItem("tokenKey")
        }
    }
  const saveLikeWithAxios = () => {
    axios.post("http://localhost:8080/likes",{
      postId,
      userId : localStorage.getItem("currentUser"), // changed
    },AxiosHeaders).then((res) => console.log(res)).catch((err) => console.log(err))
  }


  const deleteLikeWithAxios = () => {
    axios.delete("http://localhost:8080/likes/"+likeId,AxiosHeaders)
    .catch((err) => console.log(err))
  }

  useEffect(()=>{
    if(isInitialMount.current){
      isInitialMount.current = false;
    }else{
      refreshComments();
    }
    
  },[commentList])

  useEffect(() => {
    checkLikes();
  
  },[])
  return(
    <div className="postContainer">
       <Card sx={{ maxWidth: 800 }} style={rootCard}>
      <CardHeader
        avatar={
          <Link style={linkStyle} to={"/users/" +userId}>User

          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {userName.charAt(0).toUpperCase()}
            
          </Avatar>
          </Link>
        }
        title={title}

      />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
        {text}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
      {disabled?
        <IconButton aria-label="add to favorites"
        disabled
        onClick={handleLike}
        >
          <FavoriteIcon style={isLiked? {color : "red"}: null} />
          
        </IconButton> :
                            <IconButton 
                            onClick={handleLike}
                            aria-label="add to favorites"
                            >
                            <FavoriteIcon style={isLiked? { color: "red" } : null} />
                            </IconButton>
                          }
        {likeCount}
        <IconButton
        
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-la bel="show more"
        >
          <InsertCommentIcon />
          
        </IconButton>
        
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
      <Container fixed>
      {commentList.map(comment =>(
        <Comment userId = {1} userName = {"USER"} text = {comment.text}></Comment>
      ))}
      {disabled ? "":
            <CommentForm userId = {1} userName = {"USER"} postId= {postId}></CommentForm>
      }

               </Container>
      </Collapse>
    </Card>

    </div>
    )
}

export default Post;
