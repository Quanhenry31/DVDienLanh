import { Modal, Input, Image, Form, Row, Col, message, Button, List } from 'antd';
import { useState, useEffect } from 'react';
import axios from 'axios';
import UploadImage from '~/components/UploadImage/UploadImage'; // Import component UploadImage
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import CreateSeUsuaCate from '~/components/CreateSeUsuaCate';

const UpdateProduct = (props) => {
    const { isUpdateModalOpen, setIsUpdateModalOpen, dataUpdate, setDataUpdate } = props;
    const [create, setCreateBtn] = useState(false);
    console.log(dataUpdate);

    const [form] = Form.useForm();

    const [imageUrl, setImageUrl] = useState(dataUpdate?.image || ''); // Lưu URL ảnh

    const [isImageModalOpen, setIsImageModalOpen] = useState(false); // Modal sửa ảnh

    const [isSizeModalOpen, setIsSizeModalOpen] = useState(false); // Quản lý mở/đóng modal
    const [sizes, setSizes] = useState(''); // Dữ liệu Sizes hiện tại
    const [currentSize, setCurrentSize] = useState(null); // Dữ liệu size đang chỉnh sửa
    console.log(sizes);

    useEffect(() => {
        if (dataUpdate) {
            form.setFieldsValue({
                name: dataUpdate.name,
            });
            setImageUrl(dataUpdate?.image); // Cập nhật ảnh khi có dữ liệu
            setSizes(dataUpdate?.ServiceCategoriesUsuallys);
        }
    }, [dataUpdate]);

    const handleCloseUpdateModal = () => {
        form.resetFields();
        setIsUpdateModalOpen(false);
        setDataUpdate(null);
        setIsSizeModalOpen(false);
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
        const { name } = values;
        const data = {
            id: dataUpdate.id,
            name,
            image: imageUrl?.image,
        };
        try {
            await axios.put(`http://localhost:9000/api/servicesUsually/${dataUpdate.id}`, data);
            handleCloseUpdateModal();
            message.success('Sửa thành công!');
        } catch (error) {
            message.error('Cập nhật sản phẩm thất bại!');
        }
    };

    // Hàm xóa, sửa sizes
    const handleSaveSize = async (values) => {
        try {
            if (currentSize?.id) {
                // Sửa Size
                await axios.put(`http://localhost:9000/api/serviceCategoriesUsually/${currentSize.id}`, values);
                message.success('Cập nhật  thành công!');
            }
            handleCloseUpdateModal();
            setIsUpdateModalOpen(false);
            setIsSizeModalOpen(false);
            setCurrentSize(null);
        } catch (error) {
            message.error('Lỗi khi lưu !');
        }
    };

    const handleDeleteSize = async (sizeId) => {
        try {
            await axios.delete(`http://localhost:9000/api/serviceCategoriesUsually/${sizeId}`);
            setSizes((prev) => prev.filter((size) => size.id !== sizeId)); // Xóa khỏi danh sách
            handleCloseUpdateModal();
            message.success('Xóa  thành công!');
        } catch (error) {
            message.error('Lỗi khi xóa !');
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

                            <Button onClick={() => setIsSizeModalOpen(true)} style={{ marginTop: 16 }}>
                                Quản lý dịch vụ
                            </Button>
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
            {/* Dịch vụ Modal */}
            <Modal
                title="Quản lý Dịch vụ"
                open={isSizeModalOpen}
                onCancel={() => {
                    setIsSizeModalOpen(false);
                    setCurrentSize(null);
                }}
                footer={null}
                width={900} // Tăng chiều rộng Modal
            >
                <Button
                    onClick={() => setCreateBtn(true)}
                    className="bg-blue-500"
                    icon={<PlusOutlined />}
                    type="primary"
                >
                    Thêm Dịch vụ
                </Button>
                <List
                    dataSource={sizes}
                    renderItem={(size) => (
                        <List.Item
                            actions={[
                                <Button onClick={() => setCurrentSize(size)}>Sửa</Button>,
                                <Button danger onClick={() => handleDeleteSize(size.id)}>
                                    Xóa
                                </Button>,
                            ]}
                        >
                            <List.Item.Meta
                                title={<b>{`Loại: ${size.capacity}`}</b>}
                                description={
                                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                        <tbody>
                                            <tr>
                                                <td style={{ padding: '5px', fontWeight: 'bold' }}>Name:</td>
                                                <td>{`${size.name}`}</td>
                                            </tr>
                                            <tr>
                                                <td style={{ padding: '5px', fontWeight: 'bold' }}>Mô tả:</td>
                                                <td>{size.title || 'N/A'}</td>
                                            </tr>

                                            <tr>
                                                <td style={{ padding: '5px', fontWeight: 'bold' }}>Giá:</td>
                                                {size?.price && !isNaN(size?.price)
                                                    ? `${Number(size.price).toLocaleString('vi-VN')} vnđ`
                                                    : 'N/A'}
                                            </tr>
                                            <tr>
                                                <td style={{ padding: '5px', fontWeight: 'bold' }}>Type:</td>
                                                <td>{size.cleanType || 'N/A'}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                }
                            />
                        </List.Item>
                    )}
                />

                {currentSize !== null && (
                    <Form
                        layout="vertical"
                        initialValues={currentSize || { capacity: '', name: '', price: '', cleanType: '' }}
                        onFinish={handleSaveSize}
                    >
                        <Row gutter={[24, 24]}>
                            <Col span={8}>
                                <Form.Item
                                    label="Loại"
                                    name="capacity"
                                    rules={[{ required: true, message: 'Vui lòng nhập loại!' }]}
                                >
                                    <Input placeholder="Nhập loại" />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    label="Name"
                                    name="name"
                                    rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
                                >
                                    <Input placeholder="Nhập tên" />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    label="Giá"
                                    name="price"
                                    rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}
                                >
                                    <Input type="number" placeholder="Nhập giá" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={[24, 24]}>
                            <Col span={12}>
                                <Form.Item
                                    label="Information"
                                    name="cleanType"
                                    rules={[{ required: true, message: 'Vui lòng nhập Information!' }]}
                                >
                                    <Input placeholder="Nhập Information" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Mô tả"
                                    name="title"
                                    rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
                                >
                                    <Input placeholder="Nhập mô tả" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={10}>
                                <Button
                                    block
                                    type="primary"
                                    style={{}}
                                    onClick={() => {
                                        setCurrentSize(null); // Reset dữ liệu
                                    }}
                                >
                                    Reset
                                </Button>
                            </Col>
                            <Col span={10}>
                                <Button type="primary" htmlType="submit" style={{ marginLeft: 145 }} block>
                                    {currentSize?.id ? 'Cập nhật' : 'Thêm mới'}
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                )}
            </Modal>
            <CreateSeUsuaCate
                isCreateModalOpen={create}
                setIsCreateModalOpen={setCreateBtn}
                setIsValueSize={dataUpdate?.id}
                setClose={setIsUpdateModalOpen}
                setIsSizeModalOpen={setIsSizeModalOpen}
            />
        </>
    );
};

export default UpdateProduct;
