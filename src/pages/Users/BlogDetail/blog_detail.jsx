import { faComments, faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Blog from '~/components/Blogdetail/blog';
import HomeBanner from '~/components/Blogdetail/home_banner';

function BlogDetail() {
    return (
        <>
            <div>
                {/*================Home Banner Area =================*/}
                <HomeBanner />
                {/*================Blog Area =================*/}
                <Blog />
            </div>
        </>
    );
}

export default BlogDetail;
