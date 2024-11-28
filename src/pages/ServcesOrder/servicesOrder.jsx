import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { addToCartQuantity } from '~/redux/cartSlice';
import ServicesOrderComponent from '~/components/ServicesOrder/ServicesOrder';
import ServicesComment from '~/components/ServicesOrder/services_comment';
import HomeBanner from '~/components/Cart/home_banner';

function ServicesOrder() {
    return (
        <>
            <HomeBanner />
            <ServicesOrderComponent />
            <ServicesComment />
        </>
    );
}

export default ServicesOrder;
