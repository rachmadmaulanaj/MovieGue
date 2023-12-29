const Filter = (props) => {
    const years = [];
    const current_year = new Date().getFullYear();
    for (let i = 0; i < 15; i++) {
        years.push(current_year - i);
    }

    const handleClick = (e) => {
        const type = e.target.getAttribute('data-type');
        props.onViewTypeClick(type);
    }

    return (
        <div style={{ backgroundColor: 'var(--color-black)', borderRadius: '10px' }}>
            <div className='p-3 d-flex justify-content-between'>
                <div>
                    <select className='select-filter me-3 select-custom' name='releaseYearFilter' value={props.releaseYearFilter} onChange={props.onSelectChange}>
                        <option value=''>All Date</option>
                        {
                            years.map((val, i) => {
                                return <option value={val} key={i}>{val}</option>
                            })
                        }
                    </select>
                    <select className='select-filter select-custom' name='genreFilter' value={props.genreFilter} onChange={props.onSelectChange}>
                        <option value=''>All Genres</option>
                        {
                            props.genres.map((val) => {
                                return <option value={val.id} key={val.id}>{val.name}</option>
                            })
                        }
                    </select>
                </div>
                <div>
                    <span className={`${props.viewType === 'list' ? 'text-light' : 'text-secondary'} me-3`} style={{ cursor: 'pointer' }} onClick={handleClick}><i className='fa fa-lg fa-th-list' data-type='list'></i></span>
                    <span className={`${props.viewType === 'card' ? 'text-light' : 'text-secondary'}`} style={{ cursor: 'pointer' }} onClick={handleClick}><i className='fa fa-lg fa-th-large' data-type='card'></i></span>
                </div>
            </div>
        </div>
    );
}

export default Filter;