import { Modal, Input, Image, Form, Row, Col, message, Button, List } from 'antd';
import { useState, useEffect } from 'react';
import axios from 'axios';
import UploadImage from '~/components/UploadImage/UploadImage'; // Import component UploadImage
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import CreateSeDay from '~/components/CreateSeDay';

const UpdateProduct = (props) => {
    const { isUpdateModalOpen, setIsUpdateModalOpen, dataUpdate, setDataUpdate } = props;

    const [form] = Form.useForm();

    const [imageUrl, setImageUrl] = useState(dataUpdate?.image || ''); // Lưu URL ảnh

    const [isImageModalOpen, setIsImageModalOpen] = useState(false); // Modal sửa ảnh

    useEffect(() => {
        if (dataUpdate) {
            form.setFieldsValue({
                name: dataUpdate.name,
                value: dataUpdate.value,
                valueMin: dataUpdate.valueMin,
                valueMax: dataUpdate.valueMax,
            });
            setImageUrl(dataUpdate?.image); // Cập nhật ảnh khi có dữ liệu
        }
    }, [dataUpdate]);

    const handleCloseUpdateModal = () => {
        form.resetFields();
        setIsUpdateModalOpen(false);
        setDataUpdate(null);
    };

    const handleOpenImageModal = () => {
        setIsImageModalOpen(true); // Mở modal sửa ảnh
    };

    const handleCloseImageModal = (newImageUrl) => {
        if (newImageUrl) {
            setImageUrl(newImageUrl); // Cập nhật URL ảnh sau khi người dùng chọn ảnh mới
            console.log(newImageUrl);
        }
        setIsImageModalOpen(false); // Đóng modal sửa ảnh
    };

    const onFinish = async (values) => {
        const { name, value, valueMin, valueMax } = values;
        const data = {
            id: dataUpdate.id,
            name,
            image: imageUrl?.image,
            value,
            valueMin,
            valueMax,
        };
        try {
            await axios.put(`http://localhost:9000/api/vouchers/${dataUpdate.id}`, data);
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
                width={1300} // Tăng chiều rộng modal
            >
                <Form name="basic" onFinish={onFinish} layout="vertical" form={form}>
                    <Row gutter={[20, 20]}>
                        {/* Cột trái */}
                        <Col span={12}>
                            <Form.Item
                                label="Tên"
                                name="name"
                                rules={[{ required: true, message: 'Vui lòng nhập vào chỗ trống!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Giảm phần trăm"
                                name="value"
                                rules={[{ required: true, message: 'Vui lòng nhập vào chỗ trống!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Đã dùng %"
                                name="valueMin"
                                rules={[{ required: true, message: 'Vui lòng nhập vào chỗ trống!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        {/* Cột phải */}
                        <Col span={12}>
                            <Form.Item label="Ảnh">
                                <div>
                                    <Button type="link" onClick={handleOpenImageModal}>
                                        Thay ảnh
                                    </Button>
                                    <Image
                                        width={100}
                                        height={100}
                                        src={typeof imageUrl === 'string' ? imageUrl : imageUrl?.image || ''}
                                        alt="Product Image"
                                    />
                                </div>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Giảm giá tối đa"
                                name="valueMax"
                                rules={[{ required: true, message: 'Vui lòng nhập vào chỗ trống!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>

            {/* Image Upload Modal */}
            <Modal
                title="Thay ảnh"
                open={isImageModalOpen}
                onCancel={() => setIsImageModalOpen(false)}
                footer={null}
                maskClosable={false}
            >
                <UploadImage url={imageUrl?.image} setUrl={handleCloseImageModal} />
            </Modal>
        </>
    );
};

export default UpdateProduct;
