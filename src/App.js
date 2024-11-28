import { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '~/routes';
import { DefaultLayout } from '~/layouts';

import { AuthProvider } from '~/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import ScrollToTop from './components/ScrollToTop';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToUser } from './redux/userSlice';
function App() {
    const [user, setUser] = useState(null);
    const dispatch = useDispatch();

    const getUsergoogle = async () => {
        try {
            const url = `${process.env.REACT_APP_API_URL}/auth/login/success`;
            const { data } = await axios.get(url, { withCredentials: true });
            // Dữ liệu người dùng được trả về từ cơ sở dữ liệu (userInDb)
            setUser(data.user); // Cập nhật state với dữ liệu người dùng từ backend
            dispatch(addToUser(data.user));
        } catch (err) {
            console.log(err);
        }
    };

    const getUserBassic = async () => {
        try {
            axios.defaults.withCredentials = true;
            axios
                .get('http://localhost:9000/api/users/currentUser')
                .then((res) => {
                    setUser(res.data);
                    dispatch(addToUser(res.data));
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getUserBassic();
        getUsergoogle();
    }, []);

    return (
        <Router>
            {/* <AuthProvider> */}
            <ScrollToTop />
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;

                        let Layout = DefaultLayout;

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}

                    {privateRoutes.map((route, index) => {
                        const Page = route.component;

                        let Layout = DefaultLayout;

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <PrivateRoute>
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    </PrivateRoute>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
            {/* </AuthProvider> */}
        </Router>
    );
}

export default App;
