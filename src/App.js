import { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { privateRoutes, publicRoutes, adminRoutes, authRoutes } from '~/routes';
// import { privateAdmin } from '~/routes';
import { DefaultLayout } from '~/layouts';

import { AuthProvider } from '~/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import PrivateAdminRoute from './components/PrivateAdminRoute';
import ScrollToTop from './components/ScrollToTop';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToUser } from './redux/userSlice';
import DefaultLayoutAdmin from './layouts/DefaultLayoutAdmin';
import Redirector from './components/Redirector';
function App() {
    const [user, setUser] = useState(null);
    const dispatch = useDispatch();
    const [auth, setAuth] = useState(false);
    // const navigate = useNavigate();
    const getUsergoogle = async () => {
        try {
            const url = `${process.env.REACT_APP_API_URL}/auth/login/success`;
            const { data } = await axios.get(url, { withCredentials: true });
            // Dữ liệu người dùng được trả về từ cơ sở dữ liệu (userInDb)
            setUser(data.user); // Cập nhật state với dữ liệu người dùng từ backend
            dispatch(addToUser(data.user));
            setAuth(true);
        } catch (err) {
            setAuth(false);
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
                    setAuth(true);
                })
                .catch((err) => {
                    console.log(err);
                    setAuth(false);
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
                <Redirector user={user} auth={auth} />
                <Routes>
                    {/* Các route công khai */}
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

                    {/* Các route yêu cầu đăng nhập */}
                    {auth &&
                        user.role === 2 &&
                        privateRoutes.map((route, index) => {
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
                                        <PrivateRoute auth={auth} user={user}>
                                            <Layout>
                                                <Page />
                                            </Layout>
                                        </PrivateRoute>
                                    }
                                />
                            );
                        })}

                    {/* Các route admin */}
                    {auth &&
                        user.role === 1 &&
                        adminRoutes.map((route, index) => {
                            const Page = route.component;
                            let Layout = DefaultLayoutAdmin;
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
                                        <PrivateAdminRoute auth={auth} user={user}>
                                            <Layout>
                                                <Page />
                                            </Layout>
                                        </PrivateAdminRoute>
                                    }
                                />
                            );
                        })}

                    {/* Các route không yêu cầu phân quyền */}
                    {authRoutes.map((route, index) => {
                        const Page = route.component;
                        return <Route key={index} path={route.path} element={<Page />} />;
                    })}
                </Routes>
            </div>
            {/* </AuthProvider> */}
        </Router>
    );
}

export default App;
