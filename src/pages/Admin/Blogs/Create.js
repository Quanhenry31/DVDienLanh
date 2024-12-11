import { Modal, Input, Form, Row, Col, message, Button, List, Image } from 'antd';
import axios from 'axios';
import { useState } from 'react';

const Create = (props) => {
  const { isCreateModalOpen, setIsCreateModalOpen } = props;

  const [form] = Form.useForm();

  const handleCloseCreateModal = () => {
    form.resetFields();
    setIsCreateModalOpen(false);
  };

  const valuesBlog =
    useState[
      {
        name: '',
        author: '',
        title1: '',
        title2: '',
        title3: '',
        title4: '',
        image1: '',
        image2: '',
      }
    ];
  // categoryID: '',
  const onFinish = async (values) => {
    try {
      const response = await axios.post('http://localhost:9000/api/categoriBlogs', values);
      const idCategory = response?.data?.id;
      const responseBlogs = await axios.post('http://localhost:9000/api/blogs', {
        ...valuesBlog,
        categoryID: idCategory,
      });

      handleCloseCreateModal();
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
          <Row gutter={16}>
            {/* Cột 1 */}
            <Col span={12}>
              <Form.Item
                label="Thương hiệu"
                name="name"
                rules={[{ required: true, message: 'Vui lòng nhập thương hiệu!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            {/* Cột 2 */}
            <Col span={12}>
              <Form.Item label="Mô tả" name="description" rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}>
                <Input.TextArea rows={4} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default Create;
