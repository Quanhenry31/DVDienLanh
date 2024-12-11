import React from 'react';
import { Space, Table, Button, Popconfirm } from 'antd';
import { EditTwoTone, DeleteTwoTone, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Create from './Create';
import UpdatePayment from './Edit';
import SearchProduct from './Search';
import { useDebounce } from '~/hooks';
import { useNavigate } from 'react-router-dom';
import config from '~/config';

const Payment = () => {
  const navigate = useNavigate();

  const [listOfPosts, setListOfPosts] = useState([]);
  const [create, setCreateBtn] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [dataUpdate, setDataUpdate] = useState(null);
  const [isdelete, setIsdelete] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const debounceValue = useDebounce(searchValue, 1000);
  const handleSearch = () => {
    console.log(debounceValue);
    axios
      .get('http://localhost:5000/payments/search?q=' + debounceValue)
      .then((response) => setListOfPosts(response.data.data));
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',

      render: (text) => <a>{text}</a>,
    },
    {
      title: 'OrderID',
      dataIndex: 'orderID',
    },
    {
      title: 'PaymentDate',
      dataIndex: 'paymentDate',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
    },
    {
      title: 'PaymentMethod',
      dataIndex: 'paymentMethod',
    },
    {
      title: 'Action',

      render: (_, record) => (
        <Space size="middle">
          <EyeOutlined onClick={() => handleEyePayment(record)} />
          <EditTwoTone
            twoToneColor="#f57800"
            style={{ cursor: 'pointer', margin: '0 20px' }}
            onClick={() => {
              setIsUpdateModalOpen(true);
              setDataUpdate(record);
            }}
          />
          <Popconfirm
            placement="leftTop"
            title={'Xác nhận xóa ?'}
            description={'Bạn có chắc chắn muốn xóa mục này ?'}
            onConfirm={() => handleDeleteProduct(record)}
            okText="Xác nhận"
            okButtonProps={{ style: { backgroundColor: '#3B82F6' } }}
            cancelText="Hủy"
          >
            <span style={{ cursor: 'pointer' }}>
              <DeleteTwoTone twoToneColor="#ff4d4f" />
            </span>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleDeleteProduct = (data) => {
    axios.delete('http://localhost:5000/payments/' + data.id);
    setIsdelete(true);
  };

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

  useEffect(() => {
    handleSearch();
  }, [debounceValue]);

  const handleEyePayment = (data) => {
    localStorage.setItem('eyeOrderDetailId', data.orderID);
    navigate(config.routes.hoaDon);
    console.log(data);
  };

  useEffect(() => {
    axios.get('http://localhost:5000/payments').then((response) => {
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
export default Payment;
