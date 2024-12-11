import { Modal, Input, Image, Form, Row, Col, message, Button, List } from 'antd';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import CreateSeUsuaCate from '~/components/CreateSeUsuaCate';

const UpdateProduct = (props) => {
  const { isUpdateModalOpen, setIsUpdateModalOpen, dataUpdate, setDataUpdate } = props;
  const [create, setCreateBtn] = useState(false);
  console.log(dataUpdate);

  const [form] = Form.useForm();

  const [imageUrl, setImageUrl] = useState(dataUpdate?.image || ''); // Lưu URL ảnh

  const [sizes, setSizes] = useState(''); // Dữ liệu Sizes hiện tại
  console.log(sizes);

  useEffect(() => {
    if (dataUpdate) {
      form.setFieldsValue({
        name: dataUpdate.name,
      });
      setImageUrl(dataUpdate?.image); // Cập nhật ảnh khi có dữ liệu
      setSizes(dataUpdate?.ServiceCategoriesUsuallys);
    }
  }, [dataUpdate]);

  const handleCloseUpdateModal = () => {
    form.resetFields();
    setIsUpdateModalOpen(false);
    setDataUpdate(null);
  };

  const onFinish = async (values) => {
    const { name } = values;
    const data = {
      id: dataUpdate.id,
      name,
      image: imageUrl?.image,
    };
    try {
      await axios.put(`http://localhost:9000/api/servicesTimeUsually/${dataUpdate.id}`, data);
      handleCloseUpdateModal();
      message.success('Sửa thành công!');
    } catch (error) {
      message.error('Cập nhật sản phẩm thất bại!');
    }
  };

  return (
    <>
      {/* Update Product Modal */}
      <Modal
        title="Cập nhật"
        open={isUpdateModalOpen}
        onOk={() => form.submit()}
        onCancel={handleCloseUpdateModal}
        maskClosable={true}
        okButtonProps={{ style: { backgroundColor: '#3B82F6' } }}
        width={500} // Tăng chiều rộng modal
      >
        <Form name="basic" onFinish={onFinish} layout="vertical" form={form}>
          <Row gutter={[20, 20]}>
            {/* Cột trái */}
            <Col span={20}>
              <Form.Item label="Tên" name="name" rules={[{ required: true, message: 'Vui lòng nhập vào chỗ trống!' }]}>
                <Input />
              </Form.Item>
            </Col>
            {/* Cột phải */}
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateProduct;
