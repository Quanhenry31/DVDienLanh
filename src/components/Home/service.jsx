import {
    ChatBubbleLeftEllipsisIcon,
    CreditCardIcon,
    CurrencyDollarIcon,
    EyeIcon,
    HeartIcon,
    ShoppingCartIcon,
    TruckIcon,
} from '@heroicons/react/24/solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faComments } from '@fortawesome/free-solid-svg-icons';
function Service() {
    return (
        <section className="feature-area section_gap_bottom_custom">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-6">
                        <div className="single-feature text-center">
                            <a href="#" className="title d-flex flex-column align-items-center">
                                <CurrencyDollarIcon className="size-8 text-black-500 mb-2" />
                                <h3>Tích kiệm tiền bạc</h3>
                            </a>
                            <p>Nhanh chóng và tiện lợi</p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="single-feature text-center">
                            <a href="#" className="title d-flex flex-column align-items-center">
                                <TruckIcon className="size-8 text-black-500 mb-2" />
                                <h3>Vận chuyển nhanh chóng</h3>
                            </a>
                            <p>An toàn và tiện lợi</p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="single-feature text-center">
                            <a href="#" className="title d-flex flex-column align-items-center">
                                <ChatBubbleLeftEllipsisIcon className="size-8 text-black-500 mb-2" />
                                <h3>Nhiệt tình</h3>
                            </a>
                            <p>Xử lý nhanh chóng</p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="single-feature text-center">
                            <a href="#" className="title d-flex flex-column align-items-center">
                                <CreditCardIcon className="size-8 text-black-500 mb-2" />
                                <h3>Thanh toán tiện lợi</h3>
                            </a>
                            <p>An toàn và thông minh</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Service;
