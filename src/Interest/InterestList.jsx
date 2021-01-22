import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Loading from '../Loading/Loading';
import { useHistory } from "react-router-dom";

import '../styles/InterestList.scss'

const InterestList = () => {

  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState(null);

  const fetchAllInterests = () => {
    setLoading(true)

    axios.get('/api/interests')
    .then(results => {
      
      if (!results.data || results.data.error === "Forbidden") {
        history.push('/login');
        return;
      }

      if (!results.data.success) {
        alert('Error getting interest data')
        return;
      }

      setDataSource(results.data.data);
      setLoading(false)

    })
  }

  useEffect(() => {
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

  if (loading) return <Loading/>

  return (
    <div id="interest-list">

      <div id={"interest-list-header"}>
        <a 
          id={'download-link'} 
          className={'link-like-button'} 
          href="/api/download/interests" 
          download
        >DOWNLOAD CSV</a>
      </div>

      <div id={'data-table'}>
        <div class={'row'}>
          <b>Email</b>
          <b>Text</b>
          <b>Interest</b>
        </div>
        
        { dataSource && dataSource.map((i, index) => (
          <div class={'row'} key={index}>
            <p>{i.email}</p>
            <p>{i.text}</p>
            <p>{i.interest}</p>
          </div>
        ))}
      </div>

    </div>
  )
}

export default InterestList;