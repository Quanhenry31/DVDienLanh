import axios from 'axios';
import { useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function CallBackPaypal() {
    const [searchParams, setSearchParams] = useSearchParams();
    const ok = searchParams.get('paymentId');
    console.log(ok);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(`http://localhost:9000/api/orders/callback/paypal`, {
                    paymentId: searchParams.get('paymentId'),
                    token: searchParams.get('token'),
                    PayerID: searchParams.get('PayerID'),
                });
                console.log(response);
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

export default CallBackPaypal;
