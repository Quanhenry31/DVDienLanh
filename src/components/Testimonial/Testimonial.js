import Slider from 'react-slick';

import styles from './Testimonial.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

function Testimonial() {
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: true,
    };
    return (
        <div className={cx('testimonial-section')}>
            <div className={cx('container')}>
                <div className={cx('row')}>
                    <div className={cx('col-lg-7', 'mx-auto', 'text-center')}>
                        <h2 className={cx('section-title')}>Testimonials</h2>
                    </div>
                </div>
                <div className={cx('row', 'justify-content-center')}>
                    <div className={cx('col-lg-12')}>
                        <div className={cx('testimonial-slider-wrap', 'text-center')}>
                            <div className={cx('testimonial-slider')}>
                                <div className={cx('item')}>
                                    <div className={cx('row', 'justify-content-center')}>
                                        <div className={cx('col-lg-8', 'mx-auto')}>
                                            <div className={cx('testimonial-block', 'text-center')}>
                                                <Slider {...settings}>
                                                    <div>
                                                        <h3>
                                                            {' '}
                                                            <blockquote className={cx('mb-5')}>
                                                                <p>
                                                                    “Tôi đang tìm kiếm các lựa chọn nội thất bền vững và
                                                                    tìm thấy chính xác những gì tôi cần tại SUPO. Chất
                                                                    liệu thân thiện với môi trường và thiết kế thời
                                                                    trang của họ chính là thứ tôi đang tìm kiếm. Ngoài
                                                                    ra, cam kết của họ về tính bền vững khiến tôi cảm
                                                                    thấy hài lòng khi mua hàng.”
                                                                </p>
                                                            </blockquote>
                                                            <div className={cx('author-info')}>
                                                                <div
                                                                    className={cx(
                                                                        'author-pic',
                                                                        'd-flex',
                                                                        'justify-content-center',
                                                                        'align-items-center',
                                                                    )}
                                                                >
                                                                    <img
                                                                        src="https://themewagon.github.io/furni/images/person-1.png"
                                                                        alt="Maria Jones"
                                                                        className={cx('img-fluid')}
                                                                    />
                                                                </div>
                                                                <h3 className={cx('font-weight-bold')}>
                                                                    Emily R. - Chicago, IL
                                                                </h3>
                                                                <span className={cx('position', 'd-block', 'mb-3')}>
                                                                    CEO, Co-Founder, XYZ Inc.
                                                                </span>
                                                            </div>
                                                        </h3>
                                                    </div>
                                                    <div>
                                                        <h3>
                                                            {' '}
                                                            <blockquote className={cx('mb-5')}>
                                                                <p>
                                                                    “Từ thời điểm tôi truy cập trang web của họ, tôi đã
                                                                    biết mình đang ở trong tình trạng tốt. Mô tả chi
                                                                    tiết về sản phẩm và hình ảnh chất lượng cao giúp bạn
                                                                    dễ dàng lựa chọn sản phẩm phù hợp. Bộ phòng ngủ của
                                                                    tôi vừa đẹp vừa tiện dụng. Cảm ơn bạn, SUPO!”
                                                                </p>
                                                            </blockquote>
                                                            <div className={cx('author-info')}>
                                                                <div
                                                                    className={cx(
                                                                        'author-pic',
                                                                        'd-flex',
                                                                        'justify-content-center',
                                                                        'align-items-center',
                                                                    )}
                                                                >
                                                                    <img
                                                                        src="https://themewagon.github.io/furni/images/person-1.png"
                                                                        alt="Maria Jones"
                                                                        className={cx('img-fluid')}
                                                                    />
                                                                </div>
                                                                <h3 className={cx('font-weight-bold')}>
                                                                    Phan Mạnh Quỳnh
                                                                </h3>
                                                                <span className={cx('position', 'd-block', 'mb-3')}>
                                                                    CEO, Co-Founder, XYZ Inc.
                                                                </span>
                                                            </div>
                                                        </h3>
                                                    </div>
                                                    <div>
                                                        <h3>
                                                            {' '}
                                                            <blockquote className={cx('mb-5')}>
                                                                <p>
                                                                    “Các tùy chọn tùy chỉnh tại SUPO thật tuyệt vời. Tôi
                                                                    đã có thể chọn loại vải và lớp hoàn thiện hoàn hảo
                                                                    cho chiếc ghế bành mới của mình. Bây giờ nó là nơi
                                                                    yêu thích của tôi để thư giãn ở nhà. Toàn bộ quá
                                                                    trình diễn ra suôn sẻ và thú vị.”
                                                                </p>
                                                            </blockquote>
                                                            <div className={cx('author-info')}>
                                                                <div
                                                                    className={cx(
                                                                        'author-pic',
                                                                        'd-flex',
                                                                        'justify-content-center',
                                                                        'align-items-center',
                                                                    )}
                                                                >
                                                                    <img
                                                                        src="https://themewagon.github.io/furni/images/person-1.png"
                                                                        alt="Maria Jones"
                                                                        className={cx('img-fluid')}
                                                                    />
                                                                </div>
                                                                <h3 className={cx('font-weight-bold')}>
                                                                    Shark - Quân ca
                                                                </h3>
                                                                <span className={cx('position', 'd-block', 'mb-3')}>
                                                                    CEO, Co-Founder, XYZ Inc.
                                                                </span>
                                                            </div>
                                                        </h3>
                                                    </div>
                                                    <div>
                                                        <h3>
                                                            {' '}
                                                            <blockquote className={cx('mb-5')}>
                                                                <p>
                                                                    “I had a wonderful experience with SUPO. The
                                                                    personalized design consultation helped me make the
                                                                    best choices for my home office. The furniture is
                                                                    stylish, comfortable, and durable. I couldn’t be
                                                                    more pleased!”
                                                                </p>
                                                            </blockquote>
                                                            <div className={cx('author-info')}>
                                                                <div
                                                                    className={cx(
                                                                        'author-pic',
                                                                        'd-flex',
                                                                        'justify-content-center',
                                                                        'align-items-center',
                                                                    )}
                                                                >
                                                                    <img
                                                                        src="https://themewagon.github.io/furni/images/person-1.png"
                                                                        alt="Maria Jones"
                                                                        className={cx('img-fluid')}
                                                                    />
                                                                </div>
                                                                <h3 className={cx('font-weight-bold')}>Benzenma</h3>
                                                                <span className={cx('position', 'd-block', 'mb-3')}>
                                                                    CEO, Co-Founder, XYZ Inc.
                                                                </span>
                                                            </div>
                                                        </h3>
                                                    </div>
                                                    <div>
                                                        <h3>
                                                            {' '}
                                                            <blockquote className={cx('mb-5')}>
                                                                <p>
                                                                    “Tôi đã nhận được rất nhiều lời khen ngợi về chiếc
                                                                    bàn cà phê mới của mình từ SUPO. Đó là một tác phẩm
                                                                    độc đáo thực sự nổi bật trong phòng khách của tôi.
                                                                    Chất lượng rất tuyệt vời và rõ ràng là đã phải bỏ ra
                                                                    rất nhiều công sức để tạo ra nó.”
                                                                </p>
                                                            </blockquote>
                                                            <div className={cx('author-info')}>
                                                                <div
                                                                    className={cx(
                                                                        'author-pic',
                                                                        'd-flex',
                                                                        'justify-content-center',
                                                                        'align-items-center',
                                                                    )}
                                                                >
                                                                    <img
                                                                        src="https://themewagon.github.io/furni/images/person-1.png"
                                                                        alt="Maria Jones"
                                                                        className={cx('img-fluid')}
                                                                    />
                                                                </div>
                                                                <h3 className={cx('font-weight-bold')}>CR7</h3>
                                                                <span className={cx('position', 'd-block', 'mb-3')}>
                                                                    CEO, Co-Founder, XYZ Inc.
                                                                </span>
                                                            </div>
                                                        </h3>
                                                    </div>
                                                    <div>
                                                        <h3>
                                                            {' '}
                                                            <blockquote className={cx('mb-5')}>
                                                                <p>
                                                                    “Dịch vụ giao hàng và lắp ráp rất tuyệt vời. Đội ngũ
                                                                    chuyên nghiệp và hiệu quả, đảm bảo mọi thứ được
                                                                    thiết lập hoàn hảo. Phần mới của tôi trông tuyệt vời
                                                                    và cực kỳ thoải mái. Tôi rất vui mừng với việc mua
                                                                    hàng của mình!”
                                                                </p>
                                                            </blockquote>
                                                            <div className={cx('author-info')}>
                                                                <div
                                                                    className={cx(
                                                                        'author-pic',
                                                                        'd-flex',
                                                                        'justify-content-center',
                                                                        'align-items-center',
                                                                    )}
                                                                >
                                                                    <img
                                                                        src="https://themewagon.github.io/furni/images/person-1.png"
                                                                        alt="Maria Jones"
                                                                        className={cx('img-fluid')}
                                                                    />
                                                                </div>
                                                                <h3 className={cx('font-weight-bold')}>M10</h3>
                                                                <span className={cx('position', 'd-block', 'mb-3')}>
                                                                    CEO, Co-Founder, XYZ Inc.
                                                                </span>
                                                            </div>
                                                        </h3>
                                                    </div>
                                                </Slider>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* END item */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Testimonial;
