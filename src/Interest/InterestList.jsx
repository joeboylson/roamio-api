import React from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { PageHeader, Table, message } from 'antd';

import '../styles/InterestList.scss'
const InterestList = (props) => {

  const { setLoading } = props;
  const history = useHistory();
  const [dataSource, setDataSource] = React.useState(null);

  const fetchAllInterests = () => {
    setLoading(true)

    axios.get('/api/interests')
    .then(results => {
      
      if (!results.data || results.data.error === "Forbidden") {
        history.push('/login');
        return;
      }

      if (!results.data.success) {
        message.error('Error getting interest data')
        return;
      }

      setDataSource(results.data.data);
      setLoading(false)

    })
  }

  React.useEffect(() => {
    if (!dataSource) {
        fetchAllInterests()
    }
  }, [])

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
          <a key={'0'} href="/api/download/interests" download>DOWNLOAD CSV</a>,
        ]}
      >

        <Table 
          dataSource={dataSource} 
          columns={columns}
          rowKey={record => record.id}
          pagination={false}
          size={'middle'}
        />

      </PageHeader>
    </div>
  )
}

export default InterestList;