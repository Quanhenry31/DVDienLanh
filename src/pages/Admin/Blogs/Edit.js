import { Modal, Input, Image, Form, Row, Col, message, Button, List } from 'antd';
import { useState, useEffect } from 'react';
import axios from 'axios';
// import UploadImage from '../../components/UploadImage/UploadImage';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';

const UpdateProduct = (props) => {
    const { isUpdateModalOpen, setIsUpdateModalOpen, dataUpdate, setDataUpdate } = props;
    const [create, setCreateBtn] = useState(false);

    const [form] = Form.useForm();

    const [isBlogsModalOpen, setIsBlogsModalOpen] = useState(false); // Quản lý mở/đóng modal
    const [blogs, setBlogs] = useState(''); // Dữ liệu Blogs hiện tại
    const [currentSize, setCurrentSize] = useState(null); // Dữ liệu size đang chỉnh sửa

    useEffect(() => {
        if (dataUpdate) {
            form.setFieldsValue({
                name: dataUpdate.name,
                description: dataUpdate.description,
            });
            setBlogs(dataUpdate?.Blogs);
        }
    }, [dataUpdate]);

    const handleCloseUpdateModal = () => {
        form.resetFields();
        setIsUpdateModalOpen(false);
        setDataUpdate(null);
    };

    const onFinish = async (values) => {
        const { name, description } = values;
        const data = {
            id: dataUpdate.id,
            name,
            description,
        };

        try {
            await axios.put(`http://localhost:9000/api/categoriblogs/${dataUpdate.id}`, data);
            handleCloseUpdateModal();
            message.success('Sửa thành công!');
        } catch (error) {
            message.error('Cập nhật sản phẩm thất bại!');
        }
    };

    // Hàm xóa, sửa
    const handleSaveBlogs = async (values) => {
        try {
            if (currentSize?.id) {
                await axios.put(`http://localhost:9000/api/blogs/${currentSize.id}`, values);
                message.success('Cập nhật Sthành công!');
            }
            handleCloseUpdateModal();
            setIsUpdateModalOpen(false);
            setIsBlogsModalOpen(false);
            setCurrentSize(null);
        } catch (error) {
            message.error('Lỗi khi lưu Size!');
        }
    };

    const handleDeleteSize = async (sizeId) => {
        try {
            await axios.delete(`http://localhost:9000/api/sizes/${sizeId}`);
            setBlogs((prev) => prev.filter((size) => size.id !== sizeId)); // Xóa khỏi danh sách
            handleCloseUpdateModal();
            message.success('Xóa Size thành công!');
        } catch (error) {
            message.error('Lỗi khi xóa Size!');
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
                width={700} // Tăng chiều rộng modal
            >
                <Form name="basic" onFinish={onFinish} layout="vertical" form={form}>
                    <Row gutter={[20, 20]}>
                        {/* Cột trái */}
                        <Col span={24}>
                            <Form.Item
                                label="Tên"
                                name="name"
                                rules={[{ required: true, message: 'Vui lòng nhập vào chỗ trống!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Mô tả"
                                name="description"
                                rules={[{ required: true, message: 'Vui lòng nhập vào chỗ trống!' }]}
                            >
                                <Input.TextArea rows={4} />
                            </Form.Item>
                        </Col>

                        {/* Cột phải */}
                        <Col span={12}>
                            <Button onClick={() => setIsBlogsModalOpen(true)} style={{ marginTop: 16 }}>
                                Quản lý Blogs
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Modal>

            {/* Blogs Modal */}
            <Modal
                title="Quản lý Blogs"
                open={isBlogsModalOpen}
                onCancel={() => {
                    setIsBlogsModalOpen(false);
                    setCurrentSize(null); // Xóa trạng thái khi đóng modal
                }}
                footer={null}
                width={1200} // Tăng chiều rộng Modal
            >
                {/* Form chỉnh sửa Blogs */}
                {currentSize && (
                    <Form
                        layout="vertical"
                        initialValues={currentSize} // Gán giá trị ban đầu là blog hiện tại
                        onFinish={handleSaveBlogs} // Gọi hàm lưu dữ liệu
                    >
                        <Row gutter={[20, 20]} style={{ marginTop: '20px' }}>
                            <Col span={12}>
                                <Form.Item
                                    label="Tiêu đề"
                                    name="name"
                                    rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}
                                >
                                    <Input.TextArea row={6} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Tác giả"
                                    name="author"
                                    rules={[{ required: true, message: 'Vui lòng nhập tác giả!' }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Content 1"
                                    name="title1"
                                    rules={[{ required: true, message: 'Vui lòng nhập content 1!' }]}
                                >
                                    <Input.TextArea rows={6} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Content 2"
                                    name="title2"
                                    rules={[{ required: true, message: 'Vui lòng nhập content 2!' }]}
                                >
                                    <Input.TextArea rows={6} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Content 3"
                                    name="title3"
                                    rules={[{ required: true, message: 'Vui lòng nhập content 3!' }]}
                                >
                                    <Input.TextArea rows={6} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Content 4"
                                    name="title4"
                                    rules={[{ required: true, message: 'Vui lòng nhập content 4!' }]}
                                >
                                    <Input.TextArea rows={6} />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    style={{ backgroundColor: '#3B82F6', marginTop: 20 }}
                                >
                                    Lưu
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                )}
                {/* Danh sách Blogs */}
                <List
                    dataSource={blogs}
                    renderItem={(blog) => (
                        <List.Item
                            actions={[
                                <Button
                                    onClick={() => {
                                        setCurrentSize(blog); // Gán blog hiện tại vào form
                                        setIsBlogsModalOpen(true); // Mở modal chỉnh sửa
                                    }}
                                >
                                    Sửa
                                </Button>,
                                <Button danger onClick={() => handleDeleteSize(blog.id)}>
                                    Xóa
                                </Button>,
                            ]}
                        >
                            <List.Item.Meta
                                title={<b style={{ fontSize: '16px', color: '#333' }}>{`Tác giả: ${blog.author}`}</b>}
                                description={
                                    <table
                                        style={{
                                            width: '100%',
                                            borderCollapse: 'collapse',
                                            margin: '10px 0',
                                            fontSize: '14px',
                                            color: '#555',
                                        }}
                                    >
                                        <tbody>
                                            {/* Tiêu đề */}
                                            <tr>
                                                <td
                                                    style={{
                                                        padding: '12px 10px',
                                                        fontWeight: 'bold',
                                                        width: '150px',
                                                        verticalAlign: 'top',
                                                        color: '#333',
                                                    }}
                                                >
                                                    Tiêu đề:
                                                </td>
                                                <td
                                                    style={{
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        padding: '12px 10px',
                                                        maxWidth: '500px', // Giới hạn độ rộng của nội dung
                                                        borderBottom: '1px solid #eaeaea',
                                                        color: '#333',
                                                    }}
                                                >
                                                    {blog.name}
                                                </td>
                                            </tr>

                                            {/* Content 1 */}
                                            <tr>
                                                <td
                                                    style={{
                                                        padding: '12px 10px',
                                                        fontWeight: 'bold',
                                                        verticalAlign: 'top',
                                                        color: '#333',
                                                    }}
                                                >
                                                    Content 1:
                                                </td>
                                                <td
                                                    style={{
                                                        padding: '12px 10px',
                                                        borderBottom: '1px solid #eaeaea',
                                                    }}
                                                >
                                                    {blog.title1}
                                                </td>
                                            </tr>

                                            {/* Content 2 */}
                                            <tr>
                                                <td
                                                    style={{
                                                        padding: '12px 10px',
                                                        fontWeight: 'bold',
                                                        verticalAlign: 'top',
                                                        color: '#333',
                                                    }}
                                                >
                                                    Content 2:
                                                </td>
                                                <td
                                                    style={{
                                                        padding: '12px 10px',
                                                        borderBottom: '1px solid #eaeaea',
                                                    }}
                                                >
                                                    {blog.title2}
                                                </td>
                                            </tr>

                                            {/* Content 3 */}
                                            <tr>
                                                <td
                                                    style={{
                                                        padding: '12px 10px',
                                                        fontWeight: 'bold',
                                                        verticalAlign: 'top',
                                                        color: '#333',
                                                    }}
                                                >
                                                    Content 3:
                                                </td>
                                                <td
                                                    style={{
                                                        padding: '12px 10px',
                                                        borderBottom: '1px solid #eaeaea',
                                                    }}
                                                >
                                                    {blog.title3}
                                                </td>
                                            </tr>

                                            {/* Content 4 */}
                                            <tr>
                                                <td
                                                    style={{
                                                        padding: '12px 10px',
                                                        fontWeight: 'bold',
                                                        verticalAlign: 'top',
                                                        color: '#333',
                                                    }}
                                                >
                                                    Content 4:
                                                </td>
                                                <td
                                                    style={{
                                                        padding: '12px 10px',
                                                        borderBottom: '1px solid #eaeaea',
                                                    }}
                                                >
                                                    {blog.title4}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                }
                            />
                        </List.Item>
                    )}
                />
            </Modal>
        </>
    );
};

export default UpdateProduct;
