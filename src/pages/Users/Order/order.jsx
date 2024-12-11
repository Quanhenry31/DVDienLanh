import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function Order() {
    const user = useSelector((state) => state.user.user);
    const [activeTab, setActiveTab] = useState('delivered');
    console.log(user.id);
    const [timepro, setTimepro] = useState([]);
    const [penpro, setPenpro] = useState([]);
    const [susserpro, setSusset] = useState([]);
    const [errpro, setErrset] = useState([]);
    console.log(timepro);
    console.log(penpro);
    console.log(susserpro);

    useEffect(() => {
        axios
            .get(`http://localhost:9000/api/users/order/${user.id}`)
            .then((response) => {
                const orders = response.data?.data?.Orders || [];
                console.log(response.data.data);

                const deliveredOrders = orders.filter((order) =>
                    order.Payments.some(
                        (payment) => payment.status === 'thanh toán thành công' || payment.status === 'completed',
                    ),
                );

                const pendingProducts = orders.filter((order) =>
                    order.Payments.some((payment) => payment.status === 'pending'),
                );
                const sussetProducts = orders.filter((order) => order.status === 'Thành công');

                const errProducts = orders.filter((order) =>
                    order.Payments.some((payment) => payment.status === 'thanh toán thất bại'),
                );
                // const errProducts = orders.filter((order) => order.status === 'Pending');

                setTimepro(deliveredOrders);
                setPenpro(pendingProducts);
                setSusset(sussetProducts);
                setErrset(errProducts);
            })
            .catch((error) => {
                console.error('Error fetching orders:', error);
            });
    }, [user.id]);

    const deliveredProducts = [
        {
            id: 1,
            image: 'https://themewagon.github.io/eiser/img/product/inspired-product/i2.jpg',
            name: 'Product A',
            category: 'Electronics',
            size: 'M',
            quantity: 2,
            price: 100,
            allPrice: 200,
        },
        {
            id: 2,
            image: 'https://themewagon.github.io/eiser/img/product/inspired-product/i2.jpg',
            name: 'Product B',
            category: 'Clothing',
            size: 'L',
            quantity: 1,
            price: 200,
            allPrice: 200,
        },
    ];

    const pendingProducts = [
        {
            id: 3,
            image: 'https://themewagon.github.io/eiser/img/product/inspired-product/i2.jpg',
            name: 'Product C',
            category: 'Home',
            size: 'S',
            quantity: 3,
            price: 150,
            allPrice: 450,
        },
        {
            id: 4,
            image: 'https://themewagon.github.io/eiser/img/product/inspired-product/i2.jpg',
            name: 'Product D',
            category: 'Beauty',
            size: 'L',
            quantity: 1,
            price: 250,
            allPrice: 250,
        },
    ];

    const calculateTotal = (orders) => {
        if (!Array.isArray(orders)) return 0;

        return orders.reduce((total, order) => {
            // Đảm bảo rằng OrderDetails tồn tại và là một mảng, nếu không có thì sử dụng mảng rỗng
            const orderTotal = (order.OrderDetails || []).reduce((sum, product) => {
                // Nhân giá tiền với số lượng và cộng vào tổng
                return sum + product.allMoney * product.quantity;
            }, 0);
            return total + orderTotal;
        }, 0);
    };
    const calculateTotal2 = (orders) => {
        // Đảm bảo rằng orders là một mảng, nếu không có thì trả về 0
        if (!Array.isArray(orders)) return 0;

        // Duyệt qua các đơn hàng và cộng tổng số tiền của mỗi đơn hàng
        return orders.reduce((total, order) => {
            // Đảm bảo rằng total_price có giá trị hợp lệ, nếu không thì dùng giá trị 0
            return total + (order.total_price || 0);
        }, 0);
    };

    return (
        <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-6">Đơn hàng của tôi</h1>

            {/* Tab navigation */}
            <div className="flex border-b mb-4">
                <button
                    className={`w-1/2 text-center py-2 ${
                        activeTab === 'delivered' ? 'border-b-2 border-red-500 text-red-500' : 'text-gray-500'
                    }`}
                    onClick={() => setActiveTab('delivered')}
                >
                    Đã giao hàng
                </button>
                <button
                    className={`w-1/2 text-center py-2 ${
                        activeTab === 'pending' ? 'border-b-2 border-red-500 text-red-500' : 'text-gray-500'
                    }`}
                    onClick={() => setActiveTab('pending')}
                >
                    Chờ giao hàng
                </button>
                <button
                    className={`w-1/2 text-center py-2 ${
                        activeTab === 'Thanhtoanthatbai' ? 'border-b-2 border-red-500 text-red-500' : 'text-gray-500'
                    }`}
                    onClick={() => setActiveTab('Thanhtoanthatbai')}
                >
                    Thanh toán thất bại
                </button>
            </div>

            {/* Delivered Products */}
            {activeTab === 'delivered' && (
                <div>
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <div className="h-[500px] overflow-y-auto">
                            {susserpro.map((order) =>
                                order.OrderDetails.map((product) => (
                                    <div key={product.id} className="border-b last:border-none py-4 flex items-center">
                                        <img
                                            src={product?.Product?.ImgDetails[0]?.image}
                                            alt={product?.Product?.ImgDetails[0]?.image}
                                            className="w-24 h-24 object-cover mr-4 rounded-md"
                                        />
                                        <div className="flex-grow">
                                            <p className="font-medium text-lg">{product.Product?.name}</p>
                                            <p className="text-gray-600">
                                                Phân loại hàng: {product.Product?.Category?.name} | {product?.size}
                                            </p>
                                            <p className="text-gray-600">x{product?.quantity}</p>
                                        </div>
                                        <div>
                                            <h1>{order.total_price.toLocaleString('vi-VN')} vnđ</h1>
                                        </div>
                                    </div>
                                )),
                            )}

                            <div className="text-right font-semibold mt-4 text-2xl text-red-500">
                                Tổng số tiền: {calculateTotal2(susserpro).toLocaleString('vi-VN')} vnđ
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Pending Products */}
            {activeTab === 'pending' && (
                <div>
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <div className="h-[500px] overflow-y-auto">
                            {timepro.map((order) =>
                                order.OrderDetails.map((product) => (
                                    <div key={product.id} className="border-b last:border-none py-4 flex items-center">
                                        {/* Assuming you want to display a placeholder image as there's no image data in the current object */}
                                        <img
                                            src={product?.Product?.ImgDetails[0]?.image} // Replace with actual image data if available
                                            alt={product?.Product?.ImgDetails[0]?.image}
                                            className="w-24 h-24 object-cover mr-4 rounded-md"
                                        />
                                        <div className="flex-grow">
                                            <p className="font-medium text-lg">{product.Product?.name}</p>
                                            <p className="text-gray-600">
                                                Phân loại hàng: {product.Product?.Category?.name} | {product?.size}
                                            </p>
                                            <p className="text-gray-600">x{product?.quantity}</p>
                                        </div>
                                        <div>
                                            <h1>{product?.allMoney.toLocaleString('vi-VN')} vnđ</h1>
                                        </div>
                                    </div>
                                )),
                            )}
                            <div className="text-right font-semibold mt-4 text-2xl text-red-500">
                                Tổng số tiền: {calculateTotal(timepro).toLocaleString('vi-VN')} vnđ
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* Pending Products */}
            {activeTab === 'Thanhtoanthatbai' && (
                <div>
                    <div className="bg-white shadow-md rounded-lg p-4">
                        {/* Thêm một lớp với chiều cao cố định và overflow-y để có thanh trượt khi kéo */}
                        <div className="h-[500px] overflow-y-auto">
                            {errpro.map((order) =>
                                order.OrderDetails.map((product) => (
                                    <div key={product.id} className="border-b last:border-none py-4 flex items-center">
                                        <img
                                            src={product?.Product?.ImgDetails[0]?.image}
                                            alt={product?.Product?.ImgDetails[0]?.image}
                                            className="w-24 h-24 object-cover mr-4 rounded-md"
                                        />
                                        <div className="flex-grow">
                                            <p className="font-medium text-lg">{product.Product?.name}</p>
                                            <p className="text-gray-600">
                                                Phân loại hàng: {product.Product?.Category?.name} | {product?.size}
                                            </p>
                                            <p className="text-gray-600">x{product?.quantity}</p>
                                        </div>
                                        <div>
                                            <h1>{product?.allMoney.toLocaleString('vi-VN')} vnđ</h1>
                                        </div>
                                    </div>
                                )),
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Order;
