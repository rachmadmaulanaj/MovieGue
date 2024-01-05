import { Link } from 'react-router-dom';

const Header = (props) => {
    const link_detail = '/';
    // const link_detail = '/moviegue';
    return (
        <nav className="navbar">
            <div className="container">
                <Link to={link_detail}>
                    <span className="navbar-brand text-teal fw-bold fs-2">MovieGue</span>
                </Link>
                {
                    props.isShow ? (
                        <div className="d-flex div-input-search">
                            <input className="input-search" type="search" name="searchInput" placeholder="Search Movies..." autoComplete="off" aria-label="Search" value={props.searchInput} onChange={props.onInputChange} onKeyDown={props.onSearchEnter} />
                            <div onClick={props.onSearchRemoveClick} className='input-search-icon'>
                                {
                                    props.searchInput ? (
                                        <i className="fa fa-times text-white"></i>
                                    ) : (
                                        <i className="fa fa-search text-white"></i>
                                    )
                                }
                            </div>
                        </div>
                    ) : (
                        <Link to={link_detail}>
                            <div className='text-teal'>
                                <i className='fa fa-arrow-left'></i>
                                <span className='ms-2'>Back to list</span>
                            </div>
                        </Link>
                    )
                }
            </div>
        </nav>
    );
}

export default Header;
