import HomeBanner from '~/components/Detail/home_banner';
import ProductComment from '~/components/Detail/product_comment';
import SingleProduct from '~/components/Detail/single_product';
import Product from '~/components/Home/pro_lq';

function Detail() {
    return (
        <>
            <div>
                {/*================Home Banner Area =================*/}
                <HomeBanner />
                {/*================Single Product Area =================*/}
                <SingleProduct />
                {/*================Product Description Area =================*/}
                <ProductComment />
                {/*================  Sản phẩm liên quan =================*/}
                <Product />
            </div>
        </>
    );
}

export default Detail;
