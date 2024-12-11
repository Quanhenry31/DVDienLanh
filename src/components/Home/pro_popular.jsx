import { EyeIcon, HeartIcon, ShoppingCartIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '~/redux/cartSlice';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';

function ProductPopular() {
    const dispatch = useDispatch();
    const [listOfPosts, setListOfPosts] = useState([]);
    const [size, setSize] = useState({});

    useEffect(() => {
        // axios.get('http://localhost:9000/api/products/all').then((response) => {
        //     setListOfPosts(response.data.data);
        // });
        axios.get('http://localhost:9000/api/orders/findProductPopular').then((response) => {
            setListOfPosts(response.data.data);
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
        <section className="inspired_product_area section_gap_bottom_custom">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-12">
                        <div className="main_title">
                            <h2>
                                <span>Sản phẩm phổ biến</span>
                            </h2>
                            <p>Sản phẩm có lượt tương tác cao</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {listOfPosts?.map((value, key) => (
                        <div className="col-lg-3 col-md-6" key={key}>
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
                                        <Link to={`/detail/${value.id}`} className="d-flex justify-center items-center">
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
                                        <div>
                                            <span className="mr-4">{value.price.toLocaleString('vi-VN')} vnđ</span>
                                        </div>
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
        </section>
    );
}

export default ProductPopular;
