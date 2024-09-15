import HomeBanner from '~/components/Detail/home_banner';
import ProductComment from '~/components/Detail/product_comment';
import SingleProduct from '~/components/Detail/single_product';

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
            </div>
        </>
    );
}

export default Detail;
