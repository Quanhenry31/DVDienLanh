import { Modal, Input, Form, Row, Col, message } from 'antd';
import axios from 'axios';

const Create = (props) => {
  const { isCreateModalOpen, setIsCreateModalOpen } = props;

  const [form] = Form.useForm();

  const handleCloseCreateModal = () => {
    form.resetFields();
    setIsCreateModalOpen(false);
  };

  const onFinish = (values) => {
    axios.post('http://localhost:5000/users', values);
    handleCloseCreateModal();
    message.success('Thêm thành công!');
  };

  return (
    <Modal
      title="Thêm mới"
      open={isCreateModalOpen}
      onOk={() => form.submit()}
      onCancel={() => handleCloseCreateModal()}
      maskClosable={false}
      okButtonProps={{ style: { backgroundColor: '#3B82F6' } }}
    >
      <Form name="basic" onFinish={onFinish} layout="vertical" form={form}>
        <Row gutter={[15, 15]}>
          <Col span={48} md={24}>
            <Form.Item label="UserName" name="userName" rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={48} md={24}>
            <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Vui lòng nhập orderID!' }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={48} md={24}>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Vui lòng nhập paymentDate!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={48} md={24}>
            <Form.Item label="Phone" name="phone" rules={[{ required: true, message: 'Vui lòng nhập amount!' }]}>
              <Input />
            </Form.Item>
          </Col>{' '}
          <Col span={48} md={24}>
            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: 'Vui lòng nhập paymentMethod!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={48} md={24}>
            <Form.Item label="Role" name="role" rules={[{ required: true, message: 'Vui lòng nhập paymentMethod!' }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default Create;
