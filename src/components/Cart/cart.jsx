import { faTicketSimple, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, useDispatch } from 'react-redux';
import { incrementQuantity, decrementQuantity, removeItem } from '~/redux/cartSlice';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import Voucher from './Models/Voucher';
import axios from 'axios';

function CartProduct() {
    const [voucher, setVoucherBtn] = useState(false);
    const savedVoucher = localStorage.getItem('selectedVoucher');
    const voucherObject = JSON.parse(savedVoucher);

    const [activeTab, setActiveTab] = useState('Description');
    const [activeTab2, setActiveTab2] = useState('Paypal');
    const [phivanchuyen, setphivanchuyen] = useState(0);
    const [partPhivanchuyen, setpartPhivanchuyen] = useState(0);

    if (activeTab == 'Description') {
        localStorage.setItem('ok', activeTab2);
    } else {
        localStorage.setItem('ok', 'cashPay');
    }
    const LoaiThanhToan = localStorage.getItem('ok');

    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const getTotal = () => {
        let totalQuantity = 0;
        let totalPrice = 0;
        const VoucherPay = voucherObject;
        // Kiểm tra voucher và giá trị tối đa
        const discountPercentage = VoucherPay?.value || 0;
        const valueMax = VoucherPay?.valueMax || 0;

        cart.forEach((item) => {
            totalQuantity += item.quantity;
            totalPrice += item.price * item.quantity;
        });

        // Nếu không có voucher, finalPrice sẽ bằng 0
        if (!VoucherPay) {
            return { totalPrice, totalQuantity, finalPrice: 0 };
        }

        const discountAmount = (totalPrice * discountPercentage) / 100;
        const finalDiscountAmount = Math.min(discountAmount, valueMax);
        console.log(finalDiscountAmount);
        const finalPrice = totalPrice - finalDiscountAmount;

        return { totalPrice, totalQuantity, finalPrice, finalDiscountAmount };
    };
    const { totalPrice, finalDiscountAmount } = getTotal();
    const Tongtienhang = totalPrice;

    const tonggiamggia = finalDiscountAmount ? finalDiscountAmount.toLocaleString('vi-VN') : '0';
    const formattedTonggiamggia = parseFloat(finalDiscountAmount) || 0;
    const formattedPhivanchuyen = parseFloat(phivanchuyen) || 0;
    const partTongThanhToan = Tongtienhang - formattedTonggiamggia + formattedPhivanchuyen;
    const TongThanhToan = partTongThanhToan.toLocaleString('vi-VN');

    const exchangeRate = 23000; // Tỷ giá hối đoái

    const usdAmount = (partTongThanhToan / exchangeRate).toFixed(2); // "43.48"

    const getItemTotal = (item) => {
        return item.price * item.quantity;
    };

    const handleVanchuyen = (price) => {
        localStorage.setItem('selectedVanchuyen', JSON.stringify(price));
        const Phivanchuyen = localStorage.getItem('selectedVanchuyen');
        const partPhiVc = price.toLocaleString('vi-VN');
        setpartPhivanchuyen(partPhiVc);
        setphivanchuyen(Phivanchuyen);
    };

    const PaymentPost = () => {
        const userData = JSON.parse(localStorage.getItem('selectedAddress'));
        const now = new Date();
        const twoDaysLater = new Date(now);
        twoDaysLater.setDate(now.getDate() + 2);

        if (!userData) {
            toast.error('Vui lòng chọn địa chỉ giao hàng');
            return;
        }

        if (!partPhivanchuyen) {
            toast.error('Vui lòng nhập phí vận chuyển');
            return;
        }

        if (!LoaiThanhToan) {
            toast.error('Vui lòng chọn phương thức thanh toán');
            return;
        }
        if (LoaiThanhToan == 'Paypal') {
            if (cart.length > 0) {
                const orderDetailData = cart.map((item) => ({
                    productID: item.id,
                    quantity: item.quantity || 1,
                    unitPrice: item.price,
                    allMoney: item.price * (item.quantity || 1),
                    size: item.size,
                }));

                const formatDate = (date) => {
                    const year = date.getFullYear();
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const day = String(date.getDate()).padStart(2, '0');
                    const hours = String(date.getHours()).padStart(2, '0');
                    const minutes = String(date.getMinutes()).padStart(2, '0');
                    const seconds = String(date.getSeconds()).padStart(2, '0');
                    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
                };

                const requestData = {
                    orderData: {
                        user_id: 2,
                        order_date: formatDate(now),
                        delivery_date: formatDate(twoDaysLater),
                        delivery_time: formatDate(twoDaysLater), // Sử dụng định dạng thời gian phù hợp nếu cần
                        total_price: partTongThanhToan,
                        status: 'Pending',
                        shiptype: partPhivanchuyen,
                        voucher: tonggiamggia,
                    },
                    orderDetailData: orderDetailData, // Always send as an array
                    paymentData: {
                        name: 'Paypal',
                        paymentDate: formatDate(now),
                        amount: usdAmount,
                        paymentMethod: LoaiThanhToan,
                        status: 'completed',
                        nameUser: userData.name,
                        phone: userData.phone,
                        addresses: userData.address,
                        email: userData.email,
                    },
                };

                axios
                    .post('http://localhost:9000/api/orders/bill/paypal', requestData)
                    .then((response) => {
                        console.log('API Response:', response.data);
                        toast.success('Vui lòng thanh toán!');
                        window.location.href = response.data.redirectUrl;
                    })
                    .catch((error) => {
                        console.error('API Error:', error);
                    });
            } else {
                toast.error('Giỏ hàng không có sản phẩm nào!');
            }
        }
        if (LoaiThanhToan == 'Vnpay') {
            if (cart.length > 0) {
                const orderDetailData = cart.map((item) => ({
                    productID: item.id,
                    quantity: item.quantity || 1,
                    unitPrice: item.price,
                    allMoney: item.price * (item.quantity || 1),
                    size: item.size,
                }));

                const formatDate = (date) => {
                    const year = date.getFullYear();
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const day = String(date.getDate()).padStart(2, '0');
                    const hours = String(date.getHours()).padStart(2, '0');
                    const minutes = String(date.getMinutes()).padStart(2, '0');
                    const seconds = String(date.getSeconds()).padStart(2, '0');
                    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
                };

                const requestData = {
                    orderData: {
                        user_id: 2,
                        order_date: formatDate(now),
                        delivery_date: formatDate(twoDaysLater),
                        delivery_time: formatDate(twoDaysLater), // Sử dụng định dạng thời gian phù hợp nếu cần
                        total_price: partTongThanhToan,
                        status: 'Pending',
                        shiptype: partPhivanchuyen,
                        voucher: tonggiamggia,
                    },
                    orderDetailData: orderDetailData, // Always send as an array
                    paymentData: {
                        name: 'MB',
                        paymentDate: formatDate(now),
                        amount: partTongThanhToan,
                        paymentMethod: LoaiThanhToan,
                        status: 'completed',
                        nameUser: userData.name,
                        phone: userData.phone,
                        addresses: userData.address,
                        email: userData.email,
                    },
                };

                axios
                    .post('http://localhost:9000/api/orders/bill/vnpay', requestData)
                    .then((response) => {
                        console.log('API Response:', response.data);
                        toast.success('Vui lòng thanh toán!');
                        // localStorage.setItem('VNpayIdOrder', response.data.message);
                        window.location.href = response.data.paymentUrl;
                    })
                    .catch((error) => {
                        console.error('API Error:', error);
                    });
            } else {
                toast.error('Giỏ hàng không có sản phẩm nào!');
            }
        }
        if (LoaiThanhToan == 'Momo') {
            if (cart.length > 0) {
                const orderDetailData = cart.map((item) => ({
                    productID: item.id,
                    quantity: item.quantity || 1,
                    unitPrice: item.price,
                    allMoney: item.price * (item.quantity || 1),
                    size: item.size,
                }));

                const formatDate = (date) => {
                    const year = date.getFullYear();
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const day = String(date.getDate()).padStart(2, '0');
                    const hours = String(date.getHours()).padStart(2, '0');
                    const minutes = String(date.getMinutes()).padStart(2, '0');
                    const seconds = String(date.getSeconds()).padStart(2, '0');
                    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
                };

                const requestData = {
                    orderData: {
                        user_id: 2,
                        order_date: formatDate(now),
                        delivery_date: formatDate(twoDaysLater),
                        delivery_time: formatDate(twoDaysLater), // Sử dụng định dạng thời gian phù hợp nếu cần
                        total_price: partTongThanhToan,
                        status: 'Pending',
                        shiptype: partPhivanchuyen,
                        voucher: tonggiamggia,
                    },
                    orderDetailData: orderDetailData, // Always send as an array
                    paymentData: {
                        name: 'Momo',
                        paymentDate: formatDate(now),
                        amount: partTongThanhToan,
                        paymentMethod: LoaiThanhToan,
                        status: 'completed',
                        nameUser: userData.name,
                        phone: userData.phone,
                        addresses: userData.address,
                        email: userData.email,
                    },
                };

                axios
                    .post('http://localhost:9000/api/orders/bill/momo', requestData)
                    .then((response) => {
                        console.log('API Response:', response.data);
                        toast.success('Vui lòng thanh toán!');
                        window.location.href = response.data.paymentUrl;
                    })
                    .catch((error) => {
                        console.error('API Error:', error);
                    });
            } else {
                toast.error('Giỏ hàng không có sản phẩm nào!');
            }
        }
        if (LoaiThanhToan == 'cashPay') {
            if (cart.length > 0) {
                const orderDetailData = cart.map((item) => ({
                    productID: item.id,
                    quantity: item.quantity || 1,
                    unitPrice: item.price,
                    allMoney: item.price * (item.quantity || 1),
                    size: item.size,
                }));

                const formatDate = (date) => {
                    const year = date.getFullYear();
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const day = String(date.getDate()).padStart(2, '0');
                    const hours = String(date.getHours()).padStart(2, '0');
                    const minutes = String(date.getMinutes()).padStart(2, '0');
                    const seconds = String(date.getSeconds()).padStart(2, '0');
                    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
                };

                const requestData = {
                    orderData: {
                        user_id: 2,
                        order_date: formatDate(now),
                        delivery_date: formatDate(twoDaysLater),
                        delivery_time: formatDate(twoDaysLater), // Sử dụng định dạng thời gian phù hợp nếu cần
                        total_price: partTongThanhToan,
                        status: 'Pending',
                        shiptype: partPhivanchuyen,
                        voucher: tonggiamggia,
                    },
                    orderDetailData: orderDetailData, // Always send as an array
                    paymentData: {
                        name: 'MB',
                        paymentDate: formatDate(now),
                        amount: partTongThanhToan,
                        paymentMethod: LoaiThanhToan,
                        status: 'completed',
                        nameUser: userData.name,
                        phone: userData.phone,
                        addresses: userData.address,
                        email: userData.email,
                    },
                };

                axios
                    .post('http://localhost:9000/api/orders/bill', requestData)
                    .then((response) => {
                        console.log('API Response:', response.data);
                        toast.success('Thanh toán thành công!');
                    })
                    .catch((error) => {
                        console.error('API Error:', error);
                    });
            } else {
                toast.error('Giỏ hàng không có sản phẩm nào!');
            }
        }
    };

    useEffect(() => {
        getTotal();
        localStorage.removeItem('selectedVanchuyen');
        localStorage.removeItem('selectedVoucher');
    }, []);

    const tabs = [
        {
            id: 'Description',
            label: 'Thanh toán online',
            content: (
                <div>
                    <ul className="flex nav-tabs" id="myTab" role="tablist">
                        <li
                            className={`nav-item mr-[10px] ${activeTab2 === 'Paypal' ? 'text-red-500' : 'text-black'}`} // Apply text color based on activeTab
                            onClick={() => setActiveTab2('Paypal')}
                        >
                            <div
                                className={`w-[200px] h-[40px] flex items-center justify-center border-[1px] ${
                                    activeTab2 === 'Paypal' ? 'border-red-500' : 'border-black'
                                }`}
                            >
                                Thanh toán PAYPAL
                            </div>
                        </li>
                        <li
                            className={`nav-item mr-[10px] ${activeTab2 === 'Vnpay' ? 'text-red-500' : 'text-black'}`} // Apply text color based on activeTab
                            onClick={() => setActiveTab2('Vnpay')}
                        >
                            <div
                                className={`w-[200px] h-[40px] flex items-center justify-center border-[1px] ${
                                    activeTab2 === 'Vnpay' ? 'border-red-500' : 'border-black'
                                }`}
                            >
                                Thanh toán VNPAY
                            </div>
                        </li>
                        <li
                            className={`nav-item ${activeTab2 === 'Momo' ? 'text-red-500' : 'text-black'}`} // Apply text color based on activeTab
                            onClick={() => setActiveTab2('Momo')}
                        >
                            <div
                                className={`w-[200px] h-[40px] flex items-center justify-center border-[1px] ${
                                    activeTab2 === 'Momo' ? 'border-red-500' : 'border-black'
                                }`}
                            >
                                Thanh toán MOMO
                            </div>
                        </li>
                    </ul>
                </div>
            ),
        },
        {
            id: 'Specification',
            label: 'Thanh toán khi nhận hàng',
            content: (
                <div>
                    <p>Thanh toán khi nhận hàng</p>
                </div>
            ),
        },
    ];

    return (
        <section className="cart_area">
            <div className="container">
                <div className="cart_inner">
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Product</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Total</th>
                                    <th scope="col">Size</th>
                                    <th scope="col" className="text-center align-middle">
                                        Action
                                    </th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map((item) => (
                                    <tr key={item.id}>
                                        <td>
                                            <div className="media">
                                                <div className="w-[200px] h-[100px] d-flex">
                                                    <img
                                                        className="card-img w-full h-full "
                                                        src={item.ImgDetails[0].image}
                                                        alt=""
                                                    />
                                                </div>

                                                <div className="media-body">
                                                    <p>{item.name}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <h5>{item.price.toLocaleString('vi-VN')} VND</h5>
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-outline-black decrease"
                                                onClick={() =>
                                                    dispatch(decrementQuantity({ id: item.id, size: item.size }))
                                                }
                                                type="button"
                                            >
                                                −
                                            </button>
                                            <div className="product_count">
                                                <input
                                                    type="text"
                                                    name="qty"
                                                    id="sst"
                                                    maxLength={12}
                                                    value={item.quantity}
                                                    title="Quantity:"
                                                    className="input-text qty"
                                                    readOnly
                                                />
                                            </div>
                                            <button
                                                className="btn btn-outline-black increase"
                                                onClick={() =>
                                                    dispatch(incrementQuantity({ id: item.id, size: item.size }))
                                                }
                                                type="button"
                                            >
                                                +
                                            </button>
                                        </td>
                                        <td>
                                            <h5>{getItemTotal(item).toLocaleString('vi-VN')} VND</h5>
                                        </td>
                                        <td>
                                            <select className="!text-[20px] rounded border focus:outline-none focus:border-red-500 text-base pl-3 pr-10">
                                                <option>{item.size}</option>
                                            </select>
                                        </td>
                                        <td className="!w-[200px]">
                                            <button
                                                href="#"
                                                className="btn btn-black btn-sm w-[100px] ml-[45px]"
                                                onClick={() => {
                                                    dispatch(removeItem({ id: item.id, size: item.size }));
                                                    toast.error(`Delete cart! - ${item.name}, Size: ${item.size}`);
                                                }}
                                            >
                                                <FontAwesomeIcon icon={faTrash} className="size-10 " />
                                            </button>
                                        </td>
                                        <th scope="col"></th>
                                    </tr>
                                ))}

                                <tr className="shipping_area">
                                    <td>
                                        {' '}
                                        <h1 className="ml-4 text-black-600">Chọn đơn vị vận chuyển</h1>
                                    </td>
                                    <td />
                                    <td />
                                    <td />
                                    <td></td>
                                    <td></td>
                                    <td>
                                        <div className="shipping_box">
                                            <ul className="space-y-1">
                                                <li>
                                                    <span className="mb-[20px]">Hỏa tốc - 70.000 VNĐ</span>
                                                    <input
                                                        className="!h-[18px] !w-[20px] ml-[10px]"
                                                        type="radio"
                                                        name="delivery"
                                                        value="70000"
                                                        onChange={() => handleVanchuyen(70000)}
                                                    />
                                                </li>
                                                <li>
                                                    <span className="mb-[20px]">Giao hàng tiết kiệm - 20.000 VNĐ</span>
                                                    <input
                                                        className="!h-[18px] !w-[20px] ml-[10px]"
                                                        type="radio"
                                                        name="delivery"
                                                        value="express"
                                                        onChange={() => handleVanchuyen(0)}
                                                    />
                                                </li>
                                                <li>
                                                    <span className="mb-[20px]">Giao hàng nhanh - 50.000 VNĐ</span>
                                                    <input
                                                        className="!h-[18px] !w-[20px] ml-[10px]"
                                                        type="radio"
                                                        name="delivery"
                                                        value="express"
                                                        onChange={() => handleVanchuyen(50000)}
                                                    />
                                                </li>
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                                <tr className="out_button_area">
                                    <td className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="w-[70px] h-[70px]">
                                                <img
                                                    src="https://cdn5.vectorstock.com/i/1000x1000/90/94/voucher-icon-coupon-and-gift-offer-discount-vector-11099094.jpg"
                                                    alt="Voucher"
                                                    className="object-contain w-full h-full"
                                                />
                                            </div>

                                            <Voucher
                                                isVoucherModalOpen={voucher}
                                                setIsVoucherModalOpen={setVoucherBtn}
                                            />
                                            <button onClick={() => setVoucherBtn(true)}>
                                                <h1 className="ml-4 text-blue-600">
                                                    Mã voucher: {voucherObject?.name}
                                                </h1>
                                            </button>
                                        </div>
                                    </td>
                                    <td></td>
                                    <td />
                                    <td />
                                    <td />
                                    <td />
                                    <td>
                                        <div className="checkout_btn_inner flex float-end">
                                            <span className="">Tổng số sản phẩm ({cart.length}):</span>
                                            <span className="ml-[30px]">
                                                {' '}
                                                {getTotal().totalPrice.toLocaleString('vi-VN')} VNĐ{' '}
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="cart_inner">
                    <div className="table-responsive">
                        <section className="product_description_area">
                            <div className="container">
                                <h1>Chọn phương thức thanh toán</h1>
                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    {tabs.map((tab) => (
                                        <li
                                            key={tab.id}
                                            className={`nav-item ${
                                                activeTab === tab.id ? 'border-1 border-green-500 active' : ''
                                            }`}
                                            onClick={() => setActiveTab(tab.id)}
                                        >
                                            <div
                                                className={`w-[200px] h-[40px] flex items-center justify-center border-[1px] ${
                                                    activeTab === tab.id
                                                        ? 'border-green-500 bg-gray-100'
                                                        : 'border-black'
                                                }`}
                                            >
                                                {tab.label}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <div className="tab-content" id="myTabContent">
                                    {tabs.map((tab) => (
                                        <div
                                            key={tab.id}
                                            className={`tab-pane fade ${activeTab === tab.id ? 'show active' : ''}`}
                                            id={tab.id}
                                            role="tabpanel"
                                            aria-labelledby={`${tab.id}-tab`}
                                        >
                                            {tab.content}
                                        </div>
                                    ))}
                                    <div className="mt-[20px]">
                                        <ul>
                                            <li>
                                                Tổng tiền hàng:{' '}
                                                <span className="ml-[30px]">
                                                    {getTotal().totalPrice.toLocaleString('vi-VN')} VNĐ
                                                </span>
                                            </li>
                                            <li>
                                                Tổng giảm giá: <span className="ml-[35px]">{tonggiamggia} VNĐ</span>
                                            </li>
                                            <li>
                                                Phí vận chuyển:{' '}
                                                <span className="ml-[25px]">{partPhivanchuyen} VNĐ</span>
                                            </li>
                                            <li>
                                                Tổng thanh toán: <span className="ml-[20px]">{TongThanhToan} VNĐ</span>
                                            </li>
                                        </ul>
                                        <button onClick={PaymentPost} className="main_btn mt-[30px]" href="#">
                                            Thanh toán ngay !
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CartProduct;
