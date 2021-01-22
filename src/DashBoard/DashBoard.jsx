import React from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom'; 
import Loading from '../Loading/Loading';

import '../styles/DashBoard.scss';

const DashBoard = ({children}) => {

    const history = useHistory();

    const logOut = () => {
        axios.get('/api/logout');
        history.push('/login');
    }

    const links = [
        { name: 'Interest List', url: '/'}
    ]

    return (
        <div id={'dashboard'}>

            {/* menu */}
            <div id={"dashboard-header"}>
                <nav id={'nav'}>
                    { links.map(link => <Link key={link} to={link.url}>{link.name}</Link> )}
                </nav>

                <button  type={'danger'} onClick={logOut}>Log Out</button>
            </div>

            { children }
        </div>
    )

};

export default DashBoard;