import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import { useSelector } from 'react-redux';
// User
import Header from '~/layouts/components/User/Header';
import Footer from '../components/User/Footer';
// Admin
import AdHeader from '~/layouts/components/Admin/Header';
import AdSidebar from '~/layouts/components/Admin/Sidebar';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const user = useSelector((state) => state.user.user);

    return (
        <div>
            <Header />
            <div>{children}</div>
            <Footer />
        </div>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
