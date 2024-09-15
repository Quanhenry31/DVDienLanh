import { faArrowRight, faComments } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useEffect, useState } from 'react';

function Blog() {
    const [categoriBlogs, setCategoriBlogs] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:9000/api/categoriBlogs').then((response) => {
            setCategoriBlogs(response.data.data);
        });
    }, []);

    return (
        <section className="blog-area section-gap">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-12">
                        <div className="main_title">
                            <h2>
                                <span>Bài viết mới</span>
                            </h2>
                            <p>Tin tức mơi nhất về điện lạnh</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {categoriBlogs?.map((value, key) => (
                        <div className="col-lg-4 col-md-6">
                            <div className="single-blog">
                                <div className="thumb">
                                    <img className="img-fluid" src={value.Blogs[0].image1} alt="" />
                                </div>
                                <div className="short_details">
                                    <div className="meta-top d-flex !flex items-center justify-center">
                                        <a href="#" className="flex items-center justify-center">
                                            {value.Blogs[0].author}
                                        </a>
                                        <a href="#" className="!flex items-center justify-center">
                                            <FontAwesomeIcon
                                                icon={faComments}
                                                className="size-7 !flex items-center justify-center  mr-2"
                                            />
                                            2 Comments
                                        </a>
                                    </div>
                                    <a className="d-block" href="single-blog.html">
                                        <h4> {value.Blogs[0].name}</h4>
                                    </a>
                                    <div className="text-wrap">
                                        <p className="line-clamp-2 break-words">{value.Blogs[0].title1}</p>
                                    </div>
                                    <a href="#" className="blog_btn flex">
                                        Xem thêm <FontAwesomeIcon className="size-6 flex ml-3" icon={faArrowRight} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Blog;
