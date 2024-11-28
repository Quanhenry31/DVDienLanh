import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HeartIcon, MagnifyingGlassIcon, ShoppingCartIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadset } from '@fortawesome/free-solid-svg-icons';
import Chat from '~/components/Chat/Chat';

import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '~/AuthContext';

function Header() {
    const user = useSelector((state) => state.user.user);

    const [chat, setChatBtn] = useState(false);
    const cart = useSelector((state) => state.cart.cart);
    const getTotalQuantity = () => {
        let total = 0;
        cart.forEach((item) => {
            total += item.quantity;
        });
        return total;
    };

    const logout = () => {
        if (user.type == 'google') {
            try {
                toast.success('Đăng xuất thành công!');
                setTimeout(() => {
                    window.open(`${process.env.REACT_APP_API_URL}/auth/logout`, '_self');
                }, 2000);
            } catch (err) {
                toast.success('Đăng xuất lỗi!');
                console.log(err);
            }
        }
        if (user.type == 'AccountBasic') {
            try {
                toast.success('Đăng xuất thành công!');
                setTimeout(() => {
                    window.open(`${process.env.REACT_APP_API_URL}/api/users/logout`, '_self');
                }, 2000);
            } catch (err) {
                toast.success('Đăng xuất lỗi!');
                console.log(err);
            }
        }
    };

    return (
        <header>
            <div>
                <header className="header_area">
                    <div className="top_menu">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-7">
                                    <div className="float-left">
                                        <p>Phone: 0789270752</p>
                                        <p>email: dienlanhbackkhoa@gmail.com</p>
                                    </div>
                                </div>
                                <div className="col-lg-5">
                                    <div className="float-right">
                                        <ul className="right_side">
                                            {user.email ? (
                                                <li>
                                                    <Link onClick={logout}>Đăng xuất</Link>
                                                </li>
                                            ) : (
                                                <li>
                                                    <Link to="/login"> Đăng nhập </Link>
                                                </li>
                                            )}
                                            <li>
                                                <Link onClick={logout} to="/register">
                                                    Đăng kí
                                                </Link>
                                            </li>
                                            <li>
                                                <a href="contact.html"> VN </a>
                                            </li>
                                            <li>
                                                <a href="contact.html"> EN </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="main_menu">
                        <div className="container">
                            <nav className="navbar navbar-expand-lg navbar-light w-100">
                                {/* Brand and toggle get grouped for better mobile display */}
                                <Link className="navbar-brand logo_h" to="/">
                                    <img
                                        className="w-[130px] h-[90px]"
                                        src="https://s3.amazonaws.com/babelcube/users/60ba26c817a3d_in-lnh_logo-dienlanhnguyenduc.png"
                                        alt=""
                                    />
                                </Link>
                                <button
                                    className="navbar-toggler"
                                    type="button"
                                    data-toggle="collapse"
                                    data-target="#navbarSupportedContent"
                                    aria-controls="navbarSupportedContent"
                                    aria-expanded="false"
                                    aria-label="Toggle navigation"
                                >
                                    <span className="icon-bar" />
                                    <span className="icon-bar" />
                                    <span className="icon-bar" />
                                </button>
                                {/* Collect the nav links, forms, and other content for toggling */}
                                <div className="ml-[100px] navbar-collapse offset w-100" id="navbarSupportedContent">
                                    <div className="row w-100 mr-0">
                                        <div className="col-lg-8 pr-0">
                                            <ul className="nav navbar-nav center_nav pull-right">
                                                <li className="nav-item active">
                                                    <Link className="nav-link" to="/">
                                                        Trang chủ
                                                    </Link>
                                                </li>
                                                <li className="nav-item submenu dropdown">
                                                    <Link
                                                        to="/category"
                                                        className="nav-link dropdown-toggle"
                                                        data-toggle="dropdown"
                                                        role="button"
                                                        aria-haspopup="true"
                                                        aria-expanded="false"
                                                    >
                                                        Cửa hàng
                                                    </Link>
                                                </li>
                                                <li className="nav-item submenu dropdown">
                                                    <Link
                                                        to="/category"
                                                        className="nav-link dropdown-toggle"
                                                        data-toggle="dropdown"
                                                        role="button"
                                                        aria-haspopup="true"
                                                        aria-expanded="false"
                                                    >
                                                        Dịch vụ
                                                    </Link>
                                                </li>
                                                <li className="nav-item submenu dropdown">
                                                    <Link
                                                        to="/blog"
                                                        className="nav-link dropdown-toggle"
                                                        data-toggle="dropdown"
                                                        role="button"
                                                        aria-haspopup="true"
                                                        aria-expanded="false"
                                                    >
                                                        Tin tức
                                                    </Link>
                                                    <ul className="dropdown-menu">
                                                        <li className="nav-item">
                                                            <Link className="nav-link" to="/blogDetail/1">
                                                                Chi tiết
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </li>

                                                <li className="nav-item">
                                                    <a className="nav-link" href="contact.html">
                                                        Giới Thiệu
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col-lg-4 pr-0 d-flex align-items-center">
                                            <ul className="nav navbar-nav navbar-right right_nav pull-right d-flex align-items-center ml-[30%]">
                                                <li className="nav-item">
                                                    <a href="#" className="icons d-flex align-items-center">
                                                        <MagnifyingGlassIcon className="size-8 text-black-500" />
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <Link to="/cart" className="icons d-flex align-items-center">
                                                        <ShoppingCartIcon className="size-8 text-black-500" />
                                                        {getTotalQuantity() || 0}
                                                    </Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link to="/user" className="icons d-flex align-items-center">
                                                        {user.email ? (
                                                            <img
                                                                src={user?.image}
                                                                alt=""
                                                                className="rounded-full w-[20px] h-[20px]"
                                                            ></img>
                                                        ) : (
                                                            <UserCircleIcon className="size-8 text-black-500" />
                                                        )}
                                                    </Link>
                                                </li>
                                                <li className="nav-item">
                                                    <a href="#" className="icons d-flex align-items-center">
                                                        <HeartIcon className="size-8 text-black-500" />
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <button
                                                        onClick={() => setChatBtn(true)}
                                                        className="icons d-flex align-items-center"
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faHeadset}
                                                            className="size-8 text-black-500"
                                                        />
                                                    </button>
                                                </li>
                                                <Chat isChatModalOpen={chat} setIsChatModalOpen={setChatBtn} />
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div>
                </header>
                {/*================Header Menu Area =================*/}
            </div>
        </header>
    );
}

export default Header;
