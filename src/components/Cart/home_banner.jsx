import { faLocationDot, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CreateLocation from './Models/CreateLocation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function HomeBanner() {
    const [create, setCreateBtn] = useState(false);
    const [isdelete, setIsdelete] = useState(false);
    const [address, setAddress] = useState(null);

    const idUser = 2;

    const fetchProductData = async () => {
        try {
            const response = await axios.get(`http://localhost:9000/api/users/${idUser}`);
            setAddress(response.data.data);
        } catch (error) {
            console.error('There was an error fetching the users data!', error);
        }
    };

    const handleDeleteProduct = async (id) => {
        try {
            await axios.delete(`http://localhost:9000/api/address/${id}`);
            toast.success('Xóa thành công!');
            fetchProductData(); // Cập nhật danh sách địa chỉ sau khi xóa
        } catch (error) {
            console.error('Error deleting address:', error);
            toast.error('Có lỗi xảy ra khi xóa địa chỉ!');
        }
    };

    useEffect(() => {
        fetchProductData();
    }, [idUser, create, isdelete]);

    const handleSelectAddress = (address) => {
        localStorage.setItem('selectedAddress', JSON.stringify(address));
    };
    useEffect(() => {
        localStorage.removeItem('selectedAddress');
    }, []);

    return (
        <section className="banner_area">
            <div className="banner_inner d-flex align-items-center">
                <div className="container">
                    <div className="banner_content d-md-flex justify-content-between align-items-center">
                        <div>
                            <h3 className="text-green-500 mb-[20px] flex">
                                <FontAwesomeIcon icon={faLocationDot} className="!mr-[5px]" />
                                <div> Địa chỉ nhận hàng</div>
                            </h3>
                            <ul>
                                <div className="shipping_box overflow-auto max-h-[160px]">
                                    <ul className="space-y-1">
                                        {address?.Addresses?.map((value) => (
                                            <div key={value.id} className="flex flex-col mb-4">
                                                <li className="flex items-center mb-2">
                                                    <input
                                                        className="!h-[18px] !w-[30px]"
                                                        type="radio"
                                                        name="deliveryAddress"
                                                        value={value.id}
                                                        onChange={() => handleSelectAddress(value)}
                                                    />
                                                    <h6 className="flex-1">
                                                        {value.name} (+{value.phone}) - {value.address}
                                                    </h6>
                                                </li>
                                                <div className="flex items-center justify-between pl-6">
                                                    <span className="text-gray-600">{value.email}</span>
                                                    <button
                                                        onClick={() => handleDeleteProduct(value.id)}
                                                        className="p-1 text-red-500 hover:text-red-700"
                                                    >
                                                        <FontAwesomeIcon icon={faTrash} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </ul>
                                </div>
                            </ul>
                        </div>
                        <div>
                            <div className="float-end flex">
                                <div className="mr-[10px] w-[150px] h-[30px] flex items-center justify-center border-[1px] border-black">
                                    <button onClick={() => setCreateBtn(true)}>
                                        <h4>
                                            <FontAwesomeIcon icon={faPlus} />
                                            Thêm địa chỉ mới
                                        </h4>
                                    </button>
                                    <CreateLocation
                                        isCreateModalOpen={create}
                                        setIsCreateModalOpen={setCreateBtn}
                                        fetchProductData={fetchProductData}
                                    />
                                </div>
                                <div className="w-[120px] h-[30px] flex items-center justify-center border-[1px] border-black">
                                    <button>
                                        <h4>Thiết lập địa chỉ</h4>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HomeBanner;
