import { faArrowLeft, faArrowRight, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Blog() {
    const [blogs, setBlogs] = useState(null);
    const [categoriBlogs, setCategoriBlogs] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const location = useLocation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:9000/api/blogs/locBlogs`, {
                    params: {
                        categoryID: searchParams.get('category'),
                        page: 1,
                        pageSize: searchParams.get('pageSize') ?? 3,
                        name: searchParams.get('name'),
                    },
                });

                setBlogs(response.data.rows);
                console.log(response);
            } catch (error) {
                console.error('There was an error fetching the product data!', error);
            }
        };
        fetchData();
    }, [location.search, selectedCategory]);

    useEffect(() => {
        axios.get('http://localhost:9000/api/categoriBlogs').then((response) => {
            setCategoriBlogs(response.data.data);
        });
    }, []);

    const handleSelectCategory = (category) => {
        setSearchParams((params) => {
            if (category) {
                params.set('category', category?.id);
            } else {
                params.delete('category');
            }
            return params;
        });
        setSelectedCategory(category);
    };

    const handleSearchChange = (e) => {
        setSearchParams((params) => {
            if (e) {
                params.set('name', e.target.value);
            } else {
                params.delete('name');
            }
            return params;
        });
        setSearchTerm(e.target.value);
    };

    return (
        <section className="blog_area section_gap">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 mb-5 mb-lg-0">
                        <div className="blog_left_sidebar">
                            {blogs?.map((value, key) => (
                                <article className="blog_item">
                                    <div className="blog_item_img">
                                        <img className="card-img rounded-0" src={value.image1} alt="" />
                                        <a href="#" className="blog_item_date">
                                            <p>
                                                {new Date(value.createdAt).toLocaleString('vi-VN', {
                                                    timeZone: 'Asia/Ho_Chi_Minh',
                                                })}
                                            </p>
                                        </a>
                                    </div>
                                    <div className="blog_details">
                                        <a className="d-inline-block" href="single-blog.html">
                                            <h2>{value.name}</h2>
                                        </a>
                                        <p>{value.title1}</p>
                                        <ul className="blog-info-link">
                                            <li>
                                                <a href="#">
                                                    <i className="ti-user" /> {value.author}
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </article>
                            ))}
                            <nav className="blog-pagination justify-content-center d-flex">
                                <ul className="pagination">
                                    <li className="page-item">
                                        <a href="#" className="page-link" aria-label="Previous">
                                            <span aria-hidden="true">
                                                <FontAwesomeIcon
                                                    className="size-10 mt-[20%] ml-[20%]"
                                                    icon={faArrowLeft}
                                                />
                                            </span>
                                        </a>
                                    </li>
                                    <li className="page-item">
                                        <a href="#" className="page-link">
                                            1
                                        </a>
                                    </li>
                                    <li className="page-item active">
                                        <a href="#" className="page-link">
                                            2
                                        </a>
                                    </li>
                                    <li className="page-item">
                                        <a href="#" className="page-link" aria-label="Next">
                                            <span aria-hidden="true">
                                                <FontAwesomeIcon
                                                    className="size-10 mt-[20%] ml-[20%]"
                                                    icon={faArrowRight}
                                                />
                                            </span>
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="blog_right_sidebar">
                            <aside className="single_sidebar_widget search_widget">
                                <form action="#">
                                    <div className="form-group">
                                        <div className="input-group mb-3">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Tìm kiếm theo tiêu đề"
                                                value={searchTerm}
                                                onChange={handleSearchChange}
                                            />
                                            <div className="input-group-append">
                                                <button className="btn" type="button">
                                                    <FontAwesomeIcon
                                                        className="search_ok size-10"
                                                        icon={faMagnifyingGlass}
                                                    />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </aside>
                            <aside className="left_widgets p_filter_widgets">
                                <div className="l_w_title">
                                    <h3>Các danh mục</h3>
                                </div>
                                <div className="widgets_inner">
                                    <ul className="list">
                                        <li>
                                            <input
                                                className="!h-[14px] !w-[30px]"
                                                type="radio"
                                                name="deliveryCategory"
                                                onChange={() => handleSelectCategory(null)}
                                                checked={!selectedCategory}
                                            />
                                            <span>Tất cả</span>
                                        </li>
                                        {categoriBlogs?.map((value, key) => (
                                            <li>
                                                <input
                                                    className="!h-[14px] !w-[30px]"
                                                    type="radio"
                                                    name="deliveryCategoryBlog"
                                                    value={value.id}
                                                    onChange={() => handleSelectCategory(value)}
                                                    checked={selectedCategory?.id === value.id}
                                                />
                                                <span>{value.name}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </aside>
                            <aside className="single_sidebar_widget popular_post_widget">
                                <h3 className="widget_title">Bài viết nổi bật</h3>
                                {blogs?.map((value, key) => (
                                    <Link className="nav-link" to={`/blogDetail/${value.id}`}>
                                        <div className="media post_item">
                                            <img className="w-[100px] h-[70px]" src={value.image1} alt="" />
                                            <div className="media-body">
                                                <a href="single-blog.html">
                                                    <h3 className="line-clamp-2 break-words">{value.name}</h3>
                                                </a>
                                                <p>
                                                    {new Date(value.createdAt).toLocaleString('vi-VN', {
                                                        timeZone: 'Asia/Ho_Chi_Minh',
                                                    })}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </aside>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Blog;
