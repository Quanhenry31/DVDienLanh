import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';
import { addToConten } from '~/redux/contenSlice';
import { toast } from 'react-toastify';

function ServicesUsuallyComp() {
    const user = useSelector((state) => state.user.user);

    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();
    const [name, setName] = useState('');
    const [servicesAll, setdataServicesAll] = useState(null);
    const [searchName, setSearchName] = useState(null);
    const [searchGoi, setSearchGoi] = useState(null);
    const [searchGoiSent, setSearchGoiSent] = useState(null);
    const [selectedPriceDefau, setSelectedPriceDefau] = useState(null);
    const [selectedImagDefau, setSelectedImgDefau] = useState(null);
    const [selectedTitle, setSelectedTitle] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedCapacity, setSelectedCapacity] = useState(null);
    const [information, setInformation] = useState('');

    const userData = JSON.parse(localStorage.getItem('selectedAddress'));
    console.log(name);

    const handleChange = (event) => {
        const selectedCapacity = event.target.value;
        setSelectedCapacity(selectedCapacity);
        const selectedCategory = searchName.rows
            .flatMap((service) => service.ServiceCategoriesUsuallys)
            .find((category) => category.capacity === selectedCapacity);

        if (selectedCategory) {
            setSelectedPriceDefau(selectedCategory?.price); // Cập nhật giá đã chọn
            setSelectedTitle(selectedCategory?.title);
            // dispatch(addToConten(selectedCategory?.title));
        }
    };
    const handleChangeGoi = (event) => {
        setSearchGoiSent(event.target.value);
    };

    dispatch(addToConten(selectedTitle));

    useEffect(() => {
        axios
            .get('http://localhost:9000/api/servicesUsually/all')
            .then((response) => {
                setdataServicesAll(response.data.data);
                setSelectedImgDefau(response.data.data[0].image);
            })
            .catch((error) => {
                console.error('There was an error fetching the product data!', error);
            });
    }, []);

    const handleSearchChange = (e) => {
        const selectedOption = e.target.selectedOptions[0]; // Lấy option được chọn
        const image = selectedOption.getAttribute('data-image');

        setSelectedImgDefau(image);

        setName(e.target.value);
        setSearchParams((params) => {
            if (e) {
                params.set('name', e.target.value);
            } else {
                params.delete('name');
            }
            return params;
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:9000/api/servicesUsually`, {
                    params: {
                        name: searchParams.get('name') || 'Điều hòa',
                        page: 1,
                        pageSize: searchParams.get('pageSize') ?? 1,
                    },
                });
                console.log(response.data);

                setSearchName(response.data);
                setSelectedPriceDefau(response?.data?.rows[0]?.ServiceCategoriesUsuallys[0]?.price);
                setSelectedCapacity(response?.data?.rows[0]?.ServiceCategoriesUsuallys[0]?.capacity);
                setSelectedTitle(response?.data?.rows[0]?.ServiceCategoriesUsuallys[0]?.title);
                dispatch(addToConten(response?.data?.rows[0]?.ServiceCategoriesUsuallys[0]?.title));
            } catch (error) {
                console.error('There was an error fetching the product data!', error);
            }
        };

        fetchData();
    }, [location.search]);

    const handleServicesOrderPay = (event) => {
        event.preventDefault();
        const formattedDate = selectedDate;
        const formattedTime = selectedTime;

        // Điều kiện kiểm tra trước khi gửi
        if (!name) {
            toast.error('Vui lòng chọn tên máy!');
            return;
        }
        if (!formattedDate) {
            toast.error('Vui lòng chọn ngày!');
            return;
        }

        if (!formattedTime) {
            toast.error('Vui lòng chọn giờ!');
            return;
        }

        if (!information || information.trim() === '') {
            toast.error('Vui lòng nhập thông tin bổ sung!');
            return;
        }

        if (!selectedCapacity) {
            toast.error('Vui lòng chọn loại dịch vụ!');
            return;
        }

        if (!selectedPriceDefau) {
            toast.error('Giá dịch vụ không hợp lệ!');
            return;
        }
        const sentValues = {
            name: name,
            type: selectedCapacity,
            date: formattedDate,
            time: formattedTime,
            price: selectedPriceDefau,
            information: information,
            status: 'Đang chờ',
            nameUser: userData?.name,
            phone: userData?.phone,
            email: userData?.email,
            addresses: userData?.address,
            typeServices: `Dịch vụ đăng ký định kỳ ${searchGoiSent}`,
        };
        console.log(sentValues);

        if (user.type) {
            axios
                .post(`http://localhost:9000/api/ServicesOrderPaysUsually`, sentValues)
                .then((response) => {
                    console.log('API Response:', response.data);
                    toast.success('Thanh toán thành công!');
                })
                .catch((error) => {
                    console.error('API Error:', error);
                });
        }
    };

    useEffect(() => {
        axios
            .get('http://localhost:9000/api/servicesTimeUsually')
            .then((response) => {
                console.log(response.data);
                setSearchGoi(response.data.data);
            })
            .catch((error) => {
                console.error('There was an error fetching the product data!', error);
            });
    }, []);
    return (
        <div className="product_image_area">
            <div className="container">
                <div className="row s_product_inner">
                    <div className="col-lg-6">
                        <div className="s_product_img">
                            <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                                <div className="carousel-inner">
                                    <div className="carousel-item active">
                                        <div className="w-[700px] h-[500px]">
                                            <img
                                                className="d-block w-full h-full "
                                                src={
                                                    selectedImagDefau ||
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
                        <form onSubmit={handleServicesOrderPay}>
                            <div className="s_product_text">
                                <h3>Dịch vụ đăng ký định kỳ</h3>
                                {/* <h2>{product.price} VND</h2> */}
                                <h2>Uy tín - An toàn - Nhanh ngọn</h2>
                                <ul className="list">
                                    <li>
                                        <div class="flex  items-center">
                                            <span class=" w-[100px]">Tên máy</span>

                                            <div class="relative">
                                                <select
                                                    className="!text-[18px] rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-red-500  pl-3 pr-10"
                                                    onChange={handleSearchChange}
                                                    value={name}
                                                >
                                                    <option value="" disabled hidden>
                                                        Tên máy
                                                    </option>

                                                    {servicesAll?.map((value, key) => (
                                                        <option
                                                            data-image={value.image}
                                                            value={value.name}
                                                            key={value.id}
                                                            setSearchParams={value.name}
                                                        >
                                                            {value.name}
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
                                        <div class="flex  items-center">
                                            <span class=" w-[100px]">Loại</span>

                                            <div class="relative">
                                                <select
                                                    onChange={handleChange}
                                                    className="!text-[18px] rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-red-500  pl-3 pr-10"
                                                >
                                                    <option value="" disabled hidden>
                                                        Loại
                                                    </option>

                                                    {searchName?.rows?.map((service) =>
                                                        service?.ServiceCategoriesUsuallys?.map((category) => (
                                                            <option value={category.capacity} key={category.id}>
                                                                {category.capacity}
                                                            </option>
                                                        )),
                                                    )}
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
                                        <div class="flex  items-center">
                                            <span class=" w-[100px]">Gói</span>

                                            <div class="relative">
                                                <select
                                                    onChange={handleChangeGoi}
                                                    className="!text-[18px] rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-red-500  pl-3 pr-10"
                                                >
                                                    <option value="" disabled hidden>
                                                        Gói
                                                    </option>

                                                    {searchGoi?.map((value) => (
                                                        <option key={value.id}>{value.name}</option>
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
                                    <li className="flex flex-col space-y-4">
                                        {/* Chọn ngày */}
                                        <div className="flex flex-col">
                                            <label className="text-gray-700 font-semibold mb-1" htmlFor="date">
                                                Chọn ngày
                                            </label>
                                            <input
                                                type="date"
                                                id="date"
                                                value={selectedDate}
                                                onChange={(e) => setSelectedDate(e.target.value)}
                                                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                                            />
                                        </div>

                                        {/* Chọn giờ */}
                                        <div className="flex flex-col">
                                            <label className="text-gray-700 font-semibold mb-1" htmlFor="time">
                                                Chọn giờ
                                            </label>
                                            <input
                                                type="time"
                                                id="time"
                                                value={selectedTime}
                                                onChange={(e) => setSelectedTime(e.target.value)}
                                                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                                            />
                                        </div>
                                    </li>
                                    <li>
                                        <span className="active">Giá {selectedPriceDefau || 0} vnđ</span>
                                    </li>
                                    <textarea
                                        rows="4"
                                        placeholder="Nhập thêm thông tin( Tình trạng máy,...)"
                                        id="basic_address"
                                        aria-required="true"
                                        className="ant-input css-dev-only-do-not-override-zg0ahe ant-input-outlined w-[100%] border"
                                        value={information} // Liên kết giá trị với state
                                        onChange={(e) => setInformation(e.target.value)} // Cập nhật state khi nhập
                                    ></textarea>
                                </ul>

                                <p>Bạn có thể inbox trực tiếp để được tư vấn !</p>

                                <div className="card_area">
                                    <button type="submit" className="main_btn">
                                        <button>Đặt lịch</button>
                                    </button>
                                    <a className="icon_btn" href="#">
                                        <i className="lnr lnr lnr-diamond" />
                                    </a>
                                    <a className="icon_btn" href="#">
                                        <i className="lnr lnr lnr-heart" />
                                    </a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ServicesUsuallyComp;
