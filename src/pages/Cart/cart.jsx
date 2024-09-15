// import CartProduct from "@/components/cart/cart";
// import HomeBanner from "@/components/cart/home_banner";

import CartProduct from '~/components/Cart/cart';
import HomeBanner from '~/components/Cart/home_banner';

function Cart() {
    return (
        <>
            <div>
                {/*================Home Banner Area =================*/}
                <HomeBanner />
                {/*================Cart Area =================*/}
                <CartProduct />
            </div>
        </>
    );
}

export default Cart;
