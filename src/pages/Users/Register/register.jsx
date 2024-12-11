import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Register() {
    const googleAuth = () => {
        window.open(`${process.env.REACT_APP_API_URL}/auth/google/callback`, '_self');
    };

    const [values, setValues] = useState({
        userName: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        type: 'AccountBasic',
        role: 2,
    });
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        // Kiểm tra dữ liệu trước khi gửi
        if (!values.userName) {
            toast.error('Tên là bắt buộc');
            return;
        }
        if (!values.password) {
            toast.error('Mật khẩu là bắt buộc');
            return;
        }
        if (!values.email.endsWith('@gmail.com')) {
            toast.error('Email phải kết thúc bằng @gmail.com');
            return;
        }
        if (isNaN(values.phone) || values.phone.length !== 10) {
            toast.error('Số điện thoại phải là số có 10 chữ số');
            return;
        }

        axios
            .post('http://localhost:9000/api/users', values)
            .then((res) => {
                if (res.status === 200) {
                    navigate('/login');
                }
            })
            .catch((error) => {
                if (error.response && error.response.status === 500) {
                    toast.error(error.response.data.message || 'Email already exists.');
                } else {
                    toast.error('An error occurred. Please try again.');
                }
                console.error('Error:', error);
            });
    };

    return (
        <div className="container mx-auto">
            <div className="flex justify-center px-6 my-12">
                <div className="w-full xl:w-3/4 lg:w-11/12 flex">
                    <Link
                        to="/"
                        className="w-full h-[700px] bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"
                        style={{
                            backgroundImage:
                                'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXx2xFk_wEb1hLQoDo4Ar3YbhosCPyOCfOgA&s")',
                        }}
                    />
                    <div className="w-full lg:w-1/2 bg-white pl-5 rounded-lg lg:rounded-l-none">
                        <h3 className="text-center text-[40px]">Welcome Back!</h3>
                        <form onSubmit={handleSubmit} className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                            <div className="mb-4">
                                <label
                                    className="text-[12px] block mb-2 text-sm font-bold text-gray-700"
                                    htmlFor="username"
                                >
                                    Username
                                </label>
                                <input
                                    className="text-[16px] w-full h-[50px] px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow focus:outline-none focus:shadow-outline"
                                    id="username"
                                    type="text"
                                    placeholder="Username"
                                    onChange={(e) => setValues({ ...values, userName: e.target.value })}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    className="text-[12px] block mb-2 text-sm font-bold text-gray-700"
                                    htmlFor="password"
                                >
                                    Password
                                </label>
                                <input
                                    className="text-[16px] w-full h-[50px] px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow focus:outline-none focus:shadow-outline"
                                    id="password"
                                    type="password"
                                    onChange={(e) => setValues({ ...values, password: e.target.value })}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    className="text-[12px] block mb-2 text-sm font-bold text-gray-700"
                                    htmlFor="email"
                                >
                                    Email
                                </label>
                                <input
                                    className="text-[16px] w-full h-[50px] px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow focus:outline-none focus:shadow-outline"
                                    id="email"
                                    type="email"
                                    placeholder="Email"
                                    onChange={(e) => setValues({ ...values, email: e.target.value })}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    className="text-[12px] block mb-2 text-sm font-bold text-gray-700"
                                    htmlFor="phone"
                                >
                                    Phone
                                </label>
                                <input
                                    className="text-[16px] w-full h-[50px] px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow focus:outline-none focus:shadow-outline"
                                    id="phone"
                                    type="text"
                                    placeholder="Phone"
                                    onChange={(e) => setValues({ ...values, phone: e.target.value })}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    className="text-[12px] block mb-2 text-sm font-bold text-gray-700"
                                    htmlFor="address"
                                >
                                    Address
                                </label>
                                <input
                                    className="text-[16px] w-full h-[50px] px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow focus:outline-none focus:shadow-outline"
                                    id="address"
                                    type="text"
                                    placeholder="Address"
                                    onChange={(e) => setValues({ ...values, address: e.target.value })}
                                />
                            </div>
                            <div className="mb-4 flex items-center">
                                <input className="mr-2 leading-tight" type="checkbox" id="remember_me" />
                                <label className="text-sm" htmlFor="remember_me">
                                    Remember Me
                                </label>
                            </div>
                            <div className="mb-6 text-center">
                                <button
                                    className="w-full h-[50px] px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                                    type="submit"
                                >
                                    Register
                                </button>
                            </div>

                            <hr className="mb-6 border-t" />
                            <div className="flex justify-between">
                                <Link className="inline-block text-sm text-blue-500 hover:text-blue-800" to="/login">
                                    Create an Account!
                                </Link>
                                <Link className="inline-block text-sm text-red-500 hover:text-blue-800" to="#">
                                    Forgot Password?
                                </Link>
                            </div>
                            <div className="flex justify-center mt-6 space-x-4">
                                <button
                                    className="flex items-center justify-center w-[90px] h-[50px] px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none"
                                    type="button"
                                    onClick={googleAuth}
                                >
                                    <FontAwesomeIcon icon={faGoogle} size="2xs" />
                                </button>
                                <button
                                    className="flex items-center justify-center w-[90px] h-[50px] px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none"
                                    type="button"
                                >
                                    <FontAwesomeIcon icon={faFacebook} size="2xs" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
