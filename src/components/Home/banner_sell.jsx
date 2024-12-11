function BannerSell() {
    return (
        <section
            className="relative bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage:
                    "url('https://cdn.pixabay.com/photo/2022/06/17/09/35/air-conditioner-7267527_1280.jpg')",
                // backgroundImage: "url('https://themewagon.github.io/eiser/img/offer-bg.png')",
                backgroundSize: 'cover',
            }}
        >
            <div className="container ">
                <div className="row justify-content-center">
                    <div className="offset-lg-4 col-lg-6 text-center ">
                        <div className="offer_content  p-8 bg-opacity-70 rounded-lg">
                            <h3 className="text-uppercase mb-40">Đồ dùng điện lạnh</h3>
                            <h2 className="text-uppercase">50% off</h2>
                            <a href="#" className="main_btn mb-20 mt-5">
                                Cửa hàng
                            </a>
                            <p className="text-[#fff]">Tiện lợi - nhanh chóng - bảo hành chính hãng</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default BannerSell;
