import config from '~/config';

// Layout
import layouts, { HeaderOnly } from '~/layouts';

import BlogDetail from '~/pages/BlogDetail';
import Blogs from '~/pages/Blogs';
import Cart from '~/pages/Cart';
import Category from '~/pages/Category';
import Detail from '~/pages/Detail';
import Home from '~/pages/Home';
import Invoice from '~/pages/Invoice';
import Login from '~/pages/Login';
import Register from '~/pages/Register';
import Order from '~/pages/Order';
import User from '~/pages/User';
import CallBack from '~/pages/Callback';
import CallBackPaypal from '~/pages/CallbackPaypal';
import CallbackMomo from '~/pages/CallbackMomo';

const publicRoutes = [
    { path: config.routes.blogDetail, component: BlogDetail },
    { path: config.routes.blog, component: Blogs },
    { path: config.routes.cart, component: Cart },
    { path: config.routes.category, component: Category },
    { path: config.routes.detail, component: Detail },
    { path: config.routes.home, component: Home },
    { path: config.routes.order, component: Order },
    { path: config.routes.user, component: User },
    { path: config.routes.callback, component: CallBack, layout: null },
    { path: config.routes.callbackPaypal, component: CallBackPaypal, layout: null },
    { path: config.routes.callbackMomo, component: CallbackMomo, layout: null },
    { path: config.routes.login, component: Login, layout: null },
    { path: config.routes.register, component: Register, layout: null },
];

const privateRoutes = [{ path: config.routes.invoice, component: Invoice, layout: null }];

export { publicRoutes, privateRoutes };
