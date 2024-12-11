import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Redirector({ user, auth }) {
    const navigate = useNavigate();

    useEffect(() => {
        if (auth && user?.role === 1) {
            navigate('/thongke');
        }
    }, [user]);

    return null;
}

export default Redirector;
