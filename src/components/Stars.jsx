const Stars = (props) => {
    const stars_arr = [];
    
    if (props.rating < 1 || props.rating > 10) {
        for (let i = 0; i < 5; i++) {
            stars_arr.push(<i className="fa fa-star-o me-2 text-warning" key={i}></i>);
        }
    } else {
        const stars = Math.round((props.rating - 1) / (10 - 1) * 4 * 2) / 2 + 1;
        const full_stars = Math.floor(stars);
        let half_star = stars % 1 !== 0;

        for (let i = 1; i <= 5; i++) {
            if (full_stars >= i) {
                stars_arr.push(<i className="fa fa-star me-2 text-warning" key={i}></i>);
            } else if (half_star) {
                stars_arr.push(<i className="fa fa-star-half-o me-2 text-warning" key={i}></i>);
                half_star = 0;
            } else {
                stars_arr.push(<i className="fa fa-star-o me-2 text-warning" key={i}></i>);
            }
        }
    }
    
    return (
        <div className="d-inline-block">{stars_arr}</div>
    )
}

export default Stars;