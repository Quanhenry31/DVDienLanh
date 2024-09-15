import axios from 'axios';
import { useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function CallBackPaypal() {
    const [searchParams, setSearchParams] = useSearchParams();
    console.log(searchParams);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(`http://localhost:9000/api/orders/callback/Momo`, {
                    partnerCode: searchParams.get('partnerCode'),
                    orderId: searchParams.get('orderId'),
                    requestId: searchParams.get('requestId'),
                    amount: searchParams.get('amount'),
                    orderInfo: searchParams.get('orderInfo'),
                    orderType: searchParams.get('orderType'),
                    transId: searchParams.get('transId'),
                    resultCode: searchParams.get('resultCode'),
                    message: searchParams.get('message'),
                    payType: searchParams.get('payType'),
                    responseTime: searchParams.get('responseTime'),
                    extraData: searchParams.get('extraData'),
                    signature: searchParams.get('signature'),
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
