import config from '~/config';

// Layout Users
import layouts, { HeaderOnly } from '~/layouts';
import CallBack from '~/pages/Users/Callback';
import CallBackPaypal from '~/pages/Users/CallbackPaypal';
import CallbackMomo from '~/pages/Users/CallbackMomo';

import BlogDetail from '~/pages/Users/BlogDetail';
import Blogs from '~/pages/Users/Blogs';
import Cart from '~/pages/Users/Cart';
import Category from '~/pages/Users/Category';
import Detail from '~/pages/Users/Detail';
import Home from '~/pages/Users/Home';
import Invoice from '~/pages/Users/Invoice';
import Login from '~/pages/Users/Login';
import Register from '~/pages/Users/Register';
import Order from '~/pages/Users/Order';
import User from '~/pages/Users/User';
import ServicesOrder from '~/pages/Users/ServcesOrder';
import ServicesUsually from '~/pages/Users/ServicesUsually';
// Layout Admin
import Admin from '~/pages/Admin/Home';
import AdThongKe from '~/pages/Admin/Thongke';
import AdSanPham from '~/pages/Admin/SanPham';
import AdProfile from '~/pages/Admin/Profile';
import AdUpload from '~/pages/Admin/Upload';
import AdHoaDon from '~/pages/Admin/HoaDon';
import AdChats from '~/pages/Admin/Chats';
import AdUser from '~/pages/Admin/KhachHang';
import AdPayment from '~/pages/Admin/Payment';
import AdInvoice from '~/pages/Admin/Invoice';
import AdBlog from '~/pages/Admin/Blogs';
import AdServicesUsually from '~/pages/Admin/Services/ServicesUsually';
import AdServicesDay from '~/pages/Admin/Services/ServicesDay';
import AdPackage from '~/pages/Admin/Services/ServicesUsually/Package';
import AdCategory from '~/pages/Admin/Category';
import AdBrand from '~/pages/Admin/Brand';
import AdVoucher from '~/pages/Admin/Voucher';

const publicRoutes = [
    { path: config.routes.blogDetail, component: BlogDetail },
    { path: config.routes.blog, component: Blogs },
    { path: config.routes.cart, component: Cart },
    { path: config.routes.category, component: Category },
    { path: config.routes.detail, component: Detail },
    { path: config.routes.home, component: Home },
    { path: config.routes.order, component: Order },
    { path: config.routes.user, component: User },
    { path: config.routes.servicesOrder, component: ServicesOrder },
    { path: config.routes.ServicesUsually, component: ServicesUsually },
    { path: config.routes.callback, component: CallBack, layout: null },
    { path: config.routes.callbackPaypal, component: CallBackPaypal, layout: null },
    { path: config.routes.callbackMomo, component: CallbackMomo, layout: null },
    // { path: config.routes.login, component: Login, layout: null },
    // { path: config.routes.register, component: Register, layout: null },
];
const privateRoutes = [{ path: config.routes.invoice, component: Invoice, layout: null }];

const adminRoutes = [
    { path: config.routes.admin, component: Admin },
    { path: config.routes.ADthongKe, component: AdThongKe },
    { path: config.routes.ADsanPham, component: AdSanPham },
    { path: config.routes.ADprofile, component: AdProfile },
    { path: config.routes.ADupload, component: AdUpload },
    { path: config.routes.ADhoaDon, component: AdHoaDon },
    { path: config.routes.ADchats, component: AdChats },
    { path: config.routes.ADuser, component: AdUser },
    { path: config.routes.ADpayment, component: AdPayment },
    { path: config.routes.ADinvoice, component: AdInvoice },
    { path: config.routes.ADblog, component: AdBlog },
    { path: config.routes.ADservicesDay, component: AdServicesDay },
    { path: config.routes.ADservicesUsually, component: AdServicesUsually },
    { path: config.routes.ADpackage, component: AdPackage },
    { path: config.routes.ADcategory, component: AdCategory },
    { path: config.routes.ADbrand, component: AdBrand },
    { path: config.routes.ADvoucher, component: AdVoucher },
];

const authRoutes = [
    { path: config.routes.login, component: Login, layout: null },
    { path: config.routes.register, component: Register, layout: null },
];
export { publicRoutes, privateRoutes, adminRoutes, authRoutes };
