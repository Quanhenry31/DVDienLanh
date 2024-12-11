import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';

const PrivateAdminRoute = ({ user, auth, children }) => {
    return auth && user?.role === 1 ? children : <Navigate to="/login" />;
};

export default PrivateAdminRoute;
