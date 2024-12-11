import { Modal, Input, Form, Row, Col, message, Button, List, Image } from 'antd';
import axios from 'axios';
import { useState } from 'react';

const Create = (props) => {
  const { isCreateModalOpen, setIsCreateModalOpen, setIsValueSize, setClose, setIsSizeModalOpen } = props;

  const [form] = Form.useForm();

  const handleCloseCreateModal = () => {
    form.resetFields();
    setIsCreateModalOpen(false);
  };

  const onFinish = async (values) => {
    try {
      const response = await axios.post('http://localhost:9000/api/serviceCategoriesUsually', {
        ...values,
        categoryID: setIsValueSize,
      });
      console.log(response);
      handleCloseCreateModal();
      setClose(false);
      setIsSizeModalOpen(false);
      message.success('Thêm thành công!');
    } catch (error) {
      console.error('Lỗi khi thêm:', error);
      message.error('Thêm thất bại. Vui lòng thử lại!');
    }
  };

  return (
    <>
      <Modal
        title="Thêm mới"
        open={isCreateModalOpen}
        onOk={() => form.submit()}
        onCancel={handleCloseCreateModal}
        maskClosable={true}
        okButtonProps={{ style: { backgroundColor: '#3B82F6' } }}
        width={800} // Tăng chiều rộng để bố cục ngang thoáng hơn
      >
        <Form name="basic" onFinish={onFinish} layout="vertical" form={form}>
          <Row gutter={[24, 24]}>
            <Col span={8}>
              <Form.Item label="Loại" name="capacity" rules={[{ required: true, message: 'Vui lòng nhập loại!' }]}>
                <Input placeholder="Nhập loại" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}>
                <Input placeholder="Nhập tên" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Giá" name="price" rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}>
                <Input type="number" placeholder="Nhập giá" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[24, 24]}>
            <Col span={24}>
              <Form.Item
                label="Information"
                name="cleanType"
                rules={[{ required: true, message: 'Vui lòng nhập Information!' }]}
              >
                <Input placeholder="Nhập Information" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[24, 24]}>
            <Col span={24}>
              <Form.Item label="Mô tả" name="title" rules={[{ required: true, message: 'Vui lòng nhập Mô tả!' }]}>
                <Input.TextArea placeholder="Nhập Mô tả" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default Create;
