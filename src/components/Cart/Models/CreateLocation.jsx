import { Modal, Input, Form, Row, Col, message } from 'antd';
import axios from 'axios';

const CreateLocation = (props) => {
    const { isCreateModalOpen, setIsCreateModalOpen, fetchProductData } = props;

    const [form] = Form.useForm();

    const handleCloseCreateModal = () => {
        form.resetFields();
        setIsCreateModalOpen(false); // Sửa thành false để đóng modal
    };

    const onFinish = (values) => {
        const addressID = 2; // id của user
        const dataToSend = { ...values, addressID };
        axios.post('http://localhost:9000/api/address', dataToSend);
        handleCloseCreateModal();
        fetchProductData();
        message.success('Thêm thành công!');
    };

    return (
        <Modal
            title="Thêm địa chỉ"
            open={isCreateModalOpen}
            onOk={() => form.submit()}
            onCancel={handleCloseCreateModal}
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
                        <Form.Item
                            label="Phone"
                            name="phone"
                            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={48} md={24}>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={48} md={24}>
                        <Form.Item
                            label="Địa chỉ"
                            name="address"
                            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
};

export default CreateLocation;
