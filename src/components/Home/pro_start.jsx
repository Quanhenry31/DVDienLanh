import { EyeIcon, HeartIcon, ShoppingCartIcon } from '@heroicons/react/24/solid';

function ProStart() {
    return (
        <section className="feature_product_area section_gap_bottom_custom">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-12">
                        <div className="main_title">
                            <h2>
                                <span>Dịch vụ tiêu biểu</span>
                            </h2>
                            <p>Các dịch vụ mà khách hàng yêu thích nhất</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4 col-md-6">
                        <div className="single-product">
                            <div className="product-img">
                                <div className="w-[400px] h-[200px]">
                                    <img
                                        className="w-full h-full object-cover"
                                        src="https://suamaygiataz.com/wp-content/uploads/2023/03/sua-may-giat-tai-phuc-dong.png"
                                        alt=""
                                    />
                                </div>
                            </div>
                            <div className="product-btm">
                                <a href="#" className="d-block">
                                    <h4 className="text-center ">Sửa máy giặt</h4>
                                </a>
                                <div className="mt-3">
                                    <h6 className="text-[18px] leading-relaxed text-gray-700 mb-4">
                                        Cung cấp sửa chữa và bảo trì các loại máy giặt tại nhà của khách hàng bao gồm
                                        kiếm tra, chuẩn đoán lỗi, thay thế linh kiện chính hãng, làm sạch, vệ sinh và
                                        bảo trì máy giặt để đảm bảo máy hoạt động tốt nhất
                                    </h6>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="single-product">
                            <div className="product-img">
                                <div className="w-[400px] h-[200px]">
                                    <img
                                        className="w-full h-full "
                                        src="https://hitachi-service.com/wp-content/uploads/2024/01/bao-hanh-tu-lanh-hitachi-tai-bac-giang-3.png"
                                        alt=""
                                    />
                                </div>
                            </div>
                            <div className="product-btm">
                                <a href="#" className="d-block">
                                    <h4 className="text-center ">Sửa máy sấy</h4>
                                </a>
                                <div className="mt-3">
                                    <h6 className="text-[18px] leading-relaxed text-gray-700 mb-4">
                                        Cung cấp sửa chữa và bảo trì các loại máy sấy tại nhà của khách hàng. Điều này
                                        bao gồm kiểm tra, chuẩn đoán lỗi, Làm sạch, vệ sinh và bảo trì máy sấy để đảm
                                        bảo máy hoạt động tốt nhất.
                                    </h6>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="single-product">
                            <div className="product-img">
                                <div className="w-[400px] h-[200px]">
                                    <img
                                        className="w-full h-full object-cover"
                                        src="https://dayngheso1.edu.vn/wp-content/uploads/2023/07/z4555764276941_babd5ec61be88126a02e7f05de3335b7.jpg"
                                        alt=""
                                    />
                                </div>
                            </div>
                            <div className="product-btm">
                                <a href="#" className="d-block">
                                    <h4 className="text-center ">Sửa tủ lạnh</h4>
                                </a>
                                <div className="mt-3">
                                    <h6 className="text-[18px] leading-relaxed text-gray-700 mb-4">
                                        Cung cấp sửa chữa và bảo trì các loại tủ lạnh tại nhà của khách hàng. Điều này
                                        bao gồm kiểm tra, chuẩn đoán lỗi, thay thế linh kiện chính hãng, làm vệ sinh và
                                        bảo trì tủ lạnh để đảm bảo máy hoạt động tốt nhất.
                                    </h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ProStart;
