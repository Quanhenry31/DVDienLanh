import React, { useEffect, useState } from 'react';
import { Modal, Input, Form, Row, Col, message, Button, Card, Progress } from 'antd';
import { toast } from 'react-toastify';
import axios from 'axios';

const Voucher = (props) => {
    const { isVoucherModalOpen, setIsVoucherModalOpen } = props;
    const [form] = Form.useForm();
    const [selectedVoucher, setSelectedVoucher] = useState(null);
    const [dataVoucher, setListVoucher] = useState(null);
    const [activeVoucherId, setActiveVoucherId] = useState(null);

    const handleCloseVoucherModal = () => {
        form.resetFields();
        setSelectedVoucher(null);
        setIsVoucherModalOpen(false);
    };

    const handleSubmit = () => {
        if (selectedVoucher) {
            form.submit();
            toast.success(selectedVoucher);
            localStorage.setItem('selectedVoucher', JSON.stringify(selectedVoucher));
            handleCloseVoucherModal();
        } else {
            message.error('Vui lòng chọn một voucher!');
        }
    };
    useEffect(() => {
        localStorage.removeItem('selectedVoucher');
    }, []);
    const handleVoucherClick = (voucherCode) => {
        form.setFieldsValue({ voucherCode });
        setSelectedVoucher(voucherCode);
        setActiveVoucherId(voucherCode.id);
    };

    useEffect(() => {
        axios.get('http://localhost:9000/api/vouchers').then((response) => {
            setListVoucher(response.data.data);
        });
    }, []);

    return (
        <Modal
            title="Chọn Voucher"
            open={isVoucherModalOpen}
            onOk={handleSubmit}
            onCancel={handleCloseVoucherModal}
            maskClosable={false}
            okButtonProps={{ style: { backgroundColor: '#3B82F6' } }}
        >
            <Form name="voucherForm" layout="vertical" form={form}>
                <Row gutter={[15, 15]}>
                    {dataVoucher?.map((voucher) => (
                        <Col span={12} key={voucher.id}>
                            <Card
                                hoverable
                                style={{
                                    backgroundColor:
                                        activeVoucherId === voucher.id
                                            ? 'linear-gradient(135deg, #6EE7B7, #3B82F6)'
                                            : '#fff', // Gradient color for active card
                                    boxShadow:
                                        activeVoucherId === voucher.id
                                            ? '0 8px 16px rgba(0, 0, 0, 0.3)'
                                            : '0 4px 8px rgba(0, 0, 0, 0.1)', // Shadow effect for active card
                                    transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
                                    borderRadius: '8px', // Rounded corners
                                }}
                                cover={<img alt={`Voucher ${voucher.name}`} src={voucher.img} />}
                                onClick={() => handleVoucherClick(voucher)}
                            >
                                <Card.Meta
                                    title={voucher.name}
                                    description={`Giảm giá ${voucher.value}%, tối đa ${voucher.valueMax}đ`}
                                />
                                <div style={{ width: '100%', marginTop: 10 }}>
                                    <Progress
                                        percent={voucher.valueMin} // Bạn có thể điều chỉnh tỉ lệ này theo dữ liệu thực
                                        size="small"
                                        status="active"
                                        format={(percent) => `Đã dùng ${percent}%`}
                                    />
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Form>
        </Modal>
    );
};

export default Voucher;
