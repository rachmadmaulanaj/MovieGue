import React from 'react'
import Header from '../components/Header'
import Filter from '../components/Filter'
import ListCard from '../components/ListCard'
import ButtonScrollUp from '../components/ButtonScrollUp'
import Footer from '../components/Footer'
import ReactLoading from 'react-loading';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            genres: [],
            page: 1,
            totalPages: 1,
            viewType: 'card',
            isLoading: true,
            isLoadingButton: false,
            searchInput: '',
            releaseYearFilter: '',
            genreFilter: '',
        }
        this.api_key = 'd34542688f58164b1099abf9c99ff588';
        this.api_token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMzQ1NDI2ODhmNTgxNjRiMTA5OWFiZjljOTlmZjU4OCIsInN1YiI6IjY1MzFkZTAzNDgxMzgyMDBhYzM5ZTdmZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1TmNtTnwY7_wTU3OANnLk5p1KVK5g6WX5n7fgu5jF_k';
        this.api_url_genre_movie = 'https://api.themoviedb.org/3/genre/movie/list';
        this.api_url_discover_movie = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc`;
        this.api_url_search_movie = `https://api.themoviedb.org/3/search/movie?query=`;

        this.api_options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer ' + this.api_token
            }
        };
    }

    getDataMoviesDiscover = () => {
        let filters = `&page=${this.state.page}`;
        filters += this.state.releaseYearFilter !== '' ? `&primary_release_year=${this.state.releaseYearFilter}` : '';
        filters += this.state.genreFilter !== '' ? `&with_genres=${this.state.genreFilter}` : '';
        return fetch(this.api_url_discover_movie + filters, this.api_options).then(response => response.json());
    }
    getDataMoviesSearch = () => {
        let page = `&page=${this.state.page}`;
        return fetch(this.api_url_search_movie + this.state.searchInput + page, this.api_options).then(response => response.json());
    }
    getDataGenres = () => {
        return fetch(this.api_url_genre_movie, this.api_options).then(response => response.json());
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }
    handleSearchEnter = (event) => {
        const search = event.target.value;
        this.setState({ searchInput: search });
        if (event.key === 'Enter') {
            this.setState({ isLoading: true, releaseYearFilter: '', genreFilter: '' });
            this.getDataMoviesSearch()
                .then((movies) => {
                    this.setState({
                        page: movies.page,
                        totalPages: movies.total_pages,
                        movies: movies.results,
                        isLoading: false,
                    });
                })
                .catch(error => {
                    console.error('Error fetching data handleSearchEnter:', error);
                    this.setState({ isLoading: false });
                });
        }
        return false;
    }
    handleSearchRemoveClick = (event) => {
        this.setState({ isLoading: true });
        const class_i = event.target.classList;
        if (class_i.value.search('fa-search') !== -1) {
            this.setState({ isLoading: false });
            return false;
        }
        this.getDataMoviesDiscover()
            .then((movies) => {
                this.setState({
                    searchInput: '',
                    page: movies.page,
                    totalPages: movies.total_pages,
                    movies: movies.results,
                    isLoading: false,
                });
            })
            .catch(error => {
                console.error('Error fetching data handleSearchRemoveClick:', error);
                this.setState({ isLoading: false });
            });
    }
    handleSelectFilterChange = (event) => {
        this.setState({ isLoading: true, searchInput: '' });
        const { name, value } = event.target;
        this.setState({ [name]: value }, () => {
            this.getDataMoviesDiscover()
                .then((movies) => {
                    this.setState({
                        page: movies.page,
                        totalPages: movies.total_pages,
                        movies: movies.results,
                        isLoading: false,
                    });
                })
                .catch(error => {
                    console.error('Error fetching data handleSelectFilterChange:', error);
                    this.setState({ isLoading: false });
                });
        });
    }
    handleViewTypeClick = (type) => {
        this.setState({ viewType: type });
    }
    handleViewMoreClick = () => {
        this.setState({ isLoadingButton: true });
        this.setState((prevState) => {
            return { page: prevState.page + 1 }
        }, () => {
            if (this.state.searchInput) {
                this.getDataMoviesSearch()
                    .then((movies) => {
                        this.setState({
                            page: movies.page,
                            totalPages: movies.total_pages,
                            movies: [...this.state.movies, ...movies.results],
                            isLoadingButton: false,
                        });
                    })
                    .catch(error => {
                        console.error('Error fetching data handleViewMoreClick:', error);
                        this.setState({ isLoadingButton: false });
                    });
            } else {
                this.getDataMoviesDiscover()
                    .then((movies) => {
                        this.setState({
                            page: movies.page,
                            totalPages: movies.total_pages,
                            movies: [...this.state.movies, ...movies.results],
                            isLoadingButton: false,
                        });
                    })
                    .catch(error => {
                        console.error('Error fetching data handleViewMoreClick:', error);
                        this.setState({ isLoadingButton: false });
                    });
            }
        });
    }

    componentDidMount() {
        Promise.all([this.getDataMoviesDiscover(), this.getDataGenres()])
            .then(([movies, genres]) => {
                this.setState({
                    page: movies.page,
                    totalPages: movies.total_pages,
                    movies: movies.results,
                    genres: genres.genres,
                    isLoading: false,
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                this.setState({ isLoading: false });
            });
    }

    render() {
        return (
            <>
                <Header isShow={true} searchInput={this.state.searchInput} onInputChange={this.handleInputChange} onSearchEnter={this.handleSearchEnter} onSearchRemoveClick={this.handleSearchRemoveClick} />
                <Filter genres={this.state.genres} viewType={this.state.viewType} releaseYearFilter={this.state.releaseYearFilter} genreFilter={this.state.genreFilter} onViewTypeClick={this.handleViewTypeClick} onSelectChange={this.handleSelectFilterChange} />
                {
                    this.state.isLoading ? (
                        <div className='loading-block d-flex' style={{
                            height: '100vh',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <ReactLoading type='spinningBubbles' height='10%' width='10%' />
                        </div>
                    ) : (
                        <>
                            <div className='row my-3'>
                                {
                                    this.state.movies.length ?
                                        this.state.movies.map((val) => {
                                            let genre = val.genre_ids.map((v) => {
                                                return this.state.genres.find(o => o.id === v);
                                            });
                                            return <ListCard movie={val} genres={genre} key={val.id} viewType={this.state.viewType} />
                                        })
                                        : <div className='col-12'>
                                            <div className='text-center text-white py-5'>
                                                <i className='fa fa-search' style={{ fontSize: '150px', paddingBottom: '30px' }}></i>
                                                <h1>No Movie Found</h1>
                                            </div>
                                        </div>
                                }
                            </div>
                            {
                                this.state.totalPages !== this.state.page ? (
                                    <div className='text-center'>
                                        <button className='btn bg-teal text-white' style={{ width: '120px' }} onClick={this.handleViewMoreClick}>
                                            {
                                                this.state.isLoadingButton ? (
                                                    <ReactLoading type='spinningBubbles' height='25px' width='25px' className='m-auto' />
                                                ) : (
                                                    'View More'
                                                )
                                            }
                                        </button>
                                    </div>
                                ) : ''
                            }
                        </>
                    )
                }
                <ButtonScrollUp />
                <Footer />
            </>
        );
    }
}

export default Home;