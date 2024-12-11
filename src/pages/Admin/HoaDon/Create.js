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
    axios.post('http://localhost:5000/orders', values);
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
            <Form.Item label="UserID" name="userID" rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={48} md={24}>
            <Form.Item
              label="OrderDate"
              name="orderDate"
              rules={[{ required: true, message: 'Vui lòng nhập orderID!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={48} md={24}>
            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: 'Vui lòng nhập paymentDate!' }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={48} md={24}>
            <Form.Item label="DateOk" name="dateOk" rules={[{ required: true, message: 'Vui lòng nhập DateOk!' }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={48} md={24}>
            <Form.Item label="Time" name="time" rules={[{ required: true, message: 'Vui lòng nhập Time!' }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={48} md={24}>
            <Form.Item
              label="AllPrice"
              name="allPrice"
              rules={[{ required: true, message: 'Vui lòng nhập AllPrice!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={48} md={24}>
            <Form.Item label="Status" name="status" rules={[{ required: true, message: 'Vui lòng nhập Status!' }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default Create;
