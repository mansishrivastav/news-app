import React, { useContext } from 'react'
import { Context } from '../ContextProvider'
import { Link } from 'react-router-dom';

const Favourites = () => {
 const { favourites,removeFromFavourites, setSelectedArticle}= useContext(Context);
 const placeholderImage = 'https://via.placeholder.com/150';

  //Read More in Favourites
 const handleReadMore=(article)=>{
  setSelectedArticle(article)
 }
  return (
    <div>
      <h3 className='text-center'>My Favourites</h3>
      <div className='headline-card'>
      {favourites.length===0?(<p>No Favourites yet.</p>):(
        
        favourites.map((article)=>(
          <div className="card" key={article.id} style={{ width: '20rem' }}>
            <img src={article?.urlToImage?article.urlToImage:placeholderImage} className="card-img-top" alt="Article" />
            <div className="card-body">
              <h5 className="card-title">{article?.title?article?.title:"Title"}</h5>
              <p className="card-text">{article?.description?article.description:"This is news about something."}</p>
              <div>
                <Link to={`/read/${article.id}`} className="btn btn-primary me-3 cursor-pointer" onClick={()=>handleReadMore(article)}>Read More</Link>
                <button type="button" className="btn btn-outline-danger cursor-pointer" onClick={()=>removeFromFavourites(article.id)}>Unfavourite</button>
              </div>
            </div>
            </div>
                      
          
        ))
      )}
      </div>
      
      
    </div>
  )
}

export default Favourites
