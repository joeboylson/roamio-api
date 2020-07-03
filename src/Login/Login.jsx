import React from 'react';
import axios from 'axios';
import { Input, Button, message } from 'antd';
import { useHistory } from "react-router-dom";

import '../styles/Login.scss'

const App = () => {

    const history = useHistory();

    const [username, setUsername] = React.useState('username');
    const [password, setPassword] = React.useState('admin');

    const login = () => {
        const url = '/api/login'
        const data = {username, password}
    
        axios.post(url, data)
        .then(response => {
            if (!response.data || !response.data.success) {
                message.error("Invalid username or password")
                return;
            }

            history.push('/');
        })
    }

    return (
        <div id={'login'}>

            <div id={'input-wrapper'}>

                <Input 
                    placeholder={'username'} 
                    onChange={e => setUsername(e.target.value)}
                />
                
                <Input 
                    placeholder={'password'} 
                    type="text" 
                    onChange={e => setPassword(e.target.value)}
                />

                <Button 
                    onClick={login}
                    type={'primary'}
                >LOGIN</Button>

            </div>

        </div>
    )
}

export default App;