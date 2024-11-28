import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { faHandHoldingDollar, faPeopleCarryBox, faUser } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'bootstrap/dist/js/bootstrap.bundle.min';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Voucher from '~/components/Cart/Models/Voucher';
import { useSelector } from 'react-redux';
import UploadImage from '~/components/UploadImage';
import axios from 'axios';

function User() {
    const user = useSelector((state) => state.user.user);

    const [voucher, setVoucherBtn] = useState(false);

    const [values, setValues] = useState({
        userName: '',
        phone: '',
        address: '',
        image: '',
    });
    console.log(values);

    axios.defaults.withCredentials = true;
    const handleUserUpdate = (event) => {
        event.preventDefault();
        if (user.type === 'google') {
            window.location.href = 'https://myaccount.google.com/'; // Chuyển hướng người dùng
            toast.success('Chuyển hướng đến trang tài khoản Google'); // Hiển thị thông báo thành công
        }

        if (user.type === 'AccountBasic') {
            axios
                .put(`http://localhost:9000/api/users/${user.id}`, values)
                .then((res) => {
                    if (res.status === 200) {
                        window.location.reload();
                    } else {
                        alert('Error');
                    }
                })
                .catch((error) => {
                    if (error.response.status === 401) {
                        alert('Password not matched'); // Display message locally
                    } else {
                        console.error(error);
                        alert('Error occurred during login');
                    }
                });
            toast.success('AccountBasic');
        }
    };

    return (
        <div className="flex gap-6 p-6 bg-gray-50 min-h-screen">
            {/* Cột 1: Ảnh, tên người dùng, email xác thực */}
            <div className="w-1/4 bg-white shadow-md p-6 rounded-lg flex flex-col items-center">
                {user.email ? (
                    <>
                        <img src={user?.image} alt="User Avatar" className="w-32 h-32 rounded-full mb-4" />
                        <h2 className="text-xl font-semibold mb-2">{user?.userName}</h2>
                        <p className="text-gray-600 mb-1">{user?.email}</p>
                        <p className="text-green-600">
                            Đã xác thực <FontAwesomeIcon icon={faCircleCheck} style={{ color: '#44c936' }} />
                        </p>
                    </>
                ) : (
                    <>
                        <img
                            src="https://cellphones.com.vn/sforum/wp-content/uploads/2024/02/anh-avatar-cute-95.jpg"
                            alt="User Avatar"
                            className="w-32 h-32 rounded-full mb-4"
                        />
                        <h2 className="text-xl font-semibold mb-2">Tên người dùng</h2>
                        <p className="text-gray-600 mb-1">email@example.com</p>
                        <p className="text-green-600">
                            Đã xác thực <FontAwesomeIcon icon={faCircleCheck} style={{ color: '#44c936' }} />
                        </p>
                    </>
                )}
            </div>

            {/* Cột 2: Nhập thông tin cá nhân */}
            <div className="w-2/4 bg-white shadow-md p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Thông tin cá nhân</h3>
                <form onSubmit={handleUserUpdate} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Họ tên</label>
                        <input
                            type="text"
                            className="mt-1 p-2 border rounded w-full"
                            onChange={(e) => setValues({ ...values, userName: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Số điện thoại</label>
                        <input
                            type="tel"
                            className="mt-1 p-2 border rounded w-full"
                            onChange={(e) => setValues({ ...values, phone: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Địa chỉ</label>
                        <input
                            type="text"
                            className="mt-1 p-2 border rounded w-full"
                            onChange={(e) => setValues({ ...values, address: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Giới tính</label>
                        <select className="mt-1 p-2 border rounded w-full">
                            <option>Nam</option>
                            <option>Nữ</option>
                            <option>Khác</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Ngày sinh</label>
                        <input type="date" className="mt-1 p-2 border rounded w-full" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Tải ảnh</label>
                        {/* <input type="file" className="mt-1 p-2 border rounded w-full" /> */}
                        <UploadImage url={values?.image} setUrl={setValues} />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="h-[50px] focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-2xl px-6 py-3 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                        >
                            Lưu thông tin
                        </button>
                    </div>
                </form>
            </div>

            {/* Cột 3: Danh mục */}
            <div className="w-1/4 bg-white shadow-md p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Danh mục</h3>
                <ul className="space-y-4">
                    <li>
                        <button className="text-left w-full  font-medium">
                            <FontAwesomeIcon icon={faUser} className="mr-[5px] text-blue-600 size-[18px]" />
                            <span className="text-black"> Tài khoản của tôi</span>
                        </button>
                        <ul className="pl-4 mt-2 ml-10 space-y-2">
                            <li>
                                <button
                                    onClick={() => {
                                        toast.success('Bạn đang trong trang hồ sơ!');
                                    }}
                                    className="text-left w-full text-gray-700"
                                >
                                    <span className="text-[14px]">Hồ sơ</span>
                                </button>
                            </li>
                            <li>
                                <Link to="/cart" className="text-left w-full text-gray-700">
                                    <span className="text-[14px]">Địa chỉ</span>
                                </Link>
                            </li>
                            <li>
                                <button className="text-left w-full text-gray-700">
                                    <span className="text-[14px]">Đổi mật khẩu</span>
                                </button>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <Link to="/order " className="text-left w-full  font-medium">
                            <FontAwesomeIcon icon={faPeopleCarryBox} className="mr-[5px] text-green-600 size-[22px]" />
                            <span className="text-black"> Đơn mua</span>
                        </Link>
                    </li>
                    <li>
                        <button onClick={() => setVoucherBtn(true)} className="text-left w-full  font-medium">
                            <FontAwesomeIcon
                                icon={faHandHoldingDollar}
                                className="mr-[5px] text-yellow-500 size-[24px]"
                            />
                            <span className="text-black"> Kho voucher</span>
                        </button>
                    </li>
                    <Voucher isVoucherModalOpen={voucher} setIsVoucherModalOpen={setVoucherBtn} />
                </ul>
            </div>
        </div>
    );
}

export default User;
