import { Modal, Input, Form, Row, Col, message, Button, List, Image } from 'antd';
import axios from 'axios';
import { useState } from 'react';

const Create = (props) => {
  const { isCreateModalOpen, setIsCreateModalOpen } = props;

  const [form] = Form.useForm();

  const [imageUrl, setImageUrl] = useState('');
  console.log(imageUrl);

  const handleCloseCreateModal = () => {
    form.resetFields();
    setIsCreateModalOpen(false);
  };

  const onFinish = async (values) => {
    try {
      const response = await axios.post('http://localhost:9000/api/servicesTimeUsually', values);
      console.log(response);
      handleCloseCreateModal();
      message.success('Thêm thành công!');
      setImageUrl('');
    } catch (error) {
      console.error('Lỗi khi thêm :', error);
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
              <Form.Item label="Tên gói" name="name" rules={[{ required: true, message: 'Vui lòng nhập tên gói!' }]}>
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default Create;
