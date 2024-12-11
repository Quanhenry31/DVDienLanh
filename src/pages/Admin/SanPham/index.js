import React from 'react';
import { Space, Table, Button, Popconfirm } from 'antd';
import { EditTwoTone, DeleteTwoTone, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Create from './Create';
import UpdateProduct from './Edit';
import SearchProduct from './Search';
import { useDebounce } from '~/hooks';

const SanPham = () => {
  const [listOfPosts, setListOfPosts] = useState([]);
  const [create, setCreateBtn] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [dataUpdate, setDataUpdate] = useState(null);
  const [isdelete, setIsdelete] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const debounceValue = useDebounce(searchValue, 1000);
  // &pageSize=2
  const handleSearch = () => {
    axios
      .get('http://localhost:9000/api/products?sort=ASC&page=1&name=' + debounceValue)
      .then((response) => setListOfPosts(response.data.rows));
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Thương hiệu',
      dataIndex: ['Brand', 'name'], // Truy cập nested object
      key: 'brand',
    },
    {
      title: 'Danh mục',
      dataIndex: ['Category', 'name'], // Truy cập nested object
      key: 'category',
    },

    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Ảnh',
      dataIndex: 'ImgDetails',
      key: 'image',
      render: (images) =>
        images && images.length > 0 ? (
          <img
            src={images[0].image} // Hiển thị ảnh đầu tiên
            alt="Product"
            style={{ width: '70px', height: '70px' }}
          />
        ) : (
          'Không có ảnh'
        ),
    },
    {
      title: 'Hành động',
      key: 'action',
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

  const handleDeleteProduct = async (data) => {
    console.log(data.id);
    if (data.id) {
      try {
        await axios.delete('http://localhost:9000/api/images/deleteDetailID/' + data.id);
        axios.delete('http://localhost:9000/api/products/' + data.id);
        setIsdelete(true);
      } catch (error) {
        console.log(error);
      }
    }
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

  useEffect(() => {
    axios.get('http://localhost:9000/api/products/all').then((response) => {
      setListOfPosts(response.data.data);
      setIsdelete(false);
    });
  }, [create, dataUpdate, isdelete]);

  return (
    <>
      <Table title={renderHeader} rowKey={'id'} columns={columns} dataSource={listOfPosts} />
      <Create isCreateModalOpen={create} setIsCreateModalOpen={setCreateBtn} />
      <UpdateProduct
        isUpdateModalOpen={isUpdateModalOpen}
        setIsUpdateModalOpen={setIsUpdateModalOpen}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
      />
    </>
  );
};

export default SanPham;
