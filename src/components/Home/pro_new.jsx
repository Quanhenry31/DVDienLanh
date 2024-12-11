import { EyeIcon, HeartIcon, ShoppingCartIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addToCart } from '~/redux/cartSlice';

function ProductNew() {
    const dispatch = useDispatch();
    const [listOfPosts, setListOfPosts] = useState([]);
    const [size, setSize] = useState({});
    useEffect(() => {
        axios
            .get('http://localhost:9000/api/products/all')
            .then((response) => {
                const data = response.data.data; // Dữ liệu gốc
                const lastTwoItems = data.slice(-2); // Lấy 2 phần tử cuối cùng
                setListOfPosts(lastTwoItems); // Cập nhật state
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleSizeChange = (productId, newSize) => {
        setSize((prevSizes) => ({ ...prevSizes, [productId]: newSize }));
    };

    const handleAddToCart = (product) => {
        const selectedSize = size[product.id];
        if (!selectedSize) {
            toast.error(`Please select a size for ${product.name}`);
            return;
        }
        dispatch(addToCart({ ...product, size: selectedSize }));
        toast.success(`Added ${product.name} (${selectedSize}) to cart!`);
    };

    return (
        <section className="new_product_area section_gap_top section_gap_bottom_custom">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-12">
                        <div className="main_title">
                            <h2>
                                <span>Sản phẩm mới</span>
                            </h2>
                            <p>Thế giới đồ điện lạnh số 1 VN</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <div className="product-img">
                            <img
                                className="img-fluid"
                                src="https://cdn.24h.com.vn/upload/3-2022/images/2022-07-12/Gia-tu-lanh-Panasonic-Inverter-thang-7-Giam-toi-4-trieu-samsung-kitchen-catalogue-image4-800x500-1657591124-562-width740height463.jpg"
                                alt=""
                            />
                        </div>
                    </div>
                    <div className="col-lg-6 mt-5 mt-lg-0">
                        <div className="row">
                            {/* map */}
                            {listOfPosts?.map((value, key) => (
                                <div className="col-lg-6 col-md-6" key={key}>
                                    <div className="single-product">
                                        <div className="product-img">
                                            <div className="w-[300px] h-[200px]">
                                                <img
                                                    className="img-fluid w-full h-full"
                                                    src={value.ImgDetails[0]?.image}
                                                    alt=""
                                                />
                                            </div>
                                            <div className="p_icon d-flex justify-center items-center">
                                                <Link
                                                    to={`/detail/${value.id}`}
                                                    className="d-flex justify-center items-center"
                                                >
                                                    <EyeIcon className="size-8 text-black-500" />
                                                </Link>
                                                <a href="#" className="d-flex justify-center items-center">
                                                    <HeartIcon className="size-8 text-black-500" />
                                                </a>
                                                <a className="d-flex justify-center items-center">
                                                    <button onClick={() => handleAddToCart(value)}>
                                                        <ShoppingCartIcon className="size-8 text-black-500" />
                                                    </button>
                                                </a>
                                            </div>
                                        </div>

                                        <div className="product-btm">
                                            <a href="#" className="d-block">
                                                <h4>{value.name}</h4>
                                            </a>
                                            <div className="mt-3 flex items-center justify-between">
                                                <span className="mr-4">{value.price.toLocaleString('vi-VN')} vnđ</span>
                                                <select
                                                    className="!text-[18px] rounded border appearance-none border-gray-400 py-3 focus:outline-none focus:border-red-500 text-base pl-3 pr-10 ml-auto"
                                                    onChange={(e) => handleSizeChange(value.id, e.target.value)}
                                                    value={size[value.id] || ''}
                                                >
                                                    <option value="" disabled hidden>
                                                        Size
                                                    </option>
                                                    {value.Sizes.map((sizeOption, index) => (
                                                        <option value={sizeOption.size} key={index}>
                                                            {sizeOption.size}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ProductNew;
