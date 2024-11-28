import { Modal, Input, Form, Row, Col, message, Select } from 'antd';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const { Option } = Select;

const CreateLocation = (props) => {
    const { isCreateModalOpen, setIsCreateModalOpen, fetchProductData } = props;
    const user = useSelector((state) => state.user.user);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    // State để lưu trữ danh sách Tỉnh, Huyện, Xã
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    // Lấy dữ liệu Tỉnh/Thành phố từ JSON
    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const res = await axios.get('http://localhost:9000/api/provinces');
                setProvinces(res.data);
            } catch (error) {
                message.error('Không thể tải danh sách tỉnh/thành phố!');
            }
        };
        fetchProvinces();
    }, []);

    // Khi người dùng chọn Tỉnh/Thành phố, tải danh sách Quận/Huyện
    const handleProvinceChange = (value) => {
        const selectedProvince = provinces.find((prov) => prov.Id === value);
        if (selectedProvince) {
            setDistricts(selectedProvince.Districts);
            setWards([]);
            form.setFieldsValue({ district: undefined, ward: undefined });
        } else {
            setDistricts([]);
            setWards([]);
        }
    };

    // Khi người dùng chọn Quận/Huyện, tải danh sách Phường/Xã
    const handleDistrictChange = (value) => {
        const selectedDistrict = districts.find((dist) => dist.Id === value);
        if (selectedDistrict) {
            setWards(selectedDistrict.Wards);
            form.setFieldsValue({ ward: undefined });
        } else {
            setWards([]);
        }
    };

    const handleCloseCreateModal = () => {
        form.resetFields();
        setIsCreateModalOpen(false);
    };

    const onFinish = async (values) => {
        const addressID = user?.id;
        if (addressID) {
            setLoading(true);

            const selectedProvince = provinces.find((prov) => prov.Id === values.province)?.Name;
            const selectedDistrict = districts.find((dist) => dist.Id === values.district)?.Name;
            const selectedWard = wards.find((ward) => ward.Id === values.ward)?.Name;

            // Định dạng địa chỉ: Tỉnh - Huyện - Xã - Địa chỉ chi tiết
            const formattedAddress = `${selectedProvince} - ${selectedDistrict} - ${selectedWard} - ${values.address}`;
            console.log(formattedAddress);

            const dataToSend = { ...values, address: formattedAddress, addressID };

            try {
                await axios.post('http://localhost:9000/api/address', dataToSend);
                message.success('Thêm địa chỉ thành công!');
                handleCloseCreateModal();
                fetchProductData();
            } catch (error) {
                message.error('Đã có lỗi xảy ra khi thêm địa chỉ!');
            } finally {
                setLoading(false);
            }
        } else {
            window.location.href = 'http://localhost:3000/login';
        }
    };

    return (
        <Modal
            title="Thêm địa chỉ"
            open={isCreateModalOpen}
            onOk={() => form.submit()}
            onCancel={handleCloseCreateModal}
            maskClosable={false}
            confirmLoading={loading}
            okButtonProps={{ style: { backgroundColor: '#3B82F6' } }}
        >
            <Form name="basic" onFinish={onFinish} layout="vertical" form={form}>
                <Row gutter={[15, 15]}>
                    <Col span={24}>
                        <Form.Item label="Tên" name="name" rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}>
                            <Input placeholder="Nhập tên" />
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Form.Item
                            label="Phone"
                            name="phone"
                            rules={[
                                { required: true, message: 'Vui lòng nhập số điện thoại!' },
                                { pattern: /^[0-9]{9,11}$/, message: 'Số điện thoại không hợp lệ!' },
                            ]}
                        >
                            <Input placeholder="Nhập số điện thoại" />
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                { required: true, message: 'Vui lòng nhập email!' },
                                { type: 'email', message: 'Email không hợp lệ!' },
                            ]}
                        >
                            <Input placeholder="Nhập email" />
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Form.Item
                            label="Tỉnh/Thành phố"
                            name="province"
                            rules={[{ required: true, message: 'Vui lòng chọn tỉnh/thành phố!' }]}
                        >
                            <Select placeholder="Chọn tỉnh/thành phố" onChange={handleProvinceChange}>
                                {provinces.map((province) => (
                                    <Option key={province.Id} value={province.Id}>
                                        {province.Name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Form.Item
                            label="Quận/Huyện"
                            name="district"
                            rules={[{ required: true, message: 'Vui lòng chọn quận/huyện!' }]}
                        >
                            <Select
                                placeholder="Chọn quận/huyện"
                                onChange={handleDistrictChange}
                                disabled={!districts.length}
                            >
                                {districts.map((district) => (
                                    <Option key={district.Id} value={district.Id}>
                                        {district.Name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Form.Item
                            label="Phường/Xã"
                            name="ward"
                            rules={[{ required: true, message: 'Vui lòng chọn phường/xã!' }]}
                        >
                            <Select placeholder="Chọn phường/xã" disabled={!wards.length}>
                                {wards.map((ward) => (
                                    <Option key={ward.Id} value={ward.Id}>
                                        {ward.Name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Form.Item
                            label="Địa chỉ chi tiết"
                            name="address"
                            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ chi tiết!' }]}
                        >
                            <Input.TextArea rows={4} placeholder="Nhập địa chỉ chi tiết (Số nhà, thôn/xóm,...)" />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
};

export default CreateLocation;
