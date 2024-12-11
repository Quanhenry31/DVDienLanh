import axios from 'axios';
import { useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function CallBack() {
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(`http://localhost:9000/api/orders/callback`, {
                    code: searchParams.get('code'),
                    id: searchParams.get('id'),
                    cancel: searchParams.get('cancel'),
                    status: searchParams.get('status'),
                    orderCode: searchParams.get('orderCode'),
                });
                if (response.data?.success) {
                    window.location.href = '/category';
                }
            } catch (error) {
                console.error('There was an error fetching the product data!', error);
                toast.success('Thanh toán thất bại!');
            }
        };

        fetchData();
    }, []);

    return <></>;
}

export default CallBack;
