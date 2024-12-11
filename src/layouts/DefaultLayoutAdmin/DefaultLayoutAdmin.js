import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './DefaultLayoutAdmin.module.scss';
import { useSelector } from 'react-redux';

// Admin
import AdHeader from '~/layouts/components/Admin/Header';
import AdSidebar from '~/layouts/components/Admin/Sidebar';

const cx = classNames.bind(styles);

function DefaultLayoutAdmin({ children }) {
    const user = useSelector((state) => state.user.user);

    return (
        <div>
            <div className={cx('Wrapper')}>
                <AdHeader />
                <div className={cx('container')}>
                    <AdSidebar />
                    <div className={cx('content')}>{children}</div>
                </div>
            </div>
        </div>
    );
}

DefaultLayoutAdmin.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayoutAdmin;
