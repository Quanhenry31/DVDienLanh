import React from 'react';
import { Space, Table, Button, Popconfirm, message } from 'antd';
import { EditTwoTone, DeleteTwoTone, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Create from './Create';
import UpdatePayment from './Edit';
import SearchProduct from './Search';
import { useDebounce } from '~/hooks';

const User = () => {
  const [listOfPosts, setListOfPosts] = useState([]);
  const [create, setCreateBtn] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [dataUpdate, setDataUpdate] = useState(null);
  const [isdelete, setIsdelete] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const debounceValue = useDebounce(searchValue, 1000);
  // const handleSearch = () => {
  //   console.log(debounceValue);
  //   axios
  //     .get('http://localhost:5000/users/search?q=' + debounceValue)
  //     .then((response) => setListOfPosts(response.data.data));
  // };

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'userName',
      render: (text) => <a>{text}</a>,
    },

    {
      title: 'Avatar',
      dataIndex: 'image',
      key: 'image',
      render: (images) =>
        images && images.length > 0 ? (
          <img
            src={images} // Hiển thị ảnh đầu tiên
            alt="Product"
            style={{ width: '50px', height: '50px' }}
          />
        ) : (
          'Không có ảnh'
        ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },

    {
      title: 'Phone',
      dataIndex: 'phone',
    },
    {
      title: 'Role',
      dataIndex: 'role',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Type',
      dataIndex: 'type',
    },
    {
      title: 'Action',

      render: (_, record) => (
        <Space size="middle">
          <EyeOutlined />
          <EditTwoTone
            twoToneColor="#f57800"
            style={{ cursor: 'pointer', margin: '0 20px' }}
            onClick={() => {
              setIsUpdateModalOpen(true);
              setDataUpdate(record);
            }}
          />
        </Space>
      ),
    },
  ];

  const renderHeader = () => {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row-reverse' }}>
        <div>
          <SearchProduct value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
        </div>
        <div>
          <Button onClick={() => setCreateBtn(true)} className="bg-blue-500" icon={<PlusOutlined />} type="primary">
            Thêm mới
          </Button>
        </div>
      </div>
    );
  };

  // useEffect(() => {
  //   handleSearch();
  // }, [debounceValue]);

  useEffect(() => {
    const savedSearchValue = localStorage.getItem('userOrderId');
    if (savedSearchValue) {
      setSearchValue(savedSearchValue);
    }
  }, []);

  useEffect(() => {
    axios.get('http://localhost:9000/api/users').then((response) => {
      setListOfPosts(response.data.data);
      setIsdelete(false);
    });
  }, [create, dataUpdate, isdelete]);
  return (
    <>
      <Table title={renderHeader} rowKey={'id'} columns={columns} dataSource={listOfPosts} />
      <Create isCreateModalOpen={create} setIsCreateModalOpen={setCreateBtn} />
      <UpdatePayment
        isUpdateModalOpen={isUpdateModalOpen}
        setIsUpdateModalOpen={setIsUpdateModalOpen}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
      />
    </>
  );
};
export default User;
