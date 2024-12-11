import './Invoice.scss';
import React, { useEffect, useState } from 'react';
import { Form, Image, List, Modal, Col } from 'antd';
import dayjs from 'dayjs';
function Invoice({ isInvoiceDetailModalOpen, setIsInvoiceDetailModalOpen, dataInvoiceDetail, setDataInvoiceDetail }) {
  const [form] = Form.useForm();

  // State lưu thông tin hóa đơn và sản phẩm
  const [invoiceData, setInvoiceData] = useState({});
  const [orderDetails, setOrderDetails] = useState([]);
  console.log(dataInvoiceDetail);

  // Cập nhật dữ liệu khi dataInvoiceDetail thay đổi
  useEffect(() => {
    if (dataInvoiceDetail) {
      const payment = dataInvoiceDetail.Payments?.[0] || {};
      const details = dataInvoiceDetail.OrderDetails || [];
      setInvoiceData({
        nameUser: payment.nameUser || 'N/A',
        addresses: payment.addresses || 'N/A',
        email: payment.email || 'N/A',
        phone: payment.phone || 'N/A',
        paymentMethod: payment.paymentMethod || 'N/A',
        paymentDate: payment.paymentDate || 'N/A',
        status: payment.status || 'N/A',
        amount: payment.amount || 0,
        id: payment.id || 'N/A',
      });
      setOrderDetails(
        details.map((detail) => ({
          name: detail.Product?.name || 'N/A',
          imgDetails: detail.Product?.ImgDetails || [],
          unitPrice: detail.unitPrice || 0,
          quantity: detail.quantity || 0,
          allMoney: detail.allMoney,
          category: detail.Product?.Category?.name,
          brand: detail.Product?.Brand?.name,
        })),
      );
    }
  }, [dataInvoiceDetail]);

  const handlePrint = () => window.print();
  const handleClose = () => {
    form.resetFields();
    setIsInvoiceDetailModalOpen(false);
    setDataInvoiceDetail(null);
  };

  return (
    <Modal
      title="Thông tin hóa đơn"
      open={isInvoiceDetailModalOpen}
      onCancel={handleClose}
      maskClosable={true}
      okButtonProps={{ style: { backgroundColor: '#3B82F6' } }}
      footer={null}
      width={1300}
    >
      <Form form={form} layout="vertical">
        <div className="invoice-wrapper" id="print-area">
          <div className="invoice">
            <div className="invoice-container">
              {/* Header */}
              <div className="invoice-head">
                <div className="invoice-head-top">
                  <div className="invoice-head-top-left text-start">
                    <img
                      src="https://beedesign.com.vn/wp-content/uploads/2020/08/thiet-ke-logo-chu-q-ocean-1.jpg"
                      alt="Logo"
                      width={100}
                    />
                  </div>
                  <div className="invoice-head-top-right text-end">
                    <h3>Invoice</h3>
                  </div>
                </div>
                <div className="hr" />
                <div className="invoice-head-middle">
                  <div className="invoice-head-middle-left text-start">
                    <p>
                      <span className="text-bold">Date:</span>{' '}
                      {dayjs(invoiceData.paymentDate).format('DD/MM/YYYY HH:mm:ss')}
                    </p>
                  </div>
                  <div className="invoice-head-middle-right text-end">
                    <p>
                      <span className="text-bold">Invoice No:</span> {invoiceData.id}
                    </p>
                  </div>
                </div>
                <div className="hr" />
                <div className="invoice-head-bottom">
                  <div className="invoice-head-bottom-left">
                    <ul>
                      <li className="text-bold">Invoiced To:</li>
                      <li>
                        {' '}
                        <span style={{ fontWeight: 'bold', color: 'red' }}>Name: </span> {invoiceData.nameUser}
                      </li>
                      <li>
                        <span style={{ fontWeight: 'bold', color: 'red' }}>Address: </span> {invoiceData.addresses}
                      </li>
                      <li>
                        <span style={{ fontWeight: 'bold', color: 'red' }}>Hot: </span> {invoiceData.email} -{' '}
                        {invoiceData.phone}
                      </li>
                      <li>
                        {' '}
                        <span style={{ fontWeight: 'bold', color: 'red' }}>Method: </span> {invoiceData.paymentMethod}
                      </li>
                    </ul>
                  </div>
                  <div className="invoice-head-bottom-right text-end">
                    <ul>
                      <li className="text-bold">Pay To:</li>
                      <li>SUPO</li>
                      <li>TOKYO</li>
                      <li>189 - SENTAI</li>
                      <li>supo2839@gmail.com</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="overflow-view">
                <div className="invoice-body">
                  <table>
                    <thead>
                      <tr>
                        <td className="text-bold">Name</td>
                        <td className="text-bold">Image</td>
                        <td className="text-bold">Category</td>
                        <td className="text-bold">Brands</td>
                        <td className="text-bold">Price</td>
                        <td className="text-bold">Quantity</td>
                        <td className="text-bold">Total</td>
                      </tr>
                    </thead>
                    <tbody>
                      {orderDetails.map((detail, index) => (
                        <tr key={index}>
                          <td>{detail.name}</td>
                          <td>
                            <List
                              grid={{ gutter: 16, column: 0 }}
                              dataSource={detail.imgDetails}
                              renderItem={(image) => (
                                <List.Item>
                                  <Image width={50} height={50} src={image.image} alt="Product" />
                                </List.Item>
                              )}
                            />
                          </td>
                          <td>{detail.category}</td>
                          <td>{detail.brand}</td>
                          <td>{detail?.unitPrice?.toLocaleString('vi-VN')} VND</td>
                          <td>{detail.quantity}</td>
                          <td className="text-end">{detail?.allMoney?.toLocaleString('vi-VN')} VND</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="invoice-body-bottom">
                    <div className="info-item text-end">
                      <span className="text-bold">Total:</span> {invoiceData?.amount?.toLocaleString('vi-VN')} VND
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="invoice-foot text-center">
                <p>
                  <span className="text-bold">NOTE:</span> This is a computer-generated receipt and does not require a
                  physical signature.
                </p>
                <div className="invoice-btns">
                  <button className="invoice-btn" onClick={handlePrint}>
                    <span>
                      <i className="fa-solid fa-print" />
                    </span>
                    <span>Print</span>
                  </button>
                  <button type="button" className="invoice-btn">
                    <span>
                      <i className="fa-solid fa-download" />
                    </span>
                    <span>Download</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </Modal>
  );
}

export default Invoice;
