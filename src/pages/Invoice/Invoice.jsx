import './Invoice.scss';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Invoice() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`http://localhost:5000/orders/${id}/details`)
            .then((response) => {
                setProduct(response.data);
                console.log(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('There was an error fetching the product data!', error);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!product) {
        return <div>Product not found</div>;
    }
    const printInvoice = () => {
        window.print();
    };
    return (
        <div className="invoice-wrapper" id="print-area">
            <div className="invoice">
                <div className="invoice-container">
                    <div className="invoice-head">
                        <div className="invoice-head-top">
                            <div className="invoice-head-top-left text-start">
                                <img src="https://beedesign.com.vn/wp-content/uploads/2020/08/thiet-ke-logo-chu-q-ocean-1.jpg" />
                            </div>
                            <div className="invoice-head-top-right text-end">
                                <h3>Invoice</h3>
                            </div>
                        </div>
                        <div className="hr" />
                        <div className="invoice-head-middle">
                            <div className="invoice-head-middle-left text-start">
                                <p>
                                    <span className="text-bold">Date</span>: {product?.payment?.paymentDate}
                                </p>
                            </div>
                            <div className="invoice-head-middle-right text-end">
                                <p>
                                    <span className="text-bold">Invoice No:{id}</span>
                                </p>
                            </div>
                        </div>
                        <div className="hr" />
                        <div className="invoice-head-bottom">
                            <div className="invoice-head-bottom-left">
                                <ul>
                                    <li className="text-bold">Invoiced To:</li>
                                    <li>{product?.user?.userName}</li>
                                    <li>{product?.payment?.amount}</li>
                                    <li>{product?.user?.email}</li>
                                    <li>{product?.user?.phone}</li>
                                </ul>
                            </div>
                            <div className="invoice-head-bottom-right">
                                <ul className="text-end">
                                    <li className="text-bold">Pay To:</li>
                                    <li>SUPO</li>
                                    <li>TOKYO</li>
                                    <li>189 - SENTAI</li>
                                    <li>supo2839@gmaill.com</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="overflow-view">
                        <div className="invoice-body">
                            <table>
                                <thead>
                                    <tr>
                                        <td className="text-bold">Name</td>
                                        <td className="text-bold">Img</td>
                                        <td className="text-bold">Price</td>
                                        <td className="text-bold">Quantity</td>
                                        <td className="text-bold">All price</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {product && product.products && product.orderDetail
                                        ? product.products.map((dataProduct, index) => (
                                              <tr key={index}>
                                                  <td>{dataProduct.name}</td>
                                                  <img className="img_invoice" src={dataProduct.image}></img>
                                                  <td>{dataProduct.price} VND</td>
                                                  <td>{product.orderDetail[index]?.quantity}</td>{' '}
                                                  {/* Assuming orderDetail corresponds to products by index */}
                                                  <td className="text-end">
                                                      {product.orderDetail[index]?.allMoney} VND
                                                  </td>
                                              </tr>
                                          ))
                                        : null}

                                    {/* <tr>
                        <td colspan="4">10</td>
                        <td>$500.00</td>
                    </tr> */}
                                </tbody>
                            </table>
                            <div className="invoice-body-bottom">
                                <div className="invoice-body-info-item">
                                    <div className="info-item-td text-end text-bold">Total:</div>
                                    <div className="info-item-td text-end">{product?.order[0].allPrice} VND</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="invoice-foot text-center">
                        <p>
                            <span className="text-bold text-center">NOTE:&nbsp;</span>This is computer generated receipt
                            and does not require physical signature.
                        </p>
                        <div className="invoice-btns">
                            <button className="invoice-btn" onClick={() => printInvoice()}>
                                <span>Print</span>
                            </button>
                            <button type="button" className="invoice-btn">
                                <span>Download</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Invoice;
