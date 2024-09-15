import { faComments, faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
function Blog() {
    const { id } = useParams();
    const [blogs, setBlogs] = useState(null);
    const [blogsID, setBlogsID] = useState(null);
    const [listComment, setlistComment] = useState(null);
    const [comment, setComment] = useState('');

    const fetchProductData = async () => {
        axios
            .get(`http://localhost:9000/api/blogs/${id}`)
            .then((response) => {
                setBlogsID(response.data.data);
                setlistComment(response.data.data.commentBlogs);
                console.log(response.data.data.commentBlogs);
            })
            .catch((error) => {
                console.error('There was an error fetching the product data!', error);
            });
    };
    useEffect(() => {
        fetchProductData();
    }, [id]);

    useEffect(() => {
        axios.get('http://localhost:9000/api/blogs').then((response) => {
            setBlogs(response.data.data);
        });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Ngăn chặn hành vi mặc định của form
        const commentData = {
            name1: 'Sample Name 1',
            name2: comment,
            number1: 1,
            number2: 2,
            blogID: id,
            userID: 2,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        try {
            const response = await axios.post('http://localhost:9000/api/commentBlogs', commentData);
            console.log('Response:', response.data);
            setComment('');
            fetchProductData();
            toast.success(`Comment thành công !`);
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    };

    return (
        <section className="blog_area single-post-area section_gap">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 posts-list">
                        <div className="single-post">
                            <div className="feature-img">
                                <img className="img-fluid" src={blogsID?.image1} alt="" />
                            </div>
                            <div className="blog_details">
                                <h2>{blogsID?.name}</h2>
                                <ul className="blog-info-link mt-3 mb-4 flex">
                                    <li className="flex">
                                        <a href="#" className="flex">
                                            <FontAwesomeIcon className="size-7 flex" icon={faUser} /> {blogsID?.author}
                                        </a>
                                    </li>
                                    <li className="flex">
                                        <a href="#" className="flex">
                                            <FontAwesomeIcon icon={faComments} className="size-7 flex" />{' '}
                                            {listComment?.length} Comments
                                        </a>
                                    </li>
                                </ul>

                                <div className="quote-wrapper">
                                    <div className="quotes">{blogsID?.title1}</div>
                                </div>
                                <p>{blogsID?.title2}</p>

                                <p>{blogsID?.title3}</p>
                                <div className="feature-img mb-4">
                                    <img className="img-fluid" src={blogsID?.image2} alt="" />
                                </div>
                                <p>{blogsID?.title4}</p>
                            </div>
                        </div>
                        <div className="comments-area">
                            <h4>05 Comments</h4>
                            {listComment?.map((comment, index) => (
                                <div className="comment-list">
                                    <div className="single-comment justify-content-between d-flex">
                                        <div className="user justify-content-between d-flex">
                                            <div className="thumb">
                                                <img
                                                    className="!w-[60px] !h-[60px]"
                                                    src="https://themewagon.github.io/eiser/img/blog/c1.png"
                                                    alt=""
                                                />
                                            </div>
                                            <div className="desc">
                                                <div className="d-flex justify-content-between">
                                                    <div className="d-flex align-items-center">
                                                        <h5>
                                                            <a href="#">{comment.User?.userName}</a>
                                                        </h5>
                                                        <p className="date">
                                                            {' '}
                                                            {new Date(comment.createdAt).toLocaleString('vi-VN', {
                                                                timeZone: 'Asia/Ho_Chi_Minh',
                                                            })}
                                                        </p>
                                                    </div>
                                                </div>
                                                <p className="comment">{comment.name2}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="comment-form" onSubmit={handleSubmit}>
                            <h4>Bình luận</h4>
                            <form className="form-contact comment_form">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="form-group">
                                            <textarea
                                                className="form-control w-100 !text-2xl"
                                                name="comment"
                                                id="comment"
                                                cols={30}
                                                rows={5}
                                                placeholder="Write Comment"
                                                defaultValue={''}
                                                value={comment} // Liên kết với state
                                                onChange={(e) => setComment(e.target.value)} // Cập nhật state khi người dùng nhập
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="main_btn">
                                        Gửi bình luận
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="blog_right_sidebar">
                            <aside className="single_sidebar_widget popular_post_widget">
                                <h3 className="widget_title">Bài viết nổi bật</h3>
                                {blogs?.map((value, key) => (
                                    <Link className="nav-link" to={`/blogDetail/${value.id}`}>
                                        <div className="media post_item">
                                            <img className="w-[100px] h-[70px]" src={value.image1} alt="" />
                                            <div className="media-body">
                                                <span>
                                                    <h3 className="line-clamp-2 break-words">{value.name}</h3>
                                                </span>
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
