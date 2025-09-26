import Moment from 'moment';
import Stars from './Stars';
import { useEffect } from 'react';
import { Tooltip } from 'bootstrap/dist/js/bootstrap.bundle';
import NoImageMovie from '../img/no-image-movie.png';
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { viewDetailMovie } from '../redux/slice/detailSlice';

const ListCard = (props) => {
    const poster = props.movie.poster_path ? 'https://image.tmdb.org/t/p/w342/' + props.movie.poster_path : NoImageMovie;
    const card_image = {
        backgroundImage: `url(${poster})`,
        WebkitMaskImage: `linear-gradient(transparent, ${'var(--color-grey)'} 20%, ${'var(--color-black) 80%'}, transparent)`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height: '250px',
        borderTopLeftRadius: '20px',
        borderTopRightRadius: '20px'
    }
    const movie_release_date = Moment(props.movie.release_date).format('DD MMM YYYY');
    const movie_genres = props.genres.map(v => v.name).join(', ');
    const dispatch = useDispatch();

    const createSlug = (title) => {
        return title
            .toLowerCase() // Ubah teks menjadi huruf kecil
            .replace(/\s+/g, '-') // Ganti spasi dengan tanda hubung
            .replace(/[^\w-]+/g, '') // Hapus karakter khusus
            .replace(/--+/g, '-') // Ganti dua tanda hubung berturut-turut dengan satu tanda hubung
            .trim(); // Hapus spasi di awal dan akhir
    }
    const link_detail = '/detail/' + createSlug(props.movie.title);

    const addDataInViewDetail = (event) => {
        const element = event.target.parentNode;
        if (element && element.getAttribute('data-bs-toggle') === 'tooltip') {
            const tooltip = Tooltip.getInstance(element);
            if (tooltip) { tooltip.dispose(); }
        }
        dispatch(viewDetailMovie(props.movie.id));
    }

    useEffect(() => {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new Tooltip(tooltipTriggerEl);
        });
    }, []);

    return (
        <>
            {
                props.viewType === 'card' ? (
                    <div className='col-sm-12 col-md-6 col-lg-4 col-xl-3 my-3'>
                        <div className='card' style={{
                            backgroundColor: 'var(--color-black)',
                            border: 'none',
                            borderRadius: '20px',
                            boxShadow: '0 .5rem 1rem rgba(0,0,0,.5)'
                        }}>
                            <div style={card_image}></div>
                            <Link to={link_detail}>
                                <button className='btn btn-sm bg-teal text-light position-absolute' style={{ top: '10px', right: '10px' }} onClick={addDataInViewDetail} data-bs-toggle='tooltip' data-bs-placement='left' title='View Detail'>
                                    <i className='fa fa-sm fa-info-circle'></i>
                                </button>
                            </Link>
                            <div className='card-body text-white'>
                                <Link to={link_detail}>
                                    <span className='h5 text-white' onClick={addDataInViewDetail}>{props.movie.title}</span>
                                </Link>
                                <p style={{ fontSize: '.70rem', color: 'var(--color-teal)' }}>
                                    {movie_release_date}
                                    <span className='mx-2'>|</span>
                                    {movie_genres}
                                </p>
                                <p style={{ fontSize: '.70rem' }}>
                                    {props.movie.overview.slice(0, 150) + (props.movie.overview.length > 150 ? '...' : '')}
                                </p>
                                <div className='d-flex justify-content-between'>
                                    <div><Stars rating={props.movie.vote_average} /></div>
                                    <div className='text-teal'>{props.movie.vote_average.toFixed(1)}</div>
                                </div>
                            </div>
                        </div>
                    </div >
                ) : (
                    <div className='col-12 mb-2 card-spacing'>
                        <div className='card' style={{
                            backgroundColor: 'var(--color-black)',
                            border: 'none',
                            borderRadius: '20px',
                            boxShadow: '0 .5rem 1rem rgba(0,0,0,.5)'
                        }}>
                            <img src={poster} alt={props.movie.title} className='rounded img-list-view'/>
                            <div className='card-body card-body-list text-white'>
                                <div className='d-flex justify-content-between'>
                                    <Link to={link_detail}>
                                        <span className='h3 text-white' onClick={addDataInViewDetail}>{props.movie.title}</span>
                                    </Link>
                                    <Link to={link_detail}>
                                        <button className='btn btn-sm bg-teal text-light' style={{ height: 'fit-content' }} onClick={addDataInViewDetail}>
                                            <i className='fa fa-sm fa-info-circle'></i>
                                            <span className='d-lg-inline-block d-none ms-1'>View Detail</span>
                                        </button>
                                    </Link>
                                </div>
                                <p className='text-teal small'>
                                    {movie_release_date}
                                    <span className='mx-2'>|</span>
                                    {movie_genres}
                                </p>
                                <p className='small d-lg-block d-none'>{props.movie.overview}</p>
                                <p className='small d-lg-none d-block'>
                                    {props.movie.overview.slice(0, 150) + (props.movie.overview.length > 150 ? '...' : '')}
                                </p>
                                <div className='d-flex justify-content-between'>
                                    <div><Stars rating={props.movie.vote_average} /></div>
                                    <div className='text-teal'>{props.movie.vote_average.toFixed(1)}</div>
                                </div>
                            </div>
                        </div>
                    </div >
                )
            }
        </>
    )
}

export default ListCard;