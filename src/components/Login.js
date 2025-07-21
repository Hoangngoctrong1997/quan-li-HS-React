import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
function Login() {
    let [username, setUsername] = useState('');
    let [password, setPasswword] = useState('');
        const navigate = useNavigate();
        return (
            <>
                <h1>Login Page</h1>
                <input placeholder="Username" onChange={(e)=>{setUsername(e.target.value)}}/>
                <input placeholder="Password" onChange={(e)=>{setPasswword(e.target.value)}}/>
                {username === 'admin' && password === 'admin' ? (
                    <button onClick={()=>{navigate('/')}}>Home</button>
                ):( <button onClick={()=>{navigate('/')}}>Regiter</button>)}
            </>
        );
}
export default Login;
