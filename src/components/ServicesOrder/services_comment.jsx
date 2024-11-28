import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function ServicesComment() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [productDetail, setProductDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('Review');
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [replyingTo, setReplyingTo] = useState(null); // State để lưu trữ ID của bình luận đang được trả lời
    const [replyContent, setReplyContent] = useState(''); // State để lưu trữ nội dung trả lời
    const [ratingCountALL, setRatingCountALL] = useState({});
    const user = useSelector((state) => state.user.user);
    const conten = useSelector((state) => state.conten);

    const fetchProductData = async () => {
        const id = 2;
        axios
            .get(`http://localhost:9000/api/products/${id}`)
            .then((response) => {
                setProduct(response.data.data);
                const ratingCount = response.data.data.Comments.reduce((acc, comment) => {
                    const rating = comment.number1;
                    if (rating) {
                        acc[rating] = (acc[rating] || 0) + 1;
                    }
                    return acc;
                }, {});

                setRatingCountALL(ratingCount);
            })
            .catch((error) => {
                console.error('There was an error fetching the product data!', error);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchProductData();
    }, [id]);

    const TB =
        (1 * (ratingCountALL[1] || 0) +
            2 * (ratingCountALL[2] || 0) +
            3 * (ratingCountALL[3] || 0) +
            4 * (ratingCountALL[4] || 0) +
            5 * (ratingCountALL[5] || 0)) /
        ((ratingCountALL[1] || 0) +
            (ratingCountALL[2] || 0) +
            (ratingCountALL[3] || 0) +
            (ratingCountALL[4] || 0) +
            (ratingCountALL[5] || 0));

    useEffect(() => {
        axios
            .get(`http://localhost:9000/api/productDetails/${id}`)
            .then((response) => {
                setProductDetail(response.data.data);
            })
            .catch((error) => {
                console.error('There was an error fetching the productDetail data!', error);
                setLoading(false);
            });
    }, [id]);

    const handleReplyClick = (commentId) => {
        if (replyingTo === commentId) {
            setReplyingTo(null); // Đóng trường nhập liệu nếu đang mở
        } else {
            setReplyingTo(commentId);
        }
    };

    const handleStarClick = (index) => {
        setRating(index + 1); // index starts from 0, so we add 1
    };
    // console.log(rating);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (user.id) {
            const commentData = {
                name1: 'Sample Name 1',
                name2: comment,
                number1: rating,
                number2: 456,
                productID: id,
                userID: user.id,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };

            try {
                setLoading(true);
                const response = await axios.post('http://localhost:9000/api/comments', commentData);
                setComment('');
                setRating(0);
                await fetchProductData();
                toast.success(`Comment thành công !`);
            } catch (error) {
                console.error('Error posting comment:', error);
            }
        } else {
            window.location.href = 'http://localhost:3000/login';
        }
    };

    const handleReplySubmit = async (e) => {
        e.preventDefault();
        if (user.id) {
            const replyData = {
                name1: 'Sample Name 1',
                name2: replyContent,
                number1: 123,
                number2: 456,
                userID: user.id,
                replyID: replyingTo,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };

            try {
                setLoading(true);
                const response = await axios.post('http://localhost:9000/api/replys', replyData);
                setReplyContent('');
                setReplyingTo(null);
                await fetchProductData();
                toast.success(`Comment thành công !`);
            } catch (error) {
                console.error('Error posting reply:', error);
            }
        } else {
            window.location.href = 'http://localhost:3000/login';
        }
    };

    const tabs = [
        {
            id: 'Description',
            label: 'Mô tả',
            content: (
                <div>
                    <p>{conten?.conten}</p>
                </div>
            ),
        },
        {
            id: 'Specification',
            label: 'Thông số',
            content: (
                <div>
                    <div className="table-responsive">
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td>
                                        <h5>Loại</h5>
                                    </td>
                                    <td className="flex">
                                        {product?.Sizes?.map((value, key) => (
                                            <h5 key={value.id} className="mr-[60px] w-[20px]">
                                                {value.size || 'lỗi'}
                                            </h5>
                                        ))}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h5>Chiều cao</h5>
                                    </td>

                                    <td className="flex">
                                        {product?.Sizes?.map((value, key) => (
                                            <h5 key={value.id} className="mr-[60px] w-[20px]">
                                                {value.height || 'lỗi'} m
                                            </h5>
                                        ))}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h5>Chiều rộng</h5>
                                    </td>
                                    <td className="flex">
                                        {product?.Sizes?.map((value, key) => (
                                            <h5 key={value.id} className="mr-[60px] w-[20px]">
                                                {value.width || 'lỗi'} m
                                            </h5>
                                        ))}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h5>Cân nặng</h5>
                                    </td>
                                    <td className="flex">
                                        {product?.Sizes?.map((value, key) => (
                                            <h5 key={value.id} className="mr-[60px] w-[20px]">
                                                {value.mass || 'lỗi'} KG
                                            </h5>
                                        ))}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            ),
        },
        {
            id: 'Review',
            label: 'Đánh giá',
            content: (
                <div>
                    {' '}
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="row total_rate">
                                <div className="col-6">
                                    <div className="box_total">
                                        <h5>Trung bình</h5>
                                        <h4>{TB.toFixed(1)}</h4>
                                        <h6>({product?.Comments?.length} đánh giá)</h6>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="rating_list">
                                        <h3>Có {product?.Comments?.length} lượt đánh giá</h3>
                                        <ul className="list">
                                            <li>
                                                <a href="#" className="flex">
                                                    5 Star
                                                    <FontAwesomeIcon
                                                        className="size-[20px] "
                                                        icon={faStar}
                                                        style={{ color: '#FFD43B' }}
                                                    />
                                                    <FontAwesomeIcon
                                                        className="size-[20px] "
                                                        icon={faStar}
                                                        style={{ color: '#FFD43B' }}
                                                    />
                                                    <FontAwesomeIcon
                                                        className="size-[20px] "
                                                        icon={faStar}
                                                        style={{ color: '#FFD43B' }}
                                                    />
                                                    <FontAwesomeIcon
                                                        className="size-[20px] "
                                                        icon={faStar}
                                                        style={{ color: '#FFD43B' }}
                                                    />
                                                    <FontAwesomeIcon
                                                        className="size-[20px] "
                                                        icon={faStar}
                                                        style={{ color: '#FFD43B' }}
                                                    />{' '}
                                                    Có {ratingCountALL[5] || 0} lượt đánh giá
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" className="flex">
                                                    4 Star
                                                    <FontAwesomeIcon
                                                        className="size-[20px] "
                                                        icon={faStar}
                                                        style={{ color: '#FFD43B' }}
                                                    />
                                                    <FontAwesomeIcon
                                                        className="size-[20px] "
                                                        icon={faStar}
                                                        style={{ color: '#FFD43B' }}
                                                    />
                                                    <FontAwesomeIcon
                                                        className="size-[20px] "
                                                        icon={faStar}
                                                        style={{ color: '#FFD43B' }}
                                                    />
                                                    <FontAwesomeIcon
                                                        className="size-[20px] "
                                                        icon={faStar}
                                                        style={{ color: '#FFD43B' }}
                                                    />
                                                    Có {ratingCountALL[4] || 0} lượt đánh giá
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" className="flex">
                                                    3 Star
                                                    <FontAwesomeIcon
                                                        className="size-[20px] "
                                                        icon={faStar}
                                                        style={{ color: '#FFD43B' }}
                                                    />
                                                    <FontAwesomeIcon
                                                        className="size-[20px] "
                                                        icon={faStar}
                                                        style={{ color: '#FFD43B' }}
                                                    />
                                                    <FontAwesomeIcon
                                                        className="size-[20px] "
                                                        icon={faStar}
                                                        style={{ color: '#FFD43B' }}
                                                    />
                                                    Có {ratingCountALL[3] || 0} lượt đánh giá
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" className="flex">
                                                    2 Star
                                                    <FontAwesomeIcon
                                                        className="size-[20px] "
                                                        icon={faStar}
                                                        style={{ color: '#FFD43B' }}
                                                    />
                                                    <FontAwesomeIcon
                                                        className="size-[20px] "
                                                        icon={faStar}
                                                        style={{ color: '#FFD43B' }}
                                                    />{' '}
                                                    Có {ratingCountALL[2] || 0} lượt đánh giá
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" className="flex">
                                                    1 Star
                                                    <FontAwesomeIcon
                                                        className="size-[20px] "
                                                        icon={faStar}
                                                        style={{ color: '#FFD43B' }}
                                                    />{' '}
                                                    Có {ratingCountALL[1] || 0} lượt đánh giá
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="review_list">
                                <div>
                                    <h5 className="flex justify-center align-content-center text-center mb-[20px]">
                                        Viết đánh giá của bạn
                                    </h5>
                                    <div className="flex">
                                        <h5 className="align-content-center mr-[20px]">Chọn sao:</h5>
                                        <div className="mr-[10px]  w-[100px] h-[30px] flex items-center justify-center  border-[1px] border-black">
                                            {[...Array(5)].map((_, index) => (
                                                <FontAwesomeIcon
                                                    key={index}
                                                    className="cursor-pointer size-[20px]"
                                                    icon={faStar}
                                                    style={{ color: index < rating ? '#FFD43B' : '#e4e5e9' }} // Đổi màu sao dựa trên rating
                                                    onClick={() => handleStarClick(index)} // Xử lý khi click vào sao
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    <form onSubmit={handleSubmit}>
                                        <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                                            <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                                                <label htmlFor="comment" className="sr-only">
                                                    Your comment
                                                </label>
                                                <textarea
                                                    id="comment"
                                                    rows={4}
                                                    className="w-full px-0 text-[18px] text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                                                    placeholder="Write a comment..."
                                                    value={comment} // Liên kết với state
                                                    onChange={(e) => setComment(e.target.value)} // Cập nhật state khi người dùng nhập
                                                    required
                                                />
                                            </div>
                                            <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                                                <button
                                                    type="submit"
                                                    className="inline-flex items-center py-2.5 px-4 text-xl font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                                                >
                                                    Post comment
                                                </button>
                                                <div className="flex ps-0 space-x-1 rtl:space-x-reverse sm:ps-2">
                                                    {/* Các nút khác */}
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                {/* comment */}
                                <div className="col-lg-12">
                                    <div className="comment_list">
                                        {/* comment and reply */}
                                        {product?.Comments?.map((comment, index) => (
                                            <div key={index}>
                                                <div className="review_item mt-[30px] mb-[10px]">
                                                    <div className="media">
                                                        <div className="d-flex">
                                                            <img
                                                                className="w-[70px] h-[70px] rounded-full"
                                                                src={
                                                                    comment.User?.image ||
                                                                    'https://themewagon.github.io/eiser/img/product/single-product/review-1.png'
                                                                }
                                                                alt=""
                                                            />
                                                        </div>
                                                        <div className="media-body">
                                                            <h4>{comment.User?.userName || 'Anonymous'}</h4>
                                                            <h5>
                                                                {new Date(comment.createdAt).toLocaleDateString()} at{' '}
                                                                {new Date(comment.createdAt).toLocaleTimeString()}
                                                            </h5>
                                                            {[...Array(Math.min(comment.number1, 5))].map((_, i) => (
                                                                <FontAwesomeIcon
                                                                    key={i}
                                                                    className="size-10"
                                                                    icon={faStar}
                                                                    style={{ color: '#FFD43B' }}
                                                                />
                                                            ))}
                                                            <button
                                                                className="reply_btn"
                                                                onClick={() => handleReplyClick(comment.id)}
                                                            >
                                                                Reply
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <p className="ml-[0px]">{comment.name2}</p>
                                                    <div className="flex">
                                                        <img
                                                            className="w-[50px] h-[50px]"
                                                            src="https://m.media-amazon.com/images/I/51y8GUVKJoL._AC_UF894,1000_QL80_.jpg"
                                                            alt=""
                                                        />
                                                    </div>
                                                    {replyingTo === comment.id && (
                                                        <form onSubmit={handleReplySubmit}>
                                                            <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                                                                <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                                                                    <label htmlFor="comment" className="sr-only">
                                                                        Your comment
                                                                    </label>
                                                                    <textarea
                                                                        id="comment"
                                                                        rows={2}
                                                                        className="w-full px-0 text-[14px] text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                                                                        placeholder="Write a reply..."
                                                                        value={replyContent} // Liên kết với state
                                                                        onChange={(e) =>
                                                                            setReplyContent(e.target.value)
                                                                        } // Cập nhật state khi người dùng nhập
                                                                        required
                                                                    />
                                                                </div>
                                                                <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                                                                    <button
                                                                        type="submit"
                                                                        className="inline-flex items-center py-2.5 px-4 text-xl font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                                                                    >
                                                                        Post reply
                                                                    </button>
                                                                    <div className="flex ps-0 space-x-1 rtl:space-x-reverse sm:ps-2">
                                                                        {/* Các nút khác */}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    )}
                                                </div>
                                                {comment.Replies?.map((reply, replyIndex) => (
                                                    <div key={replyIndex} className="review_item reply ml-[30px]">
                                                        <div className="media">
                                                            <div className="d-flex">
                                                                <img
                                                                    src={
                                                                        reply.User?.avatar ||
                                                                        'https://themewagon.github.io/eiser/img/product/single-product/review-2.png'
                                                                    }
                                                                    alt=""
                                                                />
                                                            </div>
                                                            <div className="media-body">
                                                                <h4>{reply.User?.userName || 'Anonymous'}</h4>
                                                                <h5>
                                                                    {new Date(reply.createdAt).toLocaleDateString()} at{' '}
                                                                    {new Date(reply.createdAt).toLocaleTimeString()}
                                                                </h5>
                                                            </div>
                                                        </div>
                                                        <p className="ml-[0px]">{reply.name2}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        ))}

                                        {/* comment and reply */}
                                        {/* <div className="review_item mt-[30px]">
                                            <div className="media">
                                                <div className="d-flex">
                                                    <img
                                                        src="https://themewagon.github.io/eiser/img/product/single-product/review-1.png"
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="media-body">
                                                    <h4>Blake Ruiz</h4>
                                                    <h5>12th Feb, 2017 at 05:56 pm</h5>
                                                    <FontAwesomeIcon
                                                        className="size-10 "
                                                        icon={faStar}
                                                        style={{ color: '#FFD43B' }}
                                                    />
                                                    <FontAwesomeIcon
                                                        className="size-10"
                                                        icon={faStar}
                                                        style={{ color: '#FFD43B' }}
                                                    />
                                                    <FontAwesomeIcon
                                                        className="size-10"
                                                        icon={faStar}
                                                        style={{ color: '#FFD43B' }}
                                                    />
                                                    <FontAwesomeIcon
                                                        className="size-10"
                                                        icon={faStar}
                                                        style={{ color: '#FFD43B' }}
                                                    />
                                                    <FontAwesomeIcon
                                                        className="size-10"
                                                        icon={faStar}
                                                        style={{ color: '#FFD43B' }}
                                                    />
                                                    <a className="reply_btn" href="#">
                                                        Reply
                                                    </a>
                                                </div>
                                            </div>
                                            <p className="ml-[50px]">
                                                <div className="flex">
                                                    <img
                                                        className="w-[50px] h-[50px]"
                                                        src="https://m.media-amazon.com/images/I/51y8GUVKJoL._AC_UF894,1000_QL80_.jpg"
                                                        alt=""
                                                    />
                                                </div>
                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                                commodo
                                            </p>
                                        </div> */}
                                    </div>
                                </div>
                                {/* <div className="review_item">
                                    <div className="media">
                                        <div className="d-flex">
                                            <img
                                                src="https://themewagon.github.io/eiser/img/product/single-product/review-1.png"
                                                alt=""
                                            />
                                        </div>
                                        <div className="media-body flex">
                                            <h4 className="mt-[5px]">Blake Ruiz</h4>
                                            <FontAwesomeIcon
                                                className="size-10 "
                                                icon={faStar}
                                                style={{ color: '#FFD43B' }}
                                            />
                                            <FontAwesomeIcon
                                                className="size-10"
                                                icon={faStar}
                                                style={{ color: '#FFD43B' }}
                                            />
                                            <FontAwesomeIcon
                                                className="size-10"
                                                icon={faStar}
                                                style={{ color: '#FFD43B' }}
                                            />
                                            <FontAwesomeIcon
                                                className="size-10"
                                                icon={faStar}
                                                style={{ color: '#FFD43B' }}
                                            />
                                            <FontAwesomeIcon
                                                className="size-10"
                                                icon={faStar}
                                                style={{ color: '#FFD43B' }}
                                            />
                                        </div>
                                    </div>

                                    <p className="ml-[50px]">
                                        <div className="flex">
                                            <img
                                                className="w-[50px] h-[50px]"
                                                src="https://m.media-amazon.com/images/I/51y8GUVKJoL._AC_UF894,1000_QL80_.jpg"
                                                alt=""
                                            />
                                        </div>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                                        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                    </p>
                                </div>
                                <div className="review_item">
                                    <div className="media">
                                        <div className="d-flex">
                                            <img
                                                src="https://themewagon.github.io/eiser/img/product/single-product/review-1.png"
                                                alt=""
                                            />
                                        </div>
                                        <div className="media-body flex">
                                            <h4 className="mt-[5px]">Blake Ruiz</h4>
                                            <FontAwesomeIcon
                                                className="size-10 "
                                                icon={faStar}
                                                style={{ color: '#FFD43B' }}
                                            />
                                            <FontAwesomeIcon
                                                className="size-10"
                                                icon={faStar}
                                                style={{ color: '#FFD43B' }}
                                            />
                                            <FontAwesomeIcon
                                                className="size-10"
                                                icon={faStar}
                                                style={{ color: '#FFD43B' }}
                                            />
                                            <FontAwesomeIcon
                                                className="size-10"
                                                icon={faStar}
                                                style={{ color: '#FFD43B' }}
                                            />
                                            <FontAwesomeIcon
                                                className="size-10"
                                                icon={faStar}
                                                style={{ color: '#FFD43B' }}
                                            />
                                        </div>
                                    </div>
                                    <p className="ml-[50px]">
                                        <div className="flex">
                                            <img
                                                className="w-[50px] h-[50px]"
                                                src="https://m.media-amazon.com/images/I/51y8GUVKJoL._AC_UF894,1000_QL80_.jpg"
                                                alt=""
                                            />
                                        </div>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                                        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                    </p>
                                </div>
                                <div className="review_item">
                                    <div className="media">
                                        <div className="d-flex">
                                            <img
                                                src="https://themewagon.github.io/eiser/img/product/single-product/review-1.png"
                                                alt=""
                                            />
                                        </div>
                                        <div className="media-body flex">
                                            <h4 className="mt-[5px]">Blake Ruiz</h4>
                                            <FontAwesomeIcon
                                                className="size-10 "
                                                icon={faStar}
                                                style={{ color: '#FFD43B' }}
                                            />
                                            <FontAwesomeIcon
                                                className="size-10"
                                                icon={faStar}
                                                style={{ color: '#FFD43B' }}
                                            />
                                            <FontAwesomeIcon
                                                className="size-10"
                                                icon={faStar}
                                                style={{ color: '#FFD43B' }}
                                            />
                                            <FontAwesomeIcon
                                                className="size-10"
                                                icon={faStar}
                                                style={{ color: '#FFD43B' }}
                                            />
                                            <FontAwesomeIcon
                                                className="size-10"
                                                icon={faStar}
                                                style={{ color: '#FFD43B' }}
                                            />
                                        </div>
                                    </div>
                                    <p className="ml-[50px]">
                                        <div className="flex">
                                            <img
                                                className="w-[50px] h-[50px]"
                                                src="https://m.media-amazon.com/images/I/51y8GUVKJoL._AC_UF894,1000_QL80_.jpg"
                                                alt=""
                                            />
                                        </div>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                                        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                    </p>
                                </div> */}
                                {/* end - comment */}
                            </div>
                        </div>
                    </div>
                </div>
            ),
        },
    ];
    return (
        <section className="product_description_area">
            <div className="container">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    {tabs.map((tab) => (
                        <li
                            key={tab.id}
                            className={`nav-item ${activeTab === tab.id ? 'active' : ''}`} // Thêm class active nếu tab hiện tại
                            onClick={() => setActiveTab(tab.id)} // Cập nhật tab hiện tại khi nhấn
                        >
                            <div class="  w-[100px] h-[40px] flex items-center justify-center  border-[1px] border-black">
                                {' '}
                                {tab.label}
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="tab-content" id="myTabContent">
                    {tabs.map((tab) => (
                        <div
                            key={tab.id}
                            className={`tab-pane fade ${activeTab === tab.id ? 'show active' : ''}`}
                            id={tab.id}
                            role="tabpanel"
                            aria-labelledby={`${tab.id}-tab`}
                        >
                            {tab.content}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default ServicesComment;
