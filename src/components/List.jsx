const List = (props) => {
    if (props.viewType === 'card') {
        return (
            <div className='col-md-4 col-lg-2'>
                <div className='card-movie'>
                    <img className='rounded w-100' src={'https://image.tmdb.org/t/p/w185/' + props.data.poster_path} alt="venom" />
                    <h4>{props.data.title}</h4>
                    <small>{props.data.overview}</small>
                </div>
            </div>
        );
    } else {
        return (
            <div className='col-12'>
                <div className='d-flex my-2'>
                    <img className='rounded' src={'https://image.tmdb.org/t/p/w154/' + props.data.poster_path} alt="venom" />
                    <div className="text-light ps-3">
                        <h4>{props.data.title}</h4>
                        <small>{props.data.overview}</small>
                    </div>
                </div>
            </div>
        );
    }
}

export default List;