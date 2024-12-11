import { Modal, Input, Image, Form, Row, Col, message, Button, List, Select } from 'antd';
import { useState, useEffect } from 'react';
import axios from 'axios';
import UploadImage from '~/components/UploadImage/UploadImage'; // Import component UploadImage
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import CreateSize from '~/components/CreateSize';

const UpdateProduct = (props) => {
    const { isUpdateModalOpen, setIsUpdateModalOpen, dataUpdate, setDataUpdate } = props;
    const [create, setCreateBtn] = useState(false);
    console.log(dataUpdate);
    const { Option } = Select;
    const [form] = Form.useForm();
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [imageUrl, setImageUrl] = useState(dataUpdate?.image || ''); // Lưu URL ảnh

    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [isBrandModalOpen, setIsBrandsModalOpen] = useState(false);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false); // Modal sửa ảnh

    const [isSizeModalOpen, setIsSizeModalOpen] = useState(false); // Quản lý mở/đóng modal
    const [sizes, setSizes] = useState([]); // Dữ liệu Sizes hiện tại
    const [currentSize, setCurrentSize] = useState(null); // Dữ liệu size đang chỉnh sửa
    const [brandName, setBrandName] = useState('');
    const [categoryName, setCategoryName] = useState('');
    useEffect(() => {
        if (dataUpdate) {
            form.setFieldsValue({
                name: dataUpdate.name,
                title: dataUpdate.title,
                price: dataUpdate.price,
                year: dataUpdate.year,
                categoryID: dataUpdate.categoryID,
                brandID: dataUpdate.brandID,
                quantity: dataUpdate.quantity,
            });
            setBrandName(dataUpdate?.Brand?.name);
            setCategoryName(dataUpdate?.Category?.name);
            setImageUrl(dataUpdate?.image); // Cập nhật ảnh khi có dữ liệu
            setSizes(dataUpdate?.Sizes);
        }
    }, [dataUpdate]);

    const handleCloseUpdateModal = () => {
        form.resetFields();
        setIsUpdateModalOpen(false);
        setDataUpdate(null);
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:9000/api/categorys');
            setCategories(response?.data?.data);
        } catch (error) {
            message.error('Lỗi khi tải danh sách danh mục!');
        }
    };

    const fetchBrands = async () => {
        try {
            const response = await axios.get('http://localhost:9000/api/brands');
            setBrands(response?.data?.data);
        } catch (error) {
            message.error('Lỗi khi tải danh sách thương hiệu!');
        }
    };

    const handleOpenCategoryModal = () => {
        fetchCategories();
        setIsCategoryModalOpen(true);
    };

    const handleOpenBrandsModal = () => {
        fetchBrands();
        setIsBrandsModalOpen(true);
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

    const handleSelectCategory = (category) => {
        form.setFieldValue('categoryID', category.id);
        setIsCategoryModalOpen(false);
    };

    const handleSelectBrands = (brands) => {
        form.setFieldValue('brandID', brands.id);
        setIsBrandsModalOpen(false);
    };

    const onFinish = async (values) => {
        const { name, title, price, year, categoryID, brandID, quantity } = values;
        const data = {
            id: dataUpdate.id,
            name,
            title,
            price,
            year,
            categoryID,
            brandID,
            quantity,
        };
        if (imageUrl?.image) {
            const dataImage = {
                name: '',
                image: imageUrl?.image,
                imgDetailID: dataUpdate.id,
            };
            try {
                await axios.post(`http://localhost:9000/api/images`, dataImage);
            } catch (e) {
                console.log(e);
            }
        }
        try {
            await axios.put(`http://localhost:9000/api/products/${dataUpdate.id}`, data);
            handleCloseUpdateModal();
            message.success('Sửa thành công!');
        } catch (error) {
            message.error('Cập nhật sản phẩm thất bại!');
        }
    };

    // Hàm xóa ảnh
    const handleDeleteImage = (imageId) => {
        try {
            // Gửi yêu cầu xóa ảnh từ server (thay đổi URL tùy theo API của bạn)
            axios.delete(`http://localhost:9000/api/images/${imageId}`);

            // Thông báo thành công
            message.success('Ảnh đã được xóa thành công!');
            handleCloseUpdateModal();
            // Gọi lại API để lấy dữ liệu mới và cập nhật lại ImgDetails
        } catch (error) {
            message.error('Xóa ảnh không thành công!');
        }
    };
    // Hàm xóa, sửa sizes
    const handleSaveSize = async (values) => {
        try {
            if (currentSize?.id) {
                // Sửa Size
                await axios.put(`http://localhost:9000/api/sizes/${currentSize.id}`, values);
                message.success('Cập nhật Size thành công!');
            }
            handleCloseUpdateModal();
            setIsUpdateModalOpen(false);
            setIsSizeModalOpen(false);
            setCurrentSize(null);
        } catch (error) {
            message.error('Lỗi khi lưu Size!');
        }
    };

    const handleDeleteSize = async (sizeId) => {
        try {
            await axios.delete(`http://localhost:9000/api/sizes/${sizeId}`);
            setSizes((prev) => prev.filter((size) => size.id !== sizeId)); // Xóa khỏi danh sách
            message.success('Xóa Size thành công!');
        } catch (error) {
            message.error('Lỗi khi xóa Size!');
        }
    };
    const handleUpdateImageName = async (imageDetail, selectedSize) => {
        await axios.put(`http://localhost:9000/api/images/${imageDetail?.id}`, { ...imageDetail, name: selectedSize });
        console.log('Cập nhật tên:', selectedSize, 'cho ảnh:', imageDetail?.id);
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

                            <Form.Item
                                label="Mô tả"
                                name="title"
                                rules={[{ required: true, message: 'Vui lòng nhập vào chỗ trống!' }]}
                            >
                                <Input.TextArea rows={4} />
                            </Form.Item>

                            <Form.Item
                                label="Số lượng"
                                name="quantity"
                                rules={[{ required: true, message: 'Vui lòng nhập vào chỗ trống!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Giá thành"
                                name="price"
                                rules={[{ required: true, message: 'Vui lòng nhập vào chỗ trống!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Năm sản xuất"
                                name="year"
                                rules={[{ required: true, message: 'Vui lòng nhập vào chỗ trống!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>

                        {/* Cột phải */}
                        <Col span={12}>
                            <Form.Item label="Ảnh mới">
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

                            {/* <Form.Item label="Ảnh cũ">
                <List
                  grid={{ gutter: 16, column: 3 }}
                  dataSource={dataUpdate?.ImgDetails || []}
                  renderItem={(imageDetail) => (
                    <List.Item>
                      <div style={{ position: 'relative' }}>
                        <Image width={100} height={100} src={imageDetail?.image} alt="Product Image" />
                        <Button
                          icon={<DeleteOutlined />}
                          size="small"
                          style={{
                            position: 'absolute',   
                            top: 0,
                            right: 70,
                            backgroundColor: 'rgba(255, 255, 255, 0.7)',
                            borderColor: 'rgba(255, 255, 255, 0.7)',
                          }}
                          onClick={() => handleDeleteImage(imageDetail?.id)}
                        />
                      </div>
                    </List.Item>
                  )}
                />
              </Form.Item> */}
                            <Form.Item label="Ảnh cũ">
                                <List
                                    grid={{ gutter: 16, column: 3 }}
                                    dataSource={dataUpdate?.ImgDetails || []}
                                    renderItem={(imageDetail) => (
                                        <List.Item>
                                            <div style={{ position: 'relative' }}>
                                                <Image
                                                    width={100}
                                                    height={100}
                                                    src={imageDetail?.image}
                                                    alt="Product Image"
                                                />
                                                <Button
                                                    icon={<DeleteOutlined />}
                                                    size="small"
                                                    style={{
                                                        position: 'absolute',
                                                        top: 0,
                                                        right: 70,
                                                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                                        borderColor: 'rgba(255, 255, 255, 0.7)',
                                                    }}
                                                    onClick={() => handleDeleteImage(imageDetail?.id)}
                                                />
                                                <Select
                                                    style={{ position: 'absolute', top: 100, right: 0 }}
                                                    defaultValue={imageDetail?.name}
                                                    onChange={(value) => handleUpdateImageName(imageDetail, value)}
                                                >
                                                    {sizes?.map((size) => (
                                                        <Option key={size?.id} value={size?.size}>
                                                            {size?.size}
                                                        </Option>
                                                    ))}
                                                </Select>
                                            </div>
                                        </List.Item>
                                    )}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Danh mục"
                                name="categoryID"
                                rules={[{ required: true, message: 'Vui lòng nhập vào chỗ trống!' }]}
                            >
                                <Input
                                    readOnly
                                    addonAfter={<Button onClick={handleOpenCategoryModal}>Chọn danh mục</Button>}
                                />
                            </Form.Item>

                            <Form.Item
                                label="Thương hiệu"
                                name="brandID"
                                rules={[{ required: true, message: 'Vui lòng nhập vào chỗ trống!' }]}
                            >
                                <Input
                                    readOnly
                                    addonAfter={<Button onClick={handleOpenBrandsModal}>Chọn thương hiệu</Button>}
                                />
                            </Form.Item>
                            <Button onClick={() => setIsSizeModalOpen(true)} style={{ marginTop: 16 }}>
                                Quản lý Sizes
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Modal>

            {/* Category Modal */}
            <Modal
                title="Chọn danh mục"
                open={isCategoryModalOpen}
                onCancel={() => setIsCategoryModalOpen(false)}
                footer={null}
                maskClosable={false}
            >
                <List
                    dataSource={categories}
                    renderItem={(category) => (
                        <List.Item>
                            <Button type="link" onClick={() => handleSelectCategory(category)}>
                                {category.name}
                            </Button>
                        </List.Item>
                    )}
                />
            </Modal>

            {/* Brand Modal */}
            <Modal
                title="Chọn thương hiệu"
                open={isBrandModalOpen}
                onCancel={() => setIsBrandsModalOpen(false)}
                footer={null}
                maskClosable={false}
            >
                <List
                    dataSource={brands}
                    renderItem={(brands) => (
                        <List.Item>
                            <Button type="link" onClick={() => handleSelectBrands(brands)}>
                                {brands.name}
                            </Button>
                        </List.Item>
                    )}
                />
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
            {/* Sizes Modal */}
            <Modal
                title="Quản lý Sizes"
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
                    Thêm Sizes
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
                                title={<b>{`Tên Size: ${size.size}`}</b>}
                                description={
                                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                        <tbody>
                                            <tr>
                                                <td style={{ padding: '5px', fontWeight: 'bold' }}>Kích thước:</td>
                                                <td>{`Width: ${size.width || 'N/A'}, Height: ${
                                                    size.height || 'N/A'
                                                }`}</td>
                                            </tr>
                                            <tr>
                                                <td style={{ padding: '5px', fontWeight: 'bold' }}>Khối lượng:</td>
                                                <td>{size.mass || 'N/A'}</td>
                                            </tr>
                                            <tr>
                                                <td style={{ padding: '5px', fontWeight: 'bold' }}>Số lượng tồn:</td>
                                                <td>{size.InventoryNumber || 0}</td>
                                            </tr>
                                            <tr>
                                                <td style={{ padding: '5px', fontWeight: 'bold' }}>Giá:</td>
                                                <td>
                                                    {size.price ? `${size?.price?.toLocaleString('vi-VN')} VND` : 'N/A'}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{ padding: '5px', fontWeight: 'bold' }}>Trạng thái:</td>
                                                <td>{size.status || 'N/A'}</td>
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
                        initialValues={
                            currentSize || {
                                size: '',
                                width: '',
                                height: '',
                                mass: '',
                                InventoryNumber: '',
                                price: '',
                                status: '',
                            }
                        }
                        onFinish={handleSaveSize}
                    >
                        <Row gutter={[24, 24]}>
                            <Col span={8}>
                                <Form.Item
                                    label="Tên Size"
                                    name="size"
                                    rules={[{ required: true, message: 'Vui lòng nhập tên size!' }]}
                                >
                                    <Input placeholder="Nhập tên size" />
                                </Form.Item>
                            </Col>
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
                        <Row gutter={[24, 24]}>
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
            <CreateSize
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
