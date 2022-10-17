import { Button, FormControl, FormHelperText, Input, InputLabel } from '@mui/material';
import React,{useState} from 'react'
import axios from 'axios';
/* eslint-disable no-restricted-globals */
function Auth() {
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");

    const handleUsername = (value) => {
        setUsername(value)
    }
    

    const handlePassword = (value) => {
        setPassword(value)
    }
    var AxiosHeaders = {
    headers : {
        'Content-Type': "application/json",
        'Access-Control-Allow-Origin': 'http://localhost:8080'
        }
    }

    var postData = {
        userName : username, 
        password : password,
    }
    const sendRequestWithAxios = (path) =>{
        axios.post("/auth/"+path,{
            username,
            password
        },AxiosHeaders).then((res) => console.log(res)).then((result) => {localStorage.setItem("tokenKey",result.message);
        localStorage.setItem("currentUser",result.userId);
        localStorage.setItem("userName",username)})        
        .catch((err) => console.log(err))
    }

    const sendRequest = (path) => {
        fetch("/auth/"+path, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
            },
            body : JSON.stringify({            
                userName : username, 
                password : password,
          }),
        }).then((res) => res.json())
          .then((result) => {localStorage.setItem("currentUser",result.userId);
                            localStorage.setItem("userName",username)})
          .catch((err) => console.log(err))
    }






    const handleButton = (path) =>{
        sendRequestWithAxios(path)
        setUsername("")
        setPassword("")
        history.go("/auth") // we'll make sure user will go same page again
    }


    return (


   <FormControl style= {{marginTop : 40}}>
        <InputLabel>Username</InputLabel>
        <Input onChange={(i) => handlePassword(i.target.value)}/>
        <InputLabel style={{top : 80}}>Password</InputLabel>
        <Input style={{top : 40}}
        onChange={(i) => handleUsername(i.target.value)} // takes as input i and i going to func
        />

        <Button variant="contained"
        style = {{marginTop : 60,
        color : 'white'
    }}
        onClick={() => handleButton("register")}
        >Register</Button>
        <FormHelperText style={{margin : 40}}>
            Are you already registered?
            <Button variant="contained"
        style = {{margin : 20,
        color : 'white'
    }}
        
        onClick={() => handleButton("login")}>Login</Button>
        </FormHelperText>
   </FormControl>
  )
}

export default Auth;