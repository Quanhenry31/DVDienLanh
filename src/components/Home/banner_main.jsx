function BannerMain() {
    return (
        <section
            className="home_banner_area mb-40 bg-center "
            style={{
                backgroundImage:
                    'url("https://dienlanhhaivan.com/upload/images/lap-dat-may-lanh-gia-re-tai-Thuan-An.jpg")',
            }}
        >
            <div className="banner_inner d-flex align-items-center">
                <div className="container">
                    <div className="banner_content row">
                        <div className="col-lg-12">
                            <p className="sub text-uppercase">Điện lạnh</p>
                            <h3>
                                <span>100%</span> cho bạn <br />
                                sự <span>Hài lòng</span>
                            </h3>
                            <h4>Chuyên môn kỹ sư điện lạnh.</h4>
                            <a className="main_btn mt-40" href="#">
                                Dịch vụ
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default BannerMain;
