import { Modal, Input, Form, Row, Col, message, Button, List, Image } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import UploadImage from '~/components/UploadImage/UploadImage'; // Import component UploadImage

const Create = (props) => {
    const { isCreateModalOpen, setIsCreateModalOpen } = props;

    const [form] = Form.useForm();

    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    console.log(imageUrl);

    const handleOpenImageModal = () => {
        setIsImageModalOpen(true);
    };

    const handleCloseImageModal = (newImageUrl) => {
        if (newImageUrl) {
            setImageUrl(newImageUrl);
        }
        setIsImageModalOpen(false);
    };

    const handleCloseCreateModal = () => {
        form.resetFields();
        setIsCreateModalOpen(false);
    };

    const onFinish = async (values) => {
        try {
            const response = await axios.post('http://localhost:9000/api/servicesOrder', {
                ...values,
                image: imageUrl?.image,
            });
            console.log(response);
            handleCloseCreateModal();
            message.success('Thêm thành công!');
            setImageUrl('');
        } catch (error) {
            console.error('Lỗi khi thêm sản phẩm:', error);
            message.error('Thêm sản phẩm thất bại. Vui lòng thử lại!');
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
                                label="Tên"
                                name="name"
                                rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        {/* Cột 2 */}
                        <Col span={12}>
                            <Form.Item label="Ảnh">
                                <div>
                                    <Button type="link" onClick={handleOpenImageModal}>
                                        Thêm ảnh
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
                    </Row>
                </Form>
            </Modal>

            {/* Image Upload Modal */}
            <Modal
                title="Thêm ảnh"
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

export default Create;
