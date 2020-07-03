import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';

import '../styles/Loading.scss';

const Loading = () => {

    return <div className={'loading'}>
        <div className={'loading-inner'}>
            <p>Loading . . .</p>
            <LoadingOutlined/>
        </div>
    </div>

};

export default Loading;