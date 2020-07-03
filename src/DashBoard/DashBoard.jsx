import React from 'react';
import { Link } from 'react-router-dom'; 
import Loading from '../Loading/Loading';

import '../styles/DashBoard.scss';
import { List } from 'antd';


const DashBoard = (props) => {

    const { Component } = props;
    const [loading, setLoading] = React.useState(false);

    const links = [
        { name: 'Interest List', url: '/'}
    ]

    return (
        <div id={'dashboard'}>

            { loading && <Loading/> }

            <div id={"menu"}>

                <div id={'menu-inner'}>

                    <div id={'menu-inner-header'}></div>

                    <List
                        size="small"
                        bordered
                        dataSource={links}
                        renderItem={item => {
                            return <List.Item>
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