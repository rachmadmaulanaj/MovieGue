import React, { useState, useEffect } from 'react';

const ButtonScrollUp = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <div>
            {
                isVisible && (
                    <button className='btn btn-scroll-up text-white bg-teal' onClick={scrollToTop}>
                        <i className='fa fa-arrow-up'></i>
                    </button>
                )
            }
        </div>
    )
}

export default ButtonScrollUp;