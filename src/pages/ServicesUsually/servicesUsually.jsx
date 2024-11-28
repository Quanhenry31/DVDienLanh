import HomeBanner from '~/components/Cart/home_banner';
import ServicesComment from '~/components/ServicesUsually/services_comment';
import ServicesUsuallyComp from '~/components/ServicesUsually/ServicesUsually';

function ServicesUsually() {
    return (
        <>
            <HomeBanner />
            <ServicesUsuallyComp />
            <ServicesComment />
        </>
    );
}

export default ServicesUsually;
