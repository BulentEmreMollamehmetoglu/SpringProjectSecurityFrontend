import { Container } from "@mui/system";
import React,{useState,useEffect} from "react";
import Post from "../Post/Post";
import PostForm from "../Post/PostForm";


const styledContainer = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent : "center",
    alignItems : "center",
    backgroundColor: '#f0f5ff',
}

function Home(){
    const [error,setError] = useState(null);
    const [isLoaded,setIsLoaded] = useState(false);
    const [postList,setPostList] = useState([])

    const refreshPosts = () => {
        fetch("/posts").then(res => res.json()) // fetch address in package.json
        .then((result) => {
            setIsLoaded(true);
            setPostList(result)
        },
        (error) => {
            setIsLoaded(true);
            setError(error);
        }
        
        )
    }

    useEffect(() => {
        refreshPosts()
    },[postList]) // second argument takes that when the time useEffect runs
    // list that we want to refresh
    if(error){
        return <div>Error !!!</div>
    }else if(!isLoaded){
        return <div>Loading...</div>
    }else{
        return(

                <Container fixed style={styledContainer}>

                {localStorage.getItem("currentUser") == null ? "" :
                <PostForm userId={1} userName={"ddd"} refreshPosts = {refreshPosts}></PostForm>}
                {postList.map(post => (
                    <Post likes={post.postLikes} postId={post.id} userId={post.userId} userName={post.userName}
                     title={post.title} text={post.text} ></Post>
                    
                ))}

            </Container>
            )
    }

}

export default Home;