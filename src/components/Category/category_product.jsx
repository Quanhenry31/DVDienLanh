import { EyeIcon, HeartIcon, ShoppingCartIcon } from '@heroicons/react/24/solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addToCart } from '~/redux/cartSlice';

function CategoryProduct() {
    const dispatch = useDispatch();
    const location = useLocation();

    const [listOfPosts, setListOfPosts] = useState([]);
    const [size, setSize] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [displayCount, setDisplayCount] = useState(6);
    const [category, setCategory] = useState(null);
    const [brands, setBrand] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedOption, setSelectedOption] = useState('Dịch vụ');
    console.log(selectedOption);

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
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:9000/api/products`, {
                    params: {
                        brandID: searchParams.get('brand'),
                        categoryID: searchParams.get('category'),
                        sort: searchParams.get('sort') ?? 'ASC',
                        page: 1,
                        pageSize: searchParams.get('pageSize') ?? 2,
                        name: searchParams.get('name'),
                    },
                });
                setListOfPosts(response.data.rows);
            } catch (error) {
                console.error('There was an error fetching the product data!', error);
            }
        };

        fetchData();
    }, [location.search, displayCount, selectedCategory, selectedBrand, searchTerm]);

    const handleSearchChange = (e) => {
        setSearchParams((params) => {
            if (e) {
                params.set('name', e.target.value);
            } else {
                params.delete('name');
            }
            return params;
        });
        setSearchTerm(e.target.value);
    };

    const handleSortChange = (e) => {
        const value = e.target.value;
        console.log(value);

        setSearchParams((params) => {
            if (value === '2') {
                console.log(value);

                params.set('sort', 'ASC');
            } else if (value === '3') {
                params.set('sort', 'DESC');
            } else {
                params.delete('sort');
                console.log('oke');
            }
            return params;
        });
    };

    const handleDisplayCountChange = (e) => {
        setDisplayCount(parseInt(e.target.value));
        const DisplayNumber = parseInt(e.target.value);

        setSearchParams((params) => {
            if (DisplayNumber === 6) {
                params.set('pageSize', 6);
            } else if (DisplayNumber === 12) {
                params.set('pageSize', 12);
            } else if (DisplayNumber === 18) {
                params.set('pageSize', 18);
            } else {
                params.delete('pageSize');
            }
            return params;
        });
    };

    const fetchCategoryData = async () => {
        try {
            const response = await axios.get('http://localhost:9000/api/categorys');
            setCategory(response.data.data);
        } catch (error) {
            console.error('There was an error fetching the category data!', error);
        }
    };

    const fetchBrandData = async () => {
        try {
            const response = await axios.get('http://localhost:9000/api/brands');
            setBrand(response.data.data);
        } catch (error) {
            console.error('There was an error fetching the brands data!', error);
        }
    };

    const handleSelectCategory = (category) => {
        setSearchParams((params) => {
            if (category) {
                params.set('category', category?.id);
            } else {
                params.delete('category');
            }
            return params;
        });
        setSelectedCategory(category);
    };

    const handleSelectBrand = (brand) => {
        setSearchParams((params) => {
            if (brand) {
                params.set('brand', brand?.id);
            } else {
                params.delete('brand');
            }
            return params;
        });
        setSelectedBrand(brand);
    };

    useEffect(() => {
        fetchCategoryData();
        fetchBrandData();
    }, []);
    // Load giá trị từ localStorage khi component được mount
    useEffect(() => {
        const storedOption = localStorage.getItem('storeType');
        if (storedOption) {
            setSelectedOption(storedOption);
        }
    }, []);
    // Hàm xử lý khi người dùng chọn "Sản phẩm" hoặc "Dịch vụ"
    const handleSelectOption = (option) => {
        setSelectedOption(option);
        localStorage.setItem('storeType', option); // Lưu vào localStorage
        setSearchParams((params) => {
            if (option === 'Dịch vụ') {
                params.delete('brand');
                params.delete('sort');
                params.delete('category');
                params.delete('pageSize');
                params.delete('name');
            }
            return params;
        });
    };

    return (
        <section className="cat_product_area section_gap">
            <div className="container">
                <div className="row flex-row-reverse">
                    <div className="col-lg-9">
                        {selectedOption === 'Sản phẩm' ? (
                            <div className="product_top_bar">
                                <div className="left_dorp flex items-center">
                                    <select className="sorting mr-2" onChange={handleSortChange}>
                                        <option value={1}>Sắp xếp</option>
                                        <option value={2}>Giá tiền thấp đến cao</option>
                                        <option value={3}>Giá tiền cao đến thấp</option>
                                        <option value={4}>Theo tên</option>
                                    </select>
                                    <select className="show mr-2" onChange={handleDisplayCountChange}>
                                        <option value={6}>Hiển thị 6</option>
                                        <option value={12}>Hiển thị 12</option>
                                        <option value={18}>Hiển thị 18</option>
                                    </select>
                                    <div className="relative flex items-center">
                                        <input
                                            type="text"
                                            placeholder="Tìm kiếm theo tên"
                                            value={searchTerm}
                                            onChange={handleSearchChange}
                                            className="search pr-10 pl-4 py-2 border rounded-lg w-full focus:outline-none focus:border-blue-500"
                                        />
                                        <FontAwesomeIcon icon={faSearch} className="absolute right-3 text-gray-500" />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <></>
                        )}

                        <div className="latest_product_inner">
                            <div className="row">
                                {selectedOption === 'Sản phẩm' ? (
                                    listOfPosts?.map((value) => (
                                        <div key={value.id} className="col-lg-4 col-md-6">
                                            <div className="single-product">
                                                <Link to={`/detail/${value.id}`}>
                                                    <div className="product-img">
                                                        <div className="w-[285px] h-[260px] ">
                                                            <img
                                                                className="card-img w-full h-full "
                                                                src={value.ImgDetails[0].image}
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
                                                </Link>
                                                <div className="product-btm">
                                                    <a href="#" className="d-block">
                                                        <h4>{value.name}</h4>
                                                    </a>
                                                    <div className="mt-3 flex items-center justify-between">
                                                        <span className="mr-4">{value.price} vnđ</span>

                                                        <select
                                                            className="!text-[18px] rounded border appearance-none border-gray-400 py-3 focus:outline-none focus:border-red-500 text-base pl-3 pr-10 ml-auto"
                                                            onChange={(e) => handleSizeChange(value.id, e.target.value)}
                                                            value={size[value.id] || ''}
                                                        >
                                                            <option value="" disabled hidden>
                                                                Size
                                                            </option>
                                                            {value.Sizes.map((sizeOption) => (
                                                                <option value={sizeOption.size} key={sizeOption.id}>
                                                                    {sizeOption.size}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <>
                                        <div className="">
                                            <div className="flex">
                                                {/* Dịch vụ 1 */}
                                                <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 w-[300px] mr-4">
                                                    <Link to="/ServicesOrder">
                                                        <img
                                                            className="w-full h-48"
                                                            src="https://cdn.tgdd.vn//News/1064773//buoc3-vesinh-730x407.jpg"
                                                            alt="Dịch vụ bảo dưỡng máy lạnh"
                                                        />
                                                        <div className="p-6">
                                                            <h4 className="text-[20px] font-semibold mb-2">
                                                                Đặt lịch bảo dưỡng
                                                            </h4>
                                                            <p className="text-gray-700 mb-4">
                                                                Dịch vụ vệ sinh định kì giúp giữ cho thiết bị của bạn
                                                                luôn sạch sẽ và an toàn.
                                                            </p>
                                                            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                                                                Đăng Ký Ngay
                                                            </button>
                                                        </div>
                                                    </Link>
                                                </div>

                                                {/* Dịch vụ 2 */}
                                                <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 w-[300px]">
                                                    <Link to="/ServicesUsually">
                                                        <img
                                                            className="w-full h-48"
                                                            src="https://hitachi-service.com/wp-content/uploads/2024/01/bao-hanh-tu-lanh-hitachi-tai-bac-giang-3.png"
                                                            alt="Dịch vụ vệ sinh định kì"
                                                        />
                                                        <div className="p-6">
                                                            <h4 className="text-[20px] font-semibold mb-2">
                                                                Dịch vụ đăng ký định kỳ
                                                            </h4>
                                                            <p className="text-gray-700 mb-4">
                                                                Đảm bảo máy lạnh của bạn luôn hoạt động hiệu quả với
                                                                dịch vụ bảo dưỡng định kỳ.
                                                            </p>
                                                            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                                                                Đăng Ký Ngay
                                                            </button>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="left_sidebar_area">
                            <aside className="left_widgets p_filter_widgets">
                                <div className="l_w_title">
                                    <h3>Cửa hàng</h3>
                                </div>
                                <div className="widgets_inner">
                                    <ul className="list">
                                        <li>
                                            <input
                                                className="!h-[14px] !w-[30px]"
                                                type="radio"
                                                name="Cuahang"
                                                checked={selectedOption === 'Sản phẩm'}
                                                onChange={() => handleSelectOption('Sản phẩm')}
                                            />
                                            <span>Sản phẩm</span>
                                        </li>
                                        <li>
                                            <input
                                                className="!h-[14px] !w-[30px]"
                                                type="radio"
                                                name="Cuahang"
                                                checked={selectedOption === 'Dịch vụ'}
                                                onChange={() => handleSelectOption('Dịch vụ')}
                                            />
                                            <span>Dịch vụ</span>
                                        </li>
                                    </ul>
                                </div>
                            </aside>
                            {selectedOption === 'Sản phẩm' ? (
                                <aside className="left_widgets p_filter_widgets">
                                    <div className="l_w_title">
                                        <h3>Các danh mục</h3>
                                    </div>
                                    <div className="widgets_inner">
                                        <ul className="list">
                                            <li>
                                                <input
                                                    className="!h-[14px] !w-[30px]"
                                                    type="radio"
                                                    name="deliveryCategory"
                                                    onChange={() => handleSelectCategory(null)}
                                                    checked={!selectedCategory}
                                                />
                                                <span>Tất cả</span>
                                            </li>
                                            {category?.map((value) => (
                                                <li key={value.id}>
                                                    <input
                                                        className="!h-[14px] !w-[30px]"
                                                        type="radio"
                                                        name="deliveryCategory"
                                                        value={value.id}
                                                        onChange={() => handleSelectCategory(value)}
                                                        checked={selectedCategory?.id === value.id}
                                                    />
                                                    <span>{value.name}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </aside>
                            ) : (
                                <></>
                            )}
                            {selectedOption === 'Sản phẩm' ? (
                                <aside className="left_widgets p_filter_widgets">
                                    <div className="l_w_title">
                                        <h3>Thương hiệu</h3>
                                    </div>
                                    <div className="widgets_inner">
                                        <ul className="list">
                                            <li>
                                                <input
                                                    className="!h-[14px] !w-[30px]"
                                                    type="radio"
                                                    name="deliveryBrand"
                                                    onChange={() => handleSelectBrand(null)}
                                                    checked={!selectedBrand}
                                                />
                                                <span>Tất cả</span>
                                            </li>
                                            {brands?.map((value) => (
                                                <li key={value.id}>
                                                    <input
                                                        className="!h-[14px] !w-[30px]"
                                                        type="radio"
                                                        name="deliveryBrand"
                                                        value={value.id}
                                                        onChange={() => handleSelectBrand(value)}
                                                        checked={selectedBrand?.id === value.id}
                                                    />
                                                    <span>{value.name}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </aside>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CategoryProduct;
