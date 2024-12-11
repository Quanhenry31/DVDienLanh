import CategoryProduct from '~/components/Category/category_product';
import HomeBanner from '~/components/Category/home_banner';

function Category() {
    return (
        <>
            <div>
                {/*================Home Banner Area =================*/}
                <HomeBanner />
                {/*================Category Product Area =================*/}
                <CategoryProduct />
            </div>
        </>
    );
}

export default Category;
