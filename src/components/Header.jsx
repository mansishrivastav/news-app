import React, { useContext } from 'react';
import { Context } from '../ContextProvider';

const Header = () => {
    const { fetchCategory } = useContext(Context);

    //All the categories of the buttons
    const categories = ['sports', 'technology', 'business', 'entertainment', 'politics', 'international', 'movies', 'weather'];

    //fetching category of the buttons
    const handleCategory = (category) => {
        fetchCategory(category);
    };

    return (
        <>
            <ul className="row mt-5 mx-3 gy-1">
                {categories.map((category) => (
                    <li key={category} className='col-6 col-sm-3 col-md-2 col-lg-2 d-flex mb-3'>
                        <button className='btn btn-outline-primary' onClick={() => handleCategory(category)}>
                            {category}
                        </button>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default Header;
