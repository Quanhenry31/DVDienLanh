import BannerMain from '~/components/Home/banner_main';
import BannerSell from '~/components/Home/banner_sell';
import Blog from '~/components/Home/blog';
import Product from '~/components/Home/pro_lq';
import ProductPopular from '~/components/Home/pro_popular';
import ProductNew from '~/components/Home/pro_new';
import ProStart from '~/components/Home/pro_start';
import Service from '~/components/Home/service';
import Slideshow from '~/components/Home/slides';

export default function Home() {
    return (
        <>
            {/*================Home Banner Area =================*/}
            <BannerMain />
            {/* Start feature Area */}
            <Service />
            <ProStart />
            {/*================ Offer Area =================*/}
            <BannerSell />
            {/*================ New Product Area =================*/}
            <ProductNew />
            {/*================  slide_show =================*/}
            <Slideshow />
            {/*================  Sản phẩm phổ biến =================*/}
            <ProductPopular />
            {/*================  Sản phẩm liên quan =================*/}
            <Product />
            {/*================ Start Blog Area =================*/}
            <Blog />
        </>
    );
}
