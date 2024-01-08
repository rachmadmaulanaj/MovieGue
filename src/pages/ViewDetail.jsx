import React from 'react';
import store from '../redux/store';
import Header from '../components/Header';
import CarouselMedia from '../components/CarouselMedia';
import NoImageMovie from '../img/no-image-movie.png';
import Stars from '../components/Stars';
import Moment from 'moment';
import ReactLoading from 'react-loading';

class ViewDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: '',
            crew: '',
            cast: '',
            cast_more: '',
            images: '',
            videos: '',
            isLoading: true
        };

        this.slug = this.props.match.params.slug;
        this.movie_id = store.getState().detail.id;
        // this.movie_id = 575264;

        this.api_key = 'd34542688f58164b1099abf9c99ff588';
        this.api_token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMzQ1NDI2ODhmNTgxNjRiMTA5OWFiZjljOTlmZjU4OCIsInN1YiI6IjY1MzFkZTAzNDgxMzgyMDBhYzM5ZTdmZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1TmNtTnwY7_wTU3OANnLk5p1KVK5g6WX5n7fgu5jF_k';
        this.api_url_detail_movie = `https://api.themoviedb.org/3/movie/`;
        this.api_url_credits_movie = `https://api.themoviedb.org/3/movie/${this.movie_id}/credits`;
        this.api_url_images_movie = `https://api.themoviedb.org/3/movie/${this.movie_id}/images?include_image_language=en`;
        this.api_url_videos_movie = `https://api.themoviedb.org/3/movie/${this.movie_id}/videos`;

        this.api_options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer ' + this.api_token
            }
        };
    }

    getDataDetailMovie = () => {
        return fetch(this.api_url_detail_movie + this.movie_id, this.api_options).then(response => response.json());
    }
    getDataCreditsMovie = () => {
        return fetch(this.api_url_credits_movie, this.api_options).then(response => response.json());
    }
    getDataImagesMovie = () => {
        return fetch(this.api_url_images_movie, this.api_options).then(response => response.json());
    }
    getDataVideosMovie = () => {
        return fetch(this.api_url_videos_movie, this.api_options).then(response => response.json());
    }

    convertHour = (number) => {
        if (typeof number !== 'number') { return false; }

        number = number * 60;
        const jam = Math.floor(number / 3600);
        const menit = Math.floor((number % 3600) / 60);

        return `${jam ? jam + ' jam ' : ''}${menit ? menit + ' menit ' : ''}`;
    }
    convertDollar = (number) => {
        if (typeof number !== 'number') { return false; }

        const dollarFormat = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(number);

        return dollarFormat;
    }

    handleViewMoreCastClick = () => {
        this.setState({ cast: [...this.state.cast, ...this.state.cast_more] }, () => {
            this.setState({ cast_more: '' });
        });
    }

    componentDidMount() {
        if (!this.movie_id) { window.location.href = '/'; }
        Promise.all([this.getDataDetailMovie(), this.getDataCreditsMovie(), this.getDataImagesMovie(), this.getDataVideosMovie()])
            .then(([movie, credits, images, videos]) => {
                this.setState({
                    movie: movie,
                    crew: credits.crew,
                    cast: credits.cast.slice(0, 11),
                    cast_more: credits.cast.slice(12),
                    images: images,
                    videos: videos.results.filter(v => v.type === "Trailer" && v.site === "YouTube").slice(0, 10),
                    isLoading: false,
                });
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                this.setState({ isLoading: false });
            });
    }

    render() {
        const movie = this.state.movie;
        const crew = this.state.crew;
        const cast = this.state.cast;
        const images_poster = this.state.images.posters;
        const videos = this.state.videos;
        // const NoImageMovie = window.location.origin + '/moviegue/assets/no-image-movie.png';
        const poster = movie.poster_path ? 'https://image.tmdb.org/t/p/w185' + movie.poster_path : NoImageMovie;
        const backdrop = movie.backdrop_path ? 'https://image.tmdb.org/t/p/w1280' + movie.backdrop_path : NoImageMovie;
        const movie_release_date = Moment(movie.release_date).format('DD MMM YYYY');

        return (
            <>
                <Header isShow={false} />
                {
                    this.state.isLoading ? (
                        <div className='loading-block d-flex'>
                            <ReactLoading type='spinningBubbles' height='10%' width='10%' />
                        </div>
                    ) : (
                        <>
                            <div className='div-backdrop'>
                                <div style={{
                                    backgroundImage: `url(${backdrop})`,
                                    backgroundPosition: 'top',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'cover',
                                    height: '100%',
                                    position: 'relative',
                                }}>
                                </div>
                            </div>
                            <div className='div-detail-view container justify-content-center'>
                                <div className='p-2 div-detail-view-poster'>
                                    <img src={poster} alt={movie.title} className='w-100 img-thumbnail' />
                                    <div className='text-white div-lg-hide'>
                                        <div className='d-flex justify-content-between py-2'>
                                            <span className='text-teal'>Status</span>
                                            <span>{movie.status}</span>
                                        </div>
                                        <div className='d-flex justify-content-between py-2'>
                                            <span className='text-teal'>Anggaran</span>
                                            <span>{this.convertDollar(movie.budget)}</span>
                                        </div>
                                        <div className='d-flex justify-content-between py-2'>
                                            <span className='text-teal'>Pendapatan</span>
                                            <span>{this.convertDollar(movie.revenue)}</span>
                                        </div>
                                        <div className='d-flex justify-content-between py-2'>
                                            <span className='text-teal'>Bahasa</span>
                                            <span>{movie.original_language.toUpperCase()}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='text-black mb-3 div-detail-info-view'>
                                    <div className='div-detail-info-view-title' style={{ minHeight: '180px' }}>
                                        <h3 className='fw-bold'>{movie.title}</h3>
                                        <h6>{movie.tagline}</h6>
                                        <div>
                                            <Stars rating={movie.vote_average} />
                                            <div className='d-inline-block'><span className='fw-bold'>{movie.vote_average.toFixed(1)}</span> ({movie.vote_count} Vote)</div>
                                        </div>
                                        <div className='d-flex mt-2'>
                                            <div>
                                                <div className='fw-bold'>Tanggal Rilis</div>
                                                <div>{movie_release_date}</div>
                                            </div>
                                            <div style={{ width: '15px' }}></div>
                                            <div>
                                                <div className='fw-bold'>Durasi</div>
                                                <div>{this.convertHour(movie.runtime)}</div>
                                            </div>
                                        </div>
                                        <div className='d-flex mt-2'>
                                            {
                                                movie.genres.map((val) => {
                                                    return <span className="badge rounded-pill bg-teal me-2" key={val.id}>{val.name}</span>
                                                })
                                            }
                                        </div>
                                    </div>
                                    <div className='text-white mt-4'>
                                        <h2 className='mb-3 text-teal'>Sinopsis</h2>
                                        <p>{movie.overview}</p>
                                    </div>

                                    {/* Nav Tabs */}
                                    <ul className='nav nav-tabs mt-2' id='myTabs'>
                                        <li className='nav-item' key='Pencipta'>
                                            <a className='nav-link text-teal active' id='pencipta-tab' data-bs-toggle='tab' href='#pencipta'>Pencipta</a>
                                        </li>
                                        <li className='nav-item' key='Pemeran'>
                                            <a className='nav-link text-teal' id='pemeran-tab' data-bs-toggle='tab' href='#pemeran'>Pemeran</a>
                                        </li>
                                        <li className='nav-item' key='Media'>
                                            <a className='nav-link text-teal' id='media-tab' data-bs-toggle='tab' href='#media'>Media</a>
                                        </li>
                                    </ul>
                                    <div className='tab-content mt-2 text-white'>
                                        <div className='tab-pane fade show active' id='pencipta'>
                                            <div className='mb-3 d-flex'>
                                                <div className='d-inline-block mt-2'>
                                                    <h6>Direktur : </h6>
                                                    <p>{crew.map((val) => { if (val.department === 'Directing') return val.name + ', ' })}</p>
                                                    <h6>Produsen : </h6>
                                                    <p>{crew.map((val) => { if (val.department === 'Production') return val.name + ', ' })}</p>
                                                    <h6>Penulis : </h6>
                                                    <p>{crew.map((val) => { if (val.department === 'Writing') return val.name + ', ' })}</p>
                                                    <h6>Perusahaan Produksi : </h6>
                                                    <div className='d-flex flex-wrap align-items-end text-center'>
                                                        {
                                                            movie.production_companies.map((val) => {
                                                                const companie_logo = val.logo_path ? 'https://image.tmdb.org/t/p/w185' + val.logo_path : NoImageMovie;
                                                                return (
                                                                    <div className='d-inline-block p-2' key={val.id}>
                                                                        <img src={companie_logo} alt={val.name} className='d-block' style={{ maxWidth: '150px', maxHeight: '50px', margin: 'auto' }} />
                                                                        <small>{val.name} ({val.origin_country})</small>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='tab-pane fade' id='pemeran'>
                                            <div className='div-pemeran'>
                                                {
                                                    cast.map((val) => {
                                                        const profile = val.profile_path ? 'https://image.tmdb.org/t/p/w185' + val.profile_path : NoImageMovie;
                                                        return (
                                                            <div className='d-inline-block mx-2 mb-2 text-center' key={val.id} style={{ width: '105px', verticalAlign: 'top' }}>
                                                                <div className='img-thumbnail' style={{
                                                                    backgroundImage: `url(${profile})`,
                                                                    backgroundPosition: 'center',
                                                                    backgroundRepeat: 'no-repeat',
                                                                    backgroundSize: 'cover',
                                                                    width: '105px',
                                                                    height: '120px',
                                                                    border: 'solid'
                                                                }}></div>
                                                                <div className='small'>
                                                                    <div style={{ whiteSpace: 'initial' }}>{val.name}</div>
                                                                    <div>sebagai</div>
                                                                    <div style={{ whiteSpace: 'initial' }}>{val.character}</div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                                {
                                                    this.state.cast_more.length ? (
                                                        <div style={{
                                                            display: 'inline-block',
                                                            position: 'absolute',
                                                            height: '185px',
                                                            textAlign: 'center',
                                                        }}>
                                                            <div style={{
                                                                position: 'absolute',
                                                                top: '50%',
                                                                transform: 'translateY(-50%)',
                                                                cursor: 'pointer',
                                                                padding: '10px'
                                                            }} onClick={this.handleViewMoreCastClick}>
                                                                <i className='fa fa-arrow-right fa-lg'></i>
                                                                <div>View More</div>
                                                            </div>
                                                        </div>
                                                    ) : ''
                                                }
                                            </div>
                                        </div>
                                        <div className='tab-pane fade' id='media'>
                                            <h3 className='text-teal my-3'>Trailer</h3>
                                            <CarouselMedia data={videos.slice(1)} type='video' />
                                            <h3 className='text-teal my-3'>Poster</h3>
                                            <CarouselMedia data={images_poster} type='photo' />
                                        </div>
                                    </div>
                                    {/* End Nav Tabs */}

                                </div>
                            </div>
                        </>
                    )
                }
            </>
        )
    }
}

export default ViewDetail;