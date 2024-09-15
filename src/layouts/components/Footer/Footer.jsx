import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Footer.module.scss';
import classNames from 'classnames/bind';
import { faEnvelope, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button';
import { Link } from 'react-router-dom';
import config from '~/config';
import { faFacebook, faInstagram, faTwitter, faYahoo, faYoutube } from '@fortawesome/free-brands-svg-icons';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <>
            {/*================ start footer Area  =================*/}
            <footer className="footer-area section_gap">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-2 col-md-6 single-footer-widget">
                            <h4>Dịch vụ điện lạnh số 1 Việt Nam</h4>
                            <ul>
                                <li>
                                    <a href="#">Sản phẩm mới</a>
                                </li>
                                <li>
                                    <a href="#">Sản phẩm bán chạy</a>
                                </li>
                                <li>
                                    <a href="#">Danh sách sản phẩm</a>
                                </li>
                                <li>
                                    <div className="footer-bottom row align-items-center ml-[30px]">
                                        <p className="footer-text m-0 col-lg-8 col-md-12">
                                            {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                                            Copyright © All rights reserved | This template is made with
                                            <i className="fa fa-heart-o" aria-hidden="true" /> by
                                            <a target="_blank">Colorlib</a>
                                            {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                                        </p>
                                        <div className="col-lg-4 col-md-12  flex items-center justify-center">
                                            <a href="#" className=" flex items-center justify-center mr-[10px]">
                                                <FontAwesomeIcon className="size-10" icon={faFacebook} />
                                            </a>
                                            <a href="#" className=" flex items-center justify-center mr-[10px]">
                                                <FontAwesomeIcon className="size-10 " icon={faTwitter} />
                                            </a>
                                            <a href="#" className=" flex items-center justify-center mr-[10px]">
                                                <FontAwesomeIcon className="size-10 " icon={faYoutube} />
                                            </a>
                                            <a href="#" className=" flex items-center justify-center">
                                                <FontAwesomeIcon className="size-10 " icon={faYahoo} />
                                            </a>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-2 col-md-6 single-footer-widget">
                            <h4>Liên kết nhanh</h4>
                            <ul>
                                <li>
                                    <a href="#">Giới thiệu</a>
                                </li>
                                <li>
                                    <a href="#">Sản phẩm</a>
                                </li>
                                <li>
                                    <a href="#">Khuyến mại</a>
                                </li>
                                <li>
                                    <a href="#">Liên hệ</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-2 col-md-6 single-footer-widget">
                            <h4>Chính sách</h4>
                            <ul>
                                <li>
                                    <a href="#">Điều khoản sử dụng</a>
                                </li>
                                <li>
                                    <a href="#">Chính sách bảo mật</a>
                                </li>
                                <li>
                                    <a href="#">Chính sách bảo hành</a>
                                </li>
                                <li>
                                    <a href="#">Chính sách vận chuyển</a>
                                </li>
                            </ul>
                        </div>

                        <div className="col-lg-4 col-md-6 single-footer-widget">
                            <h4>Địa chỉ</h4>

                            <div className="w-[600px] h-[300px]">
                                <iframe
                                    className="w-full h-full"
                                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d232.9072703950931!2d106.05772133649101!3d20.931770367510953!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1684960810482!5m2!1svi!2s"
                                    width={600}
                                    height={450}
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            {/*================ End footer Area  =================*/}
        </>
    );
}

export default Footer;
