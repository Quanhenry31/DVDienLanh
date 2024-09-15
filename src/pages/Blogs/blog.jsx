import Blog from '~/components/Blogs/blog';
import HomeBanner from '~/components/Blogs/home_banner';

function BlogPage() {
    return (
        <div>
            <div>
                {/*================Home Banner Area =================*/}
                <HomeBanner />
                {/*================Blog Area =================*/}
                <Blog />
            </div>
        </div>
    );
}

export default BlogPage;
