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
      const response = await axios.post('http://localhost:9000/api/sizes', { ...values, sizeID: setIsValueSize });
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
          <Row gutter={16}>
            {/* Cột 1 */}
            <Col span={8}>
              <Form.Item label="Tên Size" name="size" rules={[{ required: true, message: 'Vui lòng nhập tên size!' }]}>
                <Input placeholder="Nhập tên size" />
              </Form.Item>
            </Col>
            {/* Cột 2 */}
            <Col span={8}>
              <Form.Item
                label="Chiều rộng (Width)"
                name="width"
                rules={[{ required: true, message: 'Vui lòng nhập chiều rộng!' }]}
              >
                <Input type="number" placeholder="Nhập chiều rộng" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Chiều cao (Height)"
                name="height"
                rules={[{ required: true, message: 'Vui lòng nhập chiều cao!' }]}
              >
                <Input type="number" placeholder="Nhập chiều cao" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            {/* Các trường hàng ngang */}
            <Col span={8}>
              <Form.Item
                label="Khối lượng (Mass)"
                name="mass"
                rules={[{ required: true, message: 'Vui lòng nhập khối lượng!' }]}
              >
                <Input type="number" placeholder="Nhập khối lượng" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Số lượng tồn (Inventory)"
                name="InventoryNumber"
                rules={[{ required: true, message: 'Vui lòng nhập số lượng!' }]}
              >
                <Input type="number" placeholder="Nhập số lượng tồn" />
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
                label="Trạng thái"
                name="status"
                rules={[{ required: true, message: 'Vui lòng nhập trạng thái!' }]}
              >
                <Input placeholder="Nhập trạng thái (VD: Còn hàng, Hết hàng)" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default Create;
