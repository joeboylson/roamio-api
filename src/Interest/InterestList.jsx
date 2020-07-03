import React from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { PageHeader, Button, Table, message } from 'antd';

import '../styles/InterestList.scss'
const InterestList = (props) => {

  const { setLoading } = props;
  const history = useHistory();
  const [dataSource, setDataSource] = React.useState(null);


  const logOut = () => {
    axios.get('/api/logout');
    history.push('/login');
  }

  const fetchAllInterests = () => {
    setLoading(true)

    axios.get('/api/interests')
    .then(results => {
      
      if (!results.data || results.data.error === "Forbidden") {
        history.push('/login');
        return;
      }

      if (!results.data.success) {
        // TODO: throw error message here
        message.error('Error getting interest data')
        return;
      }

      setDataSource(results.data.data);
      setLoading(false)

    })
  }

  if (!dataSource) {
      fetchAllInterests()
  }

  const columns = [
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Interest Id',
      dataIndex: 'interest_id',
      key: 'interest_id',
    },
    {
      title: 'Text',
      dataIndex: 'text',
      key: 'text',
    },
    {
      title: 'Interest',
      dataIndex: 'interest',
      key: 'interest',
    },
  ];



  return (
    <div id="interest-list">
      <PageHeader
        title="Interest List"
        extra={[ 
          // <Button key="1" type={'primary'} onClick={downloadCSV}>Download CSV</Button>,
          <a href="/api/download/interests" download>DOWNLOAD CSV</a>,
          <Button key="2" type={'danger'} onClick={logOut}>Log Out</Button>
        ]}
      >

        <Table 
          dataSource={dataSource} 
          columns={columns}
          pagination={false}
          size={'middle'}
        />

      </PageHeader>
    </div>
  )
}

export default InterestList;