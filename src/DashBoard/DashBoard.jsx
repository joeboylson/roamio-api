import React from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom'; 
import { Button } from 'antd';
import Loading from '../Loading/Loading';

import '../styles/DashBoard.scss';
import { List } from 'antd';

const DashBoard = (props) => {

    const history = useHistory();
    const { Component } = props;
    const [loading, setLoading] = React.useState(false);

    const logOut = () => {
        axios.get('/api/logout');
        history.push('/login');
    }

    const links = [
        { name: 'Interest List', url: '/'}
    ]

    return (
        <div id={'dashboard'}>

            { loading && <Loading/> }

            <div id={"menu"}>

                <div id={'menu-inner'}>

                    <div id={'menu-inner-header'}>
                        <Button key={'1'} type={'danger'} onClick={logOut}>Log Out</Button>
                    </div>

                    <List
                        size="small"
                        bordered
                        dataSource={links}
                        renderItem={(item, index) => {
                            return <List.Item key={index}>
                                <Link to={item.url}>{item.name}</Link>
                            </List.Item>
                        }}
                    />

                </div>

            </div>

            <div id={'component-wrapper'}>
                <Component setLoading={setLoading}/>
            </div>


        </div>
    )

};

export default DashBoard;