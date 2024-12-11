import React from 'react';
import dayjs from 'dayjs';
import { Space, Table, Button, Popconfirm } from 'antd';
import {
  EditTwoTone,
  DeleteTwoTone,
  EyeOutlined,
  PlusOutlined,
  UserOutlined,
  ExportOutlined,
  WalletOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Create from './Create';
import UpdatePayment from './Edit';
import User from './User';
import OrderDetail from './OrderDetail';
import PaymentDetail from './PaymentDetail';
import InvoiceDetail from '../Invoice/Invoice';
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
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [dataUser, setDataUser] = useState(null);
  const [isOrderDetailModalOpen, setIsOrderDetailModalOpen] = useState(false);
  const [dataOrderDetail, setDataOrderDetail] = useState(null);
  const [isPaymentDetailModalOpen, setIsPaymentDetailModalOpen] = useState(false);
  const [dataPaymentDetail, setDataPaymentDetail] = useState(null);
  const [isInvoiceDetailModalOpen, setIsInvoiceDetailModalOpen] = useState(false);
  const [dataInvoiceDetail, setDataInvoiceDetail] = useState(null);
  const [isdelete, setIsdelete] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const debounceValue = useDebounce(searchValue, 1000);

  // const handleSearch = () => {
  //   console.log(debounceValue);
  //   axios
  //     .get('http://localhost:5000/orders/search?q=' + debounceValue)
  //     .then((response) => setListOfPosts(response.data.data));
  // };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'User',
      dataIndex: ['User', 'userName'], // Truy cập nested object
      key: 'user',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Payment',
      dataIndex: 'Payments',
      key: 'name',
      render: (payments) => payments.map((payment, index) => <div key={index}>{payment.name}</div>),
    },
    {
      title: 'Address',
      dataIndex: 'Payments',
      key: 'name',
      render: (payments) => payments.map((payment, index) => <div key={index}>{payment.addresses}</div>),
    },
    {
      title: 'Price',
      dataIndex: 'total_price',
      render: (text) => text.toLocaleString('vi-VN'),
    },
    {
      title: 'Time',
      dataIndex: 'order_date',
      render: (order_date) => dayjs(order_date).format('DD/MM/YYYY HH:mm:ss'), // Định dạng lại ngày
    },
    {
      title: 'Product',
      dataIndex: 'OrderDetails',
      key: 'name',
      render: (OrderDetails) =>
        OrderDetails.map((OrderDetails, index) => <div key={index}>{OrderDetails.Product.name}</div>),
    },
    {
      title: 'Xác nhận',
      dataIndex: 'status',
    },
    {
      title: 'Thanh toán',
      dataIndex: 'Payments',
      key: 'status',
      render: (Payments) => Payments?.map((payment, index) => <div key={index}>{payment.status}</div>),
    },

    {
      title: 'Action',

      render: (_, record) => (
        <Space size="middle">
          <EyeOutlined
            twoToneColor="#f57800"
            style={{ cursor: 'pointer', margin: '0 0px' }}
            onClick={() => {
              setIsOrderDetailModalOpen(true);
              setDataOrderDetail(record);
            }}
          />

          <UserOutlined
            twoToneColor="#f57800"
            style={{ cursor: 'pointer', margin: '0 0px' }}
            onClick={() => {
              setIsUserModalOpen(true);
              setDataUser(record);
            }}
          />

          <EditTwoTone
            twoToneColor="#f57800"
            style={{ cursor: 'pointer', margin: '0 0px' }}
            onClick={() => {
              setIsUpdateModalOpen(true);
              setDataUpdate(record);
            }}
          />
          <WalletOutlined
            twoToneColor="#f57800"
            style={{ cursor: 'pointer', margin: '0 0px' }}
            onClick={() => {
              setIsPaymentDetailModalOpen(true);
              setDataPaymentDetail(record);
            }}
          />
          <ExportOutlined
            twoToneColor="#f57800"
            style={{ cursor: 'pointer', margin: '0 0px' }}
            onClick={() => {
              setIsInvoiceDetailModalOpen(true);
              setDataInvoiceDetail(record);
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
        {/* <div>
          <Button onClick={() => setCreateBtn(true)} className="bg-blue-500" icon={<PlusOutlined />} type="primary">
            Thêm mới
          </Button>
        </div> */}
      </div>
    );
  };

  useEffect(() => {
    const savedSearchValue = localStorage.getItem('eyeOrderDetailId');
    if (savedSearchValue) {
      setSearchValue(savedSearchValue);
    }
  }, []);

  // useEffect(() => {
  //   handleSearch();
  // }, [debounceValue]);

  useEffect(() => {
    axios.get('http://localhost:9000/api/orders/findAllOrder').then((response) => {
      setListOfPosts(response.data.data);
      console.log(response.data.data);

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
      <User
        isUserModalOpen={isUserModalOpen}
        setIsUserModalOpen={setIsUserModalOpen}
        dataUser={dataUser}
        setDataUser={setDataUser}
      />
      <OrderDetail
        isOrderDetailModalOpen={isOrderDetailModalOpen}
        setIsOrderDetailModalOpen={setIsOrderDetailModalOpen}
        dataOrderDetail={dataOrderDetail}
        setDataOrderDetail={setDataOrderDetail}
      />

      <PaymentDetail
        isPaymentDetailModalOpen={isPaymentDetailModalOpen}
        setIsPaymentDetailModalOpen={setIsPaymentDetailModalOpen}
        dataPaymentDetail={dataPaymentDetail}
        setDataPaymentDetail={setDataPaymentDetail}
      />
      <InvoiceDetail
        isInvoiceDetailModalOpen={isInvoiceDetailModalOpen}
        setIsInvoiceDetailModalOpen={setIsInvoiceDetailModalOpen}
        dataInvoiceDetail={dataInvoiceDetail}
        setDataInvoiceDetail={setDataInvoiceDetail}
      />
    </>
  );
};
export default Payment;
