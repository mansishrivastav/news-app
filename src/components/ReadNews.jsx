import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../ContextProvider';

const ReadNews = () => {
    const { readId } = useParams();
    const { selectedArticle, articles } = useContext(Context);
    const [article, setArticle] = useState(null);
    const placeholderImage = 'https://via.placeholder.com/150';

    //Component loads after clicking Read More button
    useEffect(() => {
        if (selectedArticle && selectedArticle.id === readId) {
            setArticle(selectedArticle);
        } else {
            const filteredArticle = articles.find(item => item.id === readId);
            setArticle(filteredArticle);
        }
    }, [readId, selectedArticle, articles]);

    if (!article) {
        return <div>Loading...</div>;
    }

    return (
        <div className='read-news'>
            <h3>{article?.title}</h3>
            <div className="source">
                <i> <p>Author: <span style={{ color: "#c0392b" }}> {article?.author ? article?.author : "Anonymous"} </span></p></i>
                <i><p>Source:<span style={{ color: "#2980b9" }}>{article?.source?.name ? article?.source?.name : "Anonymous"}</span></p></i>
            </div>
            <p> <b>{article?.description ? article?.description : "This is news about something."}</b></p>
            <div className="read-news-img">
                <img src={article?.urlToImage ? article.urlToImage : placeholderImage} alt={article?.title} />
            </div>
            <p className='headline-content'>{article?.content ? article?.content : "Click the link to know more"} <span><a href={article?.url} target="_blank">view more</a></span></p>
        </div>
    )
}

export default ReadNews;
