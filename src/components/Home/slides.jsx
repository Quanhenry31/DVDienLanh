import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

const Slideshow = () => {
    const images = [
        'https://media.istockphoto.com/id/1208032469/vi/anh/c%C3%B4-g%C3%A1i-tr%E1%BA%BB-xinh-%C4%91%E1%BA%B9p-ng%E1%BB%93i-qu%E1%BB%B3-b%C3%AAn-c%E1%BA%A1nh-m%C3%A1y-gi%E1%BA%B7t-c%C3%B4-n%E1%BA%A1p-m%C3%A1y-gi%E1%BA%B7t-v%E1%BB%9Bi-gi%E1%BA%B7t-b%E1%BA%A9n-v%C3%A0-c%E1%BA%A5u-h%C3%ACnh-gi%E1%BA%B7t.jpg?s=1024x1024&w=is&k=20&c=UatS0VwXmCRyLM5WZ9Jdl8AiLkMEozAja0f0AH3nmyw=',
        'https://gcs.tripi.vn/public-tripi/tripi-feed/img/477810tCE/anh-mo-ta.png',
        'https://dienmaythienphu.vn/wp-content/uploads/2022/07/may-giat-electrolux-inverter-9-kg-ewf9025bqwa-cong-nghe-vapour-care.jpg',
    ];

    const properties = {
        autoplay: true,
        infinite: true,
        arrows: false,
        pauseOnHover: true,
        duration: 1000,
    };

    return (
        <Slide {...properties}>
            {images.map((image, index) => (
                <div className="grid place-items-center">
                    <div
                        key={index}
                        className="relative w-[1000px] h-[500px] bg-cover bg-cover mb-[50px]"
                        style={{ backgroundImage: `url(${image})` }}
                    ></div>
                </div>
            ))}
        </Slide>
    );
};

export default Slideshow;
