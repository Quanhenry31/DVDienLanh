import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { addToCartQuantity } from '~/redux/cartSlice';
function SingleProduct() {
    const dispatch = useDispatch();
    const location = useLocation();
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState('');
    const [price, setPrice] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const [listOfSoluong, setListOfSoluong] = useState([]);
    const [listOfSoluongCheck, setListOfSoluongCheck] = useState([]);
    const [thongSo, setThongSo] = useState(null);

    useEffect(() => {
        setSearchParams((params) => {
            params.delete('size');
        });
    }, []);
    const handleChange = (e) => {
        setQuantity(e.target.value);
    };

    const handleBlur = () => {
        if (quantity === '') {
            setQuantity(1);
        }
    };

    const handleAddToCart = () => {
        if (listOfSoluongCheck <= 0) {
            toast.error('Sản phẩm hết hàng!!');
        } else {
            const quantityToAdd = parseInt(quantity, 10);
            const selectedSize = size; // Lấy kích thước đã chọn từ state hoặc component
            const selectedPrice = price;
            if (!isNaN(quantityToAdd) && quantityToAdd > 0 && selectedSize && selectedPrice) {
                dispatch(
                    addToCartQuantity({ product, quantity: quantityToAdd, size: selectedSize, price: selectedPrice }),
                );
                toast.success(`Added to cart! - ${product.name}, Size: ${selectedSize}`);
            } else {
                toast.error('Please enter a valid quantity and select a size.');
            }
        }
    };

    useEffect(() => {
        axios
            .get(`http://localhost:9000/api/products/${id}`)
            .then((response) => {
                const productData = response.data.data;
                setProduct(response.data.data);
                setLoading(false);
                setSelectedImage(productData.ImgDetails[0].image);
            })
            .catch((error) => {
                console.error('There was an error fetching the product data!', error);
                setLoading(false);
            });
    }, [id]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:9000/api/sizes`, {
                    params: {
                        size: searchParams.get('size') || '0',
                        page: 1,
                        pageSize: searchParams.get('pageSize') ?? 1,
                    },
                });
                setListOfSoluong(response.data.rows);
                setPrice(response?.data?.rows[0].price);
                setListOfSoluongCheck(response.data.rows[0]?.InventoryNumber);
            } catch (error) {
                console.error('There was an error fetching the product data!', error);
            }
        };

        fetchData();
    }, [location.search]);
    const handleSearchChange = (e) => {
        const eTargetImg = e.target.value;
        setSelectedImage(null);
        setThongSo(null);
        setSelectedImage(product?.ImgDetails?.find((item) => item.name === eTargetImg)?.image);
        setThongSo(product?.Sizes?.find((item) => item.size === eTargetImg));

        product?.ImgDetails?.find((item) => {
            return item.name === e.target.value;
        });

        setSize(e.target.value);
        setSearchParams((params) => {
            if (e) {
                params.set('size', e.target.value);
            } else {
                params.delete('size');
            }
            return params;
        });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div className="product_image_area">
            <div className="container">
                <div className="row s_product_inner">
                    <div className="col-lg-6">
                        <div className="s_product_img">
                            <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                                <ol className="carousel-indicators">
                                    {product.ImgDetails.map((value, key) => (
                                        <li
                                            data-target="#carouselExampleIndicators"
                                            data-slide-to={0}
                                            onClick={() => {
                                                setSelectedImage(null);
                                                setSelectedImage(value.image);
                                            }}
                                        >
                                            <div className="w-[50px] h-[50px]">
                                                <img className="w-full h-full" src={value?.image} alt="" />
                                            </div>
                                        </li>
                                    ))}
                                </ol>

                                <div className="carousel-inner">
                                    <div className="carousel-item active">
                                        <div className="w-[700px] h-[500px]">
                                            <img
                                                className="d-block w-full h-full "
                                                src={
                                                    selectedImage ||
                                                    'https://themewagon.github.io/eiser/img/product/single-product/s-product-1.jpg'
                                                }
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5 offset-lg-1">
                        <div className="s_product_text">
                            <h3>{product.name}</h3>
                            {/* <h2>{product.price} VND</h2> */}
                            <h2>{listOfSoluong[0]?.price || 0} VND</h2>
                            <ul className="list">
                                <li>
                                    <a className="active" href="#">
                                        <span>Loại</span> : {product.Category.name}
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <span>Trạng thái</span> : {listOfSoluong[0]?.status || 'Vui lòng chọn size'}
                                    </a>
                                </li>
                                <li>
                                    <div class="flex  items-center">
                                        <span class=" w-[100px]">Loại</span>

                                        <div class="relative">
                                            <select
                                                className="!text-[18px] rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-red-500  pl-3 pr-10"
                                                onChange={handleSearchChange}
                                                value={size}
                                            >
                                                <option value="" disabled hidden>
                                                    Loại
                                                </option>
                                                {product.Sizes.map((value, key) => (
                                                    <option
                                                        value={value.size}
                                                        key={value.id}
                                                        setSearchTerm={value.size}
                                                    >
                                                        {value.size}
                                                    </option>
                                                ))}
                                            </select>
                                            <span class="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                                                <svg
                                                    fill="none"
                                                    stroke="currentColor"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    class="w-4 h-4"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M6 9l6 6 6-6"></path>
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <span className="active">{listOfSoluong[0]?.InventoryNumber} sản phẩm có sẵn</span>
                                </li>
                            </ul>

                            <p>Nếu chưa biết lựa chọn size bạn có thể inbox trực tiếp để được tư vấn !</p>
                            <div className="product_count">
                                <label htmlFor="qty">Số lượng:</label>
                                <input
                                    className="input-text qty !w-[50px]  mr-[20px] text-xl py-2 text-base pl-3 pr-10"
                                    type="text"
                                    name="qty"
                                    id="sst"
                                    maxLength={12}
                                    defaultValue={1}
                                    value={quantity}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    title="Quantity:"
                                />
                                <label htmlFor="qty">Thương hiệu:</label>
                                <select class="text-xl rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-10">
                                    <option>{product?.Brand?.name}</option>
                                </select>
                            </div>
                            <div className="card_area">
                                <a className="main_btn" href="#">
                                    <button onClick={handleAddToCart}>Thêm vào giỏ</button>
                                </a>
                                <a className="icon_btn" href="#">
                                    <i className="lnr lnr lnr-diamond" />
                                </a>
                                <a className="icon_btn" href="#">
                                    <i className="lnr lnr lnr-heart" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SingleProduct;
