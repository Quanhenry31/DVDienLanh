import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import config from '~/config';
import Menu, { MenuItem } from './Menu';
import {
    HomeIcon,
    HomeActiveIcon,
    LiveIcon,
    LiveActiveIcon,
    ProductIcon,
    ProductActiveIcon,
    BillIcon,
    BillActiveIcon,
    UserIcon,
    UserActiveIcon,
    PaymentIcon,
    PaymentActiveIcon,
    ChatsIcon,
    ChatsActiveIcon,
    BlogIcon,
    BlogActiveIcon,
    MaintenanceIcon,
    MaintenanceActiveIcon,
    PeriodicMaintenanceIcon,
    PeriodicMaintenanceActiveIcon,
    CategoryIcon,
    CategoryActiveIcon,
    BrandIcon,
    BrandActiveIcon,
    VoucherIcon,
    VoucherActiveIcon,
} from '~/components/Icons';

const cx = classNames.bind(styles);

const ClearStorageOnRouteChange = () => {
    const location = useLocation();

    useEffect(() => {
        if (location.pathname !== config.routes.hoaDonDetaill) {
            localStorage.removeItem('eyeOrderId');
        }
        if (location.pathname !== config.routes.user) {
            localStorage.removeItem('userOrderId');
        }
        if (location.pathname !== config.routes.hoaDon) {
            localStorage.removeItem('eyeOrderDetailId');
        }
        if (location.pathname !== config.routes.sanPham) {
            localStorage.removeItem('eyeProductId');
        }
    }, [location.pathname]);

    return null; // This component doesn't render anything
};

function Sidebar() {
    return (
        <aside className={cx('wrapper')}>
            <ClearStorageOnRouteChange />
            <Menu>
                <MenuItem
                    title="Thống kê"
                    to={config.routes.ADthongKe}
                    icon={<HomeIcon />}
                    activeIcon={<HomeActiveIcon />}
                />
                <MenuItem
                    title="Sản phẩm"
                    to={config.routes.ADsanPham}
                    icon={<ProductIcon />}
                    activeIcon={<ProductActiveIcon />}
                />
                <MenuItem
                    title="Hóa đơn"
                    to={config.routes.ADhoaDon}
                    icon={<BillIcon />}
                    activeIcon={<BillActiveIcon />}
                />

                <MenuItem
                    title="Khách hàng"
                    to={config.routes.ADuser}
                    icon={<UserIcon />}
                    activeIcon={<UserActiveIcon />}
                />
                {/* <MenuItem
          title="payment"
          to={config.routes.payment}
          icon={<PaymentIcon />}
          activeIcon={<PaymentActiveIcon />}
        /> */}
                <MenuItem
                    title="Chats"
                    to={config.routes.ADchats}
                    icon={<ChatsIcon />}
                    activeIcon={<ChatsActiveIcon />}
                />
                <MenuItem title="Blog" to={config.routes.ADblog} icon={<BlogIcon />} activeIcon={<BlogActiveIcon />} />
                <MenuItem
                    title="ServicesU"
                    to={config.routes.ADservicesUsually}
                    icon={<MaintenanceIcon />}
                    activeIcon={<MaintenanceActiveIcon />}
                />
                <MenuItem
                    title="ServicesDay"
                    to={config.routes.ADservicesDay}
                    icon={<PeriodicMaintenanceIcon />}
                    activeIcon={<PeriodicMaintenanceActiveIcon />}
                />
                <MenuItem
                    title="Category"
                    to={config.routes.ADcategory}
                    icon={<CategoryIcon />}
                    activeIcon={<CategoryActiveIcon />}
                />
                <MenuItem
                    title="Brand"
                    to={config.routes.ADbrand}
                    icon={<BrandIcon />}
                    activeIcon={<BrandActiveIcon />}
                />
                <MenuItem
                    title="Voucher"
                    to={config.routes.ADvoucher}
                    icon={<VoucherIcon />}
                    activeIcon={<VoucherActiveIcon />}
                />
            </Menu>
        </aside>
    );
}

export default Sidebar;
