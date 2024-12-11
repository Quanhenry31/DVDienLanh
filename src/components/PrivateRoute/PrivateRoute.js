import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '~/AuthContext';

const PrivateRoute = ({ user, auth, children }) => {
    console.log(user);

    return auth && user?.role === 2 ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
