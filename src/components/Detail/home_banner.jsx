function HomeBanner() {
    return (
        <section className="banner_area">
            <div className="banner_inner d-flex align-items-center">
                <div className="container">
                    <div className="banner_content d-md-flex justify-content-between align-items-center">
                        <div className="mb-3 mb-md-0">
                            <h2>Chi tiết sản phẩm</h2>
                            <p>Chúc bạn có 1 ngày mua sắm vui vẻ</p>
                        </div>
                        <div className="page_link">
                            <a href="index.html">Home</a>
                            <a href="single-product.html">Product Details</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HomeBanner;
