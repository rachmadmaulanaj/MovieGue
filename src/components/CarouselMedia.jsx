import React from 'react';
import ReactPlayer from 'react-player';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const CarouselMedia = (props) => {
    return (
        props.data.length ? (
            props.type === 'photo' ? (
                <div id="carouselPhoto">
                    <Carousel
                        infiniteLoop
                        centerMode
                        centerSlidePercentage={30}
                        showStatus={false}
                        showIndicators={false}
                        showThumbs={false}
                    >
                        {
                            props.data.map((val, idx) => {
                                const poster = `https://image.tmdb.org/t/p/w185${val.file_path}`;
                                return (
                                    <div style={{ maxHeight: '250px' }} key={idx}>
                                        <img src={poster} style={{ width: 'auto' }} className='rounded shadow' />
                                    </div>
                                )
                            })
                        }
                    </Carousel>
                </div>
            ) : (
                <div id="carouselVideo">
                    <Carousel 
                        showStatus={false}
                        showIndicators={false}
                        showThumbs={false}
                        showArrows={false}
                    >
                        {
                            props.data.map((val) => {
                                const url = `https://www.youtube.com/embed/${val.key}`;
                                return (
                                    <ReactPlayer width="100%" url={url} key={val.id} controls />
                                )
                            })
                        }
                    </Carousel>
                </div>
            )
        ) : (
            <h5>Tidak ada data</h5>
        )
    )
}

export default CarouselMedia;