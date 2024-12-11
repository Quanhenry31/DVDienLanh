import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleQuestion,
    faEarthAsia,
    faEllipsisVertical,
    faGear,
    faKeyboard,
    faRightToBracket,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import images from '~/assets/images';

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { Link } from 'react-router-dom';
// import 'tippy.js/dist/tippy.css'; // optional

import config from '~/config';
import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';
import { faTiktok } from '@fortawesome/free-brands-svg-icons';
import { InboxIcon, MessageIcon, UploadIcon } from '~/components/Icons';
import Image from '~/components/Image';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia}></FontAwesomeIcon>,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion}></FontAwesomeIcon>,
        title: 'Feedback and Help',
        to: './feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard}></FontAwesomeIcon>,
        title: 'Keyboard shortcuts',
    },
];

function Header() {
    const currentUser = true;

    //Handle logic
    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case 'language':
                //Handle chage language
                break;
            default:
        }
    };

    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>,
            title: 'View profile',
            to: './viewprofile',
        },
        {
            icon: <FontAwesomeIcon icon={faTiktok}></FontAwesomeIcon>,
            title: 'Get coins',
            to: './coins',
        },
        {
            icon: <FontAwesomeIcon icon={faGear}></FontAwesomeIcon>,
            title: 'Settings',
            to: './setting',
        },
        ...MENU_ITEMS,
        {
            icon: <FontAwesomeIcon icon={faRightToBracket}></FontAwesomeIcon>,
            title: 'Log out',
            to: './out',
            separate: true,
        },
    ];

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to={config.routes.home} className={cx('logo-link')}>
                    <img
                        src="https://s3.amazonaws.com/babelcube/users/60ba26c817a3d_in-lnh_logo-dienlanhnguyenduc.png"
                        alt="ADMIN"
                        className={cx('img-supo')}
                        class="w-[70px]"
                    />
                    <div class="flex justify-center items-center !h-[60px]">
                        <h2>ADMIN</h2>
                    </div>
                </Link>

                <div className={cx('actions')}>
                    {currentUser ? (
                        <>
                            <Tippy delay={[0, 50]} content="Upload video" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <UploadIcon />
                                </button>
                            </Tippy>
                            <Tippy delay={[0, 50]} content="Message" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <MessageIcon />
                                </button>
                            </Tippy>
                            <Tippy delay={[0, 50]} content="Inbox" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <InboxIcon />
                                    <span className={cx('badge')}>12</span>
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <Button text>Upload</Button>
                            <Button primary>Log in</Button>
                        </>
                    )}
                    <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
                        {currentUser ? (
                            <Image
                                className={cx('user-avatar')}
                                src="https://p16-sign-useast2a.tiktokcdn.com/tos-useast2a-avt-0068-giso/d80d1f6d50cd3b37510964b21f2fb571~c5_100x100.jpeg?lk3s=a5d48078&x-expires=1709733600&x-signature=JqERa95Mhczw9L7N93MLgkhx3UE%3D"
                                alt="avatar"
                                fallback="https://p16-sign-useast2a.tiktokcdn.com/tos-useast2a-avt-0068-giso/d80d1f6d50cd3b37510964b21f2fb571~c5_100x100.jpeg?lk3s=a5d48078&x-expires=1709733600&x-signature=JqERa95Mhczw9L7N93MLgkhx3UE%3D"
                            />
                        ) : (
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;
