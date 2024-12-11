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
    axios.post('http://localhost:5000/payments', values);
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
            <Form.Item label="Tên" name="name" rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={48} md={24}>
            <Form.Item label="OrderID" name="orderID" rules={[{ required: true, message: 'Vui lòng nhập orderID!' }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={48} md={24}>
            <Form.Item
              label="PaymentDate"
              name="paymentDate"
              rules={[{ required: true, message: 'Vui lòng nhập paymentDate!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={48} md={24}>
            <Form.Item label="Amount" name="amount" rules={[{ required: true, message: 'Vui lòng nhập amount!' }]}>
              <Input />
            </Form.Item>
          </Col>{' '}
          <Col span={48} md={24}>
            <Form.Item
              label="PaymentMethod"
              name="paymentMethod"
              rules={[{ required: true, message: 'Vui lòng nhập paymentMethod!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default Create;
