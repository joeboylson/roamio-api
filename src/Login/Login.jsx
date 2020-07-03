import React from 'react';
import axios from 'axios';
import { Form, Input, Button, message } from 'antd';
import { useHistory } from "react-router-dom";

import '../styles/Login.scss'

const Login = () => {

    const history = useHistory();

    const login = (values) => {
        const url = '/api/login'

        axios.post(url, values)
        .then(response => {
            if (!response.data || !response.data.success) {
                message.error("Invalid username or password")
                return;
            }

            history.push('/');
        })
    }

    const loginFailed = () => message.error("Invalid username or password")

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };

    return (
        <div id={'login'}>

            <Form
                { ...layout }
                name="basic"
                initialValues={{ remember: true }}
                onFinish={login}
                onFinishFailed={loginFailed}
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true,  }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                    Submit
                    </Button>
                </Form.Item>
            </Form>

        </div>
    )
}

export default Login;