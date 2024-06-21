import React from 'react';
import { useContext } from 'react';
import { Context } from '../ContextProvider';
import { Link } from 'react-router-dom';

const HeadlineCard = () => {
    const placeholderImage = 'https://via.placeholder.com/150';
    const {favourites, filteredItemsToDisplay, handlePageChange, totalPages, currentPage, handleNextClick, handlePrevClick, addToFavourites,
      removeFromFavourites, preDisabled, nextDisabled, setSelectedArticle } = useContext(Context);

    //fetching Read More 
    const handleReadMore = (article) => {
        setSelectedArticle(article);
    };
  // To check if the card is in Favourites or not
    const favouritesChecker=(id)=>{
      const check = favourites.some((article)=>article.id === id)
      return check
    }
   
    return (
        <>
            <div className='headline-card'>
                {filteredItemsToDisplay.map((article) => (
                    <div className="card" key={article.id} style={{ width: '20rem' }}>
                      
                        <img src={article?.urlToImage ? article.urlToImage : placeholderImage} className="card-img-top" />
                        
                        <div className="card-body">
                            <h5 className="card-title">{article.title}</h5>
                            <p className="card-text">{article.description ? article.description : "This is news about something."}</p>
                            <div>
                            <Link to={`/read/${article.id}`} className="btn btn-primary me-3 cursor-pointer" onClick={() => handleReadMore(article)}>Read More</Link>
                            {favouritesChecker(article.id)?<button type="button" className="btn btn-outline-danger cursor-pointer" onClick={()=>removeFromFavourites(article.id)}>Unfavourite</button>
                            :<button type="button" className="btn btn-outline-info cursor-pointer" onClick={()=>addToFavourites(article)}>Favourites</button>}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="pagination mx-5 mb-3 pagination-buttons" role="group" aria-label="First group">
                <button onClick={handlePrevClick} disabled={preDisabled} className="btn btn-outline-primary"><span aria-hidden="true">&laquo;</span></button>
                {Array.from({ length: totalPages - 1 }, (_, i) => {
                    return (
                        <button
                            style={{ minWidth: 'unset' }}
                            className="btn btn-outline-primary"
                            onClick={() => { handlePageChange(i + 1) }}
                            disabled={i + 1 === currentPage}
                            key={i}>
                            {i + 1}
                        </button>
                    )
                })}
                <button onClick={handleNextClick} disabled={nextDisabled} className="btn btn-outline-primary"><span aria-hidden="true">&raquo;</span></button>
            </div>
        </>
    )
}

export default HeadlineCard;
