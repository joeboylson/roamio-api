import React, {useState} from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";

import '../styles/Login.scss'

const Login = () => {

    const history = useHistory();

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const handleLogin = (e) => {

        e.preventDefault();
        e.stopPropagation();

        const url = '/api/login'

        axios.post(url, {username, password})
        .then(response => {
            if (!response.data || !response.data.success) {
                alert("Invalid username or password")
                return;
            }

            history.push('/');
        })
    }

    return (
        <div id={'login'}>

            <form id={'login-form'}>
                <input type="text" onChange={e => setUsername(e.target.value)}/>
                <input type="password" onChange={e => setPassword(e.target.value)}/>
                <button onClick={handleLogin}>Submit</button>
            </form>

        </div>
    )
}

export default Login;