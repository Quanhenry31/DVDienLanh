function Order() {
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

    const calculateTotal = (products) => {
        return products.reduce((total, product) => total + product.allPrice, 0);
    };

    return (
        <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-6">Orders</h1>

            <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-[18px] font-semibold text-red-500">Đã giao hàng</h2>
                </div>
                <div className="bg-white shadow-md rounded-lg p-4">
                    {deliveredProducts.map((product) => (
                        <div key={product.id} className="border-b last:border-none py-4 flex items-center">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-24 h-24 object-cover mr-4 rounded-md"
                            />
                            <div className="flex-grow">
                                <p className="font-medium text-lg">{product.name}</p>
                                <p className="text-gray-600">
                                    Phân loại hàng: {product.category} | {product.size}
                                </p>
                                <p className="text-gray-600">x{product.quantity}</p>
                            </div>
                            <div>
                                <h1>${product.allPrice}</h1>
                            </div>
                        </div>
                    ))}
                    <div className="text-right font-semibold mt-4 text-2xl text-red-500">
                        Tổng số tiền: ${calculateTotal(deliveredProducts)}
                    </div>
                </div>
            </div>

            <div>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-[18px] font-semibold text-red-500">Chờ xác nhận | Đã thanh toán</h2>
                </div>
                <div className="bg-white shadow-md rounded-lg p-4">
                    {pendingProducts.map((product) => (
                        <div key={product.id} className="border-b last:border-none py-4 flex items-center">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-24 h-24 object-cover mr-4 rounded-md"
                            />
                            <div className="flex-grow">
                                <p className="font-medium text-lg">{product.name}</p>
                                <p className="text-gray-600">
                                    Phân loại hàng: {product.category} | {product.size}
                                </p>
                                <p className="text-gray-600">x{product.quantity}</p>
                            </div>
                            <div>
                                <h1>${product.allPrice}</h1>
                            </div>
                        </div>
                    ))}
                    <div className="text-right font-semibold mt-4 text-2xl text-red-500">
                        Tổng số tiền: ${calculateTotal(pendingProducts)}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Order;
