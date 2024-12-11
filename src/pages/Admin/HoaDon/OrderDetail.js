import { Modal, Input, Image, Form, Row, Col, List } from 'antd';
import { useState, useEffect } from 'react';

const OrderDetailOrder = ({
  isOrderDetailModalOpen,
  setIsOrderDetailModalOpen,
  dataOrderDetail,
  setDataOrderDetail,
}) => {
  const [form] = Form.useForm();
  console.log(dataOrderDetail);

  // State để lưu thông tin của các sản phẩm
  const [orderDetailData, setOrderDetailData] = useState([]);
  console.log(orderDetailData);

  // Cập nhật dữ liệu khi `dataOrderDetail` thay đổi
  useEffect(() => {
    if (dataOrderDetail) {
      const details = dataOrderDetail.OrderDetails || [];
      setOrderDetailData(
        details.map((detail) => ({
          key: detail.Product?.id || 'N/A', // Mỗi sản phẩm cần một key duy nhất
          name: detail.Product?.name || 'N/A',
          size: detail.size || 'N/A',
          imgDetails: detail.Product?.ImgDetails || [],
          unitPrice: detail.unitPrice || 0,
          quantity: detail.quantity || 0,
          allMoney: detail.allMoney,
          category: detail.Product?.Category?.name || 'N/A',
          brand: detail.Product?.Brand?.name || 'N/A',
        })),
      );
    }
  }, [dataOrderDetail]);

  // Đóng modal
  const handleCloseOrderDetailModal = () => {
    form.resetFields();
    setIsOrderDetailModalOpen(false);
    setDataOrderDetail(null);
  };

  return (
    <Modal
      title="Thông tin sản phẩm"
      open={isOrderDetailModalOpen}
      onCancel={handleCloseOrderDetailModal}
      footer={null}
      width={1000}
      maskClosable
    >
      <Form form={form} layout="vertical">
        <div className="invoice-container">
          {/* Body */}
          <div className="overflow-view">
            <div className="invoice-body">
              <table>
                <thead>
                  <tr>
                    <td className="text-bold">ID</td>
                    <td className="text-bold">Name</td>
                    <td className="text-bold">Type</td>
                    <td className="text-bold">Image</td>
                    <td className="text-bold">Category</td>
                    <td className="text-bold">Brands</td>
                    <td className="text-bold">Price</td>
                    <td className="text-bold">Quantity</td>
                    <td className="text-bold">Total</td>
                  </tr>
                </thead>
                <tbody>
                  {orderDetailData.map((detail, index) => (
                    <tr key={index}>
                      <td>{detail.key}</td>
                      <td>{detail.name}</td>
                      <td>{detail.size}</td>
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
                      <td>{detail.unitPrice.toLocaleString('vi-VN')} VND</td>
                      <td>{detail.quantity}</td>
                      <td>{detail.allMoney.toLocaleString('vi-VN')} VND</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Form>
    </Modal>
  );
};

export default OrderDetailOrder;
